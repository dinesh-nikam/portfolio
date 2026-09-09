"use client";

import { useMemo, useSyncExternalStore } from "react";

/* Capability gates for premium features:
   - fine pointer (no touch / no trackpads-only gestures)
   - prefers-reduced-motion: no-preference
   - optional min-width media query
   - client-only (false on the server) */

const FINE_POINTER_QUERY = "(pointer: fine)";
const NO_REDUCED_MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

const mqlCache = new Map<string, MediaQueryList | null>();

function getMql(query: string): MediaQueryList | null {
    if (typeof window === "undefined") return null;
    let mql = mqlCache.get(query);
    if (!mql) {
        mql = window.matchMedia(query);
        mqlCache.set(query, mql);
    }
    return mql;
}

function subscribeTo(query: string) {
    return (onStoreChange: () => void) => {
        const mql = getMql(query);
        if (!mql) return () => {};
        mql.addEventListener("change", onStoreChange);
        return () => mql.removeEventListener("change", onStoreChange);
    };
}

const mountedSubscribe = () => () => {};

const finePointerSubscribe = subscribeTo(FINE_POINTER_QUERY);
const noReducedMotionSubscribe = subscribeTo(NO_REDUCED_MOTION_QUERY);

export interface Capability {
    mounted: boolean;
    finePointer: boolean;
    noReducedMotion: boolean;
    matchesWidth: boolean;
    /** true only when every gate passes on the client */
    capable: boolean;
}

export function useCapable(minWidth?: number): Capability {
    const widthQuery = minWidth != null ? `(min-width: ${minWidth}px)` : null;

    const mounted = useSyncExternalStore(mountedSubscribe, () => true, () => false);
    const finePointer = useSyncExternalStore(
        finePointerSubscribe,
        () => getMql(FINE_POINTER_QUERY)?.matches ?? false,
        () => false
    );
    const noReducedMotion = useSyncExternalStore(
        noReducedMotionSubscribe,
        () => getMql(NO_REDUCED_MOTION_QUERY)?.matches ?? false,
        () => false
    );

    const widthStore = useMemo(() => {
        if (!widthQuery) {
            return {
                subscribe: mountedSubscribe,
                getSnapshot: () => true,
                getServerSnapshot: () => true,
            };
        }
        const subscribe = subscribeTo(widthQuery);
        return {
            subscribe,
            getSnapshot: () => getMql(widthQuery)?.matches ?? false,
            getServerSnapshot: () => false,
        };
    }, [widthQuery]);

    const matchesWidth = useSyncExternalStore(
        widthStore.subscribe,
        widthStore.getSnapshot,
        widthStore.getServerSnapshot
    );

    return {
        mounted,
        finePointer,
        noReducedMotion,
        matchesWidth,
        capable: mounted && finePointer && noReducedMotion && matchesWidth,
    };
}