"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyModal } from "./case-study-modal";
import { caseStudies, type CaseStudyData } from "@/lib/case-studies";

export function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<CaseStudyData | null>(null);

    return (
        <section
            id="work"
            className="relative w-full border-t border-border px-6 py-28 md:px-12 lg:px-20 xl:px-24"
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-20">
                {/* Section Index & Eyebrow */}
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            02 / SELECTED WORK
                        </span>
                        <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            Engineered for Precision.
                        </h2>
                    </div>
                    <p className="max-w-md font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        Selected case studies demonstrating full-stack engineering, creative technology, and editorial UX.
                    </p>
                </div>

                {/* Editorial Project Showcase: Alternating Horizontal Compositions */}
                <div className="flex flex-col gap-28">
                    {caseStudies.map((project, index) => {
                        const isEven = index % 2 === 1;

                        return (
                            <motion.article
                                key={project.id}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative flex flex-col border-b border-border pb-24"
                            >
                                <div
                                    className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
                                        isEven ? "lg:[&>*:first-child]:order-2" : ""
                                    }`}
                                >
                                    {/* Project Preview & Visual Identity (Col 1-7) */}
                                    <div
                                        onClick={() => setSelectedProject(project)}
                                        data-cursor-text="VIEW"
                                        className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-sm border border-border bg-card transition-transform duration-700 ease-out hover:scale-[1.015] lg:col-span-7"
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 [filter:contrast(1.04)]"
                                        />
                                        <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        {/* Corner Index Tag */}
                                        <span className="absolute top-4 left-4 rounded-sm border border-border/80 bg-background/90 px-3 py-1 font-mono text-xs font-semibold text-foreground backdrop-blur-sm">
                                            {project.num}
                                        </span>
                                    </div>

                                    {/* Editorial Content & Metadata (Col 8-12) */}
                                    <div className="flex flex-col gap-6 lg:col-span-5">
                                        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                            <span className="font-semibold text-primary">{project.num}</span>
                                            <span className="h-px w-6 bg-border" />
                                            <span>{project.year}</span>
                                        </div>

                                        <h3
                                            onClick={() => setSelectedProject(project)}
                                            data-cursor-text="VIEW"
                                            className="cursor-pointer font-display text-3xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-4xl"
                                        >
                                            {project.title}
                                        </h3>

                                        <p className="text-base leading-relaxed text-muted-foreground font-normal">
                                            {project.tagline}
                                        </p>

                                        {/* Metadata Breakdown */}
                                        <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                                    ROLE
                                                </span>
                                                <span className="font-mono text-xs font-medium text-foreground">
                                                    {project.role}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                                    DOMAIN
                                                </span>
                                                <span className="font-mono text-xs font-medium text-foreground">
                                                    {project.domain}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Tech Badges */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className="rounded-sm border border-border/80 bg-muted/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Case Study CTA */}
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            data-cursor-text="VIEW"
                                            className="group/btn mt-2 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:text-primary self-start"
                                        >
                                            <span className="border-b border-foreground pb-0.5 group-hover/btn:border-primary">
                                                EXPLORE CASE STUDY
                                            </span>
                                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>

            {/* Cinematic Modal Case Study Drawer */}
            <CaseStudyModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}