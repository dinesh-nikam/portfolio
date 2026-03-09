"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { experiencesData as experiences } from "@/lib/data";

export function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <section id="experience" ref={containerRef} className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 mx-auto max-w-7xl relative overflow-hidden">

            {/* Section Header */}
            <div className="flex flex-col gap-6 mb-24 relative z-10 max-w-3xl">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-display text-5xl md:text-7xl lg:text-[6rem] tracking-tighter leading-none"
                >
                    Experience
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-muted-foreground text-xl md:text-2xl leading-relaxed font-light"
                >
                    A visual journey of my professional evolution, architecting scalable systems and crafting award-winning digital products.
                </motion.p>
            </div>

            {/* Experiences Stack container with progress indicator */}
            <div className="relative">
                <CareerProgressIndicator scrollYProgress={scrollYProgress} />
                <div className="flex flex-col gap-16 md:gap-32 relative z-10">
                    {experiences.map((experience, index) => (
                        <ExperienceCard key={experience.id} experience={experience} index={index} />
                    ))}
                </div>
            </div>

        </section>
    );
}

function CareerProgressIndicator({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const scaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <motion.div
            style={{ opacity }}
            className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] hidden md:block z-0"
        >
            <div className="w-full h-full bg-border/30 absolute" />
            <motion.div
                className="w-full bg-gradient-to-b from-primary/50 via-foreground/50 to-transparent origin-top shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                style={{ scaleY, height: "100%" }}
            />
        </motion.div>
    );
}

function ExperienceCard({ experience, index }: { experience: typeof experiences[0], index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative md:ml-24"
        >
            {/* Connection line to main progress bar (desktop only) */}
            <div className="hidden md:block absolute -left-16 top-12 w-16 h-[1px] bg-border/30 group-hover:bg-foreground/50 transition-colors duration-500 z-0 origin-left scale-x-0 group-hover:scale-x-100" />

            {/* Glassmorphic Card */}
            <div className="relative z-10 p-8 md:p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md overflow-hidden transition-all duration-700 hover:bg-white/[0.04] hover:border-white/10 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.05)] hover:-translate-y-2">

                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-foreground/5 via-transparent to-transparent pointer-events-none" />

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* Left Column: Metadata */}
                    <div className="flex flex-col gap-2 lg:w-1/3 shrink-0">
                        <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
                            {experience.period}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground/80 mt-2">
                            {experience.company}
                        </h3>
                    </div>

                    {/* Right Column: Details */}
                    <div className="flex flex-col gap-6 lg:w-2/3">
                        <h4 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
                            {experience.role}
                        </h4>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                            {experience.description}
                        </p>

                        {/* Tech Stack Badges */}
                        {experience.tech && experience.tech.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-4">
                                {experience.tech.map((techItem, techIndex) => (
                                    <span
                                        key={techIndex}
                                        className="px-4 py-2 text-sm font-medium rounded-full bg-white/[0.03] border border-white/10 text-muted-foreground transition-colors duration-300 group-hover:text-foreground group-hover:border-white/20"
                                    >
                                        {techItem}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
