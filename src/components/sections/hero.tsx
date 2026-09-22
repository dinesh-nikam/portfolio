"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { usePageRevealed } from "@/hooks/use-page-revealed";
import HeroScene from "@/components/three/hero-scene";
import ParticleImage from "@/components/particle-image";

/* ------------------------------------------------------------------ */
/* "Register plate" — archival portrait with crop marks                */
/* ------------------------------------------------------------------ */
function RegisterPlate() {
    return (
        <figure className="relative z-10 flex w-72 flex-col xl:w-80">
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card shadow-2xl">
                {/* Base high-contrast editorial portrait */}
                <Image
                    src="/my.webp"
                    alt="Portrait of Dinesh Nikam"
                    fill
                    sizes="(max-width: 1280px) 288px, 320px"
                    priority
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03] [filter:grayscale(0.85)_contrast(1.1)]"
                />

                {/* Interactive particle shimmer overlay */}
                <ParticleImage className="absolute inset-0" />

                {/* Archival Crop / register marks */}
                <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-foreground/50" />
                <span aria-hidden className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-foreground/50" />
                <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-foreground/50" />
                <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-foreground/50" />

                {/* Subtle vermilion accent bottom border */}
                <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-primary/50" />
            </div>

            <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>Fig. 01 — Dinesh Nikam</span>
                <span>Est. 2022</span>
            </figcaption>
        </figure>
    );
}

export function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const revealed = usePageRevealed();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const textY = useTransform(scrollYProgress, [0, 0.9], [0, 60]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const plateY = useTransform(scrollYProgress, [0, 1], [0, -40]);

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative flex min-h-[92vh] w-full flex-col justify-center overflow-hidden px-6 pt-28 pb-20 md:px-12 lg:min-h-screen lg:px-20 xl:px-24"
        >
            {/* Ambient 3D background wireframe sculpture & dust halo */}
            <HeroScene />

            <div className="mx-auto w-full max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">

                    {/* ═══ LEFT: Typography & Statement (Col 1–7) ═══ */}
                    <motion.div
                        style={prefersReducedMotion ? undefined : { y: textY, opacity: textOpacity }}
                        className="relative z-10 flex flex-col items-start lg:col-span-7"
                    >
                        {/* Eyebrow — 0.15s */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                            className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
                        >
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            Full Stack Developer — Pune, India
                        </motion.div>

                        {/* Headline — 0.30s */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            className="mt-7"
                        >
                            <h1 className="font-display text-[3.5rem] font-medium leading-[0.92] tracking-tight text-foreground sm:text-[5rem] md:text-[6rem] lg:text-[6.5rem] xl:text-[7.5rem]">
                                Dinesh
                                <br />
                                Nikam<span className="text-primary">.</span>
                            </h1>
                        </motion.div>

                        {/* Role — 0.50s */}
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
                            className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground sm:text-sm"
                        >
                            Full Stack Developer
                        </motion.p>

                        {/* Statement — 0.70s */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                            className="mt-5 max-w-lg"
                        >
                            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                                I design and engineer premium digital experiences
                                where typography, motion, and technology meet.
                            </p>
                        </motion.div>

                        {/* CTAs — 0.90s */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.7, delay: 0.9 }}
                            className="mt-9 flex flex-wrap items-center gap-8"
                        >
                            <a
                                href="#work"
                                className="group inline-flex items-center gap-2.5 border border-foreground bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition-all duration-300 hover:border-primary hover:bg-primary"
                            >
                                View Selected Work
                                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
                            </a>
                            <a
                                href="/contactme"
                                className="font-mono text-xs uppercase tracking-widest text-foreground transition-colors duration-300 hover:text-primary"
                            >
                                Contact Me →
                            </a>
                        </motion.div>

                        {/* Spec strip — 1.05s */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 1.05 }}
                            className="mt-14 grid w-full max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-6 sm:grid-cols-4"
                        >
                            {[
                                { label: "Location", value: "Pune, IN" },
                                { label: "Focus", value: "UI · Motion · Code" },
                                { label: "Stack", value: "Next.js · React · Node" },
                                { label: "Status", value: "Open to work" },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col gap-1.5">
                                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                                        {item.label}
                                    </span>
                                    <span className="flex items-center gap-2 text-sm font-medium">
                                        {item.label === "Status" && (
                                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" aria-hidden />
                                        )}
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ═══ RIGHT: Portrait Register Plate (Col 8–12) ═══ */}
                    <motion.div
                        style={prefersReducedMotion ? undefined : { y: plateY }}
                        initial={{ opacity: 0 }}
                        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
                        className="relative z-10 hidden items-center justify-center lg:col-span-5 lg:flex"
                    >
                        <RegisterPlate />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}