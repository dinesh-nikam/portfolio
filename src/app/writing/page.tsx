import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import prisma from '@/lib/prisma';
import { WritingDashboardClient } from '@/components/writing/writing-dashboard-client';
import { NavigationBar } from '@/components/navigation-bar';
import { JsonLdScript, buildBlogListingSchema } from '@/components/seo/json-ld';

export const metadata: Metadata = createMetadata({
  title: 'Writing',
  description: 'Engineering notes on software architecture, system design, React, Next.js, and building modern web experiences.',
});

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function WritingPage() {
    const articles = await prisma.article.findMany({
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

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <NavigationBar />
            {/* Structured Data: Blog / CollectionPage schema */}
            <JsonLdScript data={buildBlogListingSchema()} />
            <WritingDashboardClient articles={articles} />
        </div>
    );
}
