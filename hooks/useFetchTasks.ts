import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFilterStore } from "@/store/useFilterStore";
import { Task } from "@prisma/client";
interface GroupedTasks {
  ToDo: Task[];
  InProgress: Task[];
  Completed: Task[];
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

const fetchTasks = async (
  projectId: string,
  page: number,
  sort: string
): Promise<FetchTasksResponse> => {
  const { data }: { data: FetchTasksResponse } = await axios.get(
    `/api/projects/${projectId}/tasks?page=${page}&sort=${sort}`
  );
  console.log(data);
  

  return data!;
};

export const useFetchTasks = (projectId: string) => {
  const { date } = useFilterStore()
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<"older" | "newer">(date); // Default sort

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
console.log(data);

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
