"use client";

import { useEffect, useState } from "react";
import { PAGE_REVEAL_EVENT, hasPageRevealed } from "@/lib/page-reveal";

const FALLBACK_MS = 2400;

/** Resolves true once the preloader signals the page is revealed (or a safe
 *  fallback elapses so content never stays locked if PageLoad is bypassed). */
export function usePageRevealed(): boolean {
    const [revealed, setRevealed] = useState<boolean>(hasPageRevealed);

    useEffect(() => {
        if (revealed) return;
        const onReveal = () => setRevealed(true);
        window.addEventListener(PAGE_REVEAL_EVENT, onReveal);
        const fallback = window.setTimeout(() => setRevealed(true), FALLBACK_MS);
        return () => {
            window.removeEventListener(PAGE_REVEAL_EVENT, onReveal);
            window.clearTimeout(fallback);
        };
    }, [revealed]);

    return revealed;
}