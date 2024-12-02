import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { TableCell, TableRow } from "@/components/ui/table"
import { useUpdateTaskStatus } from '@/hooks/useUpdateTaskStatus'
import { Badge } from './ui/badge'
import DeleteTask from './DeleteTask'
import { Task } from '@prisma/client'
import { useDrag, useDrop } from 'react-dnd';
enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}
interface TaskItemProps {
    task: Task
    projectId: string;
    index: number;
    moveTask: (fromIndex: number, toIndex: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, projectId, index, moveTask }) => {

    const [currentStatus, setCurrentStatus] = useState(task.status);
    const { mutate: updateStatus } = useUpdateTaskStatus();
    const [, dragRef] = useDrag({
        type: 'TASK',
        item: { id: task.id, index },
    });
    const [, dropRef] = useDrop({
        accept: 'TASK',
        hover: (draggedItem: { id: number; index: number }) => {
            if (draggedItem.index !== index) {
                moveTask(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });
    const handleStatusChange = (newStatus: "TO_DO" | "IN_PROGRESS" | "COMPLETED") => {
        if (newStatus == currentStatus) {
            return
        }
        try {
            setCurrentStatus(newStatus);
            updateStatus({ taskId: task.id, status: newStatus, projectId, });
        } catch (error) {
            console.log(error);
        }
    };
    const combinedRef = (node: HTMLTableRowElement | null) => {
        dragRef(node);
        dropRef(node);
    };

    return (
        <TableRow ref={combinedRef} key={task.id}>
            <TableCell className="font-semibold text-[12px]">{task.title}</TableCell>
            <TableCell>
                <Select value={currentStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-[150px] h-[30px] shadow-none text-[12px] border-none">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className='items-start'>
                        <SelectItem value={TaskStatus.TO_DO}><Badge variant={'outline'} className='m-2 shadow-md '>To Do</Badge></SelectItem>
                        <SelectItem value={TaskStatus.IN_PROGRESS}><Badge variant={'outline'} className='text-orange-400 m-2 shadow-md'>In Progress</Badge></SelectItem>
                        <SelectItem value={TaskStatus.COMPLETED}><Badge variant={'outline'} className='text-green-400 m-2 shadow-md'>Completed</Badge></SelectItem>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell className="flex h-12 justify-end items-center"><DeleteTask taskId={task.id} projectId={projectId} /></TableCell>
        </TableRow>
    )
}

export default TaskItem 