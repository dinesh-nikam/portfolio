"use client";

import { useEffect, useState } from "react";
import { Folder, Clock, Hash, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
    const [engagement, setEngagement] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/projects")
            .then(res => res.json())
            .then(d => {
                setEngagement(d.engagement || []);
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

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold font-mono tracking-tight text-white mb-2">Project Engagement</h1>
                <p className="text-gray-400">Track which portfolio projects generate the most interest.</p>
            </header>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/10 bg-black/50 text-xs font-mono text-gray-400 uppercase tracking-wider">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">Project Path</div>
                    <div className="col-span-3 text-right">Total Views</div>
                    <div className="col-span-3 text-right">Avg Time Spent</div>
                </div>

                <div className="divide-y divide-white/5">
                    {engagement.map((project, index) => (
                        <motion.div
                            key={project.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/5 transition-colors group"
                        >
                            <div className="col-span-1 text-gray-500 font-mono flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                {index + 1}
                            </div>
                            <div className="col-span-5 flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                    <Folder className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium truncate">{project.path.replace("/projects/", "") || "Projects Index"}</h3>
                                    <p className="text-xs text-gray-500">{project.path}</p>
                                </div>
                            </div>
                            <div className="col-span-3 text-right">
                                <span className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full text-blue-300 font-mono text-sm border border-white/5">
                                    <TrendingUp className="w-3 h-3 text-blue-400" />
                                    {project.views}
                                </span>
                            </div>
                            <div className="col-span-3 text-right flex items-center justify-end gap-2 text-gray-300 text-sm">
                                <Clock className="w-4 h-4 text-gray-500" />
                                {Math.floor(project.avgTime / 60)}m {project.avgTime % 60}s
                            </div>
                        </motion.div>
                    ))}

                    {engagement.length === 0 && (
                        <div className="p-10 text-center text-gray-500 font-mono">
                            Not enough data collected yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
