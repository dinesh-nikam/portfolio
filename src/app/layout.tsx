import "./globals.css";
import { Bodoni_Moda, Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import PageLoad from "@/components/page-load";
import CustomCursor from "@/components/custom-cursor";
import VfxCursor from "@/components/vfx-cursor";
import BackgroundProvider from "@/components/background-provider";
import { JsonLdScript, buildPersonSchema, buildWebSiteSchema } from "@/components/seo/json-ld";
import { baseMetadata } from "@/lib/metadata";

// Display serif — Bodoni Moda (editorial print identity)
const bodoniModa = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Body sans — Schibsted Grotesk (distinctive grotesque, not Inter)
const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = baseMetadata;

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data — Person + WebSite (rendered in SSR HTML for crawlers) */}
        <JsonLdScript data={buildPersonSchema()} />
        <JsonLdScript data={buildWebSiteSchema()} />
      </head>
      <body
        className={`${bodoniModa.variable} ${schibstedGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <LenisProvider>
            <PageLoad />
            <CustomCursor />
            <VfxCursor />
            <AnalyticsTracker />
            <BackgroundProvider>{children}</BackgroundProvider>
            <CookieConsent />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}