import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Project {
    id: string;
    name: string;
    googleId: string;
    createdAt: string;
}

const createProject = async ({ name, googleId }: { name: string; googleId: string }): Promise<{ success: boolean; project: Project }> => {
    const response = await axios.post('/api/projects', { name, googleId });    
    return response.data;
};

export const useCreateProject = (googleId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            toast.success('New project created');
            queryClient.invalidateQueries({ queryKey: ['projects', googleId] }); // Refetch projects after creation
        },
        onError: (error: any) => {
            console.log("Error creating project:", error);
            toast.error(error.response?.data?.error || 'Failed to create project');
        },
    });
};
