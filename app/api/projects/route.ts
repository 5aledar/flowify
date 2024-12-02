import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: NextRequest) {
    const { name, googleId } = await req.json();

    if (!name || !googleId) {
        return new NextResponse(JSON.stringify({ success: false, error: "Project name and user ID are required" }), { status: 400 });
    }
    try {
        const project = await prisma.project.create({
            data: {
                name,
                googleId,
            },
        });
        return new NextResponse(JSON.stringify({ success: true, project }), { status: 200 });
    } catch (error) {
        console.error("Error creating project:", error);
        return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}


