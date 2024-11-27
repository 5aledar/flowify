import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GroupedTasks {
  ToDo: any[];
  InProgress: any[];
  Completed: any[];
}

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalTasks: number;
  pageSize: number;
}

interface FetchTasksResponse {
  tasks: GroupedTasks;
  pagination: PaginationMeta;
}

// Fetch Tasks API Function
const fetchTasks = async (
  projectId: string,
  page: number,
  sort: string
): Promise<FetchTasksResponse> => {
  const { data } = await axios.get(
    `/api/projects/${projectId}/tasks?page=${page}&sort=${sort}`
  );

  return data;
};

// Custom Hook
export const useFetchTasks = (projectId: string) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<"older" | "newer">("older"); // Default sort

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["tasks", projectId, currentPage, sortOption],
    queryFn: () => fetchTasks(projectId, currentPage, sortOption),
  });

  const nextPage = () => {
    if (data?.pagination && currentPage < data.pagination.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const changeSortOption = (newSort: "older" | "newer") => {
    setSortOption(newSort);
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  return {
    tasks: data?.tasks,
    meta: data?.pagination,
    isLoading,
    isError,
    refetch,
    currentPage,
    nextPage,
    prevPage,
    sortOption,
    changeSortOption,
  };
};
