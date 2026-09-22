"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, CheckCircle2, Code2, Layers, Cpu } from "lucide-react";
import Image from "next/image";

export interface CaseStudyData {
    id: string;
    num: string;
    title: string;
    tagline: string;
    role: string;
    year: string;
    client: string;
    image: string;
    tech: string[];
    liveUrl?: string;
    overview: string;
    problem: string;
    approach: string;
    design: {
        description: string;
        highlights: string[];
    };
    engineering: {
        architecture: string;
        codeSnippet?: string;
        decisions: string[];
    };
    result: {
        metric: string;
        summary: string;
    };
}

interface CaseStudyModalProps {
    project: CaseStudyData | null;
    onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
    useEffect(() => {
        if (!project) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [project, onClose]);

    return (
        <AnimatePresence>
            {project && (
                <div className="fixed inset-0 z-[400] flex justify-end">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Cinematic Drawer Panel */}
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 flex h-full w-full max-w-4xl flex-col overflow-y-auto border-l border-border bg-background shadow-2xl"
                    >
                        {/* Drawer Header */}
                        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/90 px-8 py-5 backdrop-blur-md">
                            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                <span className="font-semibold text-primary">{project.num}</span>
                                <span className="h-px w-4 bg-border" />
                                <span>CASE STUDY</span>
                            </div>

                            <button
                                onClick={onClose}
                                className="group flex h-9 w-9 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                                aria-label="Close case study"
                            >
                                <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                            </button>
                        </div>

                        {/* Drawer Body */}
                        <div className="flex flex-col gap-12 px-8 py-10 md:px-14">
                            {/* Headline & Meta */}
                            <div className="flex flex-col gap-4">
                                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                                    {project.role} · {project.year}
                                </span>
                                <h2 className="font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
                                    {project.title}
                                </h2>
                                <p className="text-lg text-muted-foreground">{project.tagline}</p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-sm border border-border bg-muted/30 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Large Visual Preview */}
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-border bg-muted/40">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* 01 / OVERVIEW */}
                            <section className="flex flex-col gap-3 border-t border-border pt-8">
                                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                                    01 / OVERVIEW
                                </span>
                                <p className="text-base leading-relaxed text-foreground/90">{project.overview}</p>
                            </section>

                            {/* 02 / PROBLEM */}
                            <section className="flex flex-col gap-3 border-t border-border pt-8">
                                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                                    02 / PROBLEM
                                </span>
                                <p className="text-base leading-relaxed text-foreground/90">{project.problem}</p>
                            </section>

                            {/* 03 / APPROACH */}
                            <section className="flex flex-col gap-3 border-t border-border pt-8">
                                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                                    03 / APPROACH
                                </span>
                                <p className="text-base leading-relaxed text-foreground/90">{project.approach}</p>
                            </section>

                            {/* 04 / DESIGN */}
                            <section className="flex flex-col gap-4 border-t border-border pt-8">
                                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                                    04 / DESIGN
                                </span>
                                <p className="text-base leading-relaxed text-foreground/90">
                                    {project.design.description}
                                </p>
                                <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {project.design.highlights.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* 05 / ENGINEERING */}
                            <section className="flex flex-col gap-4 border-t border-border pt-8">
                                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                                    05 / ENGINEERING
                                </span>
                                <p className="text-base leading-relaxed text-foreground/90">
                                    {project.engineering.architecture}
                                </p>

                                {project.engineering.codeSnippet && (
                                    <div className="rounded-sm border border-border bg-card p-4 font-mono text-xs text-foreground overflow-x-auto">
                                        <pre>{project.engineering.codeSnippet}</pre>
                                    </div>
                                )}

                                <div className="mt-2 flex flex-col gap-2">
                                    {project.engineering.decisions.map((decision, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3 rounded-sm border border-border/70 bg-card/60 p-3 text-sm"
                                        >
                                            <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                            <span className="text-muted-foreground">{decision}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 06 / RESULT */}
                            <section className="flex flex-col gap-4 border-t border-border pt-8 pb-12">
                                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                                    06 / RESULT
                                </span>
                                <div className="flex flex-col gap-4 rounded-sm border border-primary/30 bg-primary/5 p-6 md:flex-row md:items-center md:justify-between">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-display text-3xl font-semibold text-primary md:text-4xl">
                                            {project.result.metric}
                                        </span>
                                        <p className="text-sm text-foreground/80">{project.result.summary}</p>
                                    </div>
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-primary bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                                        >
                                            EXPLORE LIVE
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </a>
                                    )}
                                </div>
                            </section>
                        </div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    );
}
