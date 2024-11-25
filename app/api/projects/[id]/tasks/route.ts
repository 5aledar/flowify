import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { title, description, status } = await req.json();

        const projectId = parseInt(params.id, 10);

        if (!title || !description || !status || isNaN(projectId)) {
            return NextResponse.json(
                { error: "Missing required fields or invalid project ID" },
                { status: 400 }
            );
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                projectId,
            },
        });

        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);

        return NextResponse.json(
            { error: "Failed to create task" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const {id} = await params;
    
  try {
    if (isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(id), 
      },
    });

    if (tasks.length > 0) {
      return NextResponse.json(tasks, { status: 200 });
    }

    return NextResponse.json(
      { message: "No tasks found for this project" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
