"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

interface TestimonialItem {
    id: string;
    author: string;
    role: string;
    rating: number;
    quote: string;
    avatar: string;
}

const testimonials: TestimonialItem[] = [
    {
        id: "01",
        author: "John Doe",
        role: "Marketing Director",
        rating: 5,
        quote: "Dinesh created a clean and intuitive design that perfectly matched our brand identity. The entire process was smooth, professional, and delivered ahead of schedule.",
        avatar: "/my.webp",
    },
    {
        id: "02",
        author: "Sophia Taylor",
        role: "Director of Product",
        rating: 5,
        quote: "Working with Dinesh was an amazing experience. He transformed our complex database operations and design concepts into a polished, high-performance product.",
        avatar: "/my.webp",
    },
    {
        id: "03",
        author: "Daniel Smith",
        role: "Product Designer",
        rating: 5,
        quote: "The final design improved our user engagement and gave our platform a modern, premium feel. Dinesh's attention to typography and subtle motion is world-class.",
        avatar: "/my.webp",
    },
    {
        id: "04",
        author: "Olivia Harris",
        role: "Engineering Manager",
        rating: 5,
        quote: "Excellent communication, fast delivery, and outstanding attention to detail. Highly recommended for any high-scale Next.js and UI/UX project!",
        avatar: "/my.webp",
    },
];

export function TestimonialSliderV2() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="relative w-full border-t border-border bg-background py-20 lg:py-28 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                {/* Header (Video 1 Layout) */}
                <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <span className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            <span className="h-1.5 w-1.5 bg-primary" aria-hidden />
                            DESIGNS CLIENTS LOVE
                        </span>
                        <h2 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            WHAT MY CLIENTS SAY<span className="text-primary">.</span>
                        </h2>
                    </div>

                    <div className="flex flex-col md:items-end">
                        <p className="max-w-xs font-mono text-xs uppercase tracking-wider text-muted-foreground md:text-right">
                            CREATING THOUGHTFUL AND USER-FOCUSED ARCHITECTURE THAT HELPS BRANDS GROW.
                        </p>
                        {/* Navigation Arrows */}
                        <div className="mt-4 flex items-center gap-2">
                            <button
                                onClick={prev}
                                className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                onClick={next}
                                className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sliding Cards Carousel Track (Video 1 style) */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative flex flex-col justify-between rounded-sm border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                        >
                            <div>
                                {/* Rating Stars */}
                                <div className="flex items-center gap-1 text-primary mb-6">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-sm leading-relaxed text-foreground/90 font-medium italic">
                                    &ldquo;{item.quote}&rdquo;
                                </p>
                            </div>

                            {/* Author */}
                            <div className="mt-8 flex items-center gap-3 border-t border-border pt-4">
                                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/30">
                                    <Image src={item.avatar} alt={item.author} fill className="object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-display text-sm font-bold text-foreground">
                                        {item.author}
                                    </span>
                                    <span className="font-mono text-[11px] text-muted-foreground">
                                        {item.role}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
