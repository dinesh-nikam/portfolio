import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, CalendarDays } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import prisma from '@/lib/prisma';
import { mdxComponents } from '@/components/writing/mdx-components';
import { ReadingProgress } from '@/components/writing/reading-progress';
import { ViewTracker } from '@/components/writing/view-tracker';
import { JsonLdScript, buildArticleSchema, buildBreadcrumbSchema } from '@/components/seo/json-ld';
import { SITE_URL } from '@/lib/metadata';

// Ensure the route is dynamic or statically generated later if configured.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await prisma.article.findUnique({
        where: { slug },
        select: {
            title: true,
            excerpt: true,
            publishedAt: true,
            createdAt: true,
            updatedAt: true,
            category: true,
            slug: true,
        },
    });

    if (!article) {
        return { title: 'Not Found | Dinesh Nikam' };
    }

    const publishDate = article.publishedAt ?? article.createdAt;
    const modifiedDate = article.updatedAt ?? publishDate;

    return {
        title: article.title,
        description: article.excerpt,
        alternates: {
            canonical: `${SITE_URL}/writing/${article.slug ?? slug}`,
        },
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: 'article',
            publishedTime: publishDate.toISOString(),
            modifiedTime: modifiedDate.toISOString(),
            authors: ['Dinesh Nikam'],
            section: article.category,
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
        },
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const article = await prisma.article.findUnique({
        where: { slug },
    });

    if (!article || article.status !== 'PUBLISHED') {
        notFound();
    }

    // Build JSON-LD schemas
    const publishDate = article.publishedAt ?? article.createdAt;
    const modifiedDate = article.updatedAt ?? publishDate;
    const articleSchema = buildArticleSchema({
        title: article.title,
        excerpt: article.excerpt,
        datePublished: publishDate.toISOString(),
        dateModified: modifiedDate.toISOString(),
        slug: article.slug,
    });

    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: "Home", item: SITE_URL },
        { name: "Writing", item: `${SITE_URL}/writing` },
        { name: article.title, item: `${SITE_URL}/writing/${article.slug}` },
    ]);

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-32">
            <ReadingProgress />
            <ViewTracker slug={slug} />
            {/* Structured Data: BlogPosting + Breadcrumb schemas */}
            <JsonLdScript data={articleSchema} />
            <JsonLdScript data={breadcrumbSchema} />

            <div className="max-w-3xl mx-auto px-6 md:px-12 w-full">
                {/* Navigation */}
                <div className="mb-12">
                    <Link
                        href="/writing"
                        className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Writing
                    </Link>
                </div>

                {/* Article Header */}
                <header className="mb-16">
                    <nav
                        aria-label="Article metadata"
                        className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mb-8"
                    >
                        <span className="px-3 py-1.5 rounded-full bg-foreground/10 text-foreground/80 uppercase tracking-widest text-[10px]">
                            {article.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5" />
                            <span>
                                {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.readingTime} min read</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span>{article.views + 1} views</span>
                        </div>
                    </nav>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6">
                        {article.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                        {article.excerpt}
                    </p>
                </header>

                {/* MDX Content Area */}
                <article className="prose dark:prose-invert prose-lg max-w-none">
                    <MDXRemote
                        source={article.content}
                        components={mdxComponents}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                                rehypePlugins: [
                                    rehypeSlug,
                                    [
                                        rehypePrettyCode,
                                        {
                                            theme: 'poimandres',
                                            keepBackground: false,
                                        },
                                    ],
                                ],
                            },
                        }}
                    />
                </article>

                {/* Footer info */}
                <div className="mt-24 pt-8 border-t border-foreground/10 flex items-center justify-between text-sm font-mono text-muted-foreground">
                    <p>© {new Date().getFullYear()} Dinesh Nikam. All rights reserved.</p>
                    <Link href="/writing" className="hover:text-foreground transition-colors">More Articles →</Link>
                </div>
            </div>
        </div>
    );
}
