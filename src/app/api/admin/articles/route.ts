import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Placeholder for auth check - adjust based on the current app's admin auth strategy.
// Currently allowing all POST/GETs for testing. Ensure this is secured properly later!

export async function GET() {
    try {
        const articles = await prisma.article.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json({ success: true, articles });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch articles' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, slug, excerpt, content, category, readingTime, featured, status, publishedAt } = body;

        // Validate bare minimums
        if (!title || !slug || !content) {
            return NextResponse.json(
                { success: false, error: 'Title, slug, and content are required' },
                { status: 400 }
            );
        }

        const article = await prisma.article.create({
            data: {
                title,
                slug,
                excerpt: excerpt || '',
                content,
                category: category || 'Uncategorized',
                readingTime: readingTime || Math.ceil(content.split(' ').length / 200), // very rough estimate
                featured: featured || false,
                status: status || 'DRAFT',
                publishedAt: publishedAt ? new Date(publishedAt) : null,
            },
        });

        return NextResponse.json({ success: true, article });
    } catch (error: any) {
        console.error('Error creating article:', error);
        // Handle unique constraint failure for slug
        if (error.code === 'P2002') {
            return NextResponse.json(
                { success: false, error: 'An article with this slug already exists' },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Failed to create article' },
            { status: 500 }
        );
    }
}
