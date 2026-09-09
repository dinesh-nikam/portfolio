"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X, Check, Cookie, Settings } from "lucide-react";
import Link from "next/link";

type CookiePreferences = {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
};

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [showCustomize, setShowCustomize] = useState(false);

    const [preferences, setPreferences] = useState<CookiePreferences>({
        essential: true, // Always true
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        // Check if consent has already been given
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            // Slight delay before showing to let initial animations finish
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }

        // Listen for internal event to re-open cookie settings
        const handleOpenSettings = () => {
            const currentConsent = localStorage.getItem("cookie_consent");
            if (currentConsent) {
                setPreferences(JSON.parse(currentConsent));
            }
            setIsVisible(true);
            setShowCustomize(true);
        };

        window.addEventListener("open-cookie-settings", handleOpenSettings);
        return () => window.removeEventListener("open-cookie-settings", handleOpenSettings);
    }, []);

    const savePreferences = (prefs: CookiePreferences) => {
        localStorage.setItem("cookie_consent", JSON.stringify(prefs));
        setIsVisible(false);
        setShowCustomize(false);
    };

    const handleAcceptAll = () => {
        savePreferences({ essential: true, analytics: true, marketing: true });
    };

    const handleRejectNonEssential = () => {
        savePreferences({ essential: true, analytics: false, marketing: false });
    };

    const handleSaveSelection = () => {
        savePreferences(preferences);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[480px] z-50 pointer-events-auto"
            >
                <div className="bg-card/95 backdrop-blur-xl border border-border rounded-md shadow-2xl overflow-hidden">

                    {!showCustomize ? (
                        <div className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-primary/10 border border-primary/20 rounded-md text-primary shrink-0">
                                    <Cookie className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">We value your privacy</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                                        <Link href="/privacy-policy" className="text-primary hover:text-primary/80 ml-1 inline-flex items-center gap-0.5 group">
                                            Read Policy
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 bg-primary text-primary-foreground py-2.5 px-4 rounded-md font-semibold hover:bg-primary/90 transition-colors text-sm whitespace-nowrap"
                                >
                                    Accept All
                                </button>
                                <button
                                    onClick={handleRejectNonEssential}
                                    className="flex-1 bg-muted/30 text-foreground py-2.5 px-4 rounded-md font-medium hover:bg-muted/50 transition-colors border border-border text-sm whitespace-nowrap"
                                >
                                    Reject All
                                </button>
                                <button
                                    onClick={() => setShowCustomize(true)}
                                    className="p-2.5 bg-muted/30 text-muted-foreground rounded-md hover:bg-muted/50 hover:text-foreground transition-colors border border-border shrink-0"
                                    title="Customize Preferences"
                                >
                                    <Settings className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col max-h-[85vh]">
                            <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
                                <h3 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-primary" />
                                    Cookie Preferences
                                </h3>
                                <button
                                    onClick={() => setShowCustomize(false)}
                                    className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted/50 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto space-y-6">
                                {/* Essential */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-foreground font-medium flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            Essential Cookies
                                        </h4>
                                        <span className="text-xs uppercase font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">Always On</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed pl-4 border-l border-border ml-1">
                                        These cookies are required for the website to function properly. They cannot be disabled.
                                    </p>
                                </div>

                                {/* Analytics */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-foreground font-medium flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full transition-colors ${preferences.analytics ? "bg-primary" : "bg-border"}`} />
                                            Analytics Cookies
                                        </h4>
                                        <button
                                            onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                                            aria-label="Toggle Analytics Cookies"
                                            className={`relative w-10 h-6 rounded-full transition-colors duration-300 outline-none ${preferences.analytics ? 'bg-primary/20 border border-primary/50' : 'bg-muted/30 border border-border'}`}
                                        >
                                            <div className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full transition-transform duration-300 ${preferences.analytics ? 'translate-x-4 bg-primary' : 'translate-x-0 bg-background border border-border'}`} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed pl-4 border-l border-border ml-1">
                                        Allow us to analyze site usage and measure performance. Help us improve the experience for all users.
                                    </p>
                                </div>

                                {/* Marketing */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-foreground font-medium flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full transition-colors ${preferences.marketing ? "bg-primary" : "bg-border"}`} />
                                            Marketing Cookies
                                        </h4>
                                        <button
                                            onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                                            aria-label="Toggle Marketing Cookies"
                                            className={`relative w-10 h-6 rounded-full transition-colors duration-300 outline-none ${preferences.marketing ? 'bg-primary/20 border border-primary/50' : 'bg-muted/30 border border-border'}`}
                                        >
                                            <div className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full transition-transform duration-300 ${preferences.marketing ? 'translate-x-4 bg-primary' : 'translate-x-0 bg-background border border-border'}`} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed pl-4 border-l border-border ml-1">
                                        Used to deliver tailored content and track marketing campaign effectiveness.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 border-t border-border bg-muted/30">
                                <button
                                    onClick={handleSaveSelection}
                                    className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Check className="w-4 h-4" /> Save Preferences
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}