"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { projectsData as projects } from "@/lib/data";

export function ProjectsSection() {
    return (
        <section id="work" className="w-full py-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto flex flex-col gap-24">

                {/* Minimal Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-8">
                    <h2 className="text-display">Selected<br />Work</h2>
                    <p className="text-body max-w-sm">
                        A collection of digital products and technical solutions engineered for scale.
                    </p>
                </div>

                {/* Projects List */}
                <div className="flex flex-col gap-32">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            className="group flex flex-col gap-8"
                        >
                            {/* Massive Image Card */}
                            <a
                                href={project.link}
                                className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-secondary rounded-sm cursor-hover"
                                data-cursor-text="View"
                            >
                                <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.86,0,0.07,1)] group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 80vw"
                                />
                            </a>

                            {/* Minimal Typographic Info */}
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4 text-sm font-mono tracking-widest text-muted-foreground">
                                        <span>{project.id}</span>
                                        <span className="w-8 h-[1px] bg-border" />
                                        <span className="uppercase">{project.role}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-medium tracking-tight">
                                        {project.title}
                                    </h3>
                                </div>

                                <div className="flex flex-col gap-6 md:w-1/3">
                                    <p className="text-body text-base">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
