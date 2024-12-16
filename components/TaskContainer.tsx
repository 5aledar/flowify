'use client';
import { useFetchTasks } from '@/hooks/useFetchTasks';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CreateTask from './CreateTask';
import TableSkeleton from './TableSkeleton';
import Pagenation from './Pagenation';
import Filters from './Filters';
import TaskItem from './Task';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Task } from '@prisma/client';
import { useFetchPermission } from '@/hooks/useFetchPermision';
import { useUser } from '@clerk/nextjs';

const TaskContainer = ({ id }: { id: string }) => {
  const { tasks, meta, nextPage, prevPage, currentPage, isLoading } =
    useFetchTasks(id);
  const [tickets, setTickets] = useState<Task[]>(tasks! || []);
  const { user } = useUser();
  const { permisson, error } = useFetchPermission(
    id,
    user?.emailAddresses[0].emailAddress!
  );
  useEffect(() => {
    setTickets(tasks!);
  }, [tasks, isLoading]);
  const updateTaskOrder = async (
    projectId: string,
    reorderedTasks: { id: number; order: number }[]
  ) => {
    try {
      await axios.patch(
        `/api/projects/${projectId}/tasks?email=${user?.emailAddresses[0].emailAddress!}`,
        { reorderedTasks }
      );
    } catch (error) {
      console.error('Failed to update task order:', error);
    }
  };

  const moveTask = (fromIndex: number, toIndex: number) => {
    const updatedTasks = [...tickets];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);

    updatedTasks.splice(toIndex, 0, movedTask);

    setTickets(
      updatedTasks.map((task, index) => ({
        ...task,
        order: index + 1,
      }))
    );

    const reorderedTasks = updatedTasks.map((task, index) => ({
      id: task.id,
      order: index + 1,
    }));
    updateTaskOrder(id, reorderedTasks);
  };
  return (
    <div className="w-full h-full flex flex-col gap-6 ">
      <header className="mb-4 flex justify-between items-center">
        <Filters />
        <CreateTask projectId={id} permission={permisson} />
      </header>
      <section className="h-[50vh] mb-[60px]">
        <Table className="w-full">
          <TableHeader className="shadow-md ">
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">actions</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <TableBody>
              {tasks?.length! > 0 &&
                tickets?.map((task, index) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    projectId={id}
                    index={index}
                    moveTask={moveTask}
                    permission={permisson}
                  />
                ))}
            </TableBody>
          )}
        </Table>
      </section>
      <Pagenation
        currentPage={currentPage}
        meta={meta}
        isLoading={isLoading}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default TaskContainer;
