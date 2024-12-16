import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const fetchProject = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/projects/${id}`);
    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const useFetchProject = (id: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProject(id),
  });
  return {
    data,
    error,
    isLoading,
  };
};
