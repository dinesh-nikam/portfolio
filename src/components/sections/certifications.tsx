"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { certificationsData } from "@/lib/data";
import { useMediaQuery } from "@/hooks/use-media-query";

// Dynamically import the 3D wall component (no SSR for Three.js)
const Certifications3DWall = dynamic(
    () => import("@/components/ui/certifications-3d-wall").then(mod => mod.Certifications3DWall),
    { ssr: false, loading: () => <Wall3DPlaceholder /> }
);

function Wall3DPlaceholder() {
    return (
        <div className="w-full h-[600px] rounded-3xl bg-foreground/[0.02] border border-foreground/5 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-foreground/20 border-t-foreground/60 animate-spin" />
                <span className="text-muted-foreground text-sm font-light tracking-wide">Loading 3D Gallery...</span>
            </div>
        </div>
    );
}

// Badges/Icons representing the issuers
const IssuerBadge = ({ icon }: { icon: string }) => {
    switch (icon) {
        case "aws":
            return (
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                    <span className="text-orange-400 font-bold text-lg">AWS</span>
                </div>
            );
        case "gcp":
            return (
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <span className="text-blue-400 font-bold text-lg">GCP</span>
                </div>
            );
        case "k8s":
            return (
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                    <span className="text-blue-500 font-bold text-lg">K8s</span>
                </div>
            );
        case "react":
            return (
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <span className="text-cyan-400 font-bold text-lg">META</span>
                </div>
            );
        default:
            return (
                <div className="w-12 h-12 rounded-xl bg-zinc-500/10 flex items-center justify-center border border-zinc-500/20">
                    <span className="text-zinc-400 font-bold text-lg">CERT</span>
                </div>
            );
    }
};

export function CertificationsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Find the full certification data for the selected image (for the enhanced modal)
    const selectedCert = selectedCertImage
        ? certificationsData.find(c => c.image === selectedCertImage) ?? null
        : null;

    return (
        <section id="certifications" ref={containerRef} className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 mx-auto max-w-7xl relative overflow-hidden">

            {/* Section Header */}
            <div className="flex flex-col gap-6 mb-20 relative z-10 max-w-3xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-display text-5xl md:text-7xl lg:text-[6rem] tracking-tighter leading-none"
                >
                    Certifications
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-muted-foreground text-xl md:text-2xl leading-relaxed font-light"
                >
                    Professional credentials and industry-recognized achievements demonstrating expertise in modern technologies.
                </motion.p>
            </div>

            {/* 3D Wall (Desktop) or Card Grid (Mobile) */}
            {mounted && !isMobile ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full h-[600px] rounded-3xl overflow-hidden border border-foreground/5"
                >
                    <Certifications3DWall onSelectCert={setSelectedCertImage} />
                </motion.div>
            ) : (
                /* Mobile Fallback: Clean vertical card list */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 w-full">
                    {certificationsData.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative h-full flex"
                        >
                            {/* Glassmorphic Card */}
                            <div className="relative z-10 p-8 w-full flex flex-col justify-between rounded-[2rem] bg-foreground/[0.02] border border-foreground/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-foreground/[0.04] hover:border-foreground/10 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.05)] hover:-translate-y-1">

                                {/* Hover Glow Background */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-foreground/5 via-transparent to-transparent pointer-events-none" />

                                <div className="flex flex-col sm:flex-row gap-6 items-start w-full relative z-20">
                                    {/* Left: Badge */}
                                    <div className="shrink-0">
                                        <IssuerBadge icon={cert.icon} />
                                    </div>

                                    {/* Right: Info */}
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="flex justify-between items-start gap-4 flex-wrap sm:flex-nowrap">
                                            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground/90 leading-snug">
                                                {cert.title}
                                            </h3>
                                            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase px-3 py-1 bg-foreground/[0.03] border border-foreground/10 rounded-full shrink-0">
                                                {cert.date}
                                            </span>
                                        </div>

                                        <p className="text-muted-foreground">
                                            Issued by <span className="text-foreground/80 font-medium">{cert.issuer}</span>
                                        </p>

                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-sm text-muted-foreground/60 font-mono">ID: {cert.credentialId}</span>
                                        </div>

                                    </div>
                                </div>

                                {/* Actions Footer */}
                                <div className="mt-8 pt-6 border-t border-foreground/5 flex gap-4 w-full relative z-20 flex-wrap sm:flex-nowrap">
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center sm:text-left px-5 py-3 text-sm font-medium rounded-full bg-foreground/[0.03] border border-foreground/10 text-foreground/80 hover:text-foreground hover:bg-foreground/[0.08] hover:border-foreground/20 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                                    >
                                        Verify Credential
                                        <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>

                                    <button
                                        onClick={() => setSelectedCertImage(cert.image)}
                                        className="flex-1 px-5 py-3 text-sm font-medium rounded-full bg-transparent border border-foreground/5 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Preview
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Drag hint for desktop */}
            {mounted && !isMobile && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="text-center text-muted-foreground/40 text-sm mt-6 font-light tracking-wide"
                >
                    Drag to rotate · Click a certificate to preview
                </motion.p>
            )}

            {/* Enhanced Certificate Preview Modal */}
            <AnimatePresence>
                {selectedCertImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedCertImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-background/80 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl bg-muted/10 rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl backdrop-blur-xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedCertImage(null)}
                                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground/60 hover:text-foreground border border-foreground/10 backdrop-blur-md transition-all duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Certificate Image */}
                            <div className="w-full aspect-[1.414/1] max-h-[50vh] relative bg-black/30">
                                <Image
                                    src={selectedCertImage}
                                    alt={selectedCert?.title ?? "Certificate Preview"}
                                    fill
                                    className="object-contain p-4 sm:p-8"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                    priority
                                />
                            </div>

                            {/* Certificate Details Panel */}
                            {selectedCert && (
                                <div className="p-8 flex flex-col gap-4 border-t border-foreground/5">
                                    <div className="flex items-start gap-4">
                                        <IssuerBadge icon={selectedCert.icon} />
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground/90">
                                                {selectedCert.title}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                Issued by <span className="text-foreground/80 font-medium">{selectedCert.issuer}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground/60 font-mono mt-2">
                                        <span>Date: {selectedCert.date}</span>
                                        <span>ID: {selectedCert.credentialId}</span>
                                    </div>

                                    <a
                                        href={selectedCert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 self-start px-6 py-3 text-sm font-medium rounded-full bg-foreground/[0.05] border border-foreground/10 text-foreground/80 hover:text-foreground hover:bg-foreground/[0.1] hover:border-foreground/20 transition-all duration-300 flex items-center gap-2 group/btn"
                                    >
                                        Verify Credential
                                        <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
