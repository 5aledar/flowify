import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

type TaskData = {
    title: string;
    description: string;
    status: string;
};

const createTask = async ({
    projectId,
    taskData,
}: {
    projectId: string;
    taskData: TaskData;
}) => {
    const {data} = await axios.post(`/api/projects/${projectId}/tasks`, taskData);
    return data; 
};

export const useCreateTask = () => {
    return useMutation<any, Error, { projectId: string; taskData: TaskData }>(
        {
            mutationFn: ({ projectId, taskData }) => createTask({ projectId, taskData }),  

            onSuccess: (data) => {
                toast.success('new task created')
            },
            onError: (error: any) => {
                toast.error(error)
            },
        }
    );
};
