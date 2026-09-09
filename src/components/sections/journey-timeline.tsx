"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Award, Calendar, CheckCircle } from "lucide-react";

interface TimelineItem {
    id: string;
    type: "work" | "education" | "cert";
    period: string;
    title: string;
    location: string;
    description: string;
    details: string[];
    tech?: string[];
}

const timelineData: TimelineItem[] = [
    {
        id: "01",
        type: "work",
        period: "2024 - Present",
        title: "Software Engineer",
        location: "ITHPL",
        description: "Architecting high-performance web platforms handling millions of users. Migration lead for edge architectures.",
        details: [
            "Migrated core applications to modern Next.js edge platform, improving LCP by 35%.",
            "Designed and built high-performance responsive web features using React 19.",
            "Created immersive 3D and WebGL-based visualization frameworks with Three.js."
        ],
        tech: ["React", "Next.js", "Three.js", "Node.js", "Tailwind CSS"]
    },
    {
        id: "02",
        type: "cert",
        period: "2025",
        title: "AWS Solutions Architect",
        location: "Amazon Web Services",
        description: "Certified architect competent in designing fault-tolerant, secure, and scalable cloud systems.",
        details: [
            "Deep understanding of core AWS services (EC2, ECS, VPC, S3, RDS, Lambda).",
            "Expertise in migrating on-premise infrastructure into automated AWS serverless pipelines.",
            "Designed resilient multi-region architectures with 99.99% high availability."
        ],
        tech: ["AWS", "IAM", "Serverless", "CloudFormation"]
    },
    {
        id: "03",
        type: "education",
        period: "2024",
        title: "B.E. Information Technology",
        location: "SPPU (Savitribai Phule Pune University)",
        description: "Graduated with honors focusing on software systems engineering, data models, and scalable architectures.",
        details: [
            "Core focus: Advanced Database Management Systems, System Design, Cloud Computing.",
            "Capstone Project: Built an automated distributed deployment system utilizing containers."
        ]
    },
    {
        id: "04",
        type: "work",
        period: "2023 - 2024",
        title: "Cloud Application Developer",
        location: "Vinsys",
        description: "AWS cloud based application development, automation, and container orchestrations.",
        details: [
            "Constructed secure, compliant cloud environments under strict SLA benchmarks.",
            "Engineered Dockerized microservices and automated deployments on AWS ECS.",
            "Wrote robust automation scriptings to reduce build deployment failures by 40%."
        ],
        tech: ["AWS", "Python", "Docker", "Kubernetes", "Linux"]
    },
    {
        id: "05",
        type: "education",
        period: "2021",
        title: "Diploma in Information Technology",
        location: "GPA",
        description: "Foundational academic training in computational logic, network protocols, and data structures.",
        details: [
            "Acquired sound grounding in object-oriented programming, data structures, and computer networking."
        ]
    }
];

export function JourneyTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll tracker for progress bar
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

    const getIcon = (type: TimelineItem["type"]) => {
        switch (type) {
            case "work":
                return <Briefcase className="w-5 h-5 text-primary" />;
            case "education":
                return <GraduationCap className="w-5 h-5 text-primary" />;
            case "cert":
                return <Award className="w-5 h-5 text-primary" />;
        }
    };

    const getTypeColor = (type: TimelineItem["type"]) => {
        switch (type) {
            case "work":
            case "education":
            case "cert":
                return "text-primary bg-primary/10 border-primary/20";
        }
    };

    return (
        <section ref={containerRef} className="w-full py-28 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col gap-4 mb-20 md:mb-28 text-center max-w-2xl mx-auto">
                    <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-semibold">
                        03 / Roadmap
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-none">
                        Developer Journey
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
                        A chronological sequence of my professional milestones, engineering roles, cloud credentials, and academic path.
                    </p>
                </div>

                {/* Timeline track wrapper */}
                <div className="relative pl-8 md:pl-24 pr-2">

                    {/* Background Track Line */}
                    <div className="absolute left-[39px] md:left-[55px] top-4 bottom-4 w-[2px] bg-border/40" />

                    {/* Scroll Progress Line */}
                    <motion.div
                        style={{ scaleY }}
                        className="absolute left-[39px] md:left-[55px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-transparent origin-top"
                    />

                    {/* Timeline items list */}
                    <div className="flex flex-col gap-16">
                        {timelineData.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-120px" }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative flex flex-col gap-4"
                            >
                                {/* Bullet Icon on the vertical line */}
                                <div className={`absolute -left-[45px] md:-left-[69px] top-1 z-20 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-500 group-hover:bg-primary/20 ${getTypeColor(item.type)}`}>
                                    {getIcon(item.type)}
                                </div>

                                {/* Connection bridge (Desktop) */}
                                <div className="hidden md:block absolute -left-[37px] top-5 w-9 h-[1.5px] bg-border/50 group-hover:bg-primary/40 transition-colors duration-500" />

                                {/* Card Container */}
                                <div className="relative z-10 p-8 rounded-md bg-card border border-border hover:border-primary/40 hover:bg-muted/30 transition-all duration-500 transform-gpu group-hover:-translate-y-1">
                                    {/* Meta Top Line */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-xs font-semibold tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full uppercase border border-primary/20">
                                                {item.type}
                                            </span>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                                                <Calendar className="w-3.5 h-3.5 text-primary/60" />
                                                <span>{item.period}</span>
                                            </div>
                                        </div>

                                        <span className="text-xs text-muted-foreground font-mono bg-muted/30 border border-border px-3 py-1 rounded-full">
                                            {item.location}
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                                        {item.title}
                                    </h3>

                                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-2 font-light">
                                        {item.description}
                                    </p>

                                    {/* Key Accomplishments bullets */}
                                    <ul className="flex flex-col gap-2 mt-6 border-t border-border pt-6">
                                        {item.details.map((detail, dIdx) => (
                                            <li key={dIdx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                                                <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-0.5" />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Tech tags footer */}
                                    {item.tech && item.tech.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-6">
                                            {item.tech.map((t, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="px-2.5 py-1 text-[10px] font-semibold font-mono rounded-full bg-muted/30 border border-border/70 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}