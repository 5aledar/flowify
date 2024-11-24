import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, context: { params: { googleId: string } }) {
    try {
        const { googleId } = await context.params;

        if (!googleId) {
            return NextResponse.json(
                { error: "Google ID is required" },
                { status: 400 }
            );
        }

        const projects = await prisma.project.findMany({
            where: {
                user: {
                    googleId,
                },
            },
            include: {
                tasks: true,
            },
        });

        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}
