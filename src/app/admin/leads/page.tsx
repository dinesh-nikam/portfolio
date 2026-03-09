"use client";

import { useEffect, useState } from "react";
import { User, Clock, Monitor } from "lucide-react";
import { motion } from "framer-motion";

export default function LeadsPage() {
    const [profiles, setProfiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/profiles")
            .then(res => res.json())
            .then(d => {
                setProfiles(d.profiles || []);
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
                <h1 className="text-3xl font-bold font-mono tracking-tight text-white mb-2">Marketing Intelligence</h1>
                <p className="text-gray-400">AI-driven lead detection based on visitor behavior.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {profiles.map((profile, index) => (
                    <motion.div
                        key={profile.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-blue-500/50 transition-colors"
                    >
                        {profile.category.includes("Hot") && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500" />
                        )}

                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-xl ${profile.category.includes("Hot") ? "bg-orange-500/20 text-orange-400" : "bg-white/10 text-white"}`}>
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-white text-sm w-32 truncate">{profile.id.split("-")[0]}...</h3>
                                    <p className="text-xs text-gray-500">{new Date(profile.lastVisit).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full font-medium ${profile.category.includes("Hot") ? "bg-orange-500/20 text-orange-400 border border-orange-500/20" :
                                profile.category.includes("High") ? "bg-blue-500/20 text-blue-400 border border-blue-500/20" :
                                    "bg-white/5 text-gray-400"
                                }`}>
                                {profile.category}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                                <span className="text-gray-500 flex items-center gap-1 mb-1"><Clock className="w-3 h-3" /> Time</span>
                                <p className="text-gray-200">{Math.floor(profile.timeSpent / 60)}m {profile.timeSpent % 60}s</p>
                            </div>
                            <div>
                                <span className="text-gray-500 flex items-center gap-1 mb-1"><Monitor className="w-3 h-3" /> System</span>
                                <p className="text-gray-200 capitalize w-full truncate">{profile.os} • {profile.browser}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <span className="text-gray-500">Location:</span>
                            <span className="text-gray-200 ml-2">{profile.city !== "Unknown" ? `${profile.city}, ` : ""}{profile.country !== "Unknown" ? profile.country : "Unknown"}</span>
                        </div>
                    </motion.div>
                ))}

                {profiles.length === 0 && (
                    <div className="col-span-full py-20 text-center border border-white/10 rounded-2xl bg-white/5 border-dashed">
                        <p className="text-gray-400 font-mono">No visitor profiles captured yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
