"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Terminal } from "lucide-react";

interface SkillAxis {
    name: string;
    strength: number; // percentage (0 to 100)
    details: string;
    keywords: string[];
}

const skillAxes: SkillAxis[] = [
    {
        name: "Frontend Arch",
        strength: 90,
        details: "React 19 / Next.js edge platforms, caching structures, and pixel-perfect semantic DOM systems.",
        keywords: ["React", "Next.js", "TypeScript", "Tailwind"]
    },
    {
        name: "Creative WebGL",
        strength: 72,
        details: "Designing immersive web graphics using Three.js and custom GLSL vertex/fragment shaders.",
        keywords: ["WebGL", "Three.js", "GLSL", "GSAP"]
    },
    {
        name: "Cloud Architectures",
        strength: 82,
        details: "AWS Certified Practitioner building secure multi-region setups, serverless queues, and VPC routers.",
        keywords: ["AWS", "IAM", "VPC", "Serverless"]
    },
    {
        name: "Backend Engines",
        strength: 85,
        details: "Wrote high-throughput REST/GraphQL APIs, relational database indices, and Redis caches.",
        keywords: ["Node.js", "Express", "PostgreSQL", "Redis"]
    },
    {
        name: "DevOps Pipeline",
        strength: 78,
        details: "Automating containers using Docker/Kubernetes inside ECS infrastructure deployment actions.",
        keywords: ["Docker", "Kubernetes", "CI/CD", "Linux"]
    },
    {
        name: "UI / UX Design",
        strength: 85,
        details: "Creating premium editorial print design systems utilizing neutral scales and glassmorphisms.",
        keywords: ["Figma", "Design Systems", "Motion principles"]
    }
];

const center = 200;
const maxRadius = 130;
const numAxes = skillAxes.length;

// Calculate vertex coordinates based on radius and index
const getCoordinates = (axisIndex: number, level: number) => {
    // Subtract 90 degrees (Math.PI / 2) to point the first node straight UP
    const angle = (axisIndex * 2 * Math.PI) / numAxes - Math.PI / 2;
    const radius = maxRadius * level;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
};

