"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ReelItem {
    id: string;
    title: string;
    tag: string;
    image: string;
    aspectRatio?: string;
}

const reelImages: ReelItem[] = [
    {
        id: "01",
        title: "EDITORIAL DESIGN & MOTION",
        tag: "/Design",
        image: "/cybersherlock.webp",
    },
    {
        id: "02",
        title: "FULL STACK ARCHITECTURE",
        tag: "/Systems",
        image: "/my.webp",
    },
    {
        id: "03",
        title: "ENTERPRISE VISITOR PLATFORMS",
        tag: "/Engineering",
        image: "/hpconnect.webp",
    },
    {
        id: "04",
        title: "HIGH-CONVERTING WEB EXPERIENCES",
        tag: "/Performance",
        image: "/ithplwebsite.webp",
    },
];

export function AboutGalleryReel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden border-y border-border bg-background py-14"
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 mb-8 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                    VISUAL ARCHIVE
                </span>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    ©2026 (Scroll to Explore)
                </span>
            </div>

            {/* Horizontal sliding track */}
            <div className="flex w-full overflow-x-auto no-scrollbar pb-4 cursor-grab active:cursor-grabbing">
                <motion.div
                    style={{ x: xTransform }}
                    className="flex shrink-0 gap-6 px-6 sm:px-8 md:px-12"
                >
                    {reelImages.map((item, idx) => (
                        <div
                            key={item.id}
                            className="group relative h-72 w-56 sm:h-80 sm:w-64 md:h-96 md:w-72 shrink-0 overflow-hidden rounded-sm border border-border bg-card shadow-lg transition-transform duration-500 hover:-translate-y-1.5"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 250px, 320px"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 [filter:contrast(1.05)]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            {/* Tag Badge (Video 1 style) */}
                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-sm border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-white">
                                    {item.title}
                                </span>
                                <span className="font-mono text-[10px] text-primary font-bold">
                                    {item.tag}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
