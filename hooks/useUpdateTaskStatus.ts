import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface UpdateTaskStatusArgs {
    taskId: number;
    status: string;
    projectId: string;
}

// API call function
const updateTaskStatus = async ({ taskId, status, projectId }: UpdateTaskStatusArgs) => {
    const { data } = await axios.put(`/api/projects/${projectId}/tasks/${taskId}`, { status });
    return data;
};

// Custom hook
export const useUpdateTaskStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTaskStatus,
        onSuccess: (_, { projectId }) => {
            // Show success toast
            toast.success("Task status updated!");

            // Refetch tasks for the project
            queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
        },
        onError: (error: any) => {
            console.error("Error updating task status:", error);
            toast.error("Failed to update task status");
        },
    });
};
