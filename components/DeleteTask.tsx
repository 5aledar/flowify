import React from 'react'
import { Button } from './ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MdDelete } from 'react-icons/md'
import { useDeleteTask } from '@/hooks/useDeleteTask'
const DeleteTask = ({ taskId, projectId }: { taskId: number, projectId: string }) => {
    const { mutate: deleteTask } = useDeleteTask();

    const handleDelete = (taskId: number) => {
            deleteTask({ projectId, taskId });
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline"><MdDelete /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(taskId)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeleteTask