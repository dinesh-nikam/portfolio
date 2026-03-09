"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ServiceRowProps {
    num: string;
    title: string;
    description: string;
    delay?: number;
}

export function ServiceRow({ num, title, description, delay = 0 }: ServiceRowProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay }}
            className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between py-8 sm:py-10 border-b border-white/10 hover:border-blue-500/50 transition-colors duration-500 cursor-pointer overflow-hidden"
        >
            {/* Background Hover color bleed */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none -z-10" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12 lg:gap-24 w-full">
                {/* Number */}
                <span className="text-xl md:text-2xl font-medium text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                    {num}
                </span>

                {/* Title */}
                <motion.h3
                    className="text-3xl md:text-5xl font-black tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-2"
                >
                    {title}
                </motion.h3>

                {/* Description - pushes towards the end */}
                <p className="text-sm md:text-base text-muted-foreground max-w-sm sm:ml-auto mt-4 sm:mt-0 transition-opacity duration-300 group-hover:text-foreground">
                    {description}
                </p>

                {/* Arrow Icon */}
                <div className="mt-6 sm:mt-0 right-0 sm:relative w-12 h-12 rounded-full border border-white/10 group-hover:border-blue-500 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors duration-300 shrink-0">
                    <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-blue-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
            </div>

            {/* Animated divider line (bottom) */}
            <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-blue-500 to-blue-400 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: "circOut" }}
            />
        </motion.div>
    );
}
