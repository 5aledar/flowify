import { useFetchTasks } from '@/hooks/useFetchTasks';
import { useUpdateTaskStatus } from "@/hooks/useUpdateTaskStatus";
import { Badge } from "@/components/ui/badge";
import TasksTable from './TasksTable';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from './ui/button';
import CreateTask from './CreateTask';

const TaskContainer = ({ id }: { id: string }) => {
    const {
        tasks,
        meta,
        nextPage,
        prevPage,
        currentPage,
        sortOption,
        changeSortOption
    } = useFetchTasks(id);



    const handleSortChange = (sortValue: string) => {
        changeSortOption(sortValue === "Oldest" ? "older" : "newer");
    };

    return (
        <div className="w-full h-[90vh] py-10">
            <div className="mb-4 flex justify-between items-center">
                <div className='flex items-center'>

                    <p className="mr-2">Sort by:</p>
                    <Select
                        onValueChange={handleSortChange}
                        defaultValue={sortOption === "older" ? "Oldest" : "Newest"}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={sortOption === "older" ? "Oldest" : "Newest"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Oldest">Oldest</SelectItem>
                            <SelectItem value="Newest">Newest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <CreateTask projectId={id} />

            </div>
            <Table className='  w-full'>
                <TableHeader className='shadow-md '>
                    <TableRow>
                        <TableHead className="w-[100px]">Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className='text-right'>actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >

                    {tasks?.ToDo.length! > 0 &&
                        <TasksTable tasks={tasks?.ToDo} id={id} />
                    }
                    {tasks?.InProgress.length! > 0 &&
                        <TasksTable tasks={tasks?.InProgress} id={id} />
                    }
                    {tasks?.Completed.length! > 0 &&
                        <TasksTable tasks={tasks?.Completed} id={id} />
                    }
                </TableBody>
            </Table>
            <div className="flex items-center justify-center gap-7 mt-6">
                <Button
                    disabled={currentPage === 1}
                    onClick={prevPage}
                    className="px-4 py-2  rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    -
                </Button>

                <span className="text-sm font-semibold">
                    Page {meta?.currentPage} of {meta?.totalPages}
                </span>

                <Button
                    disabled={currentPage === meta?.totalPages}
                    onClick={nextPage}
                    className="px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    +
                </Button>
            </div>
        </div>
    )
}

export default TaskContainer
