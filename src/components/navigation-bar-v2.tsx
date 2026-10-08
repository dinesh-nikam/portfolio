"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Plus, ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";
import ThemeToggle from "./theme-toggle";

interface NavLinkItem {
    name: string;
    href: string;
    number: string;
}

const navItems: NavLinkItem[] = [
    { name: "HOME", href: "/", number: "01" },
    { name: "ABOUT", href: "/#about", number: "02" },
    { name: "WORK", href: "/#work", number: "03" },
    { name: "SERVICES", href: "/#services", number: "04" },
    { name: "EXPERIENCE", href: "/#experience", number: "05" },
    { name: "RESUME", href: "/resume", number: "06" },
    { name: "WRITING", href: "/writing", number: "07" },
    { name: "CONTACT", href: "/contactme", number: "08" },
];

export function NavigationBarV2() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState("");
    const pathname = usePathname();

    // Scroll listener for sticky header styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Live Pune, India IST clock (Video 1 studio touch)
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString("en-US", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setCurrentTime(`${timeString} IST`);
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // Lock body scroll when overlay is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen]);

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsMenuOpen(false);

        if (href.includes("#")) {
            const hash = href.split("#")[1];
            if (pathname === "/") {
                e.preventDefault();
                document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", `/#${hash}`);
            }
        } else if (href === "/") {
            if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    };

    return (
        <>
            {/* Top Navigation Bar (Video 1 style) */}
            <motion.header
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                    isScrolled
                        ? "border-b border-border/80 bg-background/85 py-3.5 backdrop-blur-md shadow-sm"
                        : "border-b border-transparent bg-transparent py-5"
                }`}
            >
                <nav
                    aria-label="Main Navigation V2"
                    className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 md:px-12"
                >
                    {/* Brand Wordmark (Video 1 Style: Portfoliob® -> Dinesh Nikam®) */}
                    <Link
                        href="/"
                        onClick={(e) => handleNavigation(e, "/")}
                        className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-85"
                    >
                        <span>Dinesh Nikam</span>
                        <span className="font-mono text-xs text-primary font-bold">®</span>
                    </Link>

                    {/* Desktop Center Links */}
                    <div className="hidden items-center gap-8 md:flex">
                        {[
                            { name: "Home", href: "/" },
                            { name: "About", href: "/#about" },
                            { name: "Work", href: "/#work" },
                            { name: "Services", href: "/#services" },
                            { name: "Contact", href: "/contactme" },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavigation(e, link.href)}
                                className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:text-primary"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Theme Toggle & Signature Menu Button */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {/* Signature Two-Line Hamburger Button (Video 1) */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="group flex items-center gap-3 rounded-sm border border-border bg-card/80 px-3.5 py-2 min-h-[44px] min-w-[44px] backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-card cursor-pointer"
                            aria-label="Open full screen navigation menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="hidden font-mono text-xs uppercase tracking-widest text-foreground transition-colors group-hover:text-primary sm:inline-block">
                                Menu
                            </span>
                            <div className="flex flex-col items-end gap-1.5">
                                <span className="h-0.5 w-5 bg-foreground transition-all duration-300 group-hover:w-6 group-hover:bg-primary" />
                                <span className="h-0.5 w-3.5 bg-primary transition-all duration-300 group-hover:w-6" />
                            </div>
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Fullscreen Overlay Menu (Directly modeled on Video 1) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="fullscreen-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Site Navigation Overlay"
                        data-lenis-prevent
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[100] flex flex-col justify-between overflow-y-auto overscroll-contain bg-[#0d0c0b] text-[#f4f1ea] p-6 sm:p-10 md:p-14 lg:p-16"
                    >
                        {/* Subtle architectural vertical grid lines (Video 1 hallmark) */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 grid grid-cols-2 divide-x divide-white/[0.04] md:grid-cols-4"
                        />

                        {/* Top Bar inside Overlay - Sticky so close button is always accessible */}
                        <div className="sticky top-0 z-20 -mx-6 px-6 sm:-mx-10 sm:px-10 md:-mx-14 md:px-14 lg:-mx-16 lg:px-16 pt-2 pb-6 bg-[#0d0c0b]/95 backdrop-blur-md flex w-full max-w-7xl items-center justify-between border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <span className="font-display text-xl font-bold tracking-tight text-white">
                                    Dinesh Nikam
                                </span>
                                <span className="font-mono text-xs text-primary font-bold">®</span>
                            </div>

                            {/* Animated Close Button */}
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="group flex items-center gap-3 rounded-sm border border-white/15 bg-white/5 px-4 py-2 min-h-[44px] min-w-[44px] font-mono text-xs uppercase tracking-widest text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white cursor-pointer"
                                aria-label="Close menu"
                            >
                                <span className="hidden sm:inline">ESC</span>
                                <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                            </button>
                        </div>

                        {/* Center Content: 2-Column Split (Video 1 Layout) */}
                        <div className="relative z-10 mx-auto w-full max-w-7xl py-6 sm:py-10 lg:py-16">
                            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
                                {/* Left Column: Giant Uppercase Navigation Links with '+' signs */}
                                <div className="flex flex-col lg:col-span-7">
                                    {navItems.map((item, idx) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.45,
                                                delay: 0.1 + idx * 0.05,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={(e) => handleNavigation(e, item.href)}
                                                className="group flex w-full items-center justify-between border-b border-white/10 py-3 sm:py-4 transition-all duration-300 hover:border-primary"
                                            >
                                                <div className="flex items-baseline gap-3 sm:gap-6">
                                                    <span className="font-mono text-xs text-white/40 transition-colors duration-300 group-hover:text-primary">
                                                        {item.number}
                                                    </span>
                                                    <span className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white transition-all duration-300 group-hover:translate-x-3 group-hover:text-primary">
                                                        {item.name}
                                                    </span>
                                                </div>

                                                {/* '+' Icon with 45° spin on hover (Video 1 signature) */}
                                                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10">
                                                    <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-white/50 transition-all duration-300 group-hover:rotate-45 group-hover:text-primary" />
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Right Column: Studio, Contact & Social Details (Video 1) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.35 }}
                                    className="flex flex-col justify-between gap-10 border-t border-white/10 pt-10 lg:col-span-5 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-12 lg:pt-0"
                                >
                                    {/* Direct Email */}
                                    <div className="flex flex-col gap-2">
                                        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                                            <Mail className="h-3.5 w-3.5 text-primary" />
                                            Contact Mail
                                        </span>
                                        <a
                                            href="mailto:nikamdinesh362@gmail.com"
                                            className="font-display text-xl font-medium text-white transition-colors duration-200 hover:text-primary sm:text-2xl"
                                        >
                                            nikamdinesh362@gmail.com
                                        </a>
                                    </div>

                                    {/* Location & Availability */}
                                    <div className="flex flex-col gap-2">
                                        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                                            <MapPin className="h-3.5 w-3.5 text-primary" />
                                            Location & Studio
                                        </span>
                                        <p className="text-base text-white/90">
                                            Pune, Maharashtra, India [18.5204° N, 73.8567° E]
                                        </p>
                                        <span className="font-mono text-xs text-primary font-medium">
                                            Open for Select Q2/Q3 2026 Engagements
                                        </span>
                                    </div>

                                    {/* Working Hours */}
                                    <div className="flex flex-col gap-2">
                                        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                                            <Clock className="h-3.5 w-3.5 text-primary" />
                                            Working Hours
                                        </span>
                                        <p className="font-mono text-xs text-white/80">
                                            Monday – Friday: 09:00 AM – 07:00 PM IST
                                        </p>
                                        <p className="font-mono text-xs text-white/50">
                                            Global Remote Async Friendly
                                        </p>
                                    </div>

                                    {/* Social Channels Strip */}
                                    <div className="border-t border-white/10 pt-6">
                                        <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                                            Network & Profiles
                                        </span>
                                        <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-wider">
                                            {[
                                                { label: "GitHub", href: "https://github.com/dinesh-nikam" },
                                                { label: "LinkedIn", href: "https://linkedin.com/in/dinesh-nikam3/" },
                                                { label: "Twitter / X", href: "https://twitter.com/dinesh_nikam3" },
                                                { label: "Resume", href: "/resume" },
                                            ].map((soc) => (
                                                <a
                                                    key={soc.label}
                                                    href={soc.href}
                                                    target={soc.href.startsWith("http") ? "_blank" : undefined}
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center gap-1 text-white/80 transition-colors duration-200 hover:text-primary"
                                                >
                                                    <span>{soc.label}</span>
                                                    {soc.href.startsWith("http") && (
                                                        <>
                                                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                                            <span className="sr-only">(opens in a new tab)</span>
                                                        </>
                                                    )}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Bottom Bar: Copyright & Live Time */}
                        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 font-mono text-xs text-white/50 sm:flex-row sm:items-center">
                            <span>©2026 Dinesh Nikam. All rights reserved.</span>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                                <span>PUNE, IN · {currentTime || "IST"}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
