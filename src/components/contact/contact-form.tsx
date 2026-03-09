"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);

        // Reset form success state after some time
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="w-full relative group"
        >
            {/* Removed neon background glow */}

            <form onSubmit={handleSubmit} className="relative flex flex-col space-y-6 bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group/field">
                        <input
                            type="text"
                            required
                            id="name"
                            className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pt-6 text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300"
                            placeholder=" "
                        />
                        <label htmlFor="name" className="absolute left-4 top-2 text-xs font-medium text-muted-foreground uppercase tracking-wider peer-focus:text-blue-500 peer-focus:-translate-y-0.5 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:text-white/50 transition-all duration-300 pointer-events-none">
                            Your Name
                        </label>
                    </div>

                    <div className="relative group/field">
                        <input
                            type="email"
                            required
                            id="email"
                            className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pt-6 text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300"
                            placeholder=" "
                        />
                        <label htmlFor="email" className="absolute left-4 top-2 text-xs font-medium text-muted-foreground uppercase tracking-wider peer-focus:text-blue-500 peer-focus:-translate-y-0.5 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:text-white/50 transition-all duration-300 pointer-events-none">
                            Email Address
                        </label>
                    </div>
                </div>

                <div className="relative group/field">
                    <input
                        type="text"
                        required
                        id="project"
                        className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pt-6 text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300"
                        placeholder=" "
                    />
                    <label htmlFor="project" className="absolute left-4 top-2 text-xs font-medium text-muted-foreground uppercase tracking-wider peer-focus:text-blue-500 peer-focus:-translate-y-0.5 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:text-white/50 transition-all duration-300 pointer-events-none">
                        Project Type / Subject
                    </label>
                </div>

                <div className="relative group/field">
                    <textarea
                        required
                        id="message"
                        rows={4}
                        className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pt-6 text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                        placeholder=" "
                    />
                    <label htmlFor="message" className="absolute left-4 top-2 text-xs font-medium text-muted-foreground uppercase tracking-wider peer-focus:text-blue-500 peer-focus:-translate-y-0.5 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:text-white/50 transition-all duration-300 pointer-events-none">
                        How can we help?
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="group/btn relative w-full flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-white text-black px-6 py-4 font-semibold hover:bg-white/90 transition-all duration-300 disabled:opacity-80"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300"></div>

                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Sending...</span>
                            </>
                        ) : isSuccess ? (
                            <>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                >
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                </motion.div>
                                <span>Message Sent</span>
                            </>
                        ) : (
                            <>
                                <span>Send Message</span>
                                <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                            </>
                        )}
                    </span>
                </button>
            </form>
        </motion.div>
    );
}
