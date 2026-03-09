"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    UserPlus,
    RotateCcw,
    Clock,
    Activity,
    MessageSquare,
    Monitor,
    Smartphone,
    Tablet,
    MapPin,
    ArrowRight,
    Search,
    ChevronDown,
    ChevronUp
} from "lucide-react";

import { StatCard } from "@/components/admin/stat-card";
import { AreaChart, BarChart } from "@/components/admin/charts";
import { WorldMap } from "@/components/admin/world-map";
// Recharts PieChart component wrappers locally defined below or imported if available
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

type DashboardData = any;

const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
};

const COLORS = ["#3b82f6", "#64748b", "#0ea5e9", "#10b981", "#f59e0b", "#475569"];

export default function VisitorsDashboard() {
    const [data, setData] = useState<DashboardData>(null);
    const [loading, setLoading] = useState(true);
    const [interval, setInterval] = useState("30d"); // 24h, 30d, 12w
    const [expandedProfile, setExpandedProfile] = useState<string | null>(null);

    // Live refresh
    useEffect(() => {
        const fetchDashboard = () => {
            fetch(`/api/admin/visitors/dashboard?interval=${interval}`)
                .then(res => res.json())
                .then(d => {
                    setData(d);
                    setLoading(false);
                })
                .catch(e => {
                    console.error("Dashboard fetch error:", e);
                    setLoading(false);
                });
        };

        fetchDashboard();

        // Refresh every 60 seconds for live visitors section
        const timer = window.setInterval(fetchDashboard, 60000);
        return () => window.clearInterval(timer);
    }, [interval]);

    if (loading && !data) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <div className="relative w-16 h-16">
                    <div className="w-16 h-16 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin absolute inset-0" />
                    <div className="w-12 h-12 rounded-full border-2 border-slate-500/20 border-b-slate-500 animate-spin-reverse absolute top-2 left-2" />
                </div>
                <div className="text-blue-500 font-mono tracking-widest text-sm animate-pulse">
                    INITIALIZING INTELLIGENCE RELAYS...
                </div>
            </div>
        );
    }

    const { overview, chartData, geographic, devices, profiles, potentialClients, liveVisitors } = data;

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-mono tracking-tight text-white mb-2 flex items-center gap-3">
                        <div className="p-1.5 bg-blue-500/10 rounded-md">
                            <Activity className="w-6 h-6 text-blue-500" />
                        </div>
                        Visitor Intelligence
                    </h1>
                    <p className="text-gray-400">Deep telemetry and behavioral analytics.</p>
                </div>

                <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md">
                    {[
                        { id: "24h", label: "24h" },
                        { id: "30d", label: "30 Days" },
                        { id: "12w", label: "12 Weeks" }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setInterval(tab.id)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${interval === tab.id
                                ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="w-full h-px bg-gradient-to-r from-blue-500/50 via-blue-400/30 to-transparent"
            />

            {/* Section 1: Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard title="Total Visitors" value={overview.totalUniqueVisitors} icon={Users} delay={0.1} />
                <StatCard title="Visitors Today" value={overview.totalVisitorsToday} icon={UserPlus} delay={0.15} trend={{ value: 12, isUp: true }} />
                <StatCard title="Returning" value={overview.returningVisitors} icon={RotateCcw} delay={0.2} />
                <StatCard title="Avg Session" value={formatTime(overview.avgSessionDuration)} icon={Clock} delay={0.25} />
                <StatCard title="Bounce Rate" value={`${overview.bounceRate}%`} icon={Activity} delay={0.3} trend={overview.bounceRate > 50 ? { value: 5, isUp: false } : { value: 2, isUp: true }} />
                <StatCard title="Conversions" value={overview.contactConversions} icon={MessageSquare} delay={0.35} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Section 2: Traffic Activity Graph */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors" />
                    <h3 className="text-xl font-medium text-white mb-6 font-mono flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-500" /> Traffic Volume
                    </h3>
                    <AreaChart
                        data={chartData}
                        index="date"
                        categories={["views"]}
                        colors={["#3b82f6"]}
                        height={320}
                    />
                </motion.div>

                {/* Section 7: Live Visitors Monitor */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                    className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md flex flex-col h-full"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-medium text-white font-mono flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            Live Now
                        </h3>
                        <span className="text-emerald-400 font-mono text-xl">{liveVisitors.length}</span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                        {liveVisitors.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-2 opacity-50">
                                <Activity className="w-8 h-8" />
                                <span>No active sessions</span>
                            </div>
                        ) : (
                            liveVisitors.map((lv: any, i: number) => (
                                <motion.div
                                    key={lv.visitorId}
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                    className="p-3 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                                    <div className="pl-2">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-sm font-medium text-white">{lv.country}</span>
                                            <span className="text-xs text-gray-500 font-mono">Just now</span>
                                        </div>
                                        <div className="text-xs text-gray-400 truncate flex items-center gap-1.5 mb-2">
                                            <ArrowRight className="w-3 h-3 text-emerald-400" />
                                            <span className="text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded">{lv.currentPage}</span>
                                        </div>
                                        <div className="flex gap-2 text-xs text-gray-500">
                                            <span className="flex items-center gap-1"><Monitor className="w-3 h-3" /> {lv.device}</span>
                                            <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {lv.browser}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Section 8: High Interest / Potential Clients */}
            {potentialClients.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    className="relative p-6 rounded-2xl bg-black/40 border border-purple-500/30 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />

                    <h3 className="text-2xl font-bold font-mono text-blue-400 mb-6 flex items-center gap-2">
                        <Users className="w-6 h-6" />
                        Target Acquisitions: High Interest Leads
                        <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-300 text-sm rounded-full">{potentialClients.length} identified</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                        {potentialClients.map((client: any, i: number) => (
                            <motion.div
                                key={client.id}
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + i * 0.1 }}
                                className="p-4 bg-white/5 border border-blue-500/20 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/40 transition-all cursor-pointer group"
                                onClick={() => setExpandedProfile(expandedProfile === client.id ? null : client.id)}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <MapPin className="w-4 h-4 text-blue-400" />
                                        {client.country}
                                    </div>
                                    <div className="text-xs font-mono px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md"> Score: {client.score}</div>
                                </div>
                                <div className="space-y-1.5 mb-4">
                                    {client.flags.map((flag: string, j: number) => (
                                        <div key={j} className="text-xs flex items-center gap-2 text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                            {flag}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs text-gray-500 flex justify-between border-t border-white/5 pt-3">
                                    <span>{client.pagesViewed} pages viewed</span>
                                    <span>{formatTime(client.timeSpent)}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Middle row: Map & Device Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Section 3: Geo Map */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
                    className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md"
                >
                    <h3 className="text-xl font-medium text-white mb-6 font-mono flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-500" /> Global Telemetry
                    </h3>
                    <WorldMap data={geographic} />
                </motion.div>

                {/* Section 4: Device/OS/Browser Breakdown */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
                    className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md flex flex-col space-y-6"
                >
                    <h3 className="text-xl font-medium text-white font-mono flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-blue-500" /> Hardware Footprint
                    </h3>

                    <div className="space-y-6 flex-1">
                        {/* Devices */}
                        <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2 font-mono uppercase">Device Types</h4>
                            <div className="h-[120px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <RechartsTooltip content={<CustomTooltip />} />
                                        <Pie data={devices.types} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="value" stroke="none">
                                            {devices.types.map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 pointer-events-none flex items-center justify-center flex-col text-xs text-white">
                                    <Monitor className="w-4 h-4 text-blue-500 opacity-50 mb-1" />
                                </div>
                            </div>
                        </div>

                        {/* OS */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                            <div>
                                <h4 className="text-[10px] font-medium text-gray-500 mb-2 font-mono uppercase">Operating Systems</h4>
                                <div className="space-y-2">
                                    {devices.os.slice(0, 3).map((d: any, i: number) => (
                                        <div key={d.name} className="flex justify-between items-center bg-black/30 p-1.5 rounded-md">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                                <span className="text-xs text-gray-300 truncate w-16">{d.name}</span>
                                            </div>
                                            <span className="text-xs font-mono text-white">{d.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-medium text-gray-500 mb-2 font-mono uppercase">Browsers</h4>
                                <div className="space-y-2">
                                    {devices.browsers.slice(0, 3).map((d: any, i: number) => (
                                        <div key={d.name} className="flex justify-between items-center bg-black/30 p-1.5 rounded-md">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i + 3] }} />
                                                <span className="text-xs text-gray-300 truncate w-16">{d.name}</span>
                                            </div>
                                            <span className="text-xs font-mono text-white">{d.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Section 5 & 6: Visitor Profiles & Journey Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium text-white font-mono flex items-center gap-2">
                        <Search className="w-5 h-5 text-blue-500" /> Visitor Database Logs
                    </h3>
                    <div className="text-sm text-gray-400 font-mono">
                        Showing Top 100 Recent
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {profiles.map((profile: any, i: number) => (
                        <div key={profile.id} className="bg-black/40 border border-white/5 rounded-xl overflow-hidden transition-all duration-300">
                            {/* Profile Header Row */}
                            <div
                                className="p-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 cursor-pointer hover:bg-white/5"
                                onClick={() => setExpandedProfile(expandedProfile === profile.id ? null : profile.id)}
                            >
                                <div className="flex items-center gap-4 min-w-[200px]">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30 text-blue-400 font-mono font-bold">
                                        {profile.country?.substring(0, 2).toUpperCase() || "??"}
                                    </div>
                                    <div>
                                        <div className="text-white font-medium flex items-center gap-2">
                                            {profile.city}, {profile.country}
                                            {profile.isPotentialClient && <span className="text-[10px] uppercase font-bold text-blue-900 bg-blue-400 px-1.5 py-0.5 rounded">Hot</span>}
                                        </div>
                                        <div className="text-xs text-gray-500 font-mono" title={profile.id}>
                                            ID: {profile.id.substring(0, 8)}...
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:flex flex-[2] justify-center items-center gap-8 text-sm">
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Monitor className="w-4 h-4 text-gray-500" /> {profile.os}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Activity className="w-4 h-4 text-gray-500" /> {profile.browser}
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 md:gap-8 justify-end min-w-[200px] text-sm font-mono text-gray-300">
                                    <div className="text-center">
                                        <div className="text-gray-500 text-xs mb-1">Sessions</div>
                                        {profile.sessions}
                                    </div>
                                    <div className="text-center">
                                        <div className="text-gray-500 text-xs mb-1">Time</div>
                                        {formatTime(profile.timeSpent)}
                                    </div>
                                    <div className="text-blue-500">
                                        {expandedProfile === profile.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </div>
                                </div>
                            </div>

                            {/* Section 6: Journey Timeline (Expanded View) */}
                            <AnimatePresence>
                                {expandedProfile === profile.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-white/5 bg-black/60"
                                    >
                                        <div className="p-6">
                                            <h4 className="text-sm font-medium text-blue-400 mb-6 font-mono tracking-widest uppercase">Telemetry Journey</h4>
                                            <div className="space-y-4 pl-4 border-l border-blue-500/30 relative">
                                                {profile.journey.map((step: any, j: number) => (
                                                    <motion.div
                                                        key={j}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: j * 0.05 }}
                                                        className="relative pl-6 pb-2"
                                                    >
                                                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />

                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                            <div className="text-sm text-gray-200 bg-white/5 py-1 px-3 rounded-lg border border-white/5 inline-flex items-center gap-2">
                                                                <ArrowRight className="w-3 h-3 text-blue-400" />
                                                                {step.path}
                                                            </div>
                                                            <div className="text-xs text-gray-500 font-mono flex items-center gap-4">
                                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(step.time).toLocaleTimeString()}</span>
                                                                <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {formatTime(step.duration)}</span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                                {profile.journey.length === 0 && (
                                                    <div className="pl-6 text-sm text-gray-500 italic">No specific path telemetry found for this session block.</div>
                                                )}

                                                {profile.journey.length > 0 && profile.isPotentialClient && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                                        className="relative pl-6 pt-4"
                                                    >
                                                        <div className="absolute -left-[6px] top-5 w-3 h-3 rounded-full border-2 border-blue-500 bg-black shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                                                        <div className="text-xs uppercase font-bold text-blue-400 tracking-wider">Lead Profile Solidified</div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </motion.div>

        </div>
    );
}

// Helper tooltip for Recharts Pie
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/90 backdrop-blur border border-white/10 p-2 px-3 rounded-lg shadow-xl text-xs font-mono">
                <p className="text-white mb-1 font-sans">{`${payload[0].name}`}</p>
                <p className="text-blue-400">{`Visits: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};
