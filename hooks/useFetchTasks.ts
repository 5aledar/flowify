import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFilterStore } from "@/store/useFilterStore";
import { Task } from "@prisma/client";

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalTasks: number;
  pageSize: number;
}

interface FetchTasksResponse {
  tasks: Task[];
  pagination: PaginationMeta;
}

const fetchTasks = async (
  projectId: string,
  page: number,
  date: string,
  filter: string
): Promise<FetchTasksResponse> => {


  const { data }: { data: FetchTasksResponse } = await axios.get(
    `/api/projects/${projectId}/tasks?page=${page}&sort=${date}&filter=${filter}`
  );


  return data!;
};

export const useFetchTasks = (projectId: string) => {
  const { date, status } = useFilterStore()
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<"older" | "newer">(date); // Default sort
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["tasks", projectId, currentPage, sortOption, date, status],
    queryFn: () => fetchTasks(projectId, currentPage, sortOption, status),
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
    tasks: data?.tasks!,
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
