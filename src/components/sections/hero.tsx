"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { IntroLines } from "@/components/intro-lines";
import HeroScene from "@/components/three/hero-scene";
import ParticleImage from "@/components/particle-image";
import { usePageRevealed } from "@/hooks/use-page-revealed";

/* ------------------------------------------------------------------ */
/* "Register plate" — archival portrait with crop marks                */
/* ------------------------------------------------------------------ */
function RegisterPlate() {
    return (
        <figure className="flex w-64 flex-col xl:w-80">
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
                <Image
                    src="/my.png"
                    alt="Portrait of Dinesh Nikam"
                    fill
                    sizes="(max-width: 1280px) 256px, 320px"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03] [filter:grayscale(1)_contrast(1.05)]"
                />
                <ParticleImage className="absolute inset-0" />
                {/* Crop / register marks */}
                <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-foreground/50" />
                <span aria-hidden className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-foreground/50" />
                <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-foreground/50" />
                <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-foreground/50" />
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

    // Gentle drift: content fades out on scroll, plate parallaxes up
    const contentY = useTransform(scrollYProgress, [0, 0.9], [0, 90]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const plateY = useTransform(scrollYProgress, [0, 1], [0, -48]);

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 pb-24 pt-28 md:px-12 lg:px-24"
        >
            <HeroScene />

            <motion.div
                style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
                className="relative z-10 flex w-full max-w-7xl flex-col items-start gap-10 self-center"
            >
                {/* Kicker — colophon */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
                >
                    <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                    Full Stack Developer — Pune, IN
                </motion.div>

                {/* Title — masked reveal */}
                <IntroLines
                    lines={[<>Dinesh Nikam<span className="text-primary">.</span></>]}
                    ariaLabel="Dinesh Nikam"
                    className="text-display"
                />

                {/* Role line */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
                    className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground"
                >
                    Full Stack Developer
                </motion.p>

                {/* Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                    className="max-w-xl"
                >
                    <p className="text-body">
                        I design and engineer premium digital experiences, focusing on typography, fluid motion, and
                        deliberate minimalism to build products that feel calm and look unmistakably precise.
                    </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.85 }}
                    className="flex flex-wrap items-center gap-8"
                >
                    <a href="#work" className="btn-elegant group">
                        View Selected Work
                        <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
                    </a>
                    <a href="#contact" className="text-sm font-medium uppercase tracking-widest hover-underline">
                        Contact Me
                    </a>
                </motion.div>

                {/* Meta strip — spec-sheet data */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
                    className="grid w-full max-w-3xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4"
                >
                    {[
                        { label: "Location", value: "Pune, IN" },
                        { label: "Focus", value: "UI · Motion · Code" },
                        { label: "Stack", value: "Next.js · React · Node" },
                        { label: "Status", value: "Open to work" },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-3">
                            <span className="hairline" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                                {item.label}
                            </span>
                            <span className="flex items-center gap-2 text-sm font-medium md:text-base">
                                {item.label === "Status" && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                                )}
                                {item.value}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Register plate — right, parallax, desktop only */}
            <div className="absolute right-8 top-1/2 z-0 hidden -translate-y-1/2 lg:block xl:right-16">
                <motion.div
                    style={prefersReducedMotion ? undefined : { y: plateY }}
                    initial={{ opacity: 0 }}
                    animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
                >
                    <RegisterPlate />
                </motion.div>
            </div>
        </section>
    );
}