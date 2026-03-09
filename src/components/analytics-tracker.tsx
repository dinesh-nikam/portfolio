"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

// Check if we already have a visitor ID in cookies/localStorage, if not generate one
const getOrCreateVisitorId = () => {
    if (typeof window === "undefined") return null;

    // Try to get from localStorage first (more persistent across sessions)
    let visitorId = localStorage.getItem("visitor_id");

    if (!visitorId) {
        visitorId = uuidv4();
        localStorage.setItem("visitor_id", visitorId);
    }

    return visitorId;
};

// Singleton tracking state to prevent duplicate calls in React Strict Mode
let isTrackingInitialized = false;

export function AnalyticsTracker() {
    const pathname = usePathname();

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
        } catch (e) {
            console.error("Analytics heartbeat failed", e);
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
        } catch (e) {
            console.error("Analytics pageview tracking failed", e);
        }
    }, []);

    // Heartbeat interval for time-on-site logic
    useEffect(() => {
        if (typeof window === "undefined" || isTrackingInitialized) return;

        isTrackingInitialized = true;

        // Initial heartbeat on full page load to establish session and visitor profile
        trackHeartbeat();

        // Pulse heartbeat every 15 seconds to update time spent
        const interval = setInterval(() => {
            trackHeartbeat();
        }, 15000);

        return () => clearInterval(interval);
    }, [trackHeartbeat]);

    // Route change tracking (PageView)
    useEffect(() => {
        if (pathname) {
            trackPageView(pathname);
        }
    }, [pathname, trackPageView]);

    return null; // Silent component
}
