import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const article = await prisma.article.findUnique({
            where: { id },
        });

        if (!article) {
            return NextResponse.json(
                { success: false, error: 'Article not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, article });
    } catch (error) {
        console.error('Error fetching article:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch article' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, slug, excerpt, content, category, readingTime, featured, status, publishedAt } = body;

        const data: any = {};
        if (title !== undefined) data.title = title;
        if (slug !== undefined) data.slug = slug;
        if (excerpt !== undefined) data.excerpt = excerpt;
        if (content !== undefined) data.content = content;
        if (category !== undefined) data.category = category;
        if (readingTime !== undefined) data.readingTime = readingTime;
        if (featured !== undefined) data.featured = featured;
        if (status !== undefined) data.status = status;
        if (publishedAt !== undefined) data.publishedAt = publishedAt ? new Date(publishedAt) : null;

        const article = await prisma.article.update({
            where: { id },
            data,
        });

        return NextResponse.json({ success: true, article });
    } catch (error: any) {
        console.error('Error updating article:', error);
        if (error.code === 'P2025') {
            return NextResponse.json(
                { success: false, error: 'Article not found for update' },
                { status: 404 }
            );
        }
        // Handle unique constraint failure for slug
        if (error.code === 'P2002') {
            return NextResponse.json(
                { success: false, error: 'An article with this slug already exists' },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Failed to update article' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.article.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: 'Article deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting article:', error);
        if (error.code === 'P2025') {
            return NextResponse.json(
                { success: false, error: 'Article not found for deletion' },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Failed to delete article' },
            { status: 500 }
        );
    }
}
