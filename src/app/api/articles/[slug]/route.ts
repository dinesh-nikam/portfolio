import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const article = await prisma.article.findUnique({
            where: { slug },
        });

        if (!article || article.status !== 'PUBLISHED') {
            return NextResponse.json(
                { success: false, error: 'Article not found' },
                { status: 404 }
            );
        }

        // Optionally increment view count asynchronously here
        await prisma.article.update({
            where: { slug },
            data: { views: { increment: 1 } },
        });

        return NextResponse.json({ success: true, article });
    } catch (error) {
        console.error('Error fetching public article by slug:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch article' },
            { status: 500 }
        );
    }
}
