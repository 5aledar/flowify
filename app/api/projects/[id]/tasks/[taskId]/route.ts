import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { projectId: string; taskId: string } }) {
  try {
    const { taskId } = await params;

      const { status } = await req.json();

      if (!["TO_DO", "IN_PROGRESS", "COMPLETED"].includes(status)) {
          return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }

      const task = await prisma.task.update({
          where: { id: Number(taskId) },
          data: { status },
      });

      return NextResponse.json(task, { status: 200 });

  } catch (error) {
      console.error("Error updating task:", error);
      return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}



export async function DELETE(
    req: NextRequest,
    { params }: { params: { projectId: string; taskId: string } }
  ) {
    try {
      const { taskId } =await params;
      
      if ( !taskId || isNaN(Number(taskId))) {
        return NextResponse.json(
          { error: "Invalid project or task ID" },
          { status: 400 }
        );
      }
  
      const deletedTask = await prisma.task.delete({
        where: { id: Number(taskId) },
      });
      
      return NextResponse.json(deletedTask, { status: 200 });
    } catch (error) {
      console.error("Error deleting task:", error);
      return NextResponse.json(
        { error: "Failed to delete task" },
        { status: 500 }
      );
    }
  }