"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { usePageRevealed } from "@/hooks/use-page-revealed";
import HeroScene from "@/components/three/hero-scene";

/* ------------------------------------------------------------------ */
/* Hero — one focal point.                                             */
/* Hierarchy: eyebrow → NAME → value statement → CTAs → portrait.      */
/* The wireframe sculpture (HeroScene) is the single ambient layer;    */
/* the particle overlay, floating talk-widget, system badge, spec      */
/* strip and highlighter chips were removed: they competed with the    */
/* name and had no narrative purpose.                                  */
/* ------------------------------------------------------------------ */

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
            {/* Ambient 3D wireframe sculpture — the one allowed ambient layer */}
            <HeroScene />

            <div className="mx-auto w-full max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">

                    {/* ═══ LEFT: Typography & Statement (Col 1–7) ═══ */}
                    <motion.div
                        style={prefersReducedMotion ? undefined : { y: textY, opacity: textOpacity }}
                        className="relative z-10 flex flex-col items-start lg:col-span-7"
                    >
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                            className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
                        >
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            Full Stack Developer — Pune, India
                        </motion.div>

                        {/* Name — the single largest element on the page */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            className="mt-7 font-display text-[3.5rem] font-medium leading-[0.92] tracking-tight text-foreground sm:text-[5rem] md:text-[6rem] lg:text-[6.5rem] xl:text-[7.5rem]"
                        >
                            Dinesh
                            <br />
                            Nikam<span className="text-primary">.</span>
                        </motion.h1>

                        {/* Value statement */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.55 }}
                            className="mt-6 max-w-xl text-lg leading-relaxed text-foreground sm:text-xl"
                        >
                            I design and engineer fast, resilient web applications —
                            where typography, motion, and architecture are built
                            with intent, not decoration.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.65 }}
                            className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
                        >
                            Currently building enterprise platforms at ITHPL and
                            consulting on Next.js, cloud architecture, and creative
                            engineering.
                        </motion.p>

                        {/* CTAs — two, both real */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.7, delay: 0.85 }}
                            className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8"
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
                                Start a Conversation →
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* ═══ RIGHT: Portrait (Col 8–12) — editorial, no floating badges ═══ */}
                    <motion.div
                        style={prefersReducedMotion ? undefined : { y: plateY }}
                        initial={{ opacity: 0 }}
                        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
                        className="relative z-10 hidden items-center justify-center lg:col-span-5 lg:flex"
                    >
                        <figure className="relative z-10 w-72 xl:w-80">
                            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card shadow-2xl">
                                <Image
                                    src="/my.webp"
                                    alt="Portrait of Dinesh Nikam"
                                    fill
                                    sizes="(max-width: 1280px) 288px, 320px"
                                    priority
                                    className="object-cover [filter:grayscale(0.85)_contrast(1.1)]"
                                />
                            </div>
                            <figcaption className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                <span>Fig. 01 — Dinesh Nikam</span>
                                <span>Pune, IN</span>
                            </figcaption>
                        </figure>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
