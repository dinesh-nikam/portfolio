"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Layers, Zap } from "lucide-react";

const services = [
    {
        icon: Monitor,
        title: "Frontend Engineering",
        description: "Building pixel-perfect, highly responsive, and accessible user interfaces using React, Next.js, and modern CSS architectures."
    },
    {
        icon: Server,
        title: "Backend Architecture",
        description: "Designing scalable REST and GraphQL APIs, managing complex state, and building robust microservices with Node.js and TypeScript."
    },
    {
        icon: Layers,
        title: "UI/UX & Interaction",
        description: "Translating static designs into fluid, cinematic digital experiences leveraging Framer Motion, GSAP, and WebGL."
    },
    {
        icon: Zap,
        title: "Performance Optimization",
        description: "Auditing and refining web applications for maximum speed, SEO efficiency, and minimal resource consumption."
    }
];

export function ServicesSection() {
    return (
        <section id="services" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-secondary/50">
            <div className="max-w-7xl mx-auto flex flex-col gap-24">

                <h2 className="text-title text-center max-w-2xl mx-auto">
                    Capabilities spanning the entire product spectrum.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border max-w-5xl mx-auto w-full">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            className="bg-background p-12 flex flex-col gap-6 group hover:bg-secondary/30 transition-colors"
                        >
                            <div className="p-4 w-fit rounded-full border border-border bg-background group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                                <service.icon className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-medium tracking-tight mt-4">
                                {service.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed font-light">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
