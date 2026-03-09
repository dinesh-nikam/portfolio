import Image from 'next/image';
import Link from 'next/link';

// Custom components map for MDX
export const mdxComponents = {
    h1: ({ children, ...props }: any) => (
        <h1 className="text-4xl font-light mt-12 mb-6 tracking-tight text-foreground" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }: any) => (
        <h2 className="text-2xl font-medium mt-10 mb-4 tracking-tight text-foreground/90" {...props}>
            {children}
        </h2>
    ),
    h3: ({ children, ...props }: any) => (
        <h3 className="text-xl font-medium mt-8 mb-4 text-foreground/80" {...props}>
            {children}
        </h3>
    ),
    p: ({ children, ...props }: any) => (
        <p className="text-muted-foreground leading-relaxed mb-6 text-lg" {...props}>
            {children}
        </p>
    ),
    ul: ({ children, ...props }: any) => (
        <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2 text-lg" {...props}>
            {children}
        </ul>
    ),
    ol: ({ children, ...props }: any) => (
        <ol className="list-decimal pl-6 mb-6 text-muted-foreground space-y-2 text-lg" {...props}>
            {children}
        </ol>
    ),
    li: ({ children, ...props }: any) => (
        <li className="pl-2" {...props}>
            {children}
        </li>
    ),
    a: ({ children, href, ...props }: any) => {
        if (href?.startsWith('/')) {
            return (
                <Link href={href} className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors" {...props}>
                    {children}
                </Link>
            );
        }
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors" {...props}>
                {children}
            </a>
        );
    },
    blockquote: ({ children, ...props }: any) => (
        <blockquote className="border-l-2 border-foreground/20 pl-6 italic text-muted-foreground my-8" {...props}>
            {children}
        </blockquote>
    ),
    img: ({ src, alt, ...props }: any) => (
        <span className="block my-10 rounded-2xl overflow-hidden border border-foreground/10 bg-foreground/5">
            <img src={src} alt={alt || 'Article image'} className="w-full h-auto object-cover" {...props} />
        </span>
    ),
    code: ({ children, className, ...props }: any) => {
        // Check if it's a code block (has className from rehype) or inline code
        if (className) {
            return (
                <code className={`${className} font-mono`} {...props}>
                    {children}
                </code>
            );
        }
        // Inline code
        return (
            <code className="bg-foreground/10 px-1.5 py-0.5 rounded font-mono text-sm text-foreground/90" {...props}>
                {children}
            </code>
        );
    },
    pre: ({ children, ...props }: any) => (
        <pre className="relative my-8 overflow-x-auto p-6 rounded-2xl bg-foreground/5 border border-foreground/10 text-sm font-mono leading-relaxed shadow-2xl" {...props}>
            {children}
        </pre>
    ),
};
