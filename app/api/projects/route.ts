import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { name, email } = await req.json();

        if (!name || !email) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "Project name and user email are required" }),
                { status: 400 }
            );
        }

        const project = await prisma.project.create({
            data: {
                name,
                ownerEmail: email, 
            },
        });

        return new NextResponse(
            JSON.stringify({ success: true, project }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating project:", error);
        return new NextResponse(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
}


export async function GET(req: Request) {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    try {
        if (!email) {
            return NextResponse.json(
                { error: "Google ID is required" },
                { status: 400 }
            );
        }

        const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
        const pageSize = 5;

        // Fetch projects owned by the user or shared with them via ProjectAccess
        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { ownerEmail: email }, // Projects owned by the user
                    {
                        projectAccesses: {
                            some: {
                                user: {
                                    email,
                                },
                            },
                        }, // Projects shared with the user
                    },
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
                    { ownerEmail: email },
                    {
                        projectAccesses: {
                            some: {
                                user: {
                                    email,
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

