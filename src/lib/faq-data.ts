/**
 * Homepage FAQ data — also rendered as FAQPage JSON-LD for Google rich results.
 * Keep answers concise, factual, and keyword-rich (service + location intent).
 */
import type { FaqItem } from "@/components/seo/json-ld";

export const faqData: FaqItem[] = [
  {
    question: "What services does Dinesh Nikam offer in Pune?",
    answer:
      "I provide end-to-end digital services from Pune, India: full stack web development (Next.js, React, Node.js), UI/UX design, e-commerce development, WebGL & 3D web experiences, cloud architecture and AWS consulting, DevOps automation, AI/LLM integrations, API development, and SEO & performance optimization — for startups and enterprises worldwide.",
  },
  {
    question: "Are you available for freelance and contract projects?",
    answer:
      "Yes — I'm currently open to freelance, contract, and full-time opportunities. I work with clients in Pune, across India, and internationally. Use the contact form or email nikamdinesh362@gmail.com with a short project brief and I'll respond within 24 hours.",
  },
  {
    question: "How much does a website cost in Pune?",
    answer:
      "Pricing depends on scope: a polished marketing website typically starts around ₹25,000–₹80,000, custom web applications and SaaS platforms are scoped individually, and cloud/AI engineering is billed per sprint. Every engagement starts with a free discovery call and a fixed, transparent quote — no hidden costs.",
  },
  {
    question: "Why choose Dinesh Nikam over traditional digital agencies in Pune?",
    answer:
      "Traditional agencies often delegate development to rotating junior staff, causing communication bloat and sluggish delivery. Working directly with an experienced full stack engineer means faster turnaround, sub-second 99+ Lighthouse performance, clean architecture, and direct technical ownership.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Most marketing websites and portfolio builds launch in 1 to 2 weeks. Custom web applications, portals, and cloud integrations generally take 2 to 4 weeks depending on scope and feature complexity.",
  },
  {
    question: "How do you optimize websites for SEO and Google ranking?",
    answer:
      "Every project is engineered with semantic HTML5, server-side rendering with Next.js App Router, sub-second LCP (Largest Contentful Paint), next-generation image formats (AVIF/WebP), and rich JSON-LD structured data (LocalBusiness, ProfessionalService, FAQPage) to rank high in organic search and local map packs.",
  },
];
