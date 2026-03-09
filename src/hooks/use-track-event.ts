"use client";

import { useCallback } from "react";

export function useTrackEvent() {
    const trackEvent = useCallback(async (eventName: string, eventData?: Record<string, any>) => {
        // We get visitor_id from localStorage assuming AnalyticsTracker already initialized it
        const visitorId = typeof window !== "undefined" ? localStorage.getItem("visitor_id") : null;
        if (!visitorId) return;

        try {
            await fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "event",
                    visitorId,
                    eventName,
                    eventData,
                    referer: document.referrer,
                }),
            });
        } catch (e) {
            console.error("Failed to track event", e);
        }
    }, []);

    return { trackEvent };
}
