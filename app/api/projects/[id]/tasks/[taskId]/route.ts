// API Endpoint (route.ts)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { taskId: string } }) {
  try {
    const { status } = await req.json();
    const taskId =  parseInt(await params.taskId, 10);

    if (!status || isNaN(taskId)) {
      return NextResponse.json({ error: "Invalid status or task ID" }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
