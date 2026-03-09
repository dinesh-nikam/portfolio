import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        await prisma.article.update({
            where: { slug },
            data: { views: { increment: 1 } },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to increment views:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
