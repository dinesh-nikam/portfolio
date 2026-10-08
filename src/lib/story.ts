/* ────────────────────────────────────────────────────────────────────
   "THE MAKER BEHIND THE SCREEN" — story data layer
   Single source of truth for the cinematic experience at /story.
   All copy, scene boundaries and chapter data live here so the
   narrative can be tuned without touching scene components.

   Facts (metrics, roles, dates) are drawn from the verified
   case studies in src/components/sections/projects.tsx and
   src/lib/data.ts. Nothing is invented.
   ──────────────────────────────────────────────────────────────────── */

export const STORY = {
  name: "DINESH NIKAM",
  role: "FULL STACK DEVELOPER",
  location: "PUNE, INDIA",
  email: "nikamdinesh362@gmail.com",
  github: "https://github.com/dinesh-nikam",
  linkedin: "https://linkedin.com/in/dinesh-nikam3/",
  tagline: "I like turning ideas into things people can actually use.",
  year: "© 2026",
} as const;

/* Chapter labels shown in the minimal floating navigation (07 total). */
export const STORY_CHAPTERS = [
  "INTRO",
  "CURIOSITY",
  "BUILD",
  "WORK",
  "PHILOSOPHY",
  "ABOUT",
  "CONTACT",
] as const;

/** Scroll-progress boundaries (0..1) where the chapter label changes. */
export const CHAPTER_BOUNDS = [0.08, 0.24, 0.38, 0.6, 0.78, 0.9];

export function chapterForProgress(progress: number): string {
  let index = 0;
  for (const bound of CHAPTER_BOUNDS) {
    if (progress >= bound) index += 1;
  }
  return STORY_CHAPTERS[index];
}

/* ── Scene copy ──────────────────────────────────────────────────── */

export const EMERGENCE = {
  intro: ["DINESH NIKAM", "FULL STACK DEVELOPER"],
  line: "I like turning ideas into things people can actually use.",
} as const;

export const CURIOSITY = {
  moments: [
    { kicker: "01", lines: ["Before the code,", "there was curiosity."] },
    { kicker: "02", lines: ["I've always been interested", "in how things work."] },
    {
      kicker: "03",
      lines: [
        "Somewhere along the way, I realized",
        "I didn't just want to understand things.",
      ],
    },
    { kicker: "04", lines: ["I wanted to build them."] },
  ],
} as const;

export const BUILDER = {
  moments: [
    {
      lines: ["That's where engineering became", "more than technology for me."],
    },
    { lines: ["It became a way to turn ideas", "into experiences."] },
  ],
} as const;

export const CAPABILITY = {
  heading: "I BUILD",
  phrases: [
    "DIGITAL PRODUCTS",
    "INTERACTIVE EXPERIENCES",
    "SCALABLE WEB APPLICATIONS",
    "DESIGN SYSTEMS",
    "CREATIVE TECHNOLOGY",
  ],
  techNote: "Technology is my toolkit.",
  tech: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Three.js",
    "WebGL",
    "APIs",
    "Databases",
    "Cloud",
    "GSAP",
  ],
} as const;

/* ── Projects as memory chapters ─────────────────────────────────── */

export interface StoryChapter {
  id: string;
  index: string;
  title: string;
  tagline: string;
  image: string;
  year: string;
  role: string;
  /** Progressive reveal steps: label is the cinematic beat, text the substance. */
  steps: { label: string; text: string }[];
  result: string;
  tech: string[];
  liveUrl?: string;
}

