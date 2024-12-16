import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPermission = async (projectId: string, email: string) => {
  try {
    const { data } = await axios.get(
      `/api/projectaccess/permission?projectId=${projectId}&email=${email}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useFetchPermission = (projectId: string, email: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['permission', projectId, email],
    queryFn: () => fetchPermission(projectId, email),
  });
  return {
    permisson: data,
    error,
    isLoading,
  };
};
