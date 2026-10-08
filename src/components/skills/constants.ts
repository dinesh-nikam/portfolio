"use strict";

export const skillCategories = [
    {
        title: "Frontend",
        description: "Building responsive, accessible, and performant user interfaces with modern tooling.",
        skills: [
            { name: "React", level: 90, icon: "react", description: "1+ year building scalable interfaces" },
            { name: "Next.js", level: 90, icon: "nextdotjs", description: "Server-side rendering and static site generation" },
            { name: "TypeScript", level: 85, icon: "typescript", description: "Strongly typed scalable web applications" },
            { name: "Tailwind CSS", level: 90, icon: "tailwindcss", description: "Utility-first CSS framework for rapid UI development" },
            { name: "Three.js", level: 70, icon: "threejs", description: "Immersive 3D web experiences and WebGL" },
            { name: "Framer Motion", level: 75, icon: "framermotion", description: "Fluid and complex UI animations" },
        ],
    },
    {
        title: "Backend",
        description: "Architecting secure, scalable APIs and managing complex database structures.",
        skills: [
            { name: "Node.js", level: 85, icon: "nodejs", description: "Fast and scalable server-side JavaScript endpoints" },
            { name: "Python", level: 80, icon: "python", description: "Data processing, AI, and automation" },
            { name: "Express", level: 75, icon: "express", description: "Fast unopinionated web framework" },
            { name: "GraphQL", level: 70, icon: "graphql", description: "Efficient data querying and API design" },
            { name: "REST APIs", level: 90, icon: "postman", description: "API development and testing" },
        ],
    },
    {
        title: "Database & Cloud",
        description: "Managing data persistence and cloud infrastructure.",
        skills: [
            { name: "MongoDB", level: 85, icon: "mongodb", description: "NoSQL database design and optimization" },
            { name: "PostgreSQL", level: 80, icon: "postgresql", description: "Relational database management and queries" },
            { name: "Redis", level: 70, icon: "redis", description: "In-memory caching and data structures" },
            { name: "AWS", level: 85, icon: "amazonwebservices", description: "Cloud architecture and services" },
            { name: "Docker", level: 80, icon: "docker", description: "Containerization and orchestration" },
        ],
    },
    {
        title: "DevOps & Tools",
        description: "Automated pipelines, version control, and development workflows.",
        skills: [
            { name: "Git", level: 90, icon: "git", description: "Version control and collaborative development" },
            { name: "GitHub", level: 85, icon: "github", description: "CI/CD and repository management" },
            { name: "Figma", level: 80, icon: "figma", description: "UI/UX design and prototyping" },
            { name: "Prisma", level: 75, icon: "prisma", description: "Next-generation Node.js and TypeScript ORM" },
            { name: "Vite", level: 85, icon: "vitejs", description: "Next generation frontend tooling" },
            { name: "Nginx", level: 70, icon: "nginx", description: "Web server and reverse proxy" },
        ],
    },
];

export const allSkills = skillCategories.flatMap((category) => category.skills);

export const webSkills = allSkills.map((skill) => skill.name);