export const STORY_CHAPTERS_DATA: StoryChapter[] = [
  {
    id: "cybersherlock",
    index: "01",
    title: "Cybersherlock",
    tagline: "IP intelligence visualization and predictive cybersecurity modeling.",
    image: "/cybersherlock.webp",
    year: "2025",
    role: "Frontend Architecture & WebGL",
    steps: [
      {
        label: "Someone had a problem.",
        text: "Threat analysts were fighting thousands of unindexed logs — four-second query times while attacks were live.",
      },
      {
        label: "I saw an opportunity.",
        text: "Global IP streams could be read like a living map instead of searched like a database.",
      },
      {
        label: "I designed a solution.",
        text: "A dark-field visual topology — WebGL nodes, monospace telemetrics, instant situational awareness.",
      },
      {
        label: "Then I built it.",
        text: "GPU-accelerated buffers, ring-buffer ingestion, and Web Worker pipelines for parallel IP resolution.",
      },
    ],
    result: "60 FPS @ 50K+ nodes",
    tech: ["Next.js", "React", "D3.js", "WebGL", "MongoDB"],
  },
  {
    id: "hp-connect",
    index: "02",
    title: "HP Connect",
    tagline: "Enterprise visitor management with real-time omnichannel verification.",
    image: "/hpconnect.webp",
    year: "2024",
    role: "Full-Stack Engineering & System Architecture",
    steps: [
      {
        label: "Someone had a problem.",
        text: "Paper visitor logs meant lobby bottlenecks, privacy gaps, and no audit trail for facility managers.",
      },
      {
        label: "I saw an opportunity.",
        text: "A check-in so simple it disappears — contactless, verifiable, and finished before the visitor looks up.",
      },
      {
        label: "I designed a solution.",
        text: "A tactile kiosk interface with high-contrast inputs, deliberate negative space, and unambiguous confirmations.",
      },
      {
        label: "Then I built it.",
        text: "Stateless cryptographic QR tokens, real-time WebSocket kiosk sync, and asynchronous notification queues.",
      },
    ],
    result: "< 20s check-in time",
    tech: ["Next.js", "Node.js", "WebSockets", "Twilio API"],
  },
  {
    id: "ithpl-platform",
    index: "03",
    title: "ITHPL Corporate Platform",
    tagline: "High-throughput web infrastructure for an industrial leader.",
    image: "/ithplwebsite.webp",
    year: "2024",
    role: "Full-Stack Development & Performance Engineering",
    steps: [
      {
        label: "Someone had a problem.",
        text: "A legacy monolith with sluggish page loads, outdated presentation, and brittle content maintenance.",
      },
      {
        label: "I saw an opportunity.",
        text: "An industrial brand should feel as precise as the infrastructure it builds.",
      },
      {
        label: "I designed a solution.",
        text: "A monochrome editorial system — confident typography, razor-thin hairlines, restrained imagery.",
      },
      {
        label: "Then I built it.",
        text: "A modernized Next.js front-end with sub-second asset delivery and a flexible content architecture.",
      },
    ],
    result: "99+ Lighthouse score",
    tech: ["Next.js", "MySQL", "Tailwind CSS", "REST APIs"],
    liveUrl: "https://ithpl.com",
  },
];

/* ── Moment of proof (verified evidence only) ────────────────────── */

export const PROOF = {
  headline: ["BUT BEAUTIFUL IDEAS", "AREN'T ENOUGH."],
  turn: "THEY HAVE TO WORK.",
  evidence: [
    {
      metric: "60 FPS @ 50K+ nodes",
      detail: "High-density WebGL threat visualization with zero visual lag.",
      project: "Cybersherlock",
    },
    {
      metric: "< 20 seconds",
      detail: "Full kiosk check-in flow, from arrival to badge in hand.",
      project: "HP Connect",
    },
    {
      metric: "99+ Lighthouse",
      detail: "Performance score held across every public route.",
      project: "ITHPL Platform",
    },
    {
      metric: "42% lighter",
      detail: "Client-side bundle weight reduced across enterprise portals.",
      project: "ITHPL / 2025",
    },
  ],
} as const;

/* ── Experience as chapters ──────────────────────────────────────── */

export const EXPERIENCE_CHAPTERS = [
  {
    year: "2026",
    word: "BUILDING",
    role: "Senior Full Stack & Creative Engineer",
    place: "Independent / Selected Clients",
    line: "Bespoke digital experiences, high-performance web products, and interactive WebGL work.",
  },
  {
    year: "2025",
    word: "ENGINEERING",
    role: "Software Engineer",
    place: "ITHPL",
    line: "Enterprise platforms, edge-rendered portals, and a 42% lighter client bundle.",
  },
  {
    year: "2024",
    word: "CLOUD",
    role: "Cloud Application Developer",
    place: "Vinsys",
    line: "Containerized microservices, multi-region CI/CD, and fault-tolerant AWS infrastructure.",
  },
  {
    year: "2021–24",
    word: "LEARNING",
    role: "B.E. Information Technology",
    place: "SPPU, Pune",
    line: "Databases, system design, cloud computing — and the AWS certifications that followed.",
  },
] as const;

/* ── The human section & values ──────────────────────────────────── */

export const HUMAN = {
  lines: [
    [
      "Behind every line of code",
      "is a person trying to solve",
      "a problem for another person.",
    ],
    ["That's the part of technology", "I care about most."],
  ],
  statement:
    "I'm Dinesh — from Pune, India. I build for the web because it's the closest thing we have to a place everyone can meet.",
} as const;

export const VALUES = [
  { title: "CURIOSITY", line: "I ask why before deciding how." },
  {
    title: "CRAFT",
    line: "I care about the details people may never consciously notice.",
  },
  {
    title: "SIMPLICITY",
    line: "I believe complexity should live underneath, not on top of the experience.",
  },
] as const;

export const MAGIC = {
  lines: ["YOU'RE HERE BECAUSE", "YOU'RE BUILDING", "SOMETHING TOO."],
  turn: "Maybe we should build it together.",
} as const;

export const CONTACT = {
  headline: ["LET'S MAKE", "SOMETHING", "WORTH REMEMBERING."],
  cta: "START A CONVERSATION",
} as const;

export const FINAL_FRAME = {
  name: "DINESH NIKAM",
  signOff: "Still curious.",
} as const;

