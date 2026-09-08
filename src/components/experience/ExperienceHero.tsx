"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { statsData } from "@/lib/data";
import { ArrowDownRight, FileText, Sparkles } from "lucide-react";

// Extracted AnimatedCounter component - Fully theme responsive contrast
function AnimatedCounter({ value, label }: { value: string; label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    const numericValue = parseInt(value.replace(/\D/g, ""));
    const suffix = value.replace(/\d/g, "");

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = numericValue;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.ceil(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, numericValue]);

    return (
        <div
            ref={ref}
            className="flex flex-col items-start justify-center p-6 bg-card border border-border rounded-md hover:border-primary/40 transition-all duration-300 min-w-[150px]"
        >
            <h4 className="text-3xl font-extrabold text-foreground mb-1 font-mono tracking-tight">
                {count}{suffix}
            </h4>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                {label}
            </p>
        </div>
    );
}

export function ExperienceHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax scroll effects
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[90vh] w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-20 bg-background"
        >
            <motion.div
                style={{ y, opacity }}
                className="w-full max-w-7xl mx-auto flex flex-col items-start gap-10 z-10"
            >
                {/* Visual Category Label */}
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="font-mono text-xs tracking-[0.25em] uppercase text-primary font-semibold">
                        Professional Dossier
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="text-display text-foreground select-none tracking-tighter"
                        >
                            Curriculum Vitae
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="text-2xl md:text-3xl text-muted-foreground font-light tracking-tight"
                        >
                            Professional Experience <span className="mx-2 opacity-30">/</span> Achievements <span className="mx-2 opacity-30">/</span> Education
                        </motion.h2>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    <p className="text-body text-base md:text-lg leading-relaxed text-muted-foreground font-light">
                        A detailed timeline of my technical career journey, highlighting my impact as a full-stack engineer and cloud architect building fault-tolerant products, high-efficiency cloud infrastructures, and pixel-perfect custom interfaces.
                    </p>
                </motion.div>

                {/* Animated Counters Grid & CTA Center Alignment */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex flex-wrap items-center gap-6 mt-6 w-full lg:w-auto"
                >
                    <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
                        {statsData.map((stat, idx) => (
                            <AnimatedCounter key={idx} value={stat.value} label={stat.label} />
                        ))}
                    </div>

                    {/* Perfect alignment container for Download button */}
                    <div className="w-full sm:w-auto mt-2 sm:mt-0">
                        <motion.a
                            href="https://drive.google.com/file/d/15sOTRbV-1NFzoL3Ko_Bh5iKd43L1yuyF/view?usp=drivesdk"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 rounded-md bg-primary text-primary-foreground font-semibold text-sm tracking-wider transition-all duration-300 border border-primary overflow-hidden"
                        >
                            <FileText className="w-4 h-4 shrink-0 transition-transform group-hover:rotate-6" />
                            <span className="uppercase font-mono tracking-widest text-xs">Download PDF Resume</span>
                            <ArrowDownRight className="w-4 h-4 shrink-0 transition-transform group-hover:rotate-[-45deg]" />
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Decorative vertical track line */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-6 md:left-12 lg:left-24 w-[1px] h-32 bg-border origin-bottom"
            />
        </section>
    );
}