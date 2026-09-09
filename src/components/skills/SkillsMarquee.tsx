"use client";

import { motion } from "framer-motion";
import { allSkills } from "./constants";

const SkillBadge = ({ skill }: { skill: string }) => {
    return (
        <motion.div whileHover={{ scale: 1.05, y: -5 }} className="group relative shrink-0">
            <div className="relative flex items-center justify-center gap-3 rounded-md border border-border/70 bg-muted/30 px-5 py-3 md:px-6 md:py-4">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <span className="text-sm font-medium tracking-wide text-foreground md:text-base">{skill}</span>
            </div>
        </motion.div>
    );
};

export function SkillsMarquee() {
    const marqueeItems = [...allSkills, ...allSkills];
    const marqueeItemsRow2 = [...allSkills].reverse();
    const marqueeRow2 = [...marqueeItemsRow2, ...marqueeItemsRow2];

    return (
        <div className="relative flex w-full flex-col gap-6 overflow-hidden py-10">
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

            <div className="flex w-fit group">
                <motion.div
                    className="flex gap-4 pr-4 group-hover:[animation-play-state:paused]"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                >
                    {marqueeItems.map((skillObj, idx) => (
                        <SkillBadge key={`row1-${idx}`} skill={skillObj.name} />
                    ))}
                </motion.div>
            </div>

            <div className="flex w-fit group">
                <motion.div
                    className="flex gap-4 pr-4 group-hover:[animation-play-state:paused]"
                    initial={{ x: "-50%" }}
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ ease: "linear", duration: 45, repeat: Infinity }}
                >
                    {marqueeRow2.map((skillObj, idx) => (
                        <SkillBadge key={`row2-${idx}`} skill={skillObj.name} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}