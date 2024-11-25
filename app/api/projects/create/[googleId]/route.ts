import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: Request, context: { params: { googleId: string } }) {
    try {
        const { googleId } =await context.params;

        if (!googleId) {
            return NextResponse.json(
                { error: "Google ID is required" },
                { status: 400 }
            );
        }

        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
        const pageSize = 5; 

        const projects = await prisma.project.findMany({
            where: {
                user: {
                    googleId,
                },
            },
            include: {
                tasks: true,
            },
            skip: (page - 1) * pageSize, 
            take: pageSize, 
        });

        const totalProjects = await prisma.project.count({
            where: {
                user: {
                    googleId,
                },
            },
        });

        const totalPages = Math.ceil(totalProjects / pageSize);

        return NextResponse.json(
            {
                projects,
                meta: {
                    currentPage: page,
                    totalPages,
                    totalProjects,
                    pageSize,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}
