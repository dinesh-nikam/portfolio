"use client";

import { motion } from "framer-motion";

export function AvailabilityStatus() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-muted/30 self-start"
        >
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm font-medium text-foreground/90 tracking-wide uppercase">
                Available for Freelance Projects
            </span>
        </motion.div>
    );
}