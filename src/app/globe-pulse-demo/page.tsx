import { Metadata } from "next";
import { GlobePulse } from "@/components/ui/cobe-globe-pulse";

export const metadata: Metadata = {
  title: "Globe Pulse Demo | Dinesh Nikam",
  description: "Interactive globe visualization demo using Three.js and Cobe.",
  robots: { index: false, follow: false },
};

export default function GlobePulseDemo() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-background p-8 overflow-hidden">
      <div className="w-full max-w-lg">
        <GlobePulse />
      </div>
    </div>
  );
}
