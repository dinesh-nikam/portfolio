"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import dynamic from "next/dynamic";

const ParticleImage = dynamic(() => import("@/components/particle-image").then((mod) => mod.ParticleImage), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-secondary/20 animate-pulse rounded-lg" />
});

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax scroll effects
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-20"
        >
            <motion.div
                style={{ y: y1, opacity }}
                className="w-full max-w-7xl mx-auto flex flex-col items-start gap-12"
            >
                <div className="flex flex-col gap-2">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1.8 }}
                            className="text-display"
                        >
                            Dinesh Nikam
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1.9 }}
                            className="text-title text-muted-foreground font-light"
                        >
                            {/* Creative Developer */}
                             <span className="mx-2 opacity-50"></span> Software Engineer
                        </motion.h2>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
                    className="max-w-xl"
                >
                    <p className="text-body">
                        I design and engineer premium digital experiences. <br className="hidden md:block" />
                        Focusing on typography, fluid motion, and minimalist aesthetics <br className="hidden md:block" />
                        to build products that feel calm and look spectacular.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.5 }}
                    className="flex flex-wrap items-center gap-6 mt-8"
                >
                    <a
                        href="#work"
                        className="btn-elegant group cursor-hover"
                        data-cursor-text="Scroll"
                    >
                        View Selected Work
                        <ArrowDownRight className="w-4 h-4 transition-transform group-hover:rotate-[-45deg]" />
                    </a>

                    <a
                        href="#contact"
                        className="text-sm font-medium uppercase tracking-widest hover-underline cursor-hover"
                    >
                        Contact Me
                    </a>
                </motion.div>
            </motion.div>

            {/* The Particle Image Graphic inserted here */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 2, ease: [0.76, 0, 0.24, 1] }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-lg lg:max-w-2xl aspect-[4/3] pointer-events-auto mix-blend-lighten hidden md:block z-0 opacity-80"
            >
                <ParticleImage src="./my.png" />
            </motion.div>

            {/* Decorative vertical line (ultra minimal visual interest) */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, delay: 2.5, ease: [0.76, 0, 0.24, 1] }}
                className="absolute bottom-0 left-6 md:left-12 lg:left-24 w-[1px] h-32 bg-border origin-bottom"
            />
        </section>
    );
}
