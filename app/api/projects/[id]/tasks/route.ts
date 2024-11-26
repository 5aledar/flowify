import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, description, status } = await req.json();

    const projectId = await parseInt(await params.id, 10);

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


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = 7;
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(id),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: 'asc', 
      },
    });

    const totalTasks = await prisma.task.count({
      where: {
        projectId: Number(id),
      },
    });

    const totalPages = Math.ceil(totalTasks / pageSize);

    const groupedTasks = {
      ToDo: tasks.filter((task) => task.status === "TO_DO"),
      InProgress: tasks.filter((task) => task.status === "IN_PROGRESS"),
      Completed: tasks.filter((task) => task.status === "COMPLETED"),
    };

    return NextResponse.json(
      {
        tasks: groupedTasks,
        pagination: {
          currentPage: page,
          totalPages,
          totalTasks,
          pageSize,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}





