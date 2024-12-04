import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const projectId = url.searchParams.get('projectId');
        const email = url.searchParams.get('email');
        console.log({projectId ,email});

        if (!projectId || !email) {
            return new NextResponse(
                JSON.stringify({ success: false, error: 'Project ID and email are required' }),
                { status: 400 }
            );
        }
        const projectAccess = await prisma.projectAccess.findFirst({
            where: {
                projectId: Number(projectId),
                userEmail: email,
            },
            select: {
                permissions: true,
            },
        });
        if (!projectAccess) {
            return new NextResponse(
                JSON.stringify({ success: true, permissions: null, message: 'No access found for the given user and project' }),
                { status: 200 }
            );
        }
        return new NextResponse(
            JSON.stringify({ success: true, permissions: projectAccess.permissions }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching project permissions:', error);
        return new NextResponse(
            JSON.stringify({ success: false, error: 'Internal server error' }),
            { status: 500 }
        );
    }
}
