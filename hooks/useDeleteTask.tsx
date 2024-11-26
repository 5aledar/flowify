import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface DeleteTaskArgs {
  projectId: string;
  taskId: number;
}

// API call function
const deleteTask = async ({ projectId, taskId }: DeleteTaskArgs) => {
  const { data } = await axios.delete(`/api/projects/${projectId}/tasks/${taskId}`);
  return data;
};

// Custom hook
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (_, { projectId }) => {
      // Show success toast
      toast.success("Task deleted successfully!");

      // Refetch tasks for the project
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
    onError: (error: any) => {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    },
  });
};