import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: Request, context: { params: any }) {
    try {
        const { googleId } = context.params;

        if (!googleId) {
            return NextResponse.json(
                { error: "Google ID is required" },
                { status: 400 }
            );
        }

        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
        const pageSize = 5;

        // Fetch projects owned by the user or shared with them via ProjectAccess
        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { ownerId: googleId }, // Projects owned by the user
                    {
                        projectAccesses: {
                            some: {
                                user: {
                                    googleId,
                                },
                            },
                        },
                    }, // Projects shared with the user
                ],
            },
            include: {
                tasks: true,
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        // Count total projects owned by or shared with the user
        const totalProjects = await prisma.project.count({
            where: {
                OR: [
                    { ownerId: googleId }, 
                    {
                        projectAccesses: {
                            some: {
                                user: {
                                    googleId,
                                },
                            },
                        },
                    }, 
                ],
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
