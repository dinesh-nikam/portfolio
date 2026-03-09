// src/lib/data.ts

export const projectsData = [
    {
        id: "01",
        title: "cybersherlock",
        description: "IP data visualization and predictive modeling engine.",
        role: "Frontend Architecture & Re-platforming",
        tech: ["nextjs", "react", "D3.js", "Tailwind CSS", "mongodb", "shodan"],
        link: "#",
        image: "/cybersherlock.png",
    },
    {
        id: "02",
        title: "HP Connect visitor Management System",
        description: "Visitor Management System.confirmation on whatsapp and gmail ",
        role: "Full-Stack Development",
        tech: ["Next.js", "Node.js", "WebSockets", "Mongodb"],
        link: "#",
        image: "/hpconnect.png",
    },
    {
        id: "03",
        title: "ITHPL Website",
        description: "ITHPL Website.",
        role: "Frontend & Backend Development",
        tech: ["codigniter", "PHP", "MySQL", "HTML5/CSS3", "JavaScript", "tailwind css"],
        link: "https://ithpl.com",
        image: "/ithplwebsite.png",
    }
];

export const experiencesData = [
    {
        id: "01",
        role: "Software Engineer",
        company: "ITHPL",
        period: "2024 - Present",
        description: "Architecting and building high-performance web platforms handling millions of daily users. Led the migration to a modern Next.js edge architecture.",
        tech: ["React", "Next.js", "Node.js", "AWS", "GraphQL", "JavaScript", "HTML5/CSS3", "PHP", "Three.js"]
    },
    {
        id: "02",
        role: "Cloud Application Developer",
        company: "vinsys",
        period: "2023 - 2024",
        description: "AWS cloud based application development and deployment",
        tech: ["AWS", "Python", "Docker", "Kubernetes"]
    }
    // {
    //     id: "03",
    //     role: "Software Engineer",
    //     company: "Shopify",
    //     period: "2015 - 2018",
    //     description: "Built headless commerce solutions focusing on extreme performance and developer experience. Contributed to significant core GraphQL API improvements.",
    //     tech: ["Ruby on Rails", "React", "PostgreSQL", "Redis"]
    // },
    // {
    //     id: "04",
    //     role: "Web Developer",
    //     company: "Digital Agency",
    //     period: "2012 - 2015",
    //     description: "Developed award-winning interactive marketing sites and e-commerce platforms for Fortune 500 clients.",
    //     tech: ["JavaScript", "HTML5/CSS3", "PHP", "Three.js"]
    // }
];

export const achievementsData = [
    {
        id: "01",
        title: "Platform Scalability",
        description: "Built scalable SaaS platform serving over 5M+ active users globally.",
        metric: "5M+ Users",
        icon: "globe"
    },
    {
        id: "02",
        title: "Performance Optimization",
        description: "Reduced core API response times through intelligent caching and edge routing.",
        metric: "40% Faster API",
        icon: "zap"
    },
    {
        id: "03",
        title: "Infrastructure Design",
        description: "Architected fault-tolerant cloud infrastructure handling peak load traffic smoothly.",
        metric: "99.99% Uptime",
        icon: "server"
    },
    {
        id: "04",
        title: "Production Systems",
        description: "Successfully delivered and maintained multiple mission-critical enterprise systems.",
        metric: "20+ Systems",
        icon: "code"
    }
];

export const skillsEvolutionData = [
    {
        category: "Frontend",
        skills: ["React 19", "Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]
    },
    {
        category: "Backend",
        skills: ["Node.js", "NestJS", "Go", "GraphQL", "PostgreSQL", "Redis"]
    },
    {
        category: "Cloud & DevOps",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Vercel"]
    },
    {
        category: "Creative Tech",
        skills: ["WebGL", "GLSL Shaders", "GSAP", "Creative Coding", "Generative Art"]
    }
];

export const educationData = [
    {
        id: "01",
        degree: "Diploma in Information Technology",
        school: "GPA",
        year: "2021"
    },
    {
        id: "02",
        degree: "B.E. Information Technology",
        school: "SPPU",
        year: "2024"
    },
    {
        id: "03",
        degree: "AWS Certified Cloud Practitioner",
        school: "Amazon Web Services",
        year: "2024"
    }
];

export const servicesData = [
    {
        num: "01",
        title: "Web Development",
        description: "Building fast, scalable, and beautifully animated web applications using Next.js and React."
    },
    {
        num: "02",
        title: "UI/UX Design",
        description: "Crafting premium user interfaces with a focus on dark aesthetics, glassmorphism, and intuitive experiences."
    },
    {
        num: "03",
        title: "WebGL & 3D",
        description: "Creating immersive 3D web experiences using Three.js, React Three Fiber, and custom shaders."
    },
    {
        num: "04",
        title: "Creative Development",
        description: "Bringing designs to life with fluid motion, GSAP animations, and physics-based interactions."
    }
];

export const statsData = [
    { label: "Years Experience", value: "14+" },
    { label: "Projects Delivered", value: "50+" },
    { label: "Technologies Mastered", value: "30+" }
];

export const certificationsData = [
    {
        id: "aws-sa-2025",
        title: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        date: "March 2025",
        credentialId: "AWS-SAA-12345",
        link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
        category: "Cloud",
        image: "/certifications/aws-sa.png",
        icon: "aws"
    },
    {
        id: "gcp-ace-2024",
        title: "Google Cloud Associate Cloud Engineer",
        issuer: "Google Cloud",
        date: "October 2024",
        credentialId: "GCP-ACE-67890",
        link: "https://cloud.google.com/certification/cloud-engineer",
        category: "Cloud",
        image: "/certifications/gcp-ace.png",
        icon: "gcp"
    },
    {
        id: "k8s-cka-2023",
        title: "Certified Kubernetes Administrator (CKA)",
        issuer: "Cloud Native Computing Foundation",
        date: "June 2023",
        credentialId: "CKA-112233",
        link: "https://www.cncf.io/certification/cka/",
        category: "DevOps",
        image: "/certifications/cncf-cka.png",
        icon: "k8s"
    },
    {
        id: "meta-frontend-2023",
        title: "Meta Front-End Developer Professional Certificate",
        issuer: "Meta",
        date: "January 2023",
        credentialId: "META-FE-445566",
        link: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
        category: "Frontend",
        image: "/certifications/meta-fe.png",
        icon: "react"
    }
];
