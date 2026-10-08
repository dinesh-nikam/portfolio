"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ServiceRowProps {
    num: string;
    title: string;
    description: string;
    tags?: string[];
    delay?: number;
}

const defaultTagsMap: Record<string, string[]> = {
    "01": ["Edge SSR", "Next.js 16", "TypeScript", "Core Web Vitals", "Lighthouse 99"],
    "02": ["Design Tokens", "Accessible UI", "Framer Motion", "Micro-Interactions"],
    "03": ["React Three Fiber", "Custom GLSL", "3D Canvas", "GPU Optimization"],
    "04": ["Physics Animations", "GSAP ScrollTrigger", "Tactile Feedback", "Creative Tech"],
};

export function ServiceRow({ num, title, description, tags, delay = 0 }: ServiceRowProps) {
    const [isHovered, setIsHovered] = useState(false);
    const serviceTags = tags || defaultTagsMap[num] || ["Production Ready", "High Performance"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative flex flex-col border-b border-border py-8 transition-all duration-300 md:py-10"
        >
            {/* Subtle background glow on hover */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/[0.03]" />

            <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Left: Number & Title */}
                <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-xl font-bold transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                        {num}
                    </span>

                    <div className="flex flex-col">
                        <h3 className="font-display text-3xl font-bold tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl lg:text-5xl">
                            {title}
                        </h3>
                    </div>
                </div>

                {/* Right: Description & Action */}
                <div className="flex flex-col gap-4 lg:max-w-md lg:items-end">
                    <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90 lg:text-right">
                        {description}
                    </p>

                    {/* Tags (Video 1 style) */}
                    <div className="flex flex-wrap gap-2 lg:justify-end">
                        {serviceTags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-border/80 bg-background/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors duration-200 group-hover:border-foreground/30 group-hover:text-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Orange Action CTA Button (Video 1 style) */}
                    <div className="pt-2">
                        <Link
                            href="/contactme"
                            className="inline-flex items-center gap-2 rounded-sm border border-primary bg-primary px-4 py-2 font-mono text-xs uppercase tracking-wider text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-md"
                        >
                            <span>DISCUSS SERVICE</span>
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom active line */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ originX: 0, width: "100%" }}
            />
        </motion.div>
    );
}