import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { WritingDashboardClient } from '@/components/writing/writing-dashboard-client';
import { NavigationBar } from '@/components/navigation-bar';

export const metadata: Metadata = {
    title: 'Writing | Dinesh Nikam',
    description: 'Thoughts on engineering, architecture, software design, and building modern web experiences.',
};

export const revalidate = 3600;

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
            <WritingDashboardClient articles={articles} />
        </div>
    );
}
