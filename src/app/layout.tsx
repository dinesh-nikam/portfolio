import type { Metadata } from "next";
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google"; // Changed to Inter
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { PageLoad } from "@/components/page-load";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import dynamic from "next/dynamic";

import { BackgroundProvider } from "@/components/background-provider";

// Use Inter for primary typography (clean, minimalist, editorial)
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Dinesh Nikam | Full Stack Developer", // Updated title
  description: "Minimalist, luxury, cinematic portfolio experience by Principal Product Designer and Senior Frontend Architect.", // Updated desc
  keywords: ["Software developer", "portfolio", "react", "next.js", "framer motion", "minimalist"],
  openGraph: {
    title: "Dinesh Nikam | Creative Developer",
    description: "Minimalist, luxury, cinematic portfolio experience.",
    url: "https://dineshnikam.com",
    siteName: "Dinesh Nikam Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dinesh Nikam | Creative Developer",
    description: "Minimalist, luxury, cinematic portfolio experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <PageLoad />
            <CustomCursor />
            <AnalyticsTracker />
            <BackgroundProvider />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
