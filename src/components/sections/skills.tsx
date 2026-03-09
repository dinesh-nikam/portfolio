"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const techCategories = [
    {
        title: "Frontend",
        description: "Building responsive, accessible, and performant user interfaces with modern tooling.",
        gradient: "from-zinc-500/5 to-zinc-500/10",
        borderColor: "border-white/5 hover:border-blue-500/30",
        glowColor: "",
        icon: (
            <svg className="w-8 h-8 text-foreground/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
        ),
        skills: [
            { name: "React", level: "Expert" },
            { name: "Next.js", level: "Expert" },
            { name: "TypeScript", level: "Expert" },
            { name: "Tailwind CSS", level: "Expert" },
            { name: "Three.js", level: "Advanced" },
            { name: "Framer Motion", level: "Advanced" },
        ],
    },
    {
        title: "Backend",
        description: "Architecting secure, scalable APIs and managing complex database structures.",
        gradient: "from-zinc-500/5 to-zinc-500/10",
        borderColor: "border-white/5 hover:border-blue-500/30",
        glowColor: "",
        icon: (
            <svg className="w-8 h-8 text-foreground/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
            </svg>
        ),
        skills: [
            { name: "Node.js", level: "Expert" },
            { name: "Python", level: "Advanced" },
            { name: "PostgreSQL", level: "Expert" },
            { name: "Redis", level: "Advanced" },
            { name: "GraphQL", level: "Advanced" },
            { name: "REST APIs", level: "Expert" },
        ],
    },
    {
        title: "DevOps",
        description: "Streamlining deployments, monitoring infrastructure, and ensuring high availability.",
        gradient: "from-zinc-500/5 to-zinc-500/10",
        borderColor: "border-white/5 hover:border-blue-500/30",
        glowColor: "",
        icon: (
            <svg className="w-8 h-8 text-foreground/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
            </svg>
        ),
        skills: [
            { name: "Docker", level: "Expert" },
            { name: "AWS", level: "Advanced" },
            { name: "CI/CD", level: "Expert" },
            { name: "Linux", level: "Advanced" },
            { name: "Kubernetes", level: "Intermediate" },
            { name: "Nginx", level: "Advanced" },
        ],
    },
];

function TechCard({ category, index }: { category: typeof techCategories[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            className={`group relative rounded-xl border border-white/5 bg-[#171A21] backdrop-blur-sm p-8 transition-all duration-500 hover:shadow-2xl hover:border-blue-500/30 ${category.glowColor}`}
        >
            {/* Icon */}
            <div className="mb-6 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    {category.icon}
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{category.title}</h3>
            </div>

            <p className="text-foreground/50 font-light leading-relaxed mb-8 text-sm">
                {category.description}
            </p>

            {/* Skills list */}
            <div className="flex flex-col gap-3">
                {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <span className="text-sm font-medium text-foreground/80">{skill.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-mono ${skill.level === "Expert"
                                ? "bg-blue-500/15 text-blue-400"
                                : skill.level === "Advanced"
                                    ? "bg-blue-500/10 text-blue-300"
                                    : "bg-zinc-500/15 text-zinc-400"
                            }`}>
                            {skill.level}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div >
    );
}

export function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(".stack-heading", {
                opacity: 0,
                x: -40,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="stack"
            ref={sectionRef}
            className="relative w-full py-32 px-6 md:px-12 overflow-hidden bg-background noise-overlay"
        >
            <div className="section-divider w-full absolute top-0 left-0" />

            {/* Removed intense background glow */}

            <div className="container mx-auto relative z-10">
                <div className="mb-16">
                    <span className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block stack-heading">02 / Stack</span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter stack-heading">
                        Tech Stack.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {techCategories.map((category, index) => (
                        <TechCard key={category.title} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
