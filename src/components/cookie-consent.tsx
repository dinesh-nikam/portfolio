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
            if (consent) {
                setPreferences(JSON.parse(consent));
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
                <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">

                    {!showCustomize ? (
                        <div className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-white/5 rounded-xl text-blue-400 shrink-0">
                                    <Cookie className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight">We value your privacy</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                                        <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 ml-1 inline-flex items-center gap-0.5 group">
                                            Read Policy
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 bg-white text-black py-2.5 px-4 rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] text-sm whitespace-nowrap"
                                >
                                    Accept All
                                </button>
                                <button
                                    onClick={handleRejectNonEssential}
                                    className="flex-1 bg-white/5 text-white py-2.5 px-4 rounded-xl font-medium hover:bg-white/10 transition-colors border border-white/10 text-sm whitespace-nowrap"
                                >
                                    Reject All
                                </button>
                                <button
                                    onClick={() => setShowCustomize(true)}
                                    className="p-2.5 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 hover:text-white transition-colors border border-white/10 shrink-0"
                                    title="Customize Preferences"
                                >
                                    <Settings className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col max-h-[85vh]">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-blue-400" />
                                    Cookie Preferences
                                </h3>
                                <button
                                    onClick={() => setShowCustomize(false)}
                                    className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto space-y-6">
                                {/* Essential */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-white font-medium flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                            Essential Cookies
                                        </h4>
                                        <span className="text-xs uppercase font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Always On</span>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed pl-4 border-l border-white/10 ml-1">
                                        These cookies are required for the website to function properly. They cannot be disabled.
                                    </p>
                                </div>

                                {/* Analytics */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-white font-medium flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full transition-colors ${preferences.analytics ? "bg-emerald-500" : "bg-gray-600"}`} />
                                            Analytics Cookies
                                        </h4>
                                        <button
                                            onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                                            className={`relative w-10 h-6 rounded-full transition-colors duration-300 outline-none ${preferences.analytics ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-white/10 border border-white/20'}`}
                                        >
                                            <div className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${preferences.analytics ? 'translate-x-4 shadow-[0_0_10px_rgba(16,185,129,0.5)] bg-emerald-400' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed pl-4 border-l border-white/10 ml-1">
                                        Allow us to analyze site usage and measure performance. Help us improve the experience for all users.
                                    </p>
                                </div>

                                {/* Marketing */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-white font-medium flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full transition-colors ${preferences.marketing ? "bg-purple-500" : "bg-gray-600"}`} />
                                            Marketing Cookies
                                        </h4>
                                        <button
                                            onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                                            className={`relative w-10 h-6 rounded-full transition-colors duration-300 outline-none ${preferences.marketing ? 'bg-purple-500/20 border border-purple-500/50' : 'bg-white/10 border border-white/20'}`}
                                        >
                                            <div className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${preferences.marketing ? 'translate-x-4 shadow-[0_0_10px_rgba(168,85,247,0.5)] bg-purple-400' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed pl-4 border-l border-white/10 ml-1">
                                        Used to deliver tailored content and track marketing campaign effectiveness.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 border-t border-white/10 bg-black/40">
                                <button
                                    onClick={handleSaveSelection}
                                    className="w-full bg-white text-black py-3 px-4 rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
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
