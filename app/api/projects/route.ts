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

      

        const projects = await prisma.project.findMany({
            where: {
                ownerEmail: email  // Projects owned by the user
            },

        });

        


        return NextResponse.json(
            {
                projects,
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

