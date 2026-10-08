import fs from "fs";
import path from "path";

const iconsToFetch = [
  { key: "react", slug: "react", title: "React", defaultColor: "#61dafb" },
  { key: "nextdotjs", slug: "nextdotjs", title: "Next.js", defaultColor: "#ffffff" },
  { key: "nextjs", slug: "nextdotjs", title: "Next.js", defaultColor: "#ffffff" },
  { key: "nodejs", slug: "nodedotjs", title: "Node.js", defaultColor: "#5fa04e" },
  { key: "python", slug: "python", title: "Python", defaultColor: "#3776ab" },
  { key: "typescript", slug: "typescript", title: "TypeScript", defaultColor: "#3178c6" },
  { key: "tailwindcss", slug: "tailwindcss", title: "Tailwind CSS", defaultColor: "#06b6d4" },
  { key: "docker", slug: "docker", title: "Docker", defaultColor: "#2496ed" },
  { key: "git", slug: "git", title: "Git", defaultColor: "#f05032" },
  { key: "github", slug: "github", title: "GitHub", defaultColor: "#ffffff" },
  { key: "amazonwebservices", slug: "amazonwebservices", title: "AWS", defaultColor: "#ff9900" },
  { key: "aws", slug: "amazonwebservices", title: "AWS", defaultColor: "#ff9900" },
  { key: "googlecloud", slug: "googlecloud", title: "Google Cloud", defaultColor: "#4285f4" },
  { key: "gcp", slug: "googlecloud", title: "Google Cloud", defaultColor: "#4285f4" },
  { key: "kubernetes", slug: "kubernetes", title: "Kubernetes", defaultColor: "#326ce5" },
  { key: "k8s", slug: "kubernetes", title: "Kubernetes", defaultColor: "#326ce5" },
  { key: "meta", slug: "meta", title: "Meta", defaultColor: "#0081fb" },
  { key: "microsoftazure", slug: "microsoftazure", title: "Microsoft Azure", defaultColor: "#0089d6" },
  { key: "azure", slug: "microsoftazure", title: "Microsoft Azure", defaultColor: "#0089d6" },
  { key: "terraform", slug: "terraform", title: "Terraform", defaultColor: "#844fba" },
  { key: "nginx", slug: "nginx", title: "Nginx", defaultColor: "#009639" },
  { key: "mongodb", slug: "mongodb", title: "MongoDB", defaultColor: "#47a248" },
  { key: "postgresql", slug: "postgresql", title: "PostgreSQL", defaultColor: "#4169e1" },
  { key: "redis", slug: "redis", title: "Redis", defaultColor: "#dc382d" },
  { key: "prisma", slug: "prisma", title: "Prisma", defaultColor: "#2d3748" },
  { key: "figma", slug: "figma", title: "Figma", defaultColor: "#f24e1e" },
  { key: "express", slug: "express", title: "Express", defaultColor: "#ffffff" },
  { key: "graphql", slug: "graphql", title: "GraphQL", defaultColor: "#e10098" },
  { key: "postman", slug: "postman", title: "Postman", defaultColor: "#ff6c37" },
  { key: "vitejs", slug: "vite", title: "Vite", defaultColor: "#646cff" },
  { key: "vite", slug: "vite", title: "Vite", defaultColor: "#646cff" },
  { key: "threejs", slug: "threedotjs", title: "Three.js", defaultColor: "#ffffff" },
  { key: "framermotion", slug: "framer", title: "Framer Motion", defaultColor: "#0055ff" },
  { key: "postcss", slug: "postcss", title: "PostCSS", defaultColor: "#dd3a0a" },
  { key: "php", slug: "php", title: "PHP", defaultColor: "#777bb4" },
  { key: "d3js", slug: "d3dotjs", title: "D3.js", defaultColor: "#f9a03c" },
];

async function main() {
  console.log("Fetching official SVG paths from simple-icons repository...");
  const pathsByKey = {};

  const uniqueSlugs = [...new Set(iconsToFetch.map((i) => i.slug))];
  const slugCache = {};

  for (const slug of uniqueSlugs) {
    const url = `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${slug}.svg`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`⚠️ Failed to fetch ${slug}: ${res.status}`);
        continue;
      }
      const svg = await res.text();
      // Extract path d attribute
      const match = svg.match(/<path\s+d="([^"]+)"/);
      if (match && match[1]) {
        slugCache[slug] = match[1];
        console.log(`✓ Fetched ${slug}`);
      } else {
        console.warn(`⚠️ No path found in ${slug}`);
      }
    } catch (err) {
      console.error(`❌ Error fetching ${slug}:`, err.message);
    }
  }

  // Populate map
  for (const icon of iconsToFetch) {
    const pathD = slugCache[icon.slug];
    if (pathD) {
      pathsByKey[icon.key] = {
        d: pathD,
        title: icon.title,
        color: icon.defaultColor,
      };
    }
  }

  // Build TypeScript code for src/components/icons/brand-icon.tsx
  const tsContent = `"use client";

import { forwardRef } from "react";

// Official vector icon paths (Simple Icons / Brand vector geometry, 24x24 viewBox)
// Fully inlined for zero-latency, offline SSR rendering with proper currentColor & brand fill support.

export interface BrandIconData {
  d: string;
  title: string;
  color: string;
}

export const brandIconsData: Record<string, BrandIconData> = ${JSON.stringify(pathsByKey, null, 2)};

export interface BrandIconProps {
  name: string;
  size?: number | string;
  className?: string;
  title?: string;
  colorMode?: "current" | "brand";
}

export const BrandIcon = forwardRef<SVGSVGElement, BrandIconProps>(
  ({ name, size = 24, className = "", title, colorMode = "current" }, ref) => {
    const key = (name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const icon = brandIconsData[key] || brandIconsData[name.toLowerCase()];

    if (!icon) {
      return (
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={className}
          aria-label={title || name}
        >
          <title>{title || name}</title>
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeOpacity="0.4" />
          <text x="12" y="15" fontSize="9" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="600">
            {(name || "?").slice(0, 2).toUpperCase()}
          </text>
        </svg>
      );
    }

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={colorMode === "brand" ? icon.color : "currentColor"}
        className={className}
        aria-label={title || icon.title}
        role="img"
      >
        <title>{title || icon.title}</title>
        <path d={icon.d} />
      </svg>
    );
  }
);

BrandIcon.displayName = "BrandIcon";

export const getBrandIconColor = (name: string): string => {
  const key = (name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return (brandIconsData[key] || brandIconsData[name.toLowerCase()])?.color || "#6b7280";
};
`;

  const destPath = path.join(process.cwd(), "src", "components", "icons", "brand-icon.tsx");
  fs.writeFileSync(destPath, tsContent, "utf8");
  console.log(`✅ Successfully generated brand-icon.tsx with ${Object.keys(pathsByKey).length} icons!`);
}

main().catch(console.error);
