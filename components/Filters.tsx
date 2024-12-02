import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { useFilterStore } from '@/store/useFilterStore'
const Filters = ({ id }: { id: string }) => {
    const { date, setDate, status, setStatus } = useFilterStore()
    const handleSortChange = (date: string) => {
        setDate(date === "Oldest" ? "older" : "newer");
    };
    const handleStatusChange = (status: 'All' | 'To-do' | 'in-progress' | 'completed') => {
        setStatus(status)
    }
    return (
        <div className='flex items-center gap-4'>
            <Select
                onValueChange={handleSortChange}
                defaultValue={date === "older" ? "Oldest" : "Newest"}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={date === "older" ? "Oldest" : "Newest"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Oldest">Oldest</SelectItem>
                    <SelectItem value="Newest">Newest</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={handleStatusChange} defaultValue='All'>
                <SelectTrigger className="w-[150px] h-[35px] text-[12px] ">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className='items-start'>
                    <SelectItem value='All'><Badge variant={'outline'} className='m-2 shadow-md '>All</Badge></SelectItem>
                    <SelectItem value='To-do'><Badge variant={'outline'} className='m-2 shadow-md '>To Do</Badge></SelectItem>
                    <SelectItem value='in-progress'><Badge variant={'outline'} className='text-orange-400 m-2 shadow-md'>In Progress</Badge></SelectItem>
                    <SelectItem value='completed'><Badge variant={'outline'} className='text-green-400 m-2 shadow-md'>Completed</Badge></SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Filters