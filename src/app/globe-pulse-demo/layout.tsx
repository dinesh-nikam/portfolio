import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Globe Pulse Demo",
  description: "Interactive 3D globe with pulse markers showcasing global presence.",
  robots: { index: false, follow: false },
};

export default function GlobePulseDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
