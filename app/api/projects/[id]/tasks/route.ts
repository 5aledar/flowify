import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma, Task } from "@prisma/client";

export async function POST(
  req: NextRequest,
  context: { params: any }
) {
  try {
    const { params } = context;
    const { title, description, status } = await req.json();
    const projectId = parseInt(await params.id, 10);

    if (!title || !description || !status || isNaN(projectId)) {
      return NextResponse.json(
        { error: "Missing required fields or invalid project ID" },
        { status: 400 }
      );
    }

    const highestOrder = await prisma.task.findFirst({
      where: { projectId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const nextOrder = (highestOrder?.order || 0) + 1;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        projectId,
        order: nextOrder,
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
  { params }: { params: any }
) {
  try {
    const { id } = params;

    if (isNaN(Number(id))) {

      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = 7;
    const sort = searchParams.get("sort") || "older";
    const filter = searchParams.get("filter");

    const orderBy = sort === "newer" ? "desc" : sort === 'older' ? "asc" : null;

    const orderByCondition: Prisma.TaskOrderByWithRelationInput = orderBy
      ? { createdAt: orderBy as Prisma.SortOrder } 
      : { order: 'asc' }; 

    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(id),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: orderByCondition,
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
    let orderedTasks: Task[] = []
    if (filter == 'All' || filter == 'To-do') {
      orderedTasks = [...groupedTasks.ToDo, ...groupedTasks.InProgress, ...groupedTasks.Completed]
    } else if (filter == 'in-progress') {
      orderedTasks = [...groupedTasks.InProgress, ...groupedTasks.ToDo, ...groupedTasks.Completed]
    } else if (filter == 'completed') {
      orderedTasks = [...groupedTasks.Completed, ...groupedTasks.ToDo, ...groupedTasks.InProgress]
    } else {
      orderedTasks = [...groupedTasks.ToDo, ...groupedTasks.InProgress, ...groupedTasks.Completed]
    }

    return NextResponse.json(
      {
        tasks: orderedTasks,
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


export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    // Expecting an array of tasks with their new order
    const { reorderedTasks } = body;

    if (!Array.isArray(reorderedTasks)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    const updatePromises = reorderedTasks.map((task: { id: number; order: number }) =>
      prisma.task.update({
        where: { id: task.id },
        data: { order: task.order },
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: "Tasks reordered successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating task order:", error);
    return NextResponse.json({ error: "Failed to update task order" }, { status: 500 });
  }
}

