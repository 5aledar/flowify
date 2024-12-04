import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: NextRequest) {
    try {
        const { projectId, senderEmail, userEmail, permissions } = await req.json();
        const id = Number(projectId)
        console.log({
            projectId: id,
            userEmail,
            senderEmail,
            permissions,
            status: "PENDING",
        });

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
                userEmail: userEmail,
                senderEmail: senderEmail,
                permissions: permissions,
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


export async function GET(req: NextRequest) {
    try {
        // Get email from query parameter
        const url = new URL(req.url);
        const email = url.searchParams.get('email');

        // Validate if email is provided
        if (!email) {
            return new NextResponse(
                JSON.stringify({ success: false, error: 'Email is required' }),
                { status: 400 }
            );
        }

        // Fetch all invitations for the given email
        const invitations = await prisma.invitation.findMany({
            where: {
                userEmail: email,
                status: 'PENDING'
            },
        });

        // Check if any invitations were found
        if (invitations.length === 0) {
            return new NextResponse(
                JSON.stringify({ success: true, invitations: [] }));
        }

        // Return the invitations
        return new NextResponse(JSON.stringify({ success: true, invitations }), { status: 200 });
    } catch (error) {
        console.error('Error fetching invitations:', error);
        return new NextResponse(
            JSON.stringify({ success: false, error: 'Internal server error' }),
            { status: 500 }
        );
    }
}