import Link from "next/link";
import { Home, Search, Mail } from "lucide-react";
import { createMetadata, SITE_URL } from "@/lib/metadata";
import { JsonLdScript, buildBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata = createMetadata({
  title: "404 — Page Not Found",
  description:
    "The page you're looking for doesn't exist. Return to the homepage or browse other sections of Dinesh Nikam's portfolio.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
});

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background pt-24 pb-32 px-6 md:px-12">
      <JsonLdScript
        data={buildBreadcrumbSchema([
          { name: "Home", item: SITE_URL },
          { name: "404 — Page Not Found", item: `${SITE_URL}/404` },
        ])}
      />
      <div className="max-w-2xl w-full text-center">
        <div className="flex flex-col items-center gap-8">
          {/* 404 Display */}
          <h1 className="text-[8rem] md:text-[10rem] font-bold text-foreground/10 tracking-[0.1em]">
            404
          </h1>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            This page doesn&apos;t exist
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
            The page you&apos;re looking for has either been moved, deleted, or
            never existed. Let&apos;s get you back on track.
          </p>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-muted border border-border hover:bg-muted/50 transition-colors text-sm font-medium"
            >
              <Search className="w-4 h-4" />
              Read Writing
            </Link>
            <Link
              href="/contactme"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-muted border border-border hover:bg-muted/50 transition-colors text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
