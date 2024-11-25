'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}

const CreateTask = () => {
    const [title, setTitle] = useState('')
    const [descreption, setDescreption] = useState('')
    const [status, setStatus] = useState<TaskStatus>(TaskStatus.TO_DO)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className='text-lg'>Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new Task</DialogTitle>
                    <DialogDescription>
                        Create your work plans here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input id="title" value={title} className="col-span-3" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            Description
                        </Label>
                        <Input id="desc" value={descreption} onChange={(e) => setDescreption(e.target.value)} className="col-span-3" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TaskStatus.TO_DO}>to do</SelectItem>
                            <SelectItem value={TaskStatus.IN_PROGRESS}>in progress</SelectItem>
                            <SelectItem value={TaskStatus.COMPLETED}>comleted</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button type="submit">Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateTask