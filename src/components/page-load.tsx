"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoad() {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Fast counter that feels premium
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random elegant easing for the numbers
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 20);

        const timer = setTimeout(() => {
            setIsLoading(false);
            window.scrollTo(0, 0);
        }, 1500); // Shorter load time

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    // Slow cinematic fade out instead of sliding
                    className="fixed inset-0 z-[99999] bg-background text-foreground flex items-center justify-center"
                >
                    <div className="absolute inset-0 noise-overlay opacity-[0.02]" />

                    {/* Minimalist percentage counter */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="relative z-10 flex flex-col items-center justify-center font-mono"
                    >
                        <span className="text-[10vw] md:text-8xl font-light tracking-tighter">
                            {count < 10 && "00"}
                            {count >= 10 && count < 100 && "0"}
                            {count}
                            <span className="text-xl md:text-2xl text-muted-foreground">%</span>
                        </span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xs tracking-[0.2em] uppercase mt-4 text-muted-foreground"
                        >
                            Loading Experience
                        </motion.span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
