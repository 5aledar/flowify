import { useFetchTasks } from '@/hooks/useFetchTasks'
import { useState } from 'react'
import { useUpdateTaskStatus } from "@/hooks/useUpdateTaskStatus";
import { Badge } from "@/components/ui/badge"

import TasksTable from './TasksTable';
import { Button } from './ui/button';

const TaskContainer = ({ id }: { id: string }) => {
    const [page, setPage] = useState(1);
    const { mutate: updateStatus } = useUpdateTaskStatus();
    const {
        tasks,
        meta,
        nextPage,
        prevPage,
        currentPage,
    } = useFetchTasks(id); const handleStatusChange = (newStatus: string, task: any) => {
        updateStatus({ taskId: task.id, status: newStatus, projectId: id });
    };


    return (

        <div className='w-full py-10'>
            <div className='h-[90vh] flex flex-col justify-start gap-5'>
                {tasks?.ToDo.length! > 0 &&<div className='space-y-2'>
                    <Badge variant={'outline'}>Tasks to do</Badge>
                    <TasksTable tasks={tasks?.ToDo} id={id} />
                </div>}
                {tasks?.InProgress.length! > 0 && <div>
                    <Badge variant={'outline'}  className='text-orange-400'>Tasks in progress</Badge>
                    <TasksTable tasks={tasks?.InProgress} id={id} />

                </div>}
                {tasks?.Completed.length! > 0 && <div>
                    <Badge variant={'outline'} className='text-green-400'>Tasks completed</Badge>
                    <TasksTable tasks={tasks?.Completed} id={id} />

                </div>}

            </div>
            <div className="flex items-center justify-center gap-7 mt-6">
                <Button
                    disabled={currentPage === 1}
                    onClick={prevPage}
                    className="px-4 py-2  rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    -
                </Button>

                <span className="text-sm font-semibold">
                    Page {meta?.currentPage} of {meta?.totalPages}
                </span>

                <Button
                    disabled={currentPage === meta?.totalPages}
                    onClick={nextPage}
                    className="px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    +
                </Button>
            </div>
        </div>
    )
}

export default TaskContainer
