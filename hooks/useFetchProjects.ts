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

const fetchProjects = async (email: string, page: number) => {

  const { data } = await axios.get<FetchProjectsResponse>(
    `/api/projects?page=${page}&email=${email}`
  );
  return data;
};

export const useFetchProjects = (email: string) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["projects", email, currentPage],
    queryFn: () => fetchProjects(email, currentPage),
  }

  );

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
