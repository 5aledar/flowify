import { useFetchTasks } from '@/hooks/useFetchTasks'
import { useState } from 'react'
import { useUpdateTaskStatus } from "@/hooks/useUpdateTaskStatus";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { MdDelete } from 'react-icons/md'
import TaskItem from './Task';
import ToDoTasks from './ToDoTasks';

const TaskContainer = ({ id }: { id: string }) => {
    const [page, setPage] = useState(1);
    const { mutate: updateStatus } = useUpdateTaskStatus();
    const {
        tasks,
        meta,
        isLoading,
        isError,
        nextPage,
        prevPage,
        currentPage,
      } = useFetchTasks(id);    const handleStatusChange = (newStatus: string, task: any) => {
        updateStatus({ taskId: task.id, status: newStatus, projectId: id });
    };
    console.log(tasks?.ToDo);
    

    return (
        <div className='w-full px-12 '>
            <ToDoTasks tasks={tasks?.ToDo} id={id} />
            <div className="flex items-center justify-between mt-6">
                <button
                    disabled={currentPage === 1}
                    onClick={prevPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Previous
                </button>

                <span className="text-lg font-semibold">
                    Page {meta?.currentPage} of {meta?.totalPages}
                </span>

                <button
                    disabled={currentPage === meta?.totalPages}
                    onClick={nextPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default TaskContainer
