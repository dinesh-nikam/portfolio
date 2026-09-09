"use client";

import { motion } from "framer-motion";
import { MessageSquare, Quote } from "lucide-react";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    initials: string;
}

const testimonials: Testimonial[] = [
    {
        id: "01",
        name: "Sarah Jenkins",
        role: "Product Director",
        company: "FinTech Innovations",
        content: "Dinesh is an exceptional engineer who pairs deep architectural capability with a key eye for aesthetics. His work re-platforming our Next.js edge stack was delivered ahead of schedule and improved our page performance significantly.",
        initials: "SJ"
    },
    {
        id: "02",
        name: "Marcus Chen",
        role: "Senior Solutions Architect",
        company: "Vinsys Services",
        content: "Working alongside Dinesh was an absolute pleasure. His knowledge of AWS systems automation and Docker/Kubernetes container pipelines is exceptional. He brought reliability and complete DevOps automation into our deployments.",
        initials: "MC"
    },
    {
        id: "03",
        name: "Priya Sharma",
        role: "Creative Art Director",
        company: "WebStudio Agency",
        content: "Dinesh brought our visual mockups to life with absolute precision. His creative coding capabilities in WebGL and custom Framer Motion timelines are unmatched. He crafts interfaces that don't just work, they wow.",
        initials: "PS"
    },
    {
        id: "04",
        name: "Alexander Miller",
        role: "Lead Full-Stack Consultant",
        company: "IT-Systems Group",
        content: "A highly competent full-stack engineer who designs database schema structures and edge routers with complete fault tolerance. His system layout structures are extremely optimized and easy to maintain.",
        initials: "AM"
    }
];

export function TestimonialsSection() {
    // Duplicate testimonials array to enable seamless infinite scroller loop
    const doubledTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="w-full py-28 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col gap-4 mb-20 text-center max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-semibold">
                            Testimonials
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-none">
                        Peer Endorsements
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-light mt-2 max-w-md mx-auto">
                        Professional feedback and reviews from engineering leaders, product designers, and AWS architects.
                    </p>
                </div>
            </div>

            {/* Seamless Infinite Slider Track using Framer Motion animate */}
            <div className="relative w-full overflow-hidden py-4 flex mask-fade-edges">

                {/* Left & Right gradient edge fades */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background via-background/40 to-transparent pointer-events-none z-20" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background via-background/40 to-transparent pointer-events-none z-20" />

                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                        },
                    }}
                    className="flex gap-8 shrink-0 hover:[animation-play-state:paused]"
                    style={{ display: "flex" }}
                >
                    {doubledTestimonials.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="group relative flex flex-col justify-between w-[320px] sm:w-[420px] shrink-0 p-8 rounded-md bg-card border border-border hover:border-primary/40 hover:bg-muted/30 transition-all duration-500 select-none"
                        >
                            {/* Quote icon overlay */}
                            <Quote className="absolute right-8 top-8 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors pointer-events-none" />

                            <div className="flex flex-col gap-6 relative z-10">
                                {/* Initials avatar and peer details */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-md bg-muted/30 border border-border flex items-center justify-center font-bold text-primary text-sm group-hover:scale-105 transition-transform duration-300">
                                        {item.initials}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-foreground group-hover:text-primary transition-colors text-base">
                                            {item.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground font-mono">
                                            {item.role} @ <span className="text-primary">{item.company}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Content review */}
                                <p className="text-muted-foreground/90 text-sm sm:text-base leading-relaxed font-light">
                                    &quot;{item.content}&quot;
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="text-center mt-8">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">
                    Hover to pause speed
                </span>
            </div>
        </section>
    );
}