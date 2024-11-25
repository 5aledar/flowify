import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const deleteProject = async ({ googleId, id }: { googleId: string; id: number }) => {
    const response = await axios.delete(`/api/projects/${id}`, {
        params: { googleId },
    });
    return response.data;
};

export const useDeleteProject = (googleId: string) => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { googleId: string; id: number }>({
        mutationFn: deleteProject,
        onSuccess: () => {
            toast.success('Project deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['projects', googleId] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to delete project');
        },
    });
};
