import { useQuery } from '@tanstack/react-query'
import { fetchProjects } from '@/lib/actions/projectActions'

export const useFetchProjects = (googleId: string) => {

  const { data, error, isLoading } = useQuery({
    queryKey: ['projects', googleId],
    queryFn: () => fetchProjects(googleId)
  })
  return {
    data,
    error,
    isLoading
  }
}