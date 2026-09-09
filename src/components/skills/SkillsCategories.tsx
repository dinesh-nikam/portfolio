"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "./constants";

export function SkillsCategories() {
    const [activeCategory, setActiveCategory] = useState<number | null>(0);

    return (
        <div className="relative z-10 flex w-full flex-col gap-4">
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
                            className="relative z-10 flex w-full cursor-pointer items-center justify-between p-5 text-left md:p-6"
                        >
                            <div>
                                <h3 className="text-xl font-medium tracking-tight text-foreground">{category.title}</h3>
                                <p className="mt-1 max-w-[90%] text-sm text-muted-foreground">{category.description}</p>
                            </div>
                            <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-300 ${
                                    isActive ? "rotate-180" : ""
                                }`}
                            >
                                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </button>

                        <AnimatePresence initial={false}>
                            {isActive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="grid grid-cols-1 gap-3 px-5 pb-6 sm:grid-cols-2 md:px-6 lg:gap-4">
                                        {category.skills.map((skill) => (
                                            <div
                                                key={skill.name}
                                                className="group flex flex-col gap-3 rounded-md border border-border/70 bg-muted/40 p-4 transition-colors duration-300 hover:border-primary/40"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted font-mono text-[10px] uppercase text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                                                        {skill.name.slice(0, 2)}
                                                    </div>
                                                    <h4 className="truncate text-sm font-medium text-foreground">
                                                        {skill.name}
                                                    </h4>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/40">
                                                        <motion.div
                                                            className="h-full rounded-full bg-primary opacity-80 transition-opacity group-hover:opacity-100"
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${skill.level}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                                                        />
                                                    </div>
                                                    <span className="w-8 text-right font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                                                        {skill.level}%
                                                    </span>
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