import { ContactHero } from "@/components/contact/contact-hero";
import { AvailabilityStatus } from "@/components/contact/availability-status";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactCard } from "@/components/contact/contact-card";
import { SocialLinks } from "@/components/contact/social-links";
import { NavigationBar } from "@/components/navigation-bar";
import { Mail, Briefcase } from "lucide-react";

export const metadata = {
    title: "Contact | Dinesh Nikam - Software Engineer",
    description: "Get in touch for freelance opportunities, collaborations, and discussions about creative technology.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
            <NavigationBar />
            {/* Clean Background */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_100%)]" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column: Text & Info */}
                    <div className="flex flex-col space-y-12">
                        <div className="flex flex-col space-y-8">
                            <AvailabilityStatus />
                            <ContactHero />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ContactCard
                                title="Collaborate"
                                description="Open for selected freelance projects and consulting."
                                icon={<Briefcase className="w-6 h-6 text-white/80 group-hover:text-white transition-colors duration-300" />}
                                href="mailto:nikamdinesh362@gmail.com?subject=Freelance%20Enquiry"
                                delay={0.4}
                            />
                            <ContactCard
                                title="Say Hello"
                                description="Just want to chat about tech or design? Drop a line."
                                icon={<Mail className="w-6 h-6 text-white/80 group-hover:text-white transition-colors duration-300" />}
                                href="mailto:nikamdinesh362@gmail.com?subject=Saying%20Hello"
                                delay={0.5}
                            />
                        </div>

                        <SocialLinks />
                    </div>

                    {/* Right Column: Form */}
                    <div className="flex items-center justify-center lg:justify-end">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
