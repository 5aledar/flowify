import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DELETE handler
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const url = new URL(req.url);
    const googleId = url.searchParams.get("googleId");

    if (!id || !googleId) {
      return NextResponse.json(
        { error: "Missing parameters (id or googleId)" },
        { status: 400 }
      );
    }

    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: "Invalid project ID format" },
        { status: 400 }
      );
    }

    const deletedProject = await prisma.project.delete({
      where: {
        id: projectId,
        googleId: googleId,
      },
    });

    return NextResponse.json(
      { message: "Project deleted successfully", deletedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

// GET handler
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Project ID is required" },
      { status: 400 }
    );
  }

  const projectId = parseInt(id, 10);
  if (isNaN(projectId)) {
    return NextResponse.json(
      { error: "Invalid project ID format" },
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
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT handler
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const { name } = await req.json();

    if (!id || !name) {
      return NextResponse.json(
        { success: false, error: "Project title and ID are required" },
        { status: 400 }
      );
    }

    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: "Invalid project ID format" },
        { status: 400 }
      );
    }

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
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project title" },
      { status: 500 }
    );
  }
}
