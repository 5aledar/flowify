import { table } from 'console'
import { Task } from '@prisma/client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React from 'react'
import TaskItem from './Task'
const TasksTable = ({ tasks, id }: { tasks: Task[] | undefined, id: string }) => {
    console.log(tasks);
    return (
        <Table>
            <TableHeader className='shadow-md '>
                <TableRow>
                    <TableHead className="w-[100px]">Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className='text-right'>actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks?.map((task: any) => (

                    <TaskItem task={task} projectId={id} key={task.id}/>
                ))

                }
            </TableBody>
        </Table>

    )
}

export default TasksTable