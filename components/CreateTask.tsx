'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import toast from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateTask } from '@/hooks/useCreateTask';

enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}

const CreateTask = ({ projectId }: { projectId: string }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus>(TaskStatus.TO_DO);
    const [loading, setLoading] = useState(false)
    const { mutate } = useCreateTask(projectId);

    const handleStatusChange = (value: string) => {
        const newStatus = value as TaskStatus;
        setStatus(newStatus);
    };

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        try {
            if (!title || !description || !status) {
                return toast.error("All fields are required");
            }
            setLoading(true)

            mutate(
                {
                    projectId,
                    taskData: { title, description, status },
                },
                {
                    onSuccess: () => {
                        setTitle('');
                        setDescription('');
                        setStatus(TaskStatus.TO_DO);
                        setLoading(false)
                    },
                }
            );
        } catch (error) {
            console.log(error);

        }
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className='text-md'>+</Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit();
                    }
                }}
            >
                <DialogHeader>
                    <DialogTitle>Add new Task</DialogTitle>
                    <DialogDescription>
                        Create your work plans here. Click add when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            required
                            autoFocus
                            id="title"
                            value={title}
                            className="col-span-3"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            Description
                        </Label>
                        <Input
                            required
                            id="desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className='text-right'>Status</Label>
                        <Select
                            onValueChange={handleStatusChange}
                            defaultValue={TaskStatus.TO_DO}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={TaskStatus.TO_DO}>To Do</SelectItem>
                                <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                                <SelectItem value={TaskStatus.COMPLETED}>Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={loading}>{!loading ?'Add': 'creating...'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTask;
