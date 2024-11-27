import { table } from 'console'
import { Task } from '@prisma/client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React from 'react'
import TaskItem from './Task'
const TasksTable = ({ tasks, id }: { tasks: Task[] | undefined, id: string }) => {
    return (
        <>

            {tasks?.map((task: any) => (

                <TaskItem task={task} projectId={id} key={task.id} />
            ))

            }
        </>
    )
}

export default TasksTable