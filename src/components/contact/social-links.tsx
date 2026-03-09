"use client";

import { motion, Variants } from "framer-motion";
import { Github, Twitter, Linkedin, Dribbble, Instagram } from "lucide-react";

export function SocialLinks() {
    const socialLinks = [
        { name: "GitHub", icon: Github, href: "https://github.com/dinesh-nikam", color: "hover:text-foreground hover:bg-foreground/10 hover:border-foreground/30" },
        { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/dinesh-nikam3/", color: "hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/30" },
        { name: "Twitter", icon: Twitter, href: "https://twitter.com/dinesh_nikam3", color: "hover:text-foreground hover:bg-foreground/10 hover:border-foreground/30" },
        { name: "Dribbble", icon: Dribbble, href: "https://dribbble.com", color: "hover:text-foreground hover:bg-foreground/10 hover:border-foreground/30" },
        { name: "Instagram", icon: Instagram, href: "https://instagram.com/dinesh", color: "hover:text-foreground hover:bg-foreground/10 hover:border-foreground/30" },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="mt-12 pt-12 border-t border-foreground/5">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">Connect across the web</h4>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-4"
            >
                {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                        <motion.a
                            key={social.name}
                            variants={itemVariants}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-4 rounded-xl bg-foreground/5 border border-foreground/5 text-muted-foreground transition-all duration-300 group ${social.color}`}
                            aria-label={social.name}
                        >
                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        </motion.a>
                    );
                })}
            </motion.div>
        </div>
    );
}
