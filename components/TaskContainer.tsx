'use client'
import { useFetchTasks } from '@/hooks/useFetchTasks';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CreateTask from './CreateTask';
import TableSkeleton from './TableSkeleton';
import Pagenation from './Pagenation';
import { useFilterStore } from '@/store/useFilterStore';
import Filters from './Filters';
import TaskItem from './Task';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TaskContainer = ({ id }: { id: string }) => {
    const { status } = useFilterStore();
  const { tasks, meta, nextPage, prevPage, currentPage, isLoading } = useFetchTasks(id);
  const [todoTasks, setTodoTasks] = useState(tasks?.ToDo || []);

  useEffect(() => {
    setTodoTasks(tasks?.ToDo || []);
  }, [tasks, isLoading]);

  const updateTaskOrder = async (projectId: string, reorderedTasks: { id: number; order: number }[]) => {
    try {
      await axios.patch(`/api/projects/${projectId}/tasks`, { reorderedTasks });
    } catch (error) {
      console.error('Failed to update task order:', error);
    }
  };

  const moveTask = (fromIndex: number, toIndex: number) => {
    const updatedTasks = [...todoTasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);

    // Update task orders locally
    setTodoTasks(
      updatedTasks.map((task, index) => ({
        ...task,
        order: index + 1,
      }))
    );

    // Optionally, send updated task order to the backend
    const reorderedTasks = updatedTasks.map((task, index) => ({
      id: task.id,
      order: index + 1,
    }));
    updateTaskOrder(id, reorderedTasks);
  };
    return (
        <div className="w-full h-full flex flex-col gap-6 ">
            <header className='mb-4 flex justify-between items-center'>
                <Filters id={id} />
                <CreateTask projectId={id} />
            </header>
            <section className='h-[50vh] mb-[60px]'>
                <Table className='w-full' >
                    <TableHeader className='shadow-md '>
                        <TableRow>
                            <TableHead className="w-[100px]">Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className='text-right'>actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    {isLoading ?
                        (
                            <TableSkeleton />
                        ) : (
                            <TableBody >
                                {(status == 'All' || status == 'To-do') && tasks?.ToDo.length! > 0 &&
                                    todoTasks?.map((task, index) => (
                                        <TaskItem
                                            key={task.id}
                                            task={task}
                                            projectId={id}
                                            index={index}
                                            moveTask={moveTask}
                                        />
                                    ))
                                }
                                {/* {(status == 'All' || status == 'in-progress') && tasks?.InProgress.length! > 0 &&
                                    tasks?.InProgress.map((task) => (
                                        <TaskItem task={task} projectId={id} key={task.id}  />
                                    ))
                                }
                                {(status == 'All' || status == 'completed') && tasks?.Completed.length! > 0 &&
                                    tasks?.Completed.map((task) => (
                                        <TaskItem task={task} projectId={id} key={task.id} />
                                    ))
                                } */}
                            </TableBody>)}
                </Table>
            </section>
            <Pagenation currentPage={currentPage} meta={meta} isLoading={isLoading} prevPage={prevPage} nextPage={nextPage} />
        </div>
    )
}

export default TaskContainer

