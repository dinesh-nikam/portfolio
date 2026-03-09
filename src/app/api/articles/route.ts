import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const featured = searchParams.get('featured');

        const where: any = {
            status: 'PUBLISHED',
        };

        if (category) {
            where.category = category;
        }

        if (featured === 'true') {
            where.featured = true;
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
            ];
        }

        const articles = await prisma.article.findMany({
            where,
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
                // We omit content here to keep the payload light for lists
            },
        });

        return NextResponse.json({ success: true, articles });
    } catch (error) {
        console.error('Error fetching public articles:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch articles' },
            { status: 500 }
        );
    }
}
