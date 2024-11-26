import { TaskData } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';


const createTask = async ({
    projectId,
    taskData,
}: {
    projectId: string;
    taskData: TaskData;
}) => {
    const { data } = await axios.post(`/api/projects/${projectId}/tasks`, taskData);
    return data;
};

export const useCreateTask = (id:string) => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, { projectId: string; taskData: TaskData }>(
        {
            mutationFn: ({ projectId, taskData }) => createTask({ projectId, taskData }),
            onSuccess: () => {
                toast.success('new task created')
                queryClient.invalidateQueries({ queryKey: ['tasks',id] });

            },
            onError: (error: any) => {
                toast.error(error)
            },
        }
    );
};
