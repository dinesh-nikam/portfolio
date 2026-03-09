"use client";

import dynamic from "next/dynamic";

const TubesBackground = dynamic(() => import("./tubes-background").then(mod => mod.TubesBackground), {
    ssr: false
});

export function BackgroundProvider() {
    return <TubesBackground />;
}
