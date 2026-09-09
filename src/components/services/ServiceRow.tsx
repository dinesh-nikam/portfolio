"use client";

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
            className="group relative flex cursor-pointer flex-col items-start justify-between overflow-hidden border-b border-border py-8 transition-colors duration-500 hover:border-primary/30 sm:flex-row sm:items-center sm:py-10"
        >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/[0.04]" />

            <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-12 lg:gap-24">
                <span className="text-xl font-medium text-muted-foreground transition-colors duration-300 group-hover:text-primary md:text-2xl">
                    {num}
                </span>

                <motion.h3
                    className="text-3xl font-medium tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-5xl"
                >
                    {title}
                </motion.h3>

                <p className="mt-4 max-w-sm text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:ml-auto sm:mt-0 md:text-base">
                    {description}
                </p>

                <div className="mt-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/10 sm:mt-0">
                    <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
            </div>

            <motion.div
                className="absolute bottom-0 left-0 h-px origin-left bg-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: "circOut" }}
            />
        </motion.div>
    );
}