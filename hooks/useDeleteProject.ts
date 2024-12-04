import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const deleteProject = async ({ email, id }: { email: string; id: number }) => {
    const response = await axios.delete(`/api/projects/${id}`, {
        params: { email },
    });
    return response.data;
};

export const useDeleteProject = (email: string) => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { email: string; id: number }>({
        mutationFn: deleteProject,
        onSuccess: () => {
            toast.success('Project deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['projects', email] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to delete project');
        },
    });
};
