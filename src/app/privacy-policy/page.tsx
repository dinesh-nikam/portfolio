import { Shield, ShieldAlert, BookOpen, Database, Globe, Mail } from "lucide-react";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy and data handling practices for Dinesh Nikam's portfolio. GDPR and CCPA compliant.",
  ogImage: "https://dineshnikam.com/og-image.png",
});

export default function PrivacyPolicyPage() {
    const lastUpdated = "March 10, 2025";

    return (
        <div className="min-h-screen w-full bg-background antialiased pt-32 pb-24 overflow-hidden">

            <div className="max-w-4xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                        <Shield className="w-4 h-4" /> Legal & Compliance
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">Privacy Policy</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                        We are committed to protecting your personal information and your right to privacy.
                        This policy outlines our data collection, use, and protection practices.
                    </p>
                    <div className="pt-4 text-sm text-muted-foreground font-mono">
                        Last Updated: {lastUpdated}
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-none space-y-12">

                    {/* Section 1 */}
                    <section className="rounded-md bg-card border border-border p-8 md:p-10 relative">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
                            <BookOpen className="w-6 h-6 text-primary" />
                            1. Introduction
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                            <p>
                                Welcome to dineshnikam.com (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We want to assure you that when you use our website, your privacy is highly respected and protected.
                                This Privacy Policy specifically explains how we collect, use, and share your information when you visit this portfolio site or interact with our services via the contact form.
                            </p>
                            <p>
                                This Privacy Policy is compliant with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), giving you control over your digital footprint.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="rounded-md bg-card border border-border p-8 md:p-10 relative">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
                            <Database className="w-6 h-6 text-primary" />
                            2. Information We Collect
                        </h2>
                        <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
                            <p>We only collect data that is necessary for communication, analytics, and security purposes. The information we collect falls into two categories:</p>

                            <div className="pl-4 border-l-2 border-primary/50 space-y-4 py-2">
                                <div>
                                    <strong className="text-foreground block mb-1">A. Information You Provide Directly</strong>
                                    <p className="text-muted-foreground">When you submit a message through the contact form, we collect your Name, Email Address, and the contents of your message.</p>
                                </div>
                                <div>
                                    <strong className="text-foreground block mb-1">B. Intelligence Collected Automatically</strong>
                                    <p className="text-muted-foreground">
                                        To protect against spam and gather general analytics, the system automatically logs specific technical data.
                                        This includes your IP address, coarse geolocation (Country/City matching the IP), browser type, and operating system. We also track marketing attribution references (e.g., UTM parameters) to understand traffic sources.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="rounded-md bg-card border border-border p-8 md:p-10 relative">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
                            <Globe className="w-6 h-6 text-primary" />
                            3. Cookies and Tracking
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                            <p>
                                We employ a transparent Cookie preference system. Cookies are small data files placed on your device to enhance site functionality.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-4">
                                <li><strong className="text-foreground">Essential Cookies:</strong> Required to operate the site, log preferences, and ensure security. Cannot be disabled.</li>
                                <li><strong className="text-foreground">Analytics Cookies:</strong> Optional. Used to aggregate anonymized usage data to help us improve the site&apos;s architecture.</li>
                                <li><strong className="text-foreground">Marketing Cookies:</strong> Optional. Used for campaign tracking parameters.</li>
                            </ul>
                            <p className="pt-2">
                                You can change your preference at any time by clicking &quot;Cookie Settings&quot; in the website footer.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="rounded-md bg-card border border-border p-8 md:p-10 relative">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
                            <ShieldAlert className="w-6 h-6 text-primary" />
                            4. Your Data Rights
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                            <p>
                                We believe in full user autonomy regarding digital data. Subject to applicable laws (such as GDPR or CCPA), you have the right to:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-4">
                                <li>Request access to your stored personal data.</li>
                                <li>Request corrections if the personal data we hold is inaccurate.</li>
                                <li>Request the permanent deletion of your data from our databases (The &quot;Right to be Forgotten&quot;).</li>
                                <li>Withdraw consent for optional analytics or tracking cookies.</li>
                            </ul>
                            <p className="mt-4 text-muted-foreground">
                                To exercise any of these rights, please contact us directly. We will process your request within 30 days.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="rounded-md bg-card border border-border p-8 md:p-10 relative">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
                            <Mail className="w-6 h-6 text-primary" />
                            5. Contact Us
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                            <p>
                                If you have questions about this Privacy Policy or how your data is handled, you may reach out directly.
                            </p>
                            <div className="bg-muted/30 p-6 rounded-md border border-border mt-6 inline-block">
                                <p className="font-mono text-sm text-foreground">Email: <a href="mailto:nikamdinesh362@gmail.com" className="text-primary hover:text-primary/80 hover:underline">nikamdinesh362@gmail.com</a></p>
                                <p className="font-mono text-sm text-muted-foreground mt-2">Dinesh Nikam</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer nav */}
                <div className="mt-16 text-center">
                    <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors">
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}