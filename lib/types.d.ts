declare type Project = {
    id: number;
    name: string;
    googleId: string;
}

declare type TaskData = {
    title: string;
    description: string;
    status: string;
};


declare type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
}

declare type  PaginationMeta = {
    currentPage: number;
    totalPages: number;
    totalTasks: number;
    pageSize: number;
}

export enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}