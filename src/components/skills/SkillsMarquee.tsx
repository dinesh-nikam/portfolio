/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { allSkills } from "./constants";

const SkillBadge = ({ skill, icon }: { skill: string, icon?: string }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group shrink-0"
        >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-600 to-zinc-400 rounded-lg blur opacity-0 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative px-5 py-3 md:px-6 md:py-4 bg-white/5 dark:bg-black/40 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-lg flex items-center justify-center gap-3">
                {icon ? (
                    <img src={icon} alt={skill} className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                ) : (
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                )}
                <span className="text-sm md:text-base font-medium text-foreground tracking-wide">
                    {skill}
                </span>
            </div>
        </motion.div>
    );
};

export function SkillsMarquee() {
    // Double the array for seamless infinite looping
    // we use `allSkills` instead of `webSkills` to get the icons
    const marqueeItems = [...allSkills, ...allSkills];
    const marqueeItems2 = [...allSkills].reverse();
    const marqueeItemsRow2 = [...marqueeItems2, ...marqueeItems2];

    return (
        <div className="w-full flex flex-col gap-6 overflow-hidden py-10 relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Row 1 - Right to Left */}
            <div className="flex w-fit group">
                <motion.div
                    className="flex gap-4 pr-4 group-hover:[animation-play-state:paused]"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        ease: "linear",
                        duration: 40,
                        repeat: Infinity,
                    }}
                >
                    {marqueeItems.map((skillObj, idx) => (
                        <SkillBadge key={`row1-${idx}`} skill={skillObj.name} icon={skillObj.icon} />
                    ))}
                </motion.div>
            </div>

            {/* Row 2 - Left to Right */}
            <div className="flex w-fit group">
                <motion.div
                    className="flex gap-4 pr-4 group-hover:[animation-play-state:paused]"
                    initial={{ x: "-50%" }}
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        ease: "linear",
                        duration: 45,
                        repeat: Infinity,
                    }}
                >
                    {marqueeItemsRow2.map((skillObj, idx) => (
                        <SkillBadge key={`row2-${idx}`} skill={skillObj.name} icon={skillObj.icon} />
                    ))}
                </motion.div>
            </div>

        </div>
    );
}
