"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experiencesData } from "@/lib/data";
import { ExperienceCard } from "./ExperienceCard";

export function ExperienceTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={containerRef} className="w-full max-w-5xl mx-auto py-20 px-6 relative">

            <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/40 md:left-2 transform -translate-x-1/2 z-0 hidden md:block" />
                <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-transparent md:left-2 transform -translate-x-1/2 origin-top z-0 hidden md:block"
                    style={{ scaleY }}
                />

                <div className="flex flex-col gap-12 md:gap-24 pl-0 md:pl-16">
                    {experiencesData.map((exp, index) => (
                        <ExperienceCard
                            key={exp.id}
                            index={index}
                            role={exp.role}
                            company={exp.company}
                            period={exp.period}
                            description={exp.description}
                            tech={exp.tech || []}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}