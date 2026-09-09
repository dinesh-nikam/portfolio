"use client";

import { motion } from "framer-motion";

export function ContactHero() {
    return (
        <div className="flex flex-col space-y-6">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-display text-5xl md:text-7xl tracking-tighter text-foreground"
            >
                Let&apos;s Build Something <br className="hidden md:block" /> Remarkable Together
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
                I&apos;m currently open to freelance opportunities, exciting collaborations, and meaningful discussions about creative technology. Feel free to reach out.
            </motion.p>
        </div>
    );
}