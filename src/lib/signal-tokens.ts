"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

/* Bone, Ink & Signal — hex palette mirrored from src/app/globals.css tokens.
   WebGL materials cannot read CSS custom properties, so these constants feed
   every Canvas renderer, keeping 3D visuals in lockstep with the theme. */

export interface SignalTokens {
    background: string;
    foreground: string;
    card: string;
    muted: string;
    border: string;
    primary: string;
}

export const LIGHT_TOKENS: SignalTokens = {
    background: "#f4f1ea",
    foreground: "#141210",
    card: "#fbfaf5",
    muted: "#6e675b",
    border: "rgba(20, 18, 16, 0.12)",
    primary: "#e4572e",
};

export const DARK_TOKENS: SignalTokens = {
    background: "#121110",
    foreground: "#ede9df",
    card: "#1a1815",
    muted: "#a49c8f",
    border: "rgba(237, 233, 223, 0.15)",
    primary: "#e4572e",
};

/** Convert a #rrggbb hex string to an rgba() string with the given alpha. */
export function withAlpha(hex: string, alpha: number): string {
    const value = hex.replace("#", "");
    const full = value.length === 3
        ? value.split("").map((c) => c + c).join("")
        : value;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* Stable subscription helpers for theme-aware 3D palettes. */

const mountedSubscribe = () => () => {};

export function useSignalTokens(): SignalTokens {
    const mounted = useSyncExternalStore(mountedSubscribe, () => true, () => false);
    const { resolvedTheme } = useTheme();
    if (!mounted) return LIGHT_TOKENS;
    return resolvedTheme === "dark" ? DARK_TOKENS : LIGHT_TOKENS;
}