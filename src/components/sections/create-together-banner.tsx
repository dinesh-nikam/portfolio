"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";

export function CreateTogetherBanner() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });
            const data = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(data?.error || "Failed to send message");
            }
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setName("");
                setEmail("");
                setMessage("");
            }, 4000);
        } catch (err) {
            setError(
                err instanceof Error && err.message !== "Failed to send message"
                    ? err.message
                    : "Something went wrong — please email nikamdinesh362@gmail.com directly."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative w-full border-t border-border bg-background py-20 lg:py-28 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                {/* Atmospheric Glow Container (Video 1 style) */}
                <div className="relative overflow-hidden rounded-sm border border-border bg-[#0d0c0b] text-[#f4f1ea] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl">
                    {/* Background Ambient Radial Glow */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
                    />

                    <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Left Column: Big Headline & Manifesto (Col 1-7) */}
                        <div className="flex flex-col gap-6 lg:col-span-7">
                            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                                <Sparkles className="h-4 w-4" />
                                COLLABORATION & INQUIRY
                            </span>

                            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                                LET&apos;S CREATE <br />
                                TOGETHER<span className="text-primary">.</span>
                            </h2>

                            <div className="flex flex-col gap-2 max-w-lg border-l-2 border-primary pl-4">
                                <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                                    ✦ RESULTS-DRIVEN SOLUTIONS
                                </span>
                                <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                                    Refining architecture and user journeys through rigorous benchmark testing, fluid motion engineering, and sub-second edge performance.
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Floating Contact Form Card (Col 8-12, Video 1 Signature) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative flex flex-col rounded-sm border border-white/15 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl shadow-2xl lg:col-span-5"
                        >
                            <div className="mb-6 border-b border-white/10 pb-4">
                                <span className="font-display text-lg font-bold text-white">
                                    Dinesh Nikam
                                    <span className="font-mono text-xs text-primary font-bold ml-1">®</span>
                                </span>
                                <h3 className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                                    Reach Out to Me
                                </h3>
                            </div>

                            {error && (
                                <div role="alert" className="mb-4 flex items-center gap-2 rounded-sm border border-red-400/30 bg-red-400/10 p-3 text-xs text-red-300">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                                    <CheckCircle2 className="h-12 w-12 text-primary" />
                                    <h4 className="font-display text-xl font-bold text-white">
                                        Message Dispatched!
                                    </h4>
                                    <p className="font-mono text-xs text-white/60">
                                        I will get back to you within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div>
                                        <label
                                            htmlFor="banner-name"
                                            className="block font-mono text-[10px] uppercase tracking-widest text-white/50 mb-1.5"
                                        >
                                            Name
                                        </label>
                                        <input
                                            id="banner-name"
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your Name"
                                            className="w-full rounded-sm border border-white/15 bg-white/5 px-3.5 py-2.5 font-mono text-xs text-white placeholder-white/30 transition-colors focus:border-primary focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="banner-email"
                                            className="block font-mono text-[10px] uppercase tracking-widest text-white/50 mb-1.5"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="banner-email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@company.com"
                                            className="w-full rounded-sm border border-white/15 bg-white/5 px-3.5 py-2.5 font-mono text-xs text-white placeholder-white/30 transition-colors focus:border-primary focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="banner-message"
                                            className="block font-mono text-[10px] uppercase tracking-widest text-white/50 mb-1.5"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="banner-message"
                                            required
                                            rows={3}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Briefly describe your project or timeline..."
                                            className="w-full resize-none rounded-sm border border-white/15 bg-white/5 px-3.5 py-2.5 font-mono text-xs text-white placeholder-white/30 transition-colors focus:border-primary focus:outline-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group mt-2 flex w-full items-center justify-between rounded-sm border border-primary bg-primary px-5 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 cursor-pointer disabled:opacity-50"
                                    >
                                        <span>{loading ? "SENDING..." : "YOUR MESSAGE"}</span>
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
