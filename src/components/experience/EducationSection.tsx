"use client";

import { motion } from "framer-motion";
import { educationData } from "@/lib/data";

export function EducationSection() {
    return (
        <section className="w-full max-w-6xl mx-auto py-24 px-6">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24">

                <div className="md:w-1/3 flex flex-col items-start pt-4">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                    >
                        Education & <br className="hidden md:block" /> Credentials
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground"
                    >
                        Continuous learning and academic foundation driving engineering excellence.
                    </motion.p>
                </div>

                <div className="md:w-2/3 flex flex-col gap-6">
                    {educationData.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-all"
                        >
                            <div className="flex flex-col gap-1 mb-4 md:mb-0">
                                <h3 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors">
                                    {item.degree}
                                </h3>
                                <p className="text-muted-foreground">{item.school}</p>
                            </div>

                            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-violet-300 w-fit">
                                {item.year}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
