import { useFetchTasks } from '@/hooks/useFetchTasks';
import TasksTable from './TasksTable';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from './ui/button';
import CreateTask from './CreateTask';
import TableSkeleton from './TableSkeleton';
import Pagenation from './Pagenation';

const TaskContainer = ({ id }: { id: string }) => {
    const { tasks, meta, nextPage, prevPage, currentPage, sortOption, changeSortOption, isLoading } = useFetchTasks(id);

    const handleSortChange = (sortValue: string) => {
        changeSortOption(sortValue === "Oldest" ? "older" : "newer");
    };
    return (
        <div className="w-full h-[80vh] py-10">
            <header className='mb-4 flex justify-between items-center'>
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
            </header>
            <section className='h-[50vh] mb-[60px]'>
                <Table className='w-full'>
                    <TableHeader className='shadow-md '>
                        <TableRow>
                            <TableHead className="w-[100px]">Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className='text-right'>actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    {isLoading ?
                        (
                            <TableSkeleton />
                        ) : (
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
                            </TableBody>)}
                </Table>
            </section>
            <Pagenation currentPage={currentPage} meta={meta} isLoading={isLoading} prevPage={prevPage} nextPage={nextPage} />
        </div>
    )
}

export default TaskContainer

