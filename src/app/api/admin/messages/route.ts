import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                visitor: {
                    select: { country: true, os: true, browser: true, city: true, deviceType: true }
                }
            }
        });

        return NextResponse.json({ messages });
    } catch (error) {
        console.error("Messages API Error", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, isRead, isStarred, isArchived } = await req.json();

        const data: any = {};
        if (typeof isRead === "boolean") data.isRead = isRead;
        if (typeof isStarred === "boolean") data.isStarred = isStarred;
        if (typeof isArchived === "boolean") data.isArchived = isArchived;

        const message = await prisma.contactMessage.update({
            where: { id },
            data,
        });

        return NextResponse.json({ success: true, message });
    } catch (error) {
        console.error("Messages Update Error", error);
        return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
    }
}
