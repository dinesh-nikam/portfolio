import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateTechArticle } from '@/lib/blog-generator';
import { isAdminToken } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    // Auth: Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}` automatically
    // when the env var is set. If no secret is configured, fall back to requiring
    // an admin session cookie so the endpoint is never wide open in production.
    const { searchParams } = new URL(request.url);
    const authHeader = request.headers.get('authorization');
    const secret = process.env.CRON_SECRET;

    let authorized = false;
    if (secret) {
        authorized = authHeader === `Bearer ${secret}` || searchParams.get('secret') === secret;
    } else {
        authorized = await isAdminToken(request.headers.get('cookie')?.match(/admin_token=([^;]+)/)?.[1] ?? null);
    }

    if (!authorized) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const articleData = await generateTechArticle();
        let saved = null;
        try {
            saved = await prisma.article.create({
                data: {
                    title: articleData.title,
                    slug: articleData.slug,
                    excerpt: articleData.excerpt,
                    content: articleData.content,
                    category: articleData.category,
                    readingTime: articleData.readingTime,
                    featured: false,
                    status: 'PUBLISHED',
                    publishedAt: articleData.publishedAt,
                },
            });
        } catch (dbErr) {
            console.warn('Cron: DB insert warning', dbErr);
        }

        return NextResponse.json({
            success: true,
            message: 'Automated blog generation cycle executed',
            article: saved || articleData,
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
    }
}
