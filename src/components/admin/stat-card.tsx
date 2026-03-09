"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: { value: number; isUp: boolean };
    delay?: number;
}

export function StatCard({ title, value, icon: Icon, trend, delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-white/10 rounded-xl border border-white/5">
                    <Icon className="w-6 h-6 text-blue-500" />
                </div>

                {trend && (
                    <div className={`text-sm font-medium px-2 py-1 rounded-full ${trend.isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                        {trend.isUp ? "+" : "-"}{Math.abs(trend.value)}%
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <h3 className="text-gray-400 font-medium mb-1">{title}</h3>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: delay + 0.2 }}
                    className="text-4xl font-bold text-white tracking-tight"
                >
                    {value}
                </motion.div>
            </div>
        </motion.div>
    );
}
