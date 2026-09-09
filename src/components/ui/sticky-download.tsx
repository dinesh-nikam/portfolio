"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText } from "lucide-react";

export function StickyDownload() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling past 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Run initial check asynchronously to avoid synchronous setState in effect
        requestAnimationFrame(handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 30 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 pointer-events-auto"
                >
                    <motion.a
                        href="https://drive.google.com/file/d/15sOTRbV-1NFzoL3Ko_Bh5iKd43L1yuyF/view?usp=drivesdk"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-3 px-5 py-3 rounded-full bg-background/90 backdrop-blur-md border border-border text-foreground hover:border-primary/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 select-none"
                    >
                        {/* Status Dot (indicates ready to export/download) */}
                        <span className="h-2 w-2 rounded-full bg-primary" />

                        <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-[10px] sm:text-xs font-bold font-mono tracking-widest uppercase">
                            Resume PDF
                        </span>

                        <div className="p-1 rounded-full bg-muted/40 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                            <Download className="w-3.5 h-3.5 group-hover:animate-bounce" />
                        </div>
                    </motion.a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}