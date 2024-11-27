import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MdDelete } from 'react-icons/md'
import { useUpdateTaskStatus } from '@/hooks/useUpdateTaskStatus'
import { useDeleteTask } from '@/hooks/useDeleteTask'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import DeleteTask from './DeleteTask'
enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}
const TaskItem = ({ task, projectId }: any) => {

    const [currentStatus, setCurrentStatus] = useState(task.status);
    const { mutate: updateStatus } = useUpdateTaskStatus();

    const handleStatusChange = (newStatus: string) => {
        setCurrentStatus(newStatus);
        updateStatus({ taskId: task.id, status: newStatus, projectId, });
    };

    const { mutate: deleteTask } = useDeleteTask();

    const handleDelete = (taskId: number) => {
        if (confirm("Are you sure you want to delete this task?")) {
            deleteTask({ projectId, taskId });
        }
    };
    return (

        <TableRow key={task.id}>
            <TableCell className="font-semibold text-[12px]">{task.title}</TableCell>
            <TableCell>
                <Select value={currentStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-[150px] h-[30px] shadow-none text-[12px] border-none">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={TaskStatus.TO_DO} ><Badge variant={'outline'} className='m-2 shadow-md'>To Do</Badge></SelectItem>
                        <SelectItem value={TaskStatus.IN_PROGRESS}><Badge variant={'outline'} className='text-orange-400 m-2 shadow-md'>In Progress</Badge></SelectItem>
                        <SelectItem value={TaskStatus.COMPLETED}><Badge variant={'outline'} className='text-green-400 m-2 shadow-md'>Completed</Badge></SelectItem>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell className="flex h-12 justify-end items-center"><DeleteTask taskId={task.id} projectId={projectId}/></TableCell>
        </TableRow>
        // <Button variant={'ghost'} onClick={() => handleDelete(task.id)}><MdDelete color='red' /></Button>
    )
}

export default TaskItem