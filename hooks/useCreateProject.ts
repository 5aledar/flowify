import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Project {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

const createProject = async ({ name, email }: { name: string; email: string }): Promise<{ success: boolean; project: Project }> => {
    const response = await axios.post('/api/projects', { name, email });    
    return response.data;
};

export const useCreateProject = (email: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            toast.success('New project created');
            queryClient.invalidateQueries({ queryKey: ['projects', email] }); // Refetch projects after creation
        },
        onError: (error: any) => {
            console.log("Error creating project:", error);
            toast.error(error.response?.data?.error || 'Failed to create project');
        },
    });
};
