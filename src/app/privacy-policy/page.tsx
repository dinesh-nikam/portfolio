import { Shield, ShieldAlert, BookOpen, Database, Globe, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Dinesh Nikam",
    description: "Privacy Policy and data handling practices for Dinesh Nikam's portfolio.",
};

export default function PrivacyPolicyPage() {
    const lastUpdated = "March 10, 2025";

    return (
        <div className="min-h-screen relative w-full bg-background antialiased pt-32 pb-24 overflow-hidden relative">


            <div className="max-w-4xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                        <Shield className="w-4 h-4" /> Legal & Compliance
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">Privacy Policy</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                        We are committed to protecting your personal information and your right to privacy.
                        This policy outlines our data collection, use, and protection practices.
                    </p>
                    <div className="pt-4 text-sm text-gray-500 font-mono">
                        Last Updated: {lastUpdated}
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-blue max-w-none space-y-12">

                    {/* Section 1 */}
                    <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-500/10 transition-colors duration-500" />
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                            <BookOpen className="w-6 h-6 text-blue-400" />
                            1. Introduction
                        </h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
                            <p>
                                Welcome to dineshnikam.com ("we," "our," or "us"). We want to assure you that when you use our website, your privacy is highly respected and protected.
                                This Privacy Policy specifically explains how we collect, use, and share your information when you visit this portfolio site or interact with our services via the contact form.
                            </p>
                            <p>
                                This Privacy Policy is compliant with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), giving you control over your digital footprint.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-emerald-500/10 transition-colors duration-500" />
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                            <Database className="w-6 h-6 text-emerald-400" />
                            2. Information We Collect
                        </h2>
                        <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">
                            <p>We only collect data that is necessary for communication, analytics, and security purposes. The information we collect falls into two categories:</p>

                            <div className="pl-4 border-l-2 border-emerald-500/50 space-y-4 py-2">
                                <div>
                                    <strong className="text-white block mb-1">A. Information You Provide Directly</strong>
                                    <p className="text-gray-400">When you submit a message through the contact form, we collect your Name, Email Address, and the contents of your message.</p>
                                </div>
                                <div>
                                    <strong className="text-white block mb-1">B. Intelligence Collected Automatically</strong>
                                    <p className="text-gray-400">
                                        To protect against spam and gather general analytics, the system automatically logs specific technical data.
                                        This includes your IP address, coarse geolocation (Country/City matching the IP), browser type, and operating system. We also track marketing attribution references (e.g., UTM parameters) to understand traffic sources.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-purple-500/10 transition-colors duration-500" />
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                            <Globe className="w-6 h-6 text-purple-400" />
                            3. Cookies and Tracking
                        </h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
                            <p>
                                We employ a transparent Cookie preference system. Cookies are small data files placed on your device to enhance site functionality.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-400 mt-4">
                                <li><strong className="text-white">Essential Cookies:</strong> Required to operate the site, log preferences, and ensure security. Cannot be disabled.</li>
                                <li><strong className="text-white">Analytics Cookies:</strong> Optional. Used to aggregate anonymized usage data to help us improve the site&apos;s architecture.</li>
                                <li><strong className="text-white">Marketing Cookies:</strong> Optional. Used for campaign tracking parameters.</li>
                            </ul>
                            <p className="pt-2">
                                You can change your preference at any time by clicking "Cookie Settings" in the website footer.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-orange-500/10 transition-colors duration-500" />
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                            <ShieldAlert className="w-6 h-6 text-orange-400" />
                            4. Your Data Rights
                        </h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
                            <p>
                                We believe in full user autonomy regarding digital data. Subject to applicable laws (such as GDPR or CCPA), you have the right to:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-400 mt-4">
                                <li>Request access to your stored personal data.</li>
                                <li>Request corrections if the personal data we hold is inaccurate.</li>
                                <li>Request the permanent deletion of your data from our databases (The "Right to be Forgotten").</li>
                                <li>Withdraw consent for optional analytics or tracking cookies.</li>
                            </ul>
                            <p className="mt-4 text-gray-400">
                                To exercise any of these rights, please contact us directly. We will process your request within 30 days.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                            <Mail className="w-6 h-6 text-white" />
                            5. Contact Us
                        </h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
                            <p>
                                If you have questions about this Privacy Policy or how your data is handled, you may reach out directly.
                            </p>
                            <div className="bg-black/40 p-6 rounded-xl border border-white/10 mt-6 inline-block">
                                <p className="font-mono text-sm text-white">Email: <a href="mailto:nikamdinesh362@gmail.com" className="text-blue-400 hover:text-blue-300 hover:underline">nikamdinesh362@gmail.com</a></p>
                                <p className="font-mono text-sm text-gray-400 mt-2">Dinesh Nikam</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer nav */}
                <div className="mt-16 text-center">
                    <Link href="/" className="inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-background rounded-md group-hover:bg-opacity-0">
                            Return to Home
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
