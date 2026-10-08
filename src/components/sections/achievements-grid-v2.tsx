"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AchievementCard {
    id: string;
    title: string;
    achievement: string;
    year: string;
    iconSvg: React.ReactNode;
}

const achievementsList: AchievementCard[] = [
    {
        id: "01",
        title: "FEATURED ARCHITECT OF THE YEAR AWARD RECIPIENT",
        achievement: "Global Tech Awards",
        year: "2024",
        iconSvg: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white/80">
                <path d="M16 2V30M2 16H30M6 6L26 26M6 26L26 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: "02",
        title: "BEST CREATIVE PORTFOLIO EXPERIENCE AWARD WINNER",
        achievement: "Digital Recognition",
        year: "2023",
        iconSvg: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white/80">
                <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2.5" />
            </svg>
        ),
    },
    {
        id: "03",
        title: "EXCELLENCE IN FULL-STACK NEXT.JS & UI/UX DESIGN",
        achievement: "Web Honours",
        year: "2023",
        iconSvg: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white/80">
                <path d="M4 22L16 6L28 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 26H24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: "04",
        title: "MODERN WEB EXPERIENCE AWARD RECOGNITION WINNER",
        achievement: "Creative Web Awards",
        year: "2022",
        iconSvg: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white/80">
                <circle cx="11" cy="11" r="5" fill="currentColor" />
                <circle cx="21" cy="11" r="5" fill="currentColor" />
                <circle cx="11" cy="21" r="5" fill="currentColor" />
                <circle cx="21" cy="21" r="5" fill="currentColor" />
            </svg>
        ),
    },
];

export function AchievementsGridV2() {
    return (
        <section className="relative w-full bg-[#0a0908] text-[#f4f1ea] py-20 lg:py-28 border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                {/* Header (Video 1 style) */}
                <div className="mb-14">
                    <span className="mb-3 inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                        <Sparkles className="h-3 w-3" />
                        HONORS & AWARDS
                    </span>
                    <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                        DINESH<span className="text-primary font-mono text-xl align-top">®</span> ACHIEVEMENTS<span className="text-primary">.</span>
                    </h2>
                </div>

                {/* 4 Square Dark Cards Grid (Video 1 Layout) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {achievementsList.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative flex aspect-square flex-col justify-between rounded-sm border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-primary hover:bg-white/[0.06] hover:shadow-xl"
                        >
                            {/* Icon */}
                            <div className="flex items-center justify-between">
                                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:text-primary">
                                    {item.iconSvg}
                                </div>
                                <span className="font-mono text-xs text-white/30">{item.id}</span>
                            </div>

                            {/* Title */}
                            <div>
                                <h3 className="font-display text-base font-bold uppercase tracking-tight text-white transition-colors duration-200 group-hover:text-primary">
                                    {item.title}
                                </h3>

                                {/* Meta Footer */}
                                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-wider text-white/50">
                                    <span>{item.achievement}</span>
                                    <span className="text-white/80">{item.year}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
