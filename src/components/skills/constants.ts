"use strict";

export const skillCategories = [
    {
        title: "Frontend",
        description: "Building responsive, accessible, and performant user interfaces with modern tooling.",
        skills: [
            { name: "React", level: 90, gradient: "from-blue-500 to-cyan-400", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", description: "5+ years building scalable interfaces" },
            { name: "Next.js", level: 90, gradient: "from-zinc-400 to-zinc-100", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", description: "Server-side rendering and static site generation" },
            { name: "TypeScript", level: 85, gradient: "from-blue-400 to-blue-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", description: "Strongly typed scalable web applications" },
            { name: "Tailwind CSS", level: 90, gradient: "from-teal-400 to-teal-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", description: "Utility-first CSS framework for rapid UI development" },
            { name: "Three.js", level: 70, gradient: "from-stone-500 to-stone-400", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg", description: "Immersive 3D web experiences and WebGL" },
            { name: "Framer Motion", level: 75, gradient: "from-slate-500 to-slate-400", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg", description: "Fluid and complex UI animations" },
        ],
    },
    {
        title: "Backend",
        description: "Architecting secure, scalable APIs and managing complex database structures.",
        skills: [
            { name: "Node.js", level: 85, gradient: "from-green-400 to-emerald-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", description: "Fast and scalable server-side JavaScript endpoints" },
            { name: "Python", level: 80, gradient: "from-yellow-400 to-amber-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", description: "Data processing, AI, and robust backend services" },
            { name: "PostgreSQL", level: 85, gradient: "from-blue-500 to-blue-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", description: "Relational database design and optimization" },
            { name: "Redis", level: 75, gradient: "from-red-500 to-rose-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg", description: "In-memory data structure store and caching" },
            { name: "GraphQL", level: 80, gradient: "from-slate-500 to-slate-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg", description: "Efficient and typed API data querying" },
            { name: "Express", level: 90, gradient: "from-gray-400 to-gray-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", description: "Fast, unopinionated, minimalist web framework" },
        ],
    },
    {
        title: "DevOps",
        description: "Streamlining deployments, monitoring infrastructure, and ensuring high availability.",
        skills: [
            { name: "Docker", level: 85, gradient: "from-blue-400 to-cyan-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", description: "Containerized application development and deployment" },
            { name: "AWS", level: 75, gradient: "from-orange-400 to-amber-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", description: "Cloud infrastructure and serverless architecture" },
            { name: "Kubernetes", level: 65, gradient: "from-blue-500 to-blue-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg", description: "Container orchestration and scale out" },
            { name: "Linux", level: 80, gradient: "from-yellow-200 to-yellow-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", description: "Server administration and shell scripting" },
        ],
    },
    {
        title: "Tools",
        description: "Development tools, version control, and design software.",
        skills: [
            { name: "Git", level: 90, gradient: "from-orange-500 to-red-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", description: "Version control and collaborative development" },
            { name: "Figma", level: 80, gradient: "from-stone-400 to-stone-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", description: "UI/UX design and prototyping" },
            { name: "Prisma", level: 75, gradient: "from-teal-400 to-teal-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg", description: "Next-generation Node.js and TypeScript ORM" },
            { name: "Vite", level: 85, gradient: "from-slate-400 to-blue-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg", description: "Next generation frontend tooling" },
        ],
    }
];

export const allSkills = skillCategories.flatMap(category => category.skills);

export const webSkills = allSkills.map(skill => skill.name);
