"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface ExperienceCardProps {
    role: string;
    company: string;
    period: string;
    description: string;
    tech: string[];
    index: number;
}

export function ExperienceCard({ role, company, period, description, tech, index }: ExperienceCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative w-full"
        >
            {/* Connection Line & Node */}
            <div className="absolute left-[-2rem] md:left-[-3rem] top-8 w-8 md:w-12 h-[2px] bg-gradient-to-r from-blue-500/0 to-blue-500/50 hidden md:block" />
            <div className="absolute left-[-2.25rem] md:left-[-3.25rem] top-[1.8rem] w-3 h-3 rounded-full bg-blue-500 ring-4 ring-background z-10 hidden md:block transition-transform duration-300 group-hover:scale-150 group-hover:bg-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

            <div
                ref={cardRef}
                className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 transition-all duration-500 hover:bg-white/[0.04] hover:border-blue-500/30 hover:shadow-[0_8px_32px_-8px_rgba(59,130,246,0.15)]"
            >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1 transition-colors duration-300">
                            {role}
                        </h3>
                        <p className="text-xl text-muted-foreground font-medium flex items-center gap-2">
                            {company}
                        </p>
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-blue-300 whitespace-nowrap h-fit">
                        {period}
                    </div>
                </div>

                <p className="relative z-10 text-muted-foreground leading-relaxed text-lg mb-8 max-w-3xl">
                    {description}
                </p>

                <div className="relative z-10 flex flex-wrap gap-2">
                    {tech.map((item, i) => (
                        <span
                            key={i}
                            className="px-3 py-1.5 text-xs font-mono rounded-md bg-white/5 border border-white/5 text-muted-foreground group-hover:border-blue-500/30 group-hover:text-blue-300 transition-colors duration-300"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
