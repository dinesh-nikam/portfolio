"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { projectsData as projects } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const layout = [
        "md:col-span-2 md:row-span-1 md:h-[500px]",
        "md:col-span-1 md:row-span-1 md:h-[500px]",
        "md:col-span-3 md:h-[420px]",
    ][index] ?? "md:col-span-1 md:h-[420px]";

    const horizontal = index === 0 || index === 2;

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative flex flex-col justify-between rounded-md border border-border/70 bg-card p-6 transition-colors duration-300 hover:border-primary/40 md:p-8 ${layout}`}
        >
            <div className={`flex h-full w-full flex-col ${horizontal ? "lg:flex-row gap-8" : "gap-6"}`}>
                <div className={`z-10 flex h-full flex-col justify-between ${horizontal ? "lg:w-2/5 shrink-0" : ""}`}>
                    <div>
                        <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                            <span className="font-semibold text-primary">{project.id}</span>
                            <span className="h-px w-6 bg-border" />
                            <span className="truncate">{project.role}</span>
                        </div>

                        <h3 className="text-2xl font-medium leading-none tracking-tight text-foreground lg:text-3xl">
                            {project.title}
                        </h3>

                        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground lg:text-base">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-5">
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, i) => (
                                <span
                                    key={i}
                                    className="rounded-sm border border-border/70 bg-muted/30 px-3 py-1.5 font-mono text-[11px] font-medium text-muted-foreground transition-colors duration-300 hover:border-primary/40 hover:text-foreground"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        <a
                            href={project.link}
                            target={project.link.startsWith("http") ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="group/link mt-2 inline-flex items-center gap-2 self-start font-mono text-xs font-semibold uppercase tracking-wider text-primary"
                        >
                            <span>Explore Case Study</span>
                            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/30 transition-colors duration-300 group-hover/link:bg-primary group-hover/link:text-white">
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                        </a>
                    </div>
                </div>

                <div
                    className={`relative flex h-[220px] w-full items-center justify-center overflow-hidden rounded-md border border-border bg-muted/40 lg:h-full ${
                        horizontal ? "lg:w-3/5" : "grow"
                    }`}
                >
                    <div className="pointer-events-none absolute inset-0 text-foreground/[0.05]">
                        <svg className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id={`grid-${project.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
                        </svg>
                    </div>
                    <div className="relative h-[92%] w-[92%] overflow-hidden rounded-sm transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 600px"
                        />
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export function ProjectsSection() {
    return (
        <section id="work" className="relative w-full overflow-hidden bg-background px-6 py-32 md:px-12 lg:px-24">
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-20">
                <div className="flex flex-col justify-between gap-8 border-b border-border pb-12 md:flex-row md:items-end">
                    <div className="flex flex-col gap-3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
                        >
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            Selected Projects
                        </motion.div>

                        <h2 className="text-display mt-2">
                            Digital
                            <br />
                            Products
                        </h2>
                    </div>

                    <p className="text-body mt-4 max-w-sm text-base leading-relaxed text-muted-foreground/85 md:mt-0 md:text-lg">
                        A curation of digital products, data-visualizations, and full-stack solutions engineered for
                        extreme efficiency and pixel-perfect clarity.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {projects.map((project, idx) => (
                        <ProjectCard key={project.id} project={project} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}