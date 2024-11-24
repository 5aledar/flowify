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

    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: "Invalid project ID format" },
        { status: 400 }
      );
    }

    const deletedProject = await prisma.project.deleteMany({
      where: {
        id: projectId,
        googleId: googleId,
      },
    });

    if (deletedProject.count === 0) {
      return NextResponse.json(
        { error: "No project found with the given id and googleId" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Project deleted successfully" });

  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
