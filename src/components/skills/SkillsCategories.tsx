"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "./constants";
import { BrandIcon } from "@/components/icons/brand-icon";

export function SkillsCategories() {
    const [activeCategory, setActiveCategory] = useState<number | null>(0);

    return (
        <div className="relative z-10 flex w-full max-w-full flex-col gap-4">
            {skillCategories.map((category, idx) => {
                const isActive = activeCategory === idx;

                return (
                    <div
                        key={category.title}
                        className={`relative overflow-hidden rounded-md border transition-colors duration-300 ${
                            isActive
                                ? "border-primary/40 bg-muted/50"
                                : "border-border/70 bg-transparent hover:border-primary/30 hover:bg-muted/40"
                        }`}
                    >
                        <button
                            onClick={() => setActiveCategory(isActive ? null : idx)}
                            className="relative z-10 flex w-full cursor-pointer items-center justify-between p-4 sm:p-5 text-left md:p-6"
                        >
                            <div>
                                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-foreground">{category.title}</h3>
                                <p className="mt-1 max-w-[90%] text-xs sm:text-sm text-muted-foreground">{category.description}</p>
                            </div>
                            <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-300 ${
                                    isActive ? "rotate-180" : ""
                                }`}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </button>
                        <AnimatePresence initial={false}>
                            {isActive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 md:px-6">
                                        <div className="flex flex-col gap-3">
                                            {category.skills.map((skill) => (
                                                <div
                                                    key={skill.name}
                                                    className="flex items-center gap-3"
                                                >
                                                    <BrandIcon name={skill.icon} size={20} className="text-muted-foreground shrink-0" />
                                                    <span className="truncate text-sm text-foreground">{skill.name}</span>
                                                    <span className="w-8 text-right font-mono text-xs text-muted-foreground">{skill.level}%</span>
                                                </div>
                                            ))}
                                        </div>
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
