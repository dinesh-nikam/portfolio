"use client";

import { useEffect, useState, useMemo } from "react";
import { Mail, Check, Star, Archive, Clock, Monitor, MapPin, Search, Filter, Compass, Zap, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow, format } from "date-fns";

export default function MessagesInbox() {
    const [messages, setMessages] = useState<any[]>([]);
    const [activeMessage, setActiveMessage] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [locationFilter, setLocationFilter] = useState("all");

    useEffect(() => {
        fetch("/api/admin/messages")
            .then(res => res.json())
            .then(d => {
                setMessages(d.messages || []);
                if (d.messages && d.messages.length > 0) {
                    setActiveMessage(d.messages[0]);
                }
                setLoading(false);
            });
    }, []);

    const updateMessage = async (id: string, updates: any) => {
        setMessages(msgs => msgs.map(m => m.id === id ? { ...m, ...updates } : m));
        if (activeMessage?.id === id) setActiveMessage({ ...activeMessage, ...updates });

        await fetch("/api/admin/messages", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, ...updates }),
        });
    };

    const getLeadScore = (msg: any) => {
        let score = 0;
        if (msg.message && msg.message.length > 100) score += 20;
        if (msg.message && msg.message.length > 300) score += 10;
        if (msg.ipAddress && msg.ipAddress !== "Unknown") score += 10;
        if (msg.country && msg.country !== "Unknown") score += 10;
        if (msg.referer) score += 10;
        if (msg.utmCampaign) score += 20;
        if (msg.visitorId) score += 20;

        if (score >= 60) return { label: "Hot Lead 🔥", color: "text-orange-500", bg: "bg-orange-500/10" };
        if (score >= 30) return { label: "Warm Lead ☀️", color: "text-yellow-500", bg: "bg-yellow-500/10" };
        return { label: "Cold Lead ❄️", color: "text-blue-500", bg: "bg-blue-500/10" };
    };

    const locations = useMemo(() => {
        const locs = new Set<string>();
        messages.forEach(m => {
            const loc = m.country || m.visitor?.country;
            if (loc && loc !== "Unknown") locs.add(loc);
        });
        return Array.from(locs);
    }, [messages]);

    const filteredMessages = useMemo(() => {
        return messages.filter(msg => {
            const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                msg.message.toLowerCase().includes(searchQuery.toLowerCase());

            const msgLocation = msg.country || msg.visitor?.country || "Unknown";
            const matchesLocation = locationFilter === "all" || msgLocation === locationFilter;

            return matchesSearch && matchesLocation;
        });
    }, [messages, searchQuery, locationFilter]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 rounded-full border-t-2 border-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-5rem)] flex flex-col pt-8 md:pt-0">
            <header className="mb-6 shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-mono tracking-tight text-white mb-2">Message Intelligence</h1>
                    <p className="text-gray-400">Client communications and visitor inquiry details.</p>
                </div>

                <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 backdrop-blur-md">
                    <div className="relative flex items-center px-3 border-r border-white/10">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-white pl-6 w-32 md:w-48 text-sm focus:ring-0 placeholder:text-gray-600"
                        />
                    </div>
                    <div className="relative flex items-center px-3">
                        <Filter className="w-4 h-4 text-gray-400 mr-2" />
                        <select
                            value={locationFilter}
                            onChange={e => setLocationFilter(e.target.value)}
                            className="bg-transparent border-none outline-none text-white text-sm focus:ring-0 appearance-none pr-4"
                        >
                            <option value="all" className="bg-black">All Locations</option>
                            {locations.map(loc => (
                                <option key={loc} value={loc} className="bg-black">{loc}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </header>

            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col md:flex-row drop-shadow-2xl">
                {/* Left pane: Message List */}
                <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
                    <div className="p-4 border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-10 flex justify-between items-center">
                        <h3 className="font-medium text-white">Inbox</h3>
                        <span className="bg-blue-500/20 text-blue-500 text-xs px-2.5 py-1 rounded-full border border-blue-500/20">
                            {messages.filter(m => !m.isRead).length} Unread
                        </span>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-white/5 custom-scrollbar">
                        {filteredMessages.map((msg) => {
                            const score = getLeadScore(msg);
                            return (
                                <button
                                    key={msg.id}
                                    onClick={() => setActiveMessage(msg)}
                                    className={`w-full text-left p-4 hover:bg-white/10 transition-colors relative group ${activeMessage?.id === msg.id ? "bg-white/10" : ""}`}
                                >
                                    {!msg.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
                                    <div className="flex justify-between items-start mb-1.5">
                                        <h4 className={`truncate pr-4 ${!msg.isRead ? "font-bold text-white tracking-wide" : "font-medium text-gray-300"}`}>
                                            {msg.name}
                                        </h4>
                                        <span className="text-xs text-gray-500 font-mono shrink-0">
                                            {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded flex items-center gap-1 ${score.bg} ${score.color} border border-current/10`}>
                                            {score.label}
                                        </span>
                                        {(msg.country || msg.visitor?.country) && (
                                            <span className="text-[10px] text-gray-500 uppercase flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {msg.country || msg.visitor?.country}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-sm truncate ${!msg.isRead ? "text-gray-300 font-medium" : "text-gray-500"}`}>
                                        {msg.message}
                                    </p>
                                </button>
                            );
                        })}
                        {filteredMessages.length === 0 && (
                            <div className="p-8 text-center text-gray-600 flex flex-col items-center">
                                <Search className="w-8 h-8 mb-4 opacity-50" />
                                <span className="font-mono text-sm">No messages found.</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right pane: Message Content */}
                <div className="w-full md:w-2/3 flex flex-col bg-black/20 relative">
                    <AnimatePresence mode="popLayout">
                        {activeMessage ? (
                            <motion.div
                                key={activeMessage.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className="flex-1 flex flex-col absolute inset-0 overflow-y-auto custom-scrollbar"
                            >
                                <div className="p-6 md:px-8 border-b border-white/10 flex justify-between items-start bg-black/40 backdrop-blur-xl sticky top-0 z-10">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white tracking-tight mb-2">{activeMessage.name}</h2>
                                        <div className="flex items-center gap-4">
                                            <a href={`mailto:${activeMessage.email}`} className="text-blue-500 hover:text-blue-400 text-sm font-mono transition-colors flex items-center gap-1">
                                                <Mail className="w-3.5 h-3.5" /> {activeMessage.email}
                                            </a>
                                            <span className="text-gray-600 text-sm">•</span>
                                            <span className="text-gray-400 text-sm font-mono">
                                                {format(new Date(activeMessage.createdAt), "MMM d, yyyy • HH:mm")}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={() => updateMessage(activeMessage.id, { isRead: !activeMessage.isRead })}
                                            className={`p-2.5 rounded-xl transition-all border ${activeMessage.isRead ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "border-blue-500/20 bg-blue-500/10 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]"}`}
                                            title={activeMessage.isRead ? "Mark as unread" : "Mark as read"}
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => updateMessage(activeMessage.id, { isStarred: !activeMessage.isStarred })}
                                            className={`p-2.5 rounded-xl transition-all border ${activeMessage.isStarred ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)]" : "border-white/10 bg-white/5 text-white hover:bg-white/10"}`}
                                        >
                                            <Star className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 md:px-8 flex-1 text-gray-200 leading-relaxed whitespace-pre-wrap text-base">
                                    {activeMessage.message}
                                </div>

                                {/* Visitor Intelligence Dashboard within Message */}
                                <div className="bg-black/80 border-t border-white/10 p-6 md:px-8 shrink-0">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Zap className="w-4 h-4 text-blue-500" />
                                        <h4 className="text-sm font-mono text-white tracking-widest uppercase">Intelligence Profile</h4>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                        {/* Geographic Intelligence */}
                                        <div className="space-y-3">
                                            <h5 className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-white/5 pb-2">
                                                <MapPin className="w-3 h-3 text-emerald-500" /> Geography
                                            </h5>
                                            <div className="text-sm">
                                                <p className="text-white font-medium">{activeMessage.city || activeMessage.visitor?.city || "Unknown City"}</p>
                                                <p className="text-gray-500">{activeMessage.region || "Unknown Region"}</p>
                                                <p className="text-gray-400">{activeMessage.country || activeMessage.visitor?.country || "Unknown Country"}</p>
                                                <p className="text-xs text-gray-600 mt-1 font-mono">{activeMessage.ipAddress || activeMessage.visitor?.ipAddress || "No IP Captured"}</p>
                                            </div>
                                            {(activeMessage.latitude && activeMessage.longitude) && (
                                                <div className="mt-2 h-24 rounded-lg overflow-hidden border border-white/10 filter grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        style={{ border: 0 }}
                                                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeMessage.longitude - 0.01},${activeMessage.latitude - 0.01},${activeMessage.longitude + 0.01},${activeMessage.latitude + 0.01}&layer=mapnik&marker=${activeMessage.latitude},${activeMessage.longitude}`}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Device Intelligence */}
                                        <div className="space-y-3">
                                            <h5 className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-white/5 pb-2">
                                                <Monitor className="w-3 h-3 text-blue-500" /> Device & OS
                                            </h5>
                                            <div className="text-sm space-y-2">
                                                <div className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded">
                                                    <span className="text-gray-500">System</span>
                                                    <span className="text-white capitalize">{activeMessage.os || activeMessage.visitor?.os || "Unknown"}</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded">
                                                    <span className="text-gray-500">Browser</span>
                                                    <span className="text-white capitalize">{activeMessage.browser || activeMessage.visitor?.browser || "Unknown"}</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded">
                                                    <span className="text-gray-500">Form Factor</span>
                                                    <span className="text-white capitalize">{activeMessage.deviceType || activeMessage.visitor?.deviceType || "Desktop"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Marketing Intelligence */}
                                        <div className="space-y-3 xl:col-span-2">
                                            <h5 className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-white/5 pb-2">
                                                <Compass className="w-3 h-3 text-purple-500" /> Acquisition
                                            </h5>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-2">
                                                <div>
                                                    <p className="text-gray-500 mb-1 text-xs">Traffic Source</p>
                                                    <div className="flex items-center gap-2">
                                                        <a href={activeMessage.referer || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium truncate flex items-center gap-1 group">
                                                            {activeMessage.referer ? new URL(activeMessage.referer).hostname : "Direct / Unknown"}
                                                            {activeMessage.referer && <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                                        </a>
                                                    </div>
                                                </div>

                                                {(activeMessage.utmSource || activeMessage.utmCampaign) && (
                                                    <div className="bg-purple-500/10 border border-purple-500/20 p-2.5 rounded-lg">
                                                        <p className="text-purple-400 text-xs mb-1.5 font-bold uppercase tracking-wide">UTM Parameters</p>
                                                        <div className="space-y-1 font-mono text-xs">
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">source:</span>
                                                                <span className="text-purple-200">{activeMessage.utmSource || "-"}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">campaign:</span>
                                                                <span className="text-purple-200">{activeMessage.utmCampaign || "-"}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">medium:</span>
                                                                <span className="text-purple-200">{activeMessage.utmMedium || "-"}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {!(activeMessage.utmSource || activeMessage.utmCampaign) && (
                                                    <div>
                                                        <p className="text-gray-500 mb-1 text-xs">Campaign</p>
                                                        <p className="text-gray-400">No campaigns detected</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 relative">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]" />
                                <Mail className="w-16 h-16 mb-6 opacity-20" />
                                <p className="font-mono text-sm tracking-widest uppercase">Select an inquiry</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
