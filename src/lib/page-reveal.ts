"use client";

/* Page reveal coordination — the preloader marks the page as revealed and
   every entrance animation (hero lines, nav) waits for the event instead of
   racing the curtain. Module state survives client-side route changes so a
   soft navigation back to "/" never re-locks the hero. */

export const PAGE_REVEAL_EVENT = "page:revealed";

const SESSION_KEY = "dn-portfolio-loaded";

let revealed = false;

export function markPageRevealed(): void {
    if (revealed) return;
    revealed = true;
    if (typeof window !== "undefined") {
        try {
            sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
            /* storage unavailable — reveal still proceeds */
        }
        window.dispatchEvent(new CustomEvent(PAGE_REVEAL_EVENT));
    }
}

export function hasPageRevealed(): boolean {
    return revealed;
}

/** True when this session already played the preloader (persisted across routes). */
export function sessionAlreadyLoaded(): boolean {
    if (typeof window === "undefined") return false;
    try {
        return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
        return false;
    }
}