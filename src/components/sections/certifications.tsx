"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { certificationsData } from "@/lib/data";
import { Award, ChevronLeft, ChevronRight, ExternalLink, Calendar, ShieldCheck, Eye } from "lucide-react";
import { useCapable } from "@/hooks/use-capable";
import Certifications3DWall from "@/components/ui/certifications-3d-wall";

// Editorial Credential Card
function CertificationCard({ cert, onSelect }: { cert: typeof certificationsData[0]; onSelect: (img: string) => void }) {
    // Render corresponding issuer logo (monochrome)
    const renderIssuerLogo = (iconType: string) => {
        switch (iconType) {
            case "aws":
            case "gcp":
            case "k8s":
            case "react":
                return (
                    <div className="w-10 h-10 rounded-md bg-muted/30 border border-border flex items-center justify-center shrink-0">
                        <span className="text-muted-foreground font-bold text-xs tracking-wider">{iconType === "k8s" ? "CNCF" : iconType === "react" ? "META" : iconType.toUpperCase()}</span>
                    </div>
                );
            default:
                return (
                    <div className="w-10 h-10 rounded-md bg-muted/30 border border-border flex items-center justify-center shrink-0">
                        <span className="text-muted-foreground font-bold text-xs tracking-wider">CERT</span>
                    </div>
                );
        }
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="group relative flex flex-col justify-between w-[320px] sm:w-[380px] h-[480px] shrink-0 rounded-md bg-card border border-border p-8 select-none overflow-hidden transition-all duration-300 hover:border-primary/40"
        >
            <div>
                {/* Header: Issuer Logo & Category badge */}
                <div className="flex items-center justify-between w-full mb-6">
                    {renderIssuerLogo(cert.icon)}
                    <span className="font-mono text-[10px] tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full uppercase font-medium">
                        {cert.category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary leading-snug transition-colors line-clamp-2 h-14">
                    {cert.title}
                </h3>

                {/* Subtitle / Issuer */}
                <p className="text-muted-foreground text-sm font-medium mt-1">
                    Issued by <span className="text-foreground/80">{cert.issuer}</span>
                </p>

                {/* Center Image Preview */}
                <div
                    onClick={() => onSelect(cert.image)}
                    className="relative w-full h-[180px] rounded-md bg-muted/30 overflow-hidden border border-border my-6 flex items-center justify-center cursor-pointer group/preview"
                >
                    <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

                    {/* Zoom Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 bg-muted/20">
                        <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-primary shadow-lg scale-90 group-hover/preview:scale-100 transition-all duration-300">
                            <Eye className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Metadata Details & Verify Button */}
            <div className="mt-auto">
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mb-6">
                    <div className="flex items-center gap-1.5 shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground/70" />
                        <span>{cert.date}</span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-border shrink-0" />
                    <div className="flex items-center gap-1 overflow-hidden">
                        <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground/70 shrink-0" />
                        <span className="truncate">ID: {cert.credentialId}</span>
                    </div>
                </div>

                {/* Verify CTA Button */}
                <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold rounded-md bg-muted/30 hover:bg-muted/50 border border-border hover:border-primary/40 text-foreground transition-all duration-300 active:scale-[0.98] group/btn"
                >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                </a>
            </div>
        </motion.div>
    );
}

export function CertificationsSection() {
    const { capable } = useCapable(1024);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [wallFocus, setWallFocus] = useState<number | null>(null);
    const [wallHovered, setWallHovered] = useState<number | null>(null);

    const checkScrollButtons = () => {
        if (!sliderRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setShowLeftArrow(scrollLeft > 20);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener("scroll", checkScrollButtons);
            // Initial check (deferred to avoid layout thrash)
            requestAnimationFrame(checkScrollButtons);
            window.addEventListener("resize", checkScrollButtons);
        }
        return () => {
            if (slider) slider.removeEventListener("scroll", checkScrollButtons);
            window.removeEventListener("resize", checkScrollButtons);
        };
    }, []);

    useEffect(() => {
        if (!selectedCertImage) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSelectedCertImage(null);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [selectedCertImage]);

    const scroll = (direction: "left" | "right") => {
        if (!sliderRef.current) return;
        const scrollAmount = 400;
        sliderRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    const selectedCert = selectedCertImage
        ? certificationsData.find(c => c.image === selectedCertImage) ?? null
        : null;

    return (
        <section id="certifications" className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 mx-auto max-w-7xl relative overflow-hidden bg-background">

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute inset-0" style={{ background: "radial-gradient(closest-side at 50% 38%, color-mix(in srgb, var(--primary) 11%, transparent), transparent 74%)" }} />
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 42% at 50% 92%, color-mix(in srgb, var(--foreground) 6%, transparent), transparent 72%)" }} />
            </div>
            <div aria-hidden="true" className="noise-overlay pointer-events-none absolute inset-0 z-30" />

            <div className="relative z-10 w-full">
                {/* Section Header */}
                <div className="mb-16 md:mb-20 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
                    <div className="flex flex-col gap-6 max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-2"
                        >
                            <Award className="w-5 h-5 text-primary" />
                            <span className="font-mono text-sm tracking-widest text-primary uppercase font-semibold">
                                Credentials — {String(certificationsData.length).padStart(2, "0")}
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-display tracking-tighter leading-none text-foreground"
                        >
                            The Archive
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light"
                        >
                            Industry-recognized certifications and specialized cloud credentials verifying engineering capability.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="hidden md:flex flex-col gap-3 border-l border-border pl-8 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50"
                    >
                        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary/80" /> Vault {String(certificationsData.length).padStart(2, "0")} · Live</span>
                        <span>{String(certificationsData.length).padStart(2, "0")} specimens held</span>
                        <span>Hover to study · Click to zoom</span>
                    </motion.div>
                </div>

                {/* Capable → interactive 3D cert ring; otherwise the horizontal slider */}
                {capable ? (
                    <div className="mx-auto my-24 flex h-[68vh] min-h-[420px] w-full max-w-5xl flex-col gap-6">
                        <Certifications3DWall
                            certs={certificationsData}
                            focusIndex={wallFocus}
                            onFocusChange={setWallFocus}
                            onHoverChange={setWallHovered}
                            onSelect={setSelectedCertImage}
                        />
                        <div
                            role="tablist"
                            aria-label="Accession index — hover a specimen to study it, click to zoom"
                            className="grid grid-cols-4 gap-px border border-border/80 bg-border/50"
                        >
                            {certificationsData.map((cert, index) => {
                                const active = wallHovered === index || wallFocus === index;
                                return (
                                    <button
                                        key={cert.id}
                                        role="tab"
                                        aria-selected={active}
                                        onMouseEnter={() => setWallFocus(index)}
                                        onMouseLeave={() => setWallFocus(null)}
                                        onClick={() => setSelectedCertImage(cert.image)}
                                        className={`group min-w-0 bg-background px-3 py-3 text-left transition-colors duration-300 ${active ? "bg-primary/5" : "hover:bg-muted/20"}`}
                                    >
                                        <span className={`block font-mono text-[9px] uppercase tracking-[0.3em] ${active ? "text-primary" : "text-muted-foreground/60"}`}>
                                            Nº {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className={`mt-1 block truncate text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>
                                            {cert.title}
                                        </span>
                                        <span className="mt-0.5 block truncate text-[10px] text-muted-foreground/70">{cert.issuer}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="relative w-full overflow-visible my-12 group/slider">

                    {/* Dynamic Floating Arrows */}
                    <AnimatePresence>
                        {showLeftArrow && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => scroll("left")}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-card/90 backdrop-blur-md border border-border hover:border-primary/40 text-foreground flex items-center justify-center shadow-lg active:scale-95 transition-all duration-300"
                                aria-label="Scroll Left"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {showRightArrow && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => scroll("right")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-card/90 backdrop-blur-md border border-border hover:border-primary/40 text-foreground flex items-center justify-center shadow-lg active:scale-95 transition-all duration-300"
                                aria-label="Scroll Right"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Left & Right gradient edge fades (Desktop) */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-20 hidden md:block" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-20 hidden md:block" />

                    {/* Native horizontal slider */}
                    <div
                        ref={sliderRef}
                        className="w-full flex gap-8 overflow-x-auto scrollbar-none pb-12 pt-4 px-6 md:px-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing scroll-smooth"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {certificationsData.map((cert) => (
                            <div key={cert.id} className="snap-start">
                                <CertificationCard cert={cert} onSelect={setSelectedCertImage} />
                            </div>
                        ))}
                    </div>
                    </div>
                )}

                {/* Interaction indicator */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-muted-foreground/50 text-xs tracking-wider font-mono uppercase mt-4"
                >
                    {capable ? "Hover a frame or index entry to study · Click to zoom" : "Swipe to browse · Click preview to zoom"}
                </motion.p>
            </div>

            {/* Certificate Zoom Modal */}
            <AnimatePresence>
                {selectedCertImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedCertImage(null)}
                        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8 bg-background/95 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 40 }}
                            transition={{ type: "spring", damping: 28, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl bg-card rounded-md overflow-hidden border border-border shadow-2xl"
                        >
                            {/* Header Close button */}
                            <button
                                onClick={() => setSelectedCertImage(null)}
                                className="absolute top-6 right-6 z-55 p-3 rounded-full bg-muted/30 hover:bg-muted/50 text-foreground border border-border backdrop-blur-md active:scale-95 transition-all duration-300"
                                aria-label="Close Preview"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Certificate Image Frame */}
                            <div className="w-full aspect-[1.5/1] max-h-[55vh] relative bg-muted/30 flex items-center justify-center">
                                <Image
                                    src={selectedCertImage}
                                    alt={selectedCert?.title ?? "Certificate High-Resolution Preview"}
                                    fill
                                    className="object-contain p-6 sm:p-12"
                                    sizes="(max-width: 1200px) 100vw, 1200px"
                                    priority
                                    unoptimized // Keep original sharpness
                                />
                            </div>

                            {/* Info Details Section */}
                            {selectedCert && (
                                <div className="p-8 sm:p-10 bg-muted/30 border-t border-border">
                                    <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                                        Accession Nº {String(certificationsData.findIndex(c => c.image === selectedCertImage) + 1).padStart(2, "0")} · {selectedCert.category} · Credential {selectedCert.credentialId}
                                    </p>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-primary/10 border border-primary/20 rounded-md text-primary">
                                                <Award className="w-6 h-6" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                                                    {selectedCert.title}
                                                </h3>
                                                <p className="text-muted-foreground text-sm font-medium">
                                                    Official credential verified by <span className="text-foreground font-semibold">{selectedCert.issuer}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <a
                                            href={selectedCert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="shrink-0 flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold rounded-md bg-primary hover:bg-primary/90 border border-primary text-primary-foreground transition-all duration-300 active:scale-95"
                                        >
                                            <span>Verify Authority</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>

                                    {/* Footer details */}
                                    <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-6 pt-6 border-t border-border text-xs text-muted-foreground font-mono">
                                        <span>Issued: {selectedCert.date}</span>
                                        <span>Credential Identifier: {selectedCert.credentialId}</span>
                                        <span>Focus: {selectedCert.category} Engineering</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}