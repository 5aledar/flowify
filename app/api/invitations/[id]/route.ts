import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the import based on your setup

export async function PATCH(req: NextRequest) {
    try {
        // Extract the `id` from the route and parse the request body
        const { searchParams } = new URL(req.url);
        const invitationId = searchParams.get('id');
        const { status } = await req.json();

        // Validate the input
        if (!invitationId) {
            return new NextResponse(
                JSON.stringify({ success: false, error: 'Invitation ID is required' }),
                { status: 400 }
            );
        }

        if (!status || (status !== 'ACCEPTED' && status !== 'DECLINED')) {
            return new NextResponse(
                JSON.stringify({ success: false, error: 'Invalid status. Must be "ACCEPTED" or "DECLINED".' }),
                { status: 400 }
            );
        }

        // Update the invitation in the database
        const updatedInvitation = await prisma.invitation.update({
            where: { id: Number(invitationId) },
            data: { status },
        });
        const newUser = await prisma.user.findUnique({
            where: { email: updatedInvitation.userEmail }
        })
        // Automatically create a ProjectAccess if the invitation is accepted
        if (status === 'ACCEPTED') {
            const projectAccess = await prisma.projectAccess.create({
                data: {
                    projectId: updatedInvitation.projectId,
                    userEmail: updatedInvitation?.userEmail,
                    permissions: updatedInvitation.permissions, // Copy permissions from the invitation
                },
            });

            return new NextResponse(
                JSON.stringify({
                    success: true,
                    message: 'Invitation accepted, and project access granted.',
                    updatedInvitation,
                    projectAccess
                }),
                { status: 200 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                success: true,
                message: 'Invitation declined.',
                updatedInvitation
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating invitation status:', error);
        return new NextResponse(
            JSON.stringify({ success: false, error: 'Internal server error' }),
            { status: 500 }
        );
    }
}
