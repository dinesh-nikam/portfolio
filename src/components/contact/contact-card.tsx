"use client";

import { motion } from "framer-motion";
import { Mail, Briefcase, Github, Twitter, Linkedin, LucideIcon } from "lucide-react";

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
            className="group relative flex flex-col p-6 rounded-2xl bg-foreground/[0.03] border border-foreground/10 hover:bg-foreground/[0.08] transition-all duration-500"
        >
            {/* Hover Gradient Background (Inside card) */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden pointer-events-none"></div>

            {/* Removed outside glow effect */}

            <div className="relative z-10 flex items-start justify-between">
                <div className="p-3 bg-foreground/10 rounded-xl group-hover:bg-foreground/20 transition-colors duration-300">
                    {icon}
                </div>
                <div className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center group-hover:border-foreground/30 group-hover:bg-foreground/10 transition-all duration-300">
                    <svg className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>

            <div className="relative z-10 mt-6">
                <h3 className="text-xl font-semibold text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                    {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                    {description}
                </p>
            </div>
        </motion.a>
    );
}
