/**
 * Shared case-study data — single source of truth for the projects section,
 * the case-study modal, and server-side OG image generation.
 */

export interface CaseStudyData {
    id: string;
    num: string;
    title: string;
    tagline: string;
    role: string;
    year: string;
    client: string;
    /** Neutral descriptor of the project's domain — shown in the work index. */
    domain: string;
    image: string;
    tech: string[];
    /** Live deployment URL — omit entirely when none can be shared publicly. */
    liveUrl?: string;
    overview: string;
    problem: string;
    approach: string;
    design: {
        description: string;
        highlights: string[];
    };
    engineering: {
        architecture: string;
        codeSnippet?: string;
        decisions: string[];
    };
    result: {
        metric: string;
        summary: string;
    };
}

export const caseStudies: CaseStudyData[] = [
    {
        id: "cybersherlock",
        num: "01",
        title: "Cybersherlock",
        tagline: "IP intelligence visualization and predictive cybersecurity modeling platform.",
        role: "Frontend Architecture & WebGL",
        year: "2025",
        client: "Cybersecurity Enterprise",
        domain: "Cybersecurity / Data Visualization",
        image: "/cybersherlock.webp",
        tech: ["Next.js", "React", "D3.js", "WebGL", "Tailwind CSS", "MongoDB"],
        overview:
            "Cybersherlock transforms massive global IP streams and threat telemetry into low-latency, interactive visual topologies. Built to serve network security architects requiring instant situational awareness.",
        problem:
            "Threat analysts previously combated thousands of unindexed tabular logs with multi-second query response times, causing delayed vulnerability detection during active scans.",
        approach:
            "Engineered a high-density canvas & WebGL data visualizer with client-side indexing and predictive edge querying, removing the rendering bottleneck at the heart of the old stack.",
        design: {
            description:
                "Clean dark-field editorial dashboard with custom monospace telemetrics and high-contrast IP nodes designed for 24/7 security operation centers.",
            highlights: [
                "Dynamic WebGL node graph with fluid camera zoom",
                "Sub-frame micro-interactions for instant threat inspection",
                "Editorial telemetric typographic hierarchy",
            ],
        },
        engineering: {
            architecture:
                "Hybrid Next.js architecture running WebGL shader clusters coupled with edge-cached aggregation pipelines.",
            decisions: [
                "Migrated DOM-heavy SVG graphs to GPU-accelerated WebGL buffers",
                "Implemented memory-efficient ring buffers for live threat ingestion",
                "Optimized Web Worker pipelines for parallel IP resolution",
            ],
        },
        result: {
            metric: "GPU-accelerated",
            summary: "High-density network graphs render interactively — full visual fidelity at node counts where the previous SVG pipeline stalled.",
        },
    },
    {
        id: "hp-connect",
        num: "02",
        title: "HP Connect",
        tagline: "Enterprise visitor management ecosystem with real-time omnichannel verification.",
        role: "Full-Stack Engineering & System Architecture",
        year: "2024",
        client: "Commercial Enterprise",
        domain: "Enterprise Operations / IoT Access",
        image: "/hpconnect.webp",
        tech: ["Next.js", "Node.js", "WebSockets", "MongoDB", "Twilio API"],
        overview:
            "HP Connect is an automated identity and check-in system designed for high-throughput corporate campuses. It manages visitor registration, QR-based badge issuance, and automated host notifications across WhatsApp and Gmail.",
        problem:
            "Physical paper visitor logs caused lobby bottlenecks during peak hours, privacy non-compliance, and zero auditing capabilities for corporate facility managers.",
        approach:
            "Architected an end-to-end contactless workflow using dynamic QR token validation, instant WebSockets kiosk synchronization, and asynchronous notification queues.",
        design: {
            description:
                "Tactile, minimal kiosk interface built for touch terminals with high-contrast inputs, deliberate negative space, and unambiguous visual confirmations.",
            highlights: [
                "Zero-learning-curve kiosk registration flow measured in seconds, not minutes",
                "Dynamic QR digital pass dispatched directly to mobile wallets",
                "Real-time facility occupancy and egress monitoring",
            ],
        },
        engineering: {
            architecture:
                "Distributed Node.js microservices with event-driven WebSockets and resilient external messaging webhooks.",
            decisions: [
                "Stateless cryptographic QR tokens for sub-100ms offline scanner verification",
                "Optimistic UI updates with offline queuing on terminal clients",
                "Strict tenant isolation with automated compliance log pruning",
            ],
        },
        result: {
            metric: "Contactless check-in",
            summary: "Visitors self-register and receive a QR pass on their phone; hosts are notified the moment their guest arrives.",
        },
    },
    {
        id: "ithpl-platform",
        num: "03",
        title: "ITHPL Corporate Platform",
        tagline: "High-throughput web infrastructure and corporate engineering showcase.",
        role: "Full-Stack Development & Performance Engineering",
        year: "2024",
        client: "ITHPL Group",
        domain: "Corporate / Industrial Infrastructure",
        image: "/ithplwebsite.webp",
        tech: ["Next.js", "PHP", "MySQL", "Tailwind CSS", "JavaScript", "REST APIs"],
        liveUrl: "https://ithpl.com",
        overview:
            "Enterprise web portal engineering for an industrial infrastructure leader, highlighting operational facilities, technical capabilities, and global industrial projects.",
        problem:
            "Legacy monolithic architecture suffered from sluggish page loads, outdated presentation, and brittle content maintenance.",
        approach:
            "Modernized the presentation layer with modern responsive layouts, sub-second asset delivery, and a flexible content architecture.",
        design: {
            description:
                "Monochrome editorial aesthetic with confident typography, razor-thin hairlines, and restrained industrial imagery.",
            highlights: [
                "Editorial project showcases with structured technical metrics",
                "Fluid responsive layouts optimized for all corporate devices",
                "Consistent brand identity communicating engineering scale",
            ],
        },
        engineering: {
            architecture:
                "Modernized front-end layer delivering optimized static chunks backed by secure high-availability application services.",
            decisions: [
                "Performance budget enforced across all public routes",
                "Streamlined database schemas and indexed queries",
                "Automated CI/CD pipeline enabling zero-downtime rolling updates",
            ],
        },
        result: {
            metric: "Modernized platform",
            summary: "A public face that finally matches the scale of the engineering behind it — fast, maintainable, and consistent on every device.",
        },
    },
];

/** Look up a case study by its slug/id (used by the OG image route). */
export function getCaseStudy(slug: string): CaseStudyData | undefined {
    return caseStudies.find((c) => c.id === slug);
}
