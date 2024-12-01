import { useFetchTasks } from '@/hooks/useFetchTasks';
import TasksTable from './TasksTable';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from './ui/button';
import CreateTask from './CreateTask';
import TableSkeleton from './TableSkeleton';

const TaskContainer = ({ id }: { id: string }) => {
    const { tasks, meta, nextPage, prevPage, currentPage, sortOption, changeSortOption, isLoading } = useFetchTasks(id);



    const handleSortChange = (sortValue: string) => {
        changeSortOption(sortValue === "Oldest" ? "older" : "newer");
    };

    return (
        <div className="w-full h-[90vh] py-10">
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
            <section className=' h-[50vh]'>
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
            <div className="flex items-center flex-row-reverse justify-between gap-7 mt-6">
                <div className='flex gap-2'>
                    <Button
                        disabled={currentPage === 1}
                        variant={'outline'}
                        onClick={prevPage}
                        className="h-[30px] text-[12px]  rounded-lg  disabled:cursor-not-allowed"
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={currentPage === meta?.totalPages || isLoading}
                        variant={'outline'}
                        onClick={nextPage}

                        className=" text-[12px] h-[30px] rounded-lg  disabled:cursor-not-allowed"
                    >
                        Next
                    </Button>
                </div>
                <span className="text-[12px] font-normal">
                    Page {meta?.currentPage} of {meta?.totalPages}
                </span>
            </div>
        </div>
    )
}

export default TaskContainer

