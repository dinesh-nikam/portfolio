"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { statsData } from "@/lib/data";
import { ArrowDownRight } from "lucide-react";
import dynamic from "next/dynamic";

const ParticleImage = dynamic(() => import("@/components/particle-image").then((mod) => mod.ParticleImage), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-secondary/20 animate-pulse rounded-lg" />
});

// Extracted AnimatedCounter component for neatness
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
            const increment = end / (duration / 16); // 60fps

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
        <div ref={ref} className="flex flex-col items-start justify-center p-6 backdrop-blur-sm bg-white/[0.02] border border-white/5 rounded-2xl min-w-[140px]">
            <h4 className="text-3xl font-bold text-white mb-1 font-mono">
                {count}{suffix}
            </h4>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
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
            className="relative min-h-[90vh] w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-20"
        >
            <motion.div
                style={{ y, opacity }}
                className="w-full max-w-8xl mx-auto flex flex-col items-start gap-12 z-10"
            >
                <div className="flex flex-col gap-2">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1.8 }}
                            className="text-display"
                        >
                            Curriculum Vitae
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1.9 }}
                            className="text-title text-muted-foreground font-light"
                        >
                            Professional Experience <span className="mx-2 opacity-50">/</span> Skills <span className="mx-2 opacity-50"></span> 
                        </motion.h2>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
                    className="max-w-xl"
                >
                    <p className="text-body leading-relaxed md:leading-loose">
                        A comprehensive overview of my career journey, showcasing my evolution as an engineer and the impact I've made building scalable digital products and immersive web experiences.
                    </p>
                </motion.div>

                {/* Animated Counters Grid & CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.5 }}
                    className="flex flex-wrap items-center gap-6 mt-4"
                >
                    {statsData.map((stat, idx) => (
                        <AnimatedCounter key={idx} value={stat.value} label={stat.label} />
                    ))}
                    <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-4">
                        <motion.a
                            href="https://drive.google.com/file/d/15sOTRbV-1NFzoL3Ko_Bh5iKd43L1yuyF/view?usp=drivesdk"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-elegant group cursor-hover inline-flex w-full md:w-auto justify-center"
                            data-cursor-text="Download"
                        >
                            Download PDF
                            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:rotate-[-45deg]" />
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Background Particle Image or Glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 2, ease: [0.76, 0, 0.24, 1] }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-lg lg:max-w-2xl aspect-[4/3] pointer-events-auto mix-blend-lighten hidden md:block z-0 opacity-40 grayscale"
            >
                <ParticleImage src="./mypic.png" />
            </motion.div>

            {/* Decorative vertical line */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, delay: 2.5, ease: [0.76, 0, 0.24, 1] }}
                className="absolute bottom-0 left-6 md:left-12 lg:left-24 w-[1px] h-32 bg-border origin-bottom"
            />
        </section>
    );
}
