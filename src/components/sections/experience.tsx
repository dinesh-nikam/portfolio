"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ExperienceItem {
    year: string;
    role: string;
    company: string;
    location: string;
    summary: string;
    highlights: string[];
    tech: string[];
}

const experienceList: ExperienceItem[] = [
    {
        year: "2026",
        role: "Senior Full Stack & Creative Engineer",
        company: "Independent / Selected Clients",
        location: "Pune, India · Global Remote",
        summary:
            "Designing and engineering bespoke digital experiences, high-performance web products, and interactive WebGL installations for discerning technology clients.",
        highlights: [
            "Delivered award-caliber digital products with sub-second page loads and zero hydration overhead.",
            "Architected custom 3D web experiences using React Three Fiber, GLSL shaders, and GSAP.",
            "Engineered edge-first distributed full-stack applications with Next.js and serverless cloud databases.",
        ],
        tech: ["Next.js 16", "React 19", "Three.js", "WebGL", "TypeScript", "Tailwind CSS", "AWS"],
    },
    {
        year: "2025",
        role: "Software Engineer",
        company: "ITHPL",
        location: "Pune, India",
        summary:
            "Led frontend engineering and high-throughput web modernization for enterprise operational platforms handling mission-critical workflows.",
        highlights: [
            "Architected edge-rendered Next.js portals replacing legacy monolithic corporate frameworks.",
            "Reduced client-side bundle weight by 42% while improving core web vitals across all routes.",
            "Implemented strict design-system token pipelines unifying design and engineering deliverables.",
        ],
        tech: ["Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    },
    {
        year: "2024",
        role: "Cloud Application Developer",
        company: "Vinsys",
        location: "Pune, India",
        summary:
            "Engineered cloud-native services, containerized deployment pipelines, and microservice infrastructure on AWS.",
        highlights: [
            "Built containerized Python and Node.js microservices deployed via Docker and Kubernetes.",
            "Automated multi-region CI/CD pipelines ensuring seamless rolling deployments with zero downtime.",
            "Implemented cloud monitoring, alerting metrics, and fault-tolerant auto-scaling policies.",
        ],
        tech: ["AWS Cloud", "Docker", "Kubernetes", "Python", "Node.js", "PostgreSQL"],
    },
];

export function ExperienceSection() {
    const [hoveredYear, setHoveredYear] = useState<string | null>(null);

    return (
        <section
            id="experience"
            className="relative w-full border-t border-border px-6 py-28 md:px-12 lg:px-20 xl:px-24"
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-20">
                {/* Section Index Header */}
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            03 / EXPERIENCE
                        </span>
                        <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            Career & Trajectory.
                        </h2>
                    </div>
                    <p className="max-w-md font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        An editorial record of leadership, engineering architecture, and digital craftsmanship.
                    </p>
                </div>

                {/* Editorial Vertical List */}
                <div className="flex flex-col divide-y divide-border border-b border-border">
                    {experienceList.map((item, index) => {
                        const isHovered = hoveredYear === item.year;

                        return (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                onMouseEnter={() => setHoveredYear(item.year)}
                                onMouseLeave={() => setHoveredYear(null)}
                                className="group py-12 transition-colors duration-300 hover:bg-card/30"
                            >
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
                                    {/* Large Year Display (Col 1-3) */}
                                    <div className="lg:col-span-3">
                                        <span className="font-display text-5xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-6xl md:text-7xl">
                                            {item.year}
                                        </span>
                                        <div className="mt-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                            <span>{item.location}</span>
                                        </div>
                                    </div>

                                    {/* Role & Company (Col 4-7) */}
                                    <div className="flex flex-col gap-2 lg:col-span-4">
                                        <h3 className="font-mono text-lg font-semibold uppercase tracking-wider text-foreground sm:text-xl">
                                            {item.role}
                                        </h3>
                                        <p className="font-mono text-sm uppercase tracking-widest text-primary font-medium">
                                            {item.company}
                                        </p>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {item.summary}
                                        </p>
                                    </div>

                                    {/* Expandable / Revealed Details & Tech (Col 8-12) */}
                                    <div className="flex flex-col gap-4 lg:col-span-5">
                                        <ul className="flex flex-col gap-2">
                                            {item.highlights.map((h, i) => (
                                                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {item.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className="rounded-sm border border-border/80 bg-muted/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}