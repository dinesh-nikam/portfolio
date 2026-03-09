/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "./constants";

export function SkillsCategories() {
    const [activeCategory, setActiveCategory] = useState<number | null>(0);

    return (
        <div className="w-full h-full flex flex-col gap-4 relative z-10">
            {skillCategories.map((category, idx) => {
                const isActive = activeCategory === idx;

                return (
                    <div
                        key={category.title}
                        className={`
                            relative overflow-hidden rounded-2xl border transition-all duration-300
                            ${isActive
                                ? "bg-white/10 dark:bg-white/5 border-blue-500/50 shadow-[0_4px_20px_rgba(59,130,246,0.1)]"
                                : "bg-white/5 dark:bg-white/2 border-white/10 hover:border-blue-500/30 hover:bg-white/10"
                            }
                            backdrop-blur-md
                        `}
                    >
                        <button
                            onClick={() => setActiveCategory(isActive ? null : idx)}
                            className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer z-10 relative"
                        >
                            <div>
                                <h3 className="text-xl font-bold tracking-tight text-foreground">{category.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1 max-w-[90%]">{category.description}</p>
                            </div>
                            <div className={`w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}>
                                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </button>

                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-5 md:px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                                        {category.skills.map((skill) => (
                                            <div key={skill.name} className="flex flex-col gap-3 p-4 rounded-xl bg-black/20 border border-white/5 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(59,130,246,0.1)] transition-all duration-300 group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 shrink-0 rounded-lg bg-white/10 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                                                        <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" crossOrigin="anonymous" />
                                                    </div>
                                                    <h4 className="text-sm font-semibold text-foreground truncate">{skill.name}</h4>
                                                </div>

                                                {/* Progress Bar Container */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full opacity-80 group-hover:opacity-100 transition-opacity`}
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${skill.level}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors w-8 text-right">{skill.level}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