export function StackRadar() {
    const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);

    // 1. Grid Polygons (outer layers 20%, 40%, 60%, 80%, 100%)
    const gridPolygons = useMemo(() => {
        const layers = [0.2, 0.4, 0.6, 0.8, 1.0];
        return layers.map((level) => {
            const points = Array.from({ length: numAxes })
                .map((_, i) => {
                    const { x, y } = getCoordinates(i, level);
                    return `${x},${y}`;
                })
                .join(" ");
            return points;
        });
    }, []);

    // 2. Continuous Skill Area Polygon Coordinates
    const skillPath = useMemo(() => {
        const points = skillAxes
            .map((axis, i) => {
                const { x, y } = getCoordinates(i, axis.strength / 100);
                return `${x},${y}`;
            })
            .join(" ");
        return points;
    }, []);

    // 3. Grid radial lines from center to outer points
    const radialLines = useMemo(() => {
        return Array.from({ length: numAxes }).map((_, i) => {
            const outer = getCoordinates(i, 1.0);
            return { x1: center, y1: center, x2: outer.x, y2: outer.y };
        });
    }, []);

    return (
        <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <div className="flex flex-col gap-4 mb-16 text-center max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-2">
                        <Compass className="w-4 h-4 text-primary" />
                        <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-semibold">
                            Skills Analysis
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-none">
                        Technical Stack Radar
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-light mt-2 max-w-md mx-auto">
                        An interactive polygonal profile illustrating my relative strengths and capabilities across core software layers.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Custom SVG Radar Chart */}
                    <div className="w-full flex items-center justify-center p-6 rounded-md bg-card border border-border">
                        <div className="relative w-full max-w-[400px] aspect-square">

                            <svg
                                viewBox="0 0 400 400"
                                className="w-full h-full text-foreground/10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* A. Hexagonal Grid Background Layers */}
                                {gridPolygons.map((points, idx) => (
                                    <polygon
                                        key={idx}
                                        points={points}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="0.5"
                                        className="text-foreground/10"
                                    />
                                ))}

                                {/* B. Radial axis lines */}
                                {radialLines.map((line, idx) => (
                                    <line
                                        key={idx}
                                        x1={line.x1}
                                        y1={line.y1}
                                        x2={line.x2}
                                        y2={line.y2}
                                        stroke="currentColor"
                                        strokeWidth="0.5"
                                        className="text-foreground/10"
                                    />
                                ))}

                                {/* C. Active Skill Polygonal Area - Animated on view */}
                                <motion.polygon
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                                    points={skillPath}
                                    strokeWidth="2.5"
                                    style={{ transformOrigin: "200px 200px" }}
                                    className="fill-primary/15 stroke-primary"
                                />

                                {/* D. Interaction Active/Hover axis segments */}
                                {radialLines.map((line, idx) => (
                                    <line
                                        key={`hover-${idx}`}
                                        x1={line.x1}
                                        y1={line.y1}
                                        x2={line.x2}
                                        y2={line.y2}
                                        strokeWidth="3"
                                        className={`transition-colors duration-300 pointer-events-none ${hoveredAxis === idx ? "stroke-primary" : "stroke-transparent"}`}
                                    />
                                ))}

                                {/* E. Node checkpoints over vertices */}
                                {skillAxes.map((axis, i) => {
                                    const { x, y } = getCoordinates(i, axis.strength / 100);
                                    const isHovered = hoveredAxis === i;
                                    return (
                                        <g key={`node-${i}`}>
                                            {/* Hover zone trigger circle */}
                                            <circle
                                                cx={x}
                                                cy={y}
                                                r="14"
                                                fill="transparent"
                                                className="cursor-pointer"
                                                onMouseEnter={() => setHoveredAxis(i)}
                                                onMouseLeave={() => setHoveredAxis(null)}
                                            />
                                            {/* Node core */}
                                            <circle
                                                cx={x}
                                                cy={y}
                                                r={isHovered ? "6" : "4"}
                                                className={`transition-all duration-300 pointer-events-none ${isHovered ? "fill-primary" : "fill-background"}`}
                                                stroke="currentColor"
                                                strokeWidth={isHovered ? "2.5" : "1.5"}
                                            />
                                        </g>
                                    );
                                })}

                                {/* F. Axis labels */}
                                {skillAxes.map((axis, i) => {
                                    // Calculate outer coordinates but offset outward slightly for text padding
                                    const { x, y } = getCoordinates(i, 1.2);

                                    // Text anchor alignment based on quadrant position
                                    let textAnchor: "start" | "middle" | "end" = "middle";
                                    if (x < center - 30) textAnchor = "end";
                                    if (x > center + 30) textAnchor = "start";

                                    // Move Y coordinates slightly based on position to avoid clipping
                                    let dy = "0.33em";
                                    if (y < center - 120) dy = "-0.1em";
                                    if (y > center + 120) dy = "0.8em";

                                    const isHovered = hoveredAxis === i;

                                    return (
                                        <text
                                            key={`label-${i}`}
                                            x={x}
                                            y={y}
                                            dy={dy}
                                            textAnchor={textAnchor}
                                            onMouseEnter={() => setHoveredAxis(i)}
                                            onMouseLeave={() => setHoveredAxis(null)}
                                            className={`font-mono text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer select-none ${
                                                isHovered ? "fill-primary" : "fill-muted-foreground"
                                            }`}
                                        >
                                            {axis.name}
                                        </text>
                                    );
                                })}
                            </svg>
                        </div>
                    </div>

                    {/* Right: Interactive Info Dashboard Panel */}
                    <div className="flex flex-col gap-6 p-8 rounded-md bg-card border border-border h-full justify-center">
                        <div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="font-mono text-[10px] tracking-widest text-primary uppercase font-semibold">
                                    Proficiency breakdown
                                </span>
                            </div>

                            {/* Standard title or dynamic active axes */}
                            <h3 className="text-2xl font-bold tracking-tight text-foreground mt-2">
                                {hoveredAxis !== null ? skillAxes[hoveredAxis].name : "Select an Area"}
                            </h3>
                        </div>

                        {/* Description block (Dynamic) */}
                        <div className="h-20">
                            <p className="text-muted-foreground text-sm leading-relaxed font-light">
                                {hoveredAxis !== null
                                    ? skillAxes[hoveredAxis].details
                                    : "Hover or select any node checkpoint/label on the radar grid to inspect detailed proficiencies, project experiences, and key technologies."}
                            </p>
                        </div>

                        {/* Keyword badges (Dynamic) */}
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono tracking-widest text-muted-foreground uppercase">
                                <Terminal className="w-3.5 h-3.5 text-primary/60" />
                                <span>Core Tech Stacks</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-1 h-12">
                                {hoveredAxis !== null ? (
                                    skillAxes[hoveredAxis].keywords.map((word, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 text-[10px] font-medium font-mono rounded-full bg-primary/10 border border-primary/20 text-primary"
                                        >
                                            {word}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-[11px] italic text-muted-foreground/50">
                                        Hover grid axis to load tech keywords...
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Strength Indicator (Dynamic) */}
                        {hoveredAxis !== null && (
                            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                                <div className="flex justify-between items-center text-xs font-mono">
                                    <span className="text-muted-foreground">Expertise Strength:</span>
                                    <span className="font-bold text-primary">{skillAxes[hoveredAxis].strength}%</span>
                                </div>
                                <div className="w-full h-1 bg-muted/40 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skillAxes[hoveredAxis].strength}%` }}
                                        transition={{ duration: 0.4 }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </section>
    );
}