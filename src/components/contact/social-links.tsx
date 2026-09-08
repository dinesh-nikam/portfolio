"use client";

import { motion, Variants } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";

export function SocialLinks() {
    const socialLinks = [
        { name: "GitHub", icon: Github, href: "https://github.com/dinesh-nikam", rel: "me", color: "hover:text-primary hover:bg-primary/10 hover:border-primary/40" },
        { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/dinesh-nikam3/", rel: "me", color: "hover:text-primary hover:bg-primary/10 hover:border-primary/40" },
        { name: "Twitter", icon: Twitter, href: "https://twitter.com/dinesh_nikam3", rel: "me", color: "hover:text-primary hover:bg-primary/10 hover:border-primary/40" },
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
        <div className="mt-12 pt-12 border-t border-border/50">
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
                            rel={social.rel ? `${social.rel} noopener noreferrer` : "noopener noreferrer"}
                            className={`p-4 rounded-md bg-muted/30 border border-border/70 text-muted-foreground transition-all duration-300 group ${social.color}`}
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