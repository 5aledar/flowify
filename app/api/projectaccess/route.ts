import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the import based on your setup

export async function GET(req: NextRequest) {
  try {
    // Extract the email from the URL query parameters
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'Email is required' }),
        { status: 400 }
      );
    }

    const projectAccesses = await prisma.projectAccess.findMany({
      where: {
        userEmail: email,
      },
      include: {
        project: true, 
      },
    });

    return new NextResponse(
      JSON.stringify({ success: true, projectAccesses: projectAccesses || [] }),
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
