import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface DeleteTaskArgs {
  projectId: string;
  taskId: number;
}

const deleteTask = async ({ projectId, taskId }: DeleteTaskArgs) => {
  const { data } = await axios.delete(`/api/projects/${projectId}/tasks/${taskId}`);
  return data;
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (_, { projectId }) => {
      toast.success("Task deleted successfully!");

      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
    onError: (error: any) => {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    },
  });
};