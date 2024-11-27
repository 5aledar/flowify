import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const url = new URL(req.url);
    const googleId = url.searchParams.get('googleId');

    if (!id || !googleId) {
      return NextResponse.json(
        { error: "Missing parameters (id or googleId)" },
        { status: 400 }
      );
    }

    const projectId = parseInt(await id);
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


    return NextResponse.json({ message: "Project deleted successfully" });

  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  if (!id) {
    return new NextResponse(JSON.stringify({ success: false, error: "Project name and user ID are required" }), { status: 400 });
  }
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    return new NextResponse(JSON.stringify(project));
  } catch (error) {
    console.error("Error fethcing project:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params
  const { name } = await req.json()
  if (!id || !name) {
    return new NextResponse(JSON.stringify({ success: false, error: "Project title and id are required" }), { status: 400 });
  }
  try {
    const project = await prisma.project.update({
      where: {
        id: Number(id),
      },
      data: {
        name
      }
    })
    return NextResponse.json(project, { status: 200 })
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update title" }, { status: 500 });
  }
}


