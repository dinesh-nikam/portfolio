"use client";

import { motion, useReducedMotion } from "framer-motion";

interface DevTickerProps {
    className?: string;
    variant?: "default" | "highlight";
}

const tickerItems = [
    "FULL STACK ARCHITECTURE",
    "NEXT.JS 16 EDGE",
    "99+ LIGHTHOUSE SCORE",
    "HIGH-THROUGHPUT BACKENDS",
    "94% TEST COVERAGE",
    "BESPOKE UI/UX MOTION",
    "DISTRIBUTED SYSTEMS",
    "REACT 19 & TYPESCRIPT",
    "ZERO DOWNTIME DEPLOYS",
    "WEBGL & CREATIVE TECH",
];

export function DevTicker({ className = "", variant = "default" }: DevTickerProps) {
    const isHighlight = variant === "highlight";
    const prefersReducedMotion = useReducedMotion();

    // Reduced motion: static single pass of items, no infinite scroll.
    if (prefersReducedMotion) {
        return (
            <div
                className={`w-full overflow-hidden border-y py-2.5 select-none ${
                    isHighlight
                        ? "border-primary/30 bg-primary text-primary-foreground font-semibold"
                        : "border-border/70 bg-card/60 text-foreground/90"
                } ${className}`}
            >
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 font-mono text-[11px] uppercase tracking-[0.25em]">
                    {tickerItems.map((item) => (
                        <span key={item} className="flex items-center gap-4">
                            <span className="text-primary font-bold">✦</span>
                            <span className="whitespace-nowrap">{item}</span>
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div
            className={`w-full overflow-hidden border-y py-2.5 select-none transition-colors duration-300 ${
                isHighlight
                    ? "border-primary/30 bg-primary text-primary-foreground font-semibold"
                    : "border-border/70 bg-card/60 backdrop-blur-sm text-foreground/90"
            } ${className}`}
        >
            <div className="flex w-max">
                <motion.div
                    className="flex shrink-0 items-center gap-6 pr-6 font-mono text-[11px] uppercase tracking-[0.25em]"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 28,
                    }}
                >
                    {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
                        <span key={idx} className="flex items-center gap-4">
                            <span className={isHighlight ? "opacity-90" : "text-primary font-bold"}>✦</span>
                            <span className="whitespace-nowrap">{item}</span>
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
