import { useFetchTasks } from '@/hooks/useFetchTasks'
import { useState } from 'react'
import { useUpdateTaskStatus } from "@/hooks/useUpdateTaskStatus";
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

        <div className='w-full h-[90vh] py-10'>
            <Table className='  w-full'>
                <TableHeader className='shadow-md '>
                    <TableRow>
                        <TableHead className="w-[100px]">Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className='text-right'>actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >

                    {tasks?.ToDo.length! > 0 &&
                        <TasksTable tasks={tasks?.ToDo} id={id} />
                    }
                    {tasks?.InProgress.length! > 0 &&
                        <TasksTable tasks={tasks?.InProgress} id={id} />
                    }
                    {tasks?.Completed.length! > 0 &&
                        <TasksTable tasks={tasks?.Completed} id={id} />
                    }
                </TableBody>
            </Table>
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
