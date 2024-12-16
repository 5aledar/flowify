import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const updateProjectTitle = async ({
  projectId,
  email,
  name,
}: {
  projectId: string;
  email: string;
  name: string;
}) => {
  const response = await axios.put(
    `/api/projects/${projectId}?email=${email}`,
    { name }
  );
  return response.data;
};

export const useUpdateProjectTitle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProjectTitle,
    onSuccess: (data) => {
      toast.success('title updated');
    },
    onError: (error) => {
      console.error('Error updating project title:', error);
    },
  });
};
