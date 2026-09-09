"use client";

import { motion } from "framer-motion";

interface ExperienceCardProps {
    role: string;
    company: string;
    period: string;
    description: string;
    tech: string[];
    index: number;
}

export function ExperienceCard({ role, company, period, description, tech, index }: ExperienceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative w-full"
        >
            {/* Connection Line & Node */}
            <div className="absolute left-[-2rem] md:left-[-3rem] top-8 w-8 md:w-12 h-[2px] bg-gradient-to-r from-primary/0 to-primary/50 hidden md:block" />
            <div className="absolute left-[-2.25rem] md:left-[-3.25rem] top-[1.8rem] w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10 hidden md:block transition-transform duration-300 group-hover:scale-150" />

            <div className="relative overflow-hidden rounded-md border border-border bg-card p-6 md:p-8 transition-all duration-500 hover:border-primary/40">
                <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1 transition-colors duration-300">
                            {role}
                        </h3>
                        <p className="text-xl text-muted-foreground font-medium flex items-center gap-2">
                            {company}
                        </p>
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted/30 border border-border/70 text-sm font-mono text-primary whitespace-nowrap h-fit">
                        {period}
                    </div>
                </div>

                <p className="relative z-10 text-muted-foreground leading-relaxed text-lg mb-8 max-w-3xl">
                    {description}
                </p>

                <div className="relative z-10 flex flex-wrap gap-2">
                    {tech.map((item, i) => (
                        <span
                            key={i}
                            className="px-3 py-1.5 text-xs font-mono rounded-md bg-muted/30 border border-border/70 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors duration-300"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}