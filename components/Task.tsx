import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MdDelete } from 'react-icons/md'
import { useUpdateTaskStatus } from '@/hooks/useUpdateTaskStatus'
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { Button } from './ui/button'
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
                    <SelectTrigger className="w-[150px] h-[30px] shadow-md text-[12px] border-none">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectItem  value={TaskStatus.TO_DO}>To Do</SelectItem>
                        <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                        <SelectItem value={TaskStatus.COMPLETED}>Completed</SelectItem>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell className="flex h-12 justify-end items-center"><Button variant={'ghost'} onClick={() => handleDelete(task.id)}><MdDelete color='red' /></Button></TableCell>
        </TableRow>

    )
}

export default TaskItem