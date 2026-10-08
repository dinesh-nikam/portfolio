"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail } from "lucide-react";

export function ContactSection() {
    const [copied, setCopied] = useState<"idle" | "copied" | "failed">("idle");
    const email = "nikamdinesh362@gmail.com";

    const handleCopyEmail = async () => {
        try {
            // Clipboard API needs a secure context; file:// and plain http
            // deployments would throw. mailto fallback keeps the action alive.
            if (!navigator.clipboard || !window.isSecureContext) {
                throw new Error("Clipboard unavailable");
            }
            await navigator.clipboard.writeText(email);
            setCopied("copied");
        } catch {
            setCopied("failed");
        } finally {
            setTimeout(() => setCopied("idle"), 2000);
        }
    };

    return (
        <section
            id="contact"
            className="relative w-full overflow-hidden border-t border-border px-4 sm:px-6 pt-32 pb-16 md:px-12 lg:px-20 xl:px-24"
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-24">
                {/* Contact Header with Animated Vermilion Indicator */}
                <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary font-medium">
                        AVAILABLE FOR SELECTED OPPORTUNITIES · 2026
                    </span>
                </div>

                {/* Massive Headline */}
                <div className="max-w-5xl">
                    <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium leading-[0.95] tracking-tight text-foreground">
                        LET&apos;S BUILD
                        <br />
                        SOMETHING
                        <br />
                        <span className="italic text-primary">MEMORABLE.</span>
                    </h2>
                </div>

                {/* Body statement & Direct Triggers */}
                <div className="grid grid-cols-1 gap-12 border-t border-border pt-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-6">
                        <p className="max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl">
                            Available for select consulting engagements, full-stack architectural leadership, and ambitious creative digital products.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 lg:col-span-6">
                        {/* Direct Email Action */}
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                INITIATE CONVERSATION
                            </span>
                            <div className="flex flex-wrap items-center gap-4">
                                <a
                                    href={`mailto:${email}`}
                                    className="font-display text-lg sm:text-2xl md:text-3xl font-medium text-foreground transition-colors hover:text-primary break-all sm:break-normal"
                                >
                                    nikamdinesh362@gmail.com
                                </a>
                                <button
                                    onClick={handleCopyEmail}
                                    className="flex h-9 items-center gap-2 rounded-sm border border-border px-3 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                                    title="Copy email to clipboard"
                                    aria-live="polite"
                                >
                                    {copied === "copied" ? (
                                        <>
                                            <Check className="h-3.5 w-3.5 text-primary" />
                                            <span>COPIED</span>
                                        </>
                                    ) : copied === "failed" ? (
                                        <>
                                            <Mail className="h-3.5 w-3.5" />
                                            <span>USE MAILTO</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-3.5 w-3.5" />
                                            <span>COPY</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Social / Editorial Channels */}
                        <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-border font-mono text-xs uppercase tracking-widest">
                            <a
                                href="https://github.com/dinesh-nikam"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
                            >
                                <span>GITHUB</span>
                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                            <a
                                href="https://linkedin.com/in/dinesh-nikam3/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
                            >
                                <span>LINKEDIN</span>
                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                <span className="sr-only">(opens in a new tab)</span>
                            </a>
                            <a
                                href="https://twitter.com/dinesh_nikam3"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
                            >
                                <span>X / TWITTER</span>
                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                <span className="sr-only">(opens in a new tab)</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Minimal Footer Colophon */}
                <footer className="mt-16 flex flex-col gap-6 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between font-mono">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                        <span className="font-semibold text-foreground">DINESH NIKAM</span>
                        <span className="hidden sm:inline">·</span>
                        <span>FULL STACK DEVELOPER</span>
                        <span className="hidden sm:inline">·</span>
                        <span>PUNE, INDIA</span>
                    </div>

                    <div className="flex items-center gap-6 text-[11px]">
                        <span>© 2026 DINESH NIKAM</span>
                        <span>ALL RIGHTS RESERVED</span>
                    </div>
                </footer>
            </div>
        </section>
    );
}