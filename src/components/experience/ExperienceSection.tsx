"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ExperienceHero } from "./ExperienceHero";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { SkillsEvolution } from "./SkillsEvolution";
import { AchievementsSection } from "./AchievementsSection";
import { EducationSection } from "./EducationSection";
import { Download } from "lucide-react";

export function ExperienceSection() {
    return (
        <section id="experience" className="w-full bg-background relative overflow-hidden">
            {/* Global Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -right-[20%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
                <div className="absolute bottom-1/4 -left-[20%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[150px]" />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
                <ExperienceHero />

                <div className="w-full bg-black/40 backdrop-blur-sm border-t border-b border-white/5 py-12 my-12 hidden">
                    <div className="container mx-auto px-6 max-w-6xl">
                        {/* Optional subtle divider or marquee */}
                    </div>
                </div>

                <AchievementsSection />

                <div className="w-full max-w-6xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

                <ExperienceTimeline />

                <div className="w-full max-w-6xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

                <SkillsEvolution />

                <div className="w-full max-w-6xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

                <EducationSection />

                {/* Download CTA */}
                <div className="w-full max-w-6xl mx-auto py-24 px-6 flex flex-col items-center justify-center">
                    <motion.a
                        href="https://drive.google.com/file/d/15sOTRbV-1NFzoL3Ko_Bh5iKd43L1yuyF/view?usp=drivesdk"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all duration-300 overflow-hidden"
                    >
                        {/* Hover subtle background inside button */}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <Download className="w-5 h-5 text-blue-500 group-hover:-translate-y-1 transition-transform duration-300" />
                        <span className="relative z-10 text-foreground group-hover:text-white transition-colors">Download Full Resume</span>
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
