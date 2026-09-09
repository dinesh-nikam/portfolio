"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ContactCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    href: string;
    delay?: number;
}

export function ContactCard({ title, description, icon, href, delay = 0 }: ContactCardProps) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
            className="group relative flex flex-col p-6 rounded-md bg-card border border-border hover:border-primary/40 hover:bg-muted/30 transition-all duration-500"
        >
            {/* Hover Gradient Background (Inside card) */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md overflow-hidden pointer-events-none"></div>

            <div className="relative z-10 flex items-start justify-between">
                <div className="p-3 bg-muted/40 rounded-md group-hover:bg-primary/10 transition-colors duration-300">
                    {icon}
                </div>
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
                    <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>

            <div className="relative z-10 mt-6">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground transition-colors duration-300">
                    {description}
                </p>
            </div>
        </motion.a>
    );
}