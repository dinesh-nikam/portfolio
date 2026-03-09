"use client";

import { useEffect, useState } from "react";
import { Users, Eye, Clock, MessageSquare } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { motion } from "framer-motion";

export default function AdminOverview() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/overview")
            .then(res => res.json())
            .then(d => {
                setData(d);
                setLoading(false);
            })
            .catch(e => {
                console.error("Failed to fetch overview", e);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 rounded-full border-t-2 border-blue-500 animate-spin" />
            </div>
        );
    }

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        if (m > 0) return `${m}m ${s}s`;
        return `${s}s`;
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold font-mono tracking-tight text-white mb-2">Platform Overview</h1>
                <p className="text-gray-400">Welcome to your operational intelligence dashboard.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Unique Visitors"
                    value={data?.totalVisitors || 0}
                    icon={Users}
                    delay={0.1}
                />
                <StatCard
                    title="Total Page Views"
                    value={data?.totalViews || 0}
                    icon={Eye}
                    delay={0.2}
                />
                <StatCard
                    title="Avg Session Duration"
                    value={formatTime(data?.avgSessionDuration || 0)}
                    icon={Clock}
                    delay={0.3}
                />
                <StatCard
                    title="Pending Messages"
                    value={data?.contactMessagesCount || 0}
                    icon={MessageSquare}
                    delay={0.4}
                />
            </div>

            <div className="pt-8 mb-4 border-t border-white/10">
                <h2 className="text-xl font-bold font-mono mb-4 text-white">System Status</h2>
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md"
                >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>All tracking systems operational and ingesting data normally.</span>
                </motion.div>
            </div>
        </div>
    );
}
