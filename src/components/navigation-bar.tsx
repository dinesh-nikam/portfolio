"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";

export function NavigationBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Basic scroll spy for homepage sections
            if (pathname === "/") {
                const sections = ["home", "about", "skills", "experience", "projects", "services", "contact"];
                let current = "";

                for (const section of sections) {
                    const el = document.getElementById(section);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top <= 100 && rect.bottom >= 100) {
                            current = section;
                            break;
                        }
                    }
                }
                setActiveSection(current);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Work", href: "/#projects" },
        { name: "Skills", href: "/#skills" },
        { name: "Experience", href: "/#experience" },
        { name: "Writing", href: "/writing" },
        { name: "Resume", href: "/resume" },
        { name: "Contact", href: "/contactme" },
    ];

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setMobileMenuOpen(false);

        // Check if it's a hash link
        if (href.includes("#")) {
            const hash = href.split("#")[1];

            // If we are already on the homepage where sections live
            if (pathname === "/") {
                e.preventDefault();
                const element = document.getElementById(hash);
                if (element) element.scrollIntoView({ behavior: "smooth" });
                // Push silent route update
                window.history.pushState(null, "", `/#${hash}`);
            } else {
                // Let Next.js Link cleanly handle the transition to /#hash
            }
        } else if (href === "/") {
            // If already on homepage, just scroll to top
            if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    };

    // Helper to determine if link is active
    const isActive = (href: string) => {
        if (href === "/writing") {
            return pathname.startsWith("/writing");
        }
        if (href === "/resume") {
            return pathname === "/resume";
        }
        if (href === "/contactme") {
            return pathname === "/contactme";
        }
        if (href === "/") {
            return pathname === "/" && (activeSection === "home" || activeSection === "");
        }
        if (href.includes("#")) {
            const hash = href.split("#")[1];
            return pathname === "/" && activeSection === hash;
        }
        return false;
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.5 }} // Delay until after page load
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-4 bg-background/80 backdrop-blur-lg border-b border-border shadow-sm" : "py-8 bg-transparent"
                }`}
        >
            <nav className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo / Name */}
                <Link href="/" onClick={(e) => handleNavigation(e, "/")} className="group relative z-10">
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:from-blue-400 group-hover:to-blue-500 transition-all duration-300">DN.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 p-1.5 rounded-full px-4">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavigation(e, link.href)}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 z-10 ${active ? "text-white" : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {active && (
                                    <motion.div
                                        layoutId="active-nav"
                                        className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                {link.name}
                            </Link>
                        );
                    })}

                    <div className="w-[1px] h-4 bg-white/20 mx-2" />

                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 relative p-2 text-foreground bg-white/5 border border-white/10 rounded-full"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden pt-20"
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={(e) => handleNavigation(e, link.href)}
                                    className={`text-4xl font-light transition-colors ${isActive(link.href) ? "text-blue-500 font-medium" : "text-foreground hover:text-muted-foreground"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}

                        {/* Theme Toggle Mobile */}
                        {mounted && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="mt-8 flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm uppercase tracking-widest text-muted-foreground active:scale-95 transition-all"
                            >
                                {theme === "dark" ? (
                                    <><Sun className="w-4 h-4 text-blue-500" /> Light Mode</>
                                ) : (
                                    <><Moon className="w-4 h-4" /> Dark Mode</>
                                )}
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
