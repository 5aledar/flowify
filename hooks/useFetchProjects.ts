import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Project {
  id: number;
  name: string;
  tasks: any[];
}

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalProjects: number;
  pageSize: number;
}

interface FetchProjectsResponse {
  projects: Project[];
  meta: PaginationMeta;
}

// Fetch Projects API Function
const fetchProjects = async (googleId: string, page: number) => {
  const { data } = await axios.get<FetchProjectsResponse>(
    `/api/projects/create/${googleId}?page=${page}`
  );
  return data;
};

// Custom Hook
export const useFetchProjects = (googleId: string) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["projects", googleId, currentPage],
    queryFn: () => fetchProjects(googleId, currentPage),
  }

  );

  // Pagination controls
  const nextPage = () => {
    if (data?.meta && currentPage < data.meta.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    projects: data?.projects || [],
    meta: data?.meta,
    isLoading,
    isError,
    refetch,
    currentPage,
    nextPage,
    prevPage,
  };
};
