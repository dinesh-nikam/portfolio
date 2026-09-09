"use client";

import { motion } from "framer-motion";
import { Brain, Cloud, Cpu, Sparkles, Database, Terminal } from "lucide-react";

interface ExplorationArea {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    topics: string[];
    status: "Learning" | "Building" | "Researching";
}

const explorations: ExplorationArea[] = [
    {
        id: "01",
        icon: <Brain className="w-5 h-5 text-primary" />,
        title: "LLM & AI Engineering",
        description: "Designing intelligent RAG architectures, prompt optimizations, and local agent systems.",
        topics: ["Vector Embeddings", "RAG Pipelines", "Ollama / DeepSeek", "Agentic Frameworks"],
        status: "Building"
    },
    {
        id: "02",
        icon: <Cloud className="w-5 h-5 text-primary" />,
        title: "Multi-Region DevOps",
        description: "Automating cloud networks with multi-region scaling protocols and IaC scripts.",
        topics: ["Terraform", "GitHub Actions", "Docker / K8s", "AWS Serverless"],
        status: "Researching"
    },
    {
        id: "03",
        icon: <Database className="w-5 h-5 text-primary" />,
        title: "Distributed System Design",
        description: "Exploring high-throughput cache layers, load routing, and database partitionings.",
        topics: ["Redis Sentinel", "RabbitMQ Queues", "DB Sharding", "Eventual Consistency"],
        status: "Learning"
    },
    {
        id: "04",
        icon: <Cpu className="w-5 h-5 text-primary" />,
        title: "Creative Tech & WebGL",
        description: "Pushing limits of visual creative coding using custom GLSL shaders and physics vectors.",
        topics: ["GLSL Shaders", "R3F / Drei", "GSAP Timelines", "Generative Physics"],
        status: "Building"
    }
];

export function CurrentlyExploring() {
    const getStatusStyle = (status: ExplorationArea["status"]) => {
        switch (status) {
            case "Building":
            case "Researching":
            case "Learning":
                return "text-primary bg-primary/10 border-primary/20";
        }
    };

    return (
        <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col gap-4 mb-16 max-w-3xl">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-semibold">
                            Currently Exploring
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-none">
                        Active Fields of Research
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-light mt-2 max-w-xl">
                        A dynamic overview of emerging technologies and system architectures I am actively building, testing, or researching right now.
                    </p>
                </div>

                {/* Explorer Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {explorations.map((area, index) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6 }}
                            className="group relative flex flex-col justify-between p-6 rounded-md bg-card border border-border hover:border-primary/40 hover:bg-muted/30 transition-all duration-300"
                        >
                            <div>
                                {/* Category Header: Icon & Active State pill */}
                                <div className="flex items-center justify-between w-full mb-6">
                                    <div className="p-3 bg-muted/30 border border-border rounded-md">
                                        {area.icon}
                                    </div>
                                    <span className={`font-mono text-[9px] tracking-wider font-bold uppercase px-3 py-1 rounded-full border ${getStatusStyle(area.status)}`}>
                                        {area.status}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug">
                                    {area.title}
                                </h3>

                                {/* Description */}
                                <p className="text-muted-foreground text-xs leading-relaxed mt-2.5 font-light">
                                    {area.description}
                                </p>
                            </div>

                            {/* Subchips Footer */}
                            <div className="mt-8 flex flex-col gap-2">
                                <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono tracking-widest text-muted-foreground uppercase">
                                    <Terminal className="w-3 h-3 text-primary/60" />
                                    <span>Keywords</span>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    {area.topics.map((t, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 text-[9px] font-medium font-mono rounded-md bg-muted/30 border border-border/70 text-muted-foreground group-hover:text-foreground group-hover:border-primary/40 transition-colors"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}