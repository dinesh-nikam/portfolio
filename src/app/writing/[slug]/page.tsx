import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, CalendarDays } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
// @ts-ignore
import rehypePrettyCode from 'rehype-pretty-code';
import prisma from '@/lib/prisma';
import { mdxComponents } from '@/components/writing/mdx-components';
import { ReadingProgress } from '@/components/writing/reading-progress';

interface ArticlePageProps {
    params: { slug: string };
}

// Ensure the route is dynamic or statically generated later if configured.
export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const article = await prisma.article.findUnique({
        where: { slug },
    });

    if (!article || article.status !== 'PUBLISHED') {
        notFound();
    }

    // Increment view count directly
    await prisma.article.update({
        where: { slug },
        data: { views: { increment: 1 } },
    });

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-32">
            <ReadingProgress />

            <div className="max-w-3xl mx-auto px-6 md:px-12 w-full">
                {/* Navigation */}
                <div className="mb-12">
                    <Link
                        href="/writing"
                        className="inline-flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Writing
                    </Link>
                </div>

                {/* Article Header */}
                <header className="mb-16">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/50 mb-8">
                        <span className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 uppercase tracking-widest text-[10px]">
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
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6">
                        {article.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light">
                        {article.excerpt}
                    </p>
                </header>

                {/* MDX Content Area */}
                <article className="prose prose-invert prose-lg max-w-none">
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
                <div className="mt-24 pt-8 border-t border-white/10 flex items-center justify-between text-sm font-mono text-white/40">
                    <p>© {new Date().getFullYear()} Dinesh Nikam. All rights reserved.</p>
                    <Link href="/writing" className="hover:text-white transition-colors">More Articles →</Link>
                </div>
            </div>
        </div>
    );
}
