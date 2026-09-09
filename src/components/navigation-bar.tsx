"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import ThemeToggle from "./theme-toggle";

export function NavigationBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { theme, setTheme } = useTheme();
    // true only on the client (after hydration), without a setState-in-effect
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    const pathname = usePathname();

    // Close the mobile menu when the route changes — safe "state during render" pattern
    const [prevPathname, setPrevPathname] = useState(pathname);
    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setMobileMenuOpen(false);
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Basic scroll spy for homepage sections
            if (pathname === "/") {
                const sections = ["about", "skills", "experience", "projects", "services", "contact"];
                let current = "";

                for (const section of sections) {
                    const el = document.getElementById(section);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top <= 120 && rect.bottom >= 120) {
                            current = section;
                            break;
                        }
                    }
                }
                setActiveSection(current);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    // Lock body scroll while the mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: "Work", href: "/#work", index: "01" },
        { name: "Skills", href: "/#skills", index: "02" },
        { name: "Experience", href: "/#experience", index: "03" },
        { name: "Writing", href: "/writing", index: "04" },
        { name: "Resume", href: "/resume", index: "05" },
        { name: "Contact", href: "/contactme", index: "06" },
    ];

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setMobileMenuOpen(false);

        // Hash link while already on the homepage → smooth scroll in place
        if (href.includes("#")) {
            const hash = href.split("#")[1];
            if (pathname === "/") {
                e.preventDefault();
                document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", `/#${hash}`);
            }
            // Otherwise let Next.js Link handle the transition to /#hash
        } else if (href === "/") {
            // Wordmark — scroll back to top when already home
            if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    };

    const isActive = (href: string) => {
        if (href === "/writing") return pathname.startsWith("/writing");
        if (href === "/resume") return pathname === "/resume";
        if (href === "/contactme") return pathname === "/contactme";
        if (href.includes("#")) {
            const hash = href.split("#")[1];
            return pathname === "/" && activeSection === hash;
        }
        return false;
    };

    return (
        <motion.header
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
            className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
                isScrolled
                    ? "border-border bg-background/85 py-3 backdrop-blur-md"
                    : "border-transparent bg-transparent py-5"
            }`}
        >
            <nav aria-label="Main Navigation" className="container mx-auto flex items-center justify-between px-6 md:px-12">
                {/* Wordmark */}
                <Link
                    href="/"
                    onClick={(e) => handleNavigation(e, "/")}
                    className="group relative z-10 flex items-center gap-3"
                >
                    <span className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
                        <span
                            className="mr-2.5 inline-block h-2 w-2 bg-primary transition-transform duration-300 group-hover:rotate-45"
                            aria-hidden
                        />
                        Dinesh&nbsp;Nikam
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavigation(e, link.href)}
                                aria-current={active ? "true" : undefined}
                                className={`relative flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                <span className={active ? "text-primary" : "text-muted-foreground/70"}>{link.index}</span>
                                {link.name}
                                {active && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-x-3 -bottom-2 h-px bg-primary"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    />
                                )}
                            </Link>
                        );
                    })}

                    {/* Theme toggle — bordered square, GSAP icon crossfade */}
                    <ThemeToggle />
                </div>

                {/* Mobile toggle */}
                <button
                    className="relative z-50 border border-border bg-background p-2 text-foreground md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                    aria-controls="mobile-menu"
                >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

            {/* Mobile menu — full-bleed editorial index */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-background px-8 pt-20 md:hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={(e) => handleNavigation(e, link.href)}
                                    className={`group flex items-baseline gap-4 border-b border-border py-5 ${
                                        isActive(link.href) ? "text-primary" : "text-foreground"
                                    }`}
                                >
                                    <span className="font-mono text-[11px] text-muted-foreground">{link.index}</span>
                                    <span className="font-display text-4xl tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                                        {link.name}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}

                        {mounted && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.55 }}
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="mt-10 flex w-max items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
                            >
                                {theme === "dark" ? (
                                    <>
                                        <Sun className="h-4 w-4 text-primary" /> Light Mode
                                    </>
                                ) : (
                                    <>
                                        <Moon className="h-4 w-4" /> Dark Mode
                                    </>
                                )}
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}