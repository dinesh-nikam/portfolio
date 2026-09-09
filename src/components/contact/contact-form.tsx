"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        project: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            let visitorId = null;
            if (typeof window !== "undefined") {
                visitorId = localStorage.getItem("visitor_id");
            }

            // Extract UTM params and Referrer
            const urlParams = new URLSearchParams(window.location.search);
            const utmSource = urlParams.get("utm_source");
            const utmCampaign = urlParams.get("utm_campaign");
            const utmMedium = urlParams.get("utm_medium");
            const referer = document.referrer || window.location.href;

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    project: formData.project || undefined,
                    message: formData.message,
                    visitorId: visitorId || undefined,
                    referer,
                    utmSource,
                    utmCampaign,
                    utmMedium,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            setIsSuccess(true);
            setFormData({ name: "", email: "", project: "", message: "" });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="w-full relative group"
        >
            <form onSubmit={handleSubmit} className="relative flex flex-col space-y-6 bg-card border border-border p-8 rounded-md shadow-xl">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group/field">
                        <input
                            type="text"
                            required
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="peer w-full bg-muted/30 border border-border rounded-md px-4 py-3.5 pt-6 text-foreground outline-none focus:border-primary/50 focus:bg-muted/50 transition-all duration-300"
                            placeholder=" "
                        />
                        <label htmlFor="name" className="absolute left-4 top-2 text-xs font-medium text-muted-foreground uppercase tracking-wider peer-focus:text-primary peer-focus:-translate-y-0.5 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:text-muted-foreground transition-all duration-300 pointer-events-none">
                            Your Name
                        </label>
                    </div>

                    <div className="relative group/field">
                        <input
                            type="email"
                            required
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="peer w-full bg-muted/30 border border-border rounded-md px-4 py-3.5 pt-6 text-foreground outline-none focus:border-primary/50 focus:bg-muted/50 transition-all duration-300"
                            placeholder=" "
                        />
                        <label htmlFor="email" className="absolute left-4 top-2 text-xs font-medium text-muted-foreground uppercase tracking-wider peer-focus:text-primary peer-focus:-translate-y-0.5 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:text-muted-foreground transition-all duration-300 pointer-events-none">
                            Email Address
                        </label>
                    </div>
                </div>

                <div className="relative group/field">
                    <input
                        type="text"
                        id="project"
                        value={formData.project}
                        onChange={handleChange}
                        className="peer w-full bg-muted/30 border border-border rounded-md px-4 py-3.5 pt-6 text-foreground outline-none focus:border-primary/50 focus:bg-muted/50 transition-all duration-300"
                        placeholder=" "
                    />
                    <label htmlFor="project" className="absolute left-4 top-2 text-xs font-medium text-muted-foreground uppercase tracking-wider peer-focus:text-primary peer-focus:-translate-y-0.5 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:text-muted-foreground transition-all duration-300 pointer-events-none">
                        Project Type / Subject
                    </label>
                </div>

                <div className="relative group/field">
                    <textarea
                        required
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="peer w-full bg-muted/30 border border-border rounded-md px-4 py-3.5 pt-6 text-foreground outline-none focus:border-primary/50 focus:bg-muted/50 transition-all duration-300 resize-none"
                        placeholder=" "
                    />
                    <label htmlFor="message" className="absolute left-4 top-2 text-xs font-medium text-muted-foreground uppercase tracking-wider peer-focus:text-primary peer-focus:-translate-y-0.5 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:text-muted-foreground transition-all duration-300 pointer-events-none">
                        How can we help?
                    </label>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-md text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="group/btn relative w-full flex items-center justify-center gap-3 overflow-hidden rounded-md bg-primary text-primary-foreground px-6 py-4 font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-80"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Sending...</span>
                            </>
                        ) : isSuccess ? (
                            <>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                >
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                </motion.div>
                                <span>Message Sent</span>
                            </>
                        ) : (
                            <>
                                <span>Send Message</span>
                                <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                            </>
                        )}
                    </span>
                </button>
            </form>
        </motion.div>
    );
}