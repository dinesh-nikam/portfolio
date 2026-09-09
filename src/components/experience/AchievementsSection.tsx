"use client";

import { motion } from "framer-motion";
import { achievementsData } from "@/lib/data";
import { Globe, Zap, Server, Code } from "lucide-react";

// Map string icons to Lucide components
const iconMap: Record<string, React.ReactNode> = {
    "globe": <Globe className="w-6 h-6 text-primary" />,
    "zap": <Zap className="w-6 h-6 text-primary" />,
    "server": <Server className="w-6 h-6 text-primary" />,
    "code": <Code className="w-6 h-6 text-primary" />
};

export function AchievementsSection() {
    return (
        <section className="w-full max-w-6xl mx-auto py-24 px-6">
            <div className="flex flex-col items-center mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30 border border-border/70 mb-6"
                >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm font-mono tracking-widest text-primary">IMPACT</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold tracking-tight text-center"
                >
                    Key Achievements
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {achievementsData.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="group relative flex items-start gap-6 p-6 rounded-md bg-card border border-border hover:border-primary/40 transition-all"
                    >
                        <div className="flex-shrink-0 w-14 h-14 rounded-md bg-muted/40 flex items-center justify-center border border-border/70 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                            {iconMap[item.icon] || <Code className="w-6 h-6 text-primary" />}
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">
                                {item.description}
                            </p>
                            <div className="mt-auto">
                                <span className="inline-flex items-center px-3 py-1 rounded-md bg-muted/30 text-sm font-mono font-medium text-foreground border border-border/70 group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors">
                                    {item.metric}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}