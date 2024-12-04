import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the import based on your setup

export async function GET(req: NextRequest, { params }: any) {
    try {
        // Extract the projectAccess ID from the URL parameter

        const paId = await Number(params.id)
        // Validate the ID
        if (!paId) {
            return new NextResponse(
                JSON.stringify({ success: false, error: 'Project Access ID is required' }),
                { status: 400 }
            );
        }

        // Fetch the project access by ID
        const projectAccess = await prisma.projectAccess.findUnique({
            where: {
                id: Number(paId), // Ensure the ID is a number
            },
            include: {
                project: true, // Optionally include related project data if needed
                user: true,    // Optionally include related user data if needed
            },
        });

        // If the project access doesn't exist, return a 404
        if (!projectAccess) {
            return new NextResponse(
                JSON.stringify({ success: false, error: 'Project Access not found' }),
                { status: 404 }
            );
        }

        // Return the project access data as JSON
        return new NextResponse(
            JSON.stringify({ success: true, projectAccess }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching project access:', error);
        return new NextResponse(
            JSON.stringify({ success: false, error: 'Internal server error' }),
            { status: 500 }
        );
    }
}
