"use client";

import { useEffect, useRef } from "react";

export function ViewTracker({ slug }: { slug: string }) {
    const tracked = useRef(false);

    useEffect(() => {
        if (tracked.current) return;
        tracked.current = true;

        fetch(`/api/articles/${slug}/view`, { method: "POST" }).catch(console.error);
    }, [slug]);

    return null;
}
