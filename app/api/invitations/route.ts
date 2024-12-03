import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { projectId, userEmail, permissions } = await req.json();
        const id = Number(projectId)
        console.log({ id, userEmail, permissions });

        // Validate input
        if (!id || !userEmail || !permissions) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "Project ID, user ID, and permissions are required" }),
                { status: 400 }
            );
        }

        // Ensure the project exists
        const project = await prisma.project.findUnique({ where: { id: id } });
        if (!project) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "Project not found" }),
                { status: 404 }
            );
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        if (!user) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "User not found" }),
                { status: 404 }
            );
        }

        // Check if an invitation already exists for this project and user
        const existingInvitation = await prisma.invitation.findFirst({
            where: {
                id,
                userEmail,
            },
        });

        if (existingInvitation) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "invitation already sent", status: 409 }),

            );
        }

        // Create the invitation
        const invitation = await prisma.invitation.create({
            data: {
                projectId: id,
                userEmail,
                permissions,
                status: "PENDING",
            },
        });

        return new NextResponse(
            JSON.stringify({ success: true, invitation }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error sending invitation:", error);
        return new NextResponse(
            JSON.stringify({ success: false, error: "Internal server error" }),
            { status: 500 }
        );
    }
}