"use client";

import { motion } from "framer-motion";
import { ServiceRow } from "./ServiceRow";
import { servicesData, statsData } from "@/lib/data";

export function ServicesSection() {
    return (
        <section id="services" className="relative w-full overflow-hidden bg-background py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
                <div className="mb-24 grid grid-cols-2 gap-8 md:grid-cols-4 lg:mb-32">
                    {statsData.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="flex flex-col gap-2"
                        >
                            <span className="hairline" />
                            <h4 className="font-display text-4xl text-foreground lg:text-5xl">
                                {stat.value}
                            </h4>
                            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                        className="text-display"
                    >
                        My Quality <br />
                        Services
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-sm text-lg text-muted-foreground md:text-right"
                    >
                        Delivering world-class digital products with a focus on performance, aesthetics, and user
                        experience.
                    </motion.p>
                </div>

                <div className="flex flex-col border-t border-border pt-4">
                    {servicesData.map((service, index) => (
                        <ServiceRow
                            key={index}
                            num={service.num}
                            title={service.title}
                            description={service.description}
                            delay={0.1 * index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}