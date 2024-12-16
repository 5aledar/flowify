import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE handler

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  const { id } = params;

  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!id || !email) {
      return NextResponse.json(
        { error: 'Missing parameters (id or email)' },
        { status: 400 }
      );
    }

    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'Invalid project ID format' },
        { status: 400 }
      );
    }

    // Fetch the project to check ownership
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (project.ownerEmail !== email) {
      return NextResponse.json(
        { error: 'Unauthorized: You do not own this project' },
        { status: 403 }
      );
    }

    // Delete the project if the user owns it
    const deletedProject = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json(
      { message: 'Project deleted successfully', deletedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: { params: any }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Project ID is required' },
      { status: 400 }
    );
  }

  const projectId = parseInt(id, 10);
  if (isNaN(projectId)) {
    return NextResponse.json(
      { error: 'Invalid project ID format' },
      { status: 400 }
    );
  }

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT handler

export async function PUT(req: NextRequest, { params }: { params: any }) {
  const id = await params.id;

  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    const { name } = await req.json();

    if (!id || !name || !email) {
      return NextResponse.json(
        { success: false, error: 'Project title, ID, and email are required' },
        { status: 400 }
      );
    }

    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'Invalid project ID format' },
        { status: 400 }
      );
    }

    // Fetch the project to check ownership
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (project.ownerEmail !== email) {
      // If not the owner, check for READ_WRITE permissions
      const projectAccess = await prisma.projectAccess.findFirst({
        where: {
          projectId: projectId,
          userEmail: email,
          permissions: 'READ_WRITE',
        },
      });

      if (!projectAccess) {
        return NextResponse.json(
          {
            error:
              'Unauthorized: You do not have permission to update this project',
          },
          { status: 403 }
        );
      }
    }

    // Update the project title if the user owns it or has READ_WRITE permissions
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project title' },
      { status: 500 }
    );
  }
}
