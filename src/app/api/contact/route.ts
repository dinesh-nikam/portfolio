import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { name, email, message, visitorId } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                message,
                visitorId: visitorId || undefined,
            },
        });

        return NextResponse.json({ success: true, message: newMessage });
    } catch (error) {
        console.error("Contact Form Error", error);
        return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
    }
}
