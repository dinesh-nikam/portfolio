"use client";

import { useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

// Check if we already have a visitor ID in cookies/localStorage, if not generate one
const getOrCreateVisitorId = () => {
    if (typeof window === "undefined") return null;

    // Respect the visitor's cookie choice — analytics fires only after consent.
    // Without this gate the 15s heartbeat spams a failing DB endpoint all session.
    try {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) return null;
        if (!JSON.parse(consent).analytics) return null;
    } catch {
        return null;
    }

    // Try to get from localStorage first (more persistent across sessions)
    let visitorId = localStorage.getItem("visitor_id");

    if (!visitorId) {
        visitorId = uuidv4();
        localStorage.setItem("visitor_id", visitorId);
    }

    return visitorId;
};

export function AnalyticsTracker() {
    const pathname = usePathname();
    const trackingInitialized = useRef(false);

    const trackHeartbeat = useCallback(async () => {
        const visitorId = getOrCreateVisitorId();
        if (!visitorId) return;

        try {
            await fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "heartbeat",
                    visitorId,
                    pathname: window.location.pathname,
                    referer: document.referrer,
                }),
                keepalive: true, // ensure it sends even if page unloads
            });
        } catch {
            // Tracking is non-essential; never surface failures to the console.
        }
    }, []);

    const trackPageView = useCallback(async (path: string) => {
        const visitorId = getOrCreateVisitorId();
        if (!visitorId) return;

        try {
            await fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "pageview",
                    visitorId,
                    pathname: path,
                    referer: document.referrer,
                }),
            });
        } catch {
            // Tracking is non-essential; never surface failures to the console.
        }
    }, []);

    // Heartbeat interval for time-on-site logic
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Initial heartbeat on full page load to establish session and visitor profile
        if (!trackingInitialized.current) {
            trackingInitialized.current = true;
            trackHeartbeat();
        }

        let interval: NodeJS.Timeout | null = null;

        const startHeartbeat = () => {
            if (!interval) {
                interval = setInterval(() => {
                    trackHeartbeat();
                }, 15000);
            }
        };

        const stopHeartbeat = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        };

        // Start initially
        if (document.visibilityState === "visible") {
            startHeartbeat();
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                startHeartbeat();
            } else {
                stopHeartbeat();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            stopHeartbeat();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [trackHeartbeat]);

    // Route change tracking (PageView)
    useEffect(() => {
        if (pathname) {
            trackPageView(pathname);
        }
    }, [pathname, trackPageView]);

    return null; // Silent component
}
