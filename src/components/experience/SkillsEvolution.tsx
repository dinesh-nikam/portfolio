"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skillsEvolutionData } from "@/lib/data";

export function SkillsEvolution() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section ref={containerRef} className="w-full max-w-6xl mx-auto py-24 px-6 relative">
            <div className="flex flex-col items-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center"
                >
                    Skills <span className="text-foreground">Evolution</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-center max-w-2xl text-lg"
                >
                    A technical constellation of core competencies expanding across the stack.
                </motion.p>
            </div>

            <motion.div
                style={{ y }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
            >
                {skillsEvolutionData.map((category, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                        <h3 className="text-xl font-semibold text-foreground mb-6 relative z-10 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            {category.category}
                        </h3>

                        <div className="flex flex-wrap gap-2 relative z-10">
                            {category.skills.map((skill, sIdx) => (
                                <span
                                    key={sIdx}
                                    className="px-3 py-1.5 text-sm font-medium rounded-full bg-muted/30 text-muted-foreground border border-border/70 hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}