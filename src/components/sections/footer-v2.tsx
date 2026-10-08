"use client";

import { useState } from "react";
import { ArrowUpRight, Send, Check } from "lucide-react";
import Link from "next/link";

export function FooterV2() {
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail) return;
        setSubscribed(true);
        setTimeout(() => {
            setSubscribed(false);
            setNewsletterEmail("");
        }, 3500);
    };

    return (
        <footer className="relative w-full border-t border-border bg-background pt-20 pb-12 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                {/* Upper Grid (Video 1 Layout) */}
                <div className="grid grid-cols-1 gap-12 border-b border-border pb-16 lg:grid-cols-12 lg:gap-16">
                    {/* Left: Statement & Direct Contact (Col 1-6) */}
                    <div className="flex flex-col justify-between gap-8 lg:col-span-6">
                        <p className="max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground">
                            Focused on crafting clean and intuitive digital experiences that blend creativity, usability, and edge engineering to <strong className="text-foreground font-medium">help brands connect better with their users</strong>.
                        </p>

                        <div className="flex flex-col gap-1 font-mono text-sm">
                            <span className="text-xs text-muted-foreground uppercase tracking-widest">
                                INQUIRIES & STUDIO
                            </span>
                            <a
                                href="mailto:nikamdinesh362@gmail.com"
                                className="font-display text-2xl font-bold text-foreground transition-colors hover:text-primary sm:text-3xl"
                            >
                                nikamdinesh362@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Right: Newsletter Box & Nav Links (Col 7-12) */}
                    <div className="flex flex-col justify-between gap-10 lg:col-span-6">
                        {/* Newsletter Input Box (Video 1 style) */}
                        <div className="flex flex-col gap-2 max-w-md">
                            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                Newsletter
                            </span>
                            {subscribed ? (
                                <div className="flex items-center gap-2 rounded-sm border border-primary/50 bg-primary/10 px-4 py-3 font-mono text-xs text-primary">
                                    <Check className="h-4 w-4" />
                                    <span>Thank you for subscribing!</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                                    <input
                                        type="email"
                                        required
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        placeholder="jane@company.com"
                                        className="w-full rounded-sm border border-border bg-card px-4 py-3 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="shrink-0 rounded-sm border border-foreground bg-foreground px-5 py-3 font-mono text-xs uppercase tracking-widest text-background transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
                                    >
                                        JOIN
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Two-Column Nav (Video 1 style) */}
                        <div className="grid grid-cols-2 gap-8 font-mono text-xs">
                            <div className="flex flex-col gap-3">
                                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                                    Navigation
                                </span>
                                {[
                                    { label: "Home", href: "/" },
                                    { label: "About Me", href: "/#about" },
                                    { label: "Selected Work", href: "/#work" },
                                    { label: "Writing", href: "/writing" },
                                    { label: "Contact", href: "/contactme" },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="text-foreground transition-colors hover:text-primary"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3">
                                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                                    Network
                                </span>
                                {[
                                    { label: "GitHub", href: "https://github.com/dinesh-nikam" },
                                    { label: "LinkedIn", href: "https://linkedin.com/in/dinesh-nikam" },
                                    { label: "Twitter / X", href: "https://twitter.com" },
                                    { label: "Resume PDF", href: "/resume" },
                                ].map((soc) => (
                                    <a
                                        key={soc.label}
                                        href={soc.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-1 text-foreground transition-colors hover:text-primary"
                                    >
                                        <span>{soc.label}</span>
                                        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gigantic Edge-to-Edge Typography Wordmark (Video 1 signature: Michael® -> Dinesh®) */}
                <div className="my-10 w-full overflow-hidden select-none">
                    <h2 className="font-display text-[15vw] font-bold leading-none tracking-tighter text-foreground/90 transition-all duration-500 hover:text-primary hover:tracking-normal">
                        Dinesh<span className="font-mono text-[6vw] text-primary align-top font-bold">®</span>
                    </h2>
                </div>

                {/* Bottom Copyright & Disclaimer */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 font-mono text-[11px] text-muted-foreground sm:flex-row">
                    <span>Copyright & Design by Dinesh Nikam – 2026</span>
                    <span>All Rights Reserved · Pune, IN</span>
                </div>
            </div>
        </footer>
    );
}
