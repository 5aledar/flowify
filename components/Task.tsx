import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MdDelete } from 'react-icons/md'
import { useUpdateTaskStatus } from '@/hooks/useUpdateTaskStatus'

enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}
const TaskItem = ({ task, projectId }: any) => {

    const [currentStatus, setCurrentStatus] = useState(task.status);
    const { mutate: updateStatus } = useUpdateTaskStatus();

    const handleStatusChange = (newStatus: string) => {
        setCurrentStatus(newStatus); // Update local state immediately
        updateStatus({ taskId: task.id, status: newStatus, projectId, });
    };
    return (

        <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>
                <Select value={currentStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={TaskStatus.TO_DO}>To Do</SelectItem>
                        <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                        <SelectItem value={TaskStatus.COMPLETED}>Completed</SelectItem>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell className="flex h-12 justify-end items-center"><MdDelete /></TableCell>
        </TableRow>

    )
}

export default TaskItem