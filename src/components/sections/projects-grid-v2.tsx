"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardData {
    id: string;
    title: string;
    category: string;
    image: string;
    year: string;
    link: string;
}

const projectsList: ProjectCardData[] = [
    {
        id: "01",
        title: "CYBERSHERLOCK",
        category: "/Architecture",
        image: "/cybersherlock.webp",
        year: "2024",
        link: "#",
    },
    {
        id: "02",
        title: "HP CONNECT VISITOR SYSTEM",
        category: "/FullStack",
        image: "/hpconnect.webp",
        year: "2024",
        link: "#",
    },
    {
        id: "03",
        title: "ITHPL ENTERPRISE PLATFORM",
        category: "/Engineering",
        image: "/ithplwebsite.webp",
        year: "2023",
        link: "#",
    },
    {
        id: "04",
        title: "DINESH NIKAM EDITORIAL SUITE",
        category: "/Design",
        image: "/my.webp",
        year: "2026",
        link: "#",
    },
];

export function ProjectsGridV2() {
    // Split into 2 columns for the Video 1 staggered masonry layout
    const col1 = [projectsList[0], projectsList[2]];
    const col2 = [projectsList[1], projectsList[3]];

    return (
        <section id="projects-v2" className="relative w-full border-t border-border bg-background py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                {/* Header */}
                <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <span className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            PORTFOLIO
                        </span>
                        <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            OUR PROJECTS<span className="text-primary">.</span>
                        </h2>
                    </div>

                    <p className="max-w-xs font-mono text-xs uppercase tracking-wider text-muted-foreground md:text-right">
                        {"//"} SELECTED COMMISSIONS · HIGH-IMPACT ARCHITECTURE
                    </p>
                </div>

                {/* Staggered 2-Column Grid (Video 1 Hallmark) */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
                    {/* Column 1 (Standard offset) */}
                    <div className="flex flex-col gap-14 sm:gap-20">
                        {col1.map((project, idx) => (
                            <motion.article
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: idx * 0.15 }}
                                className="group relative flex flex-col"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border bg-card shadow-lg transition-transform duration-500 hover:shadow-2xl">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 [filter:contrast(1.04)]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </div>

                                {/* Video 1 Bottom Card Tag Pill */}
                                <div className="mt-4 flex items-center justify-between font-mono text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-sm bg-primary" />
                                        <span className="font-bold uppercase tracking-wider text-foreground">
                                            {project.title}
                                        </span>
                                    </div>
                                    <span className="text-muted-foreground transition-colors group-hover:text-primary">
                                        {project.category}
                                    </span>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Column 2 (Vertically offset for masonry rhythm) */}
                    <div className="flex flex-col gap-14 sm:gap-20 md:pt-24 lg:pt-32">
                        {col2.map((project, idx) => (
                            <motion.article
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: idx * 0.15 + 0.1 }}
                                className="group relative flex flex-col"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border bg-card shadow-lg transition-transform duration-500 hover:shadow-2xl">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 [filter:contrast(1.04)]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </div>

                                {/* Video 1 Bottom Card Tag Pill */}
                                <div className="mt-4 flex items-center justify-between font-mono text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-sm bg-primary" />
                                        <span className="font-bold uppercase tracking-wider text-foreground">
                                            {project.title}
                                        </span>
                                    </div>
                                    <span className="text-muted-foreground transition-colors group-hover:text-primary">
                                        {project.category}
                                    </span>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>

                {/* Animated "ALL PROJECTS" Button (Video 1 signature) */}
                <div className="mt-16 flex justify-center md:justify-start">
                    <Link
                        href="/#work"
                        className="group inline-flex items-center gap-3 rounded-sm border border-border bg-card px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-foreground shadow-sm transition-all duration-300 hover:border-primary hover:bg-card"
                    >
                        <span>ALL PROJECTS</span>
                        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                            <ArrowUpRight className="h-4 w-4" />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
