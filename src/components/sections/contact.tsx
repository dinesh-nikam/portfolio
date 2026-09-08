"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ContactSection() {
    return (
        <section id="contact" className="w-full relative overflow-hidden bg-background pt-32 pb-16 px-6 md:px-12 lg:px-24 border-t border-border">

            <div className="max-w-7xl mx-auto flex flex-col gap-32">

                {/* Massive CTA */}
                <div className="flex flex-col items-center text-center gap-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="text-display hover:opacity-80 transition-opacity cursor-pointer"
                    >
                        Let&apos;s Talk
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-body max-w-xl mx-auto"
                    >
                        Whether you have a formal project in mind or just want to discuss product design and engineering, my inbox is always open.
                    </motion.p>

                    <motion.a
                        href="mailto:nikamdinesh362@gmail.com"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="btn-elegant text-xl px-10 py-5 mt-4"
                    >
                        nikamdinesh362@gmail.com
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.a>
                </div>

                {/* Minimal Footer */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-border/50 text-sm text-muted-foreground font-mono">
                    <p>© {new Date().getFullYear()} Dinesh Nikam. All rights reserved.</p>

                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        <button onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))} className="hover:text-foreground hover-underline transition-colors pb-1 text-left">Cookie Settings</button>
                        <a href="/privacy-policy" className="hover:text-foreground hover-underline transition-colors pb-1">Privacy Policy</a>
                        <a href="https://github.com/dinesh-nikam" target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover-underline transition-colors pb-1">Github</a>
                        <a href="https://linkedin.com/in/dinesh-nikam3/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover-underline transition-colors pb-1">LinkedIn</a>
                        <a href="https://twitter.com/dinesh_nikam3" target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover-underline transition-colors pb-1">Twitter</a>
                    </div>
                </div>

            </div>
        </section>
    );
}