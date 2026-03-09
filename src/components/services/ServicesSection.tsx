"use client";

import React from "react";
import { motion } from "framer-motion";
import { ServiceRow } from "./ServiceRow";
import { servicesData, statsData } from "@/lib/data";

export function ServicesSection() {
    return (
        <section id="services" className="w-full bg-background relative py-20 lg:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">

                {/* Top Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 lg:mb-32">
                    {statsData.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="flex flex-col gap-2"
                        >
                            <h4 className="text-4xl lg:text-5xl font-black text-foreground">
                                {stat.value}
                            </h4>
                            <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Section Title */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter"
                    >
                        My Quality <br />
                        <span className="text-foreground">Services</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-sm md:text-right"
                    >
                        Delivering world-class digital products with a focus on performance, aesthetics, and user experience.
                    </motion.p>
                </div>

                {/* Services List */}
                <div className="flex flex-col border-t border-white/10 pt-4">
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
