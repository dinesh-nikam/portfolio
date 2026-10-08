import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import prisma from '@/lib/prisma';
import { WritingDashboardClient } from '@/components/writing/writing-dashboard-client';
import { NavigationBarV2 } from '@/components/navigation-bar-v2';
import { JsonLdScript, buildBlogListingSchema } from '@/components/seo/json-ld';

export const metadata: Metadata = createMetadata({
  title: 'Writing',
  description: 'Engineering notes on software architecture, system design, React, Next.js, and building modern web experiences.',
});

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

import { CURATED_FALLBACK_ARTICLES } from '@/lib/blog-generator';

interface ArticleItem {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    readingTime: number;
    publishedAt: Date | null;
    featured: boolean;
}

export default async function WritingPage() {
    let articles: ArticleItem[] = [];
    try {
        articles = await prisma.article.findMany({
            where: { status: 'PUBLISHED' },
            orderBy: { publishedAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                category: true,
                readingTime: true,
                publishedAt: true,
                featured: true,
            }
        });
    } catch (e) {
        console.warn("WritingPage: Database query error, using fallback articles", e);
    }

    if (!articles || articles.length === 0) {
        articles = Object.values(CURATED_FALLBACK_ARTICLES).map((item, i) => ({
            id: `art-${i + 1}`,
            title: item.title,
            slug: item.slug,
            excerpt: item.excerpt,
            category: item.category,
            readingTime: item.readingTime,
            publishedAt: item.publishedAt,
            featured: item.featured,
        }));
    }

    return (
        <main id="main-content" className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <NavigationBarV2 />
            {/* Structured Data: Blog / CollectionPage schema */}
            <JsonLdScript data={buildBlogListingSchema()} />
            <WritingDashboardClient articles={articles} />
        </main>
    );
}
