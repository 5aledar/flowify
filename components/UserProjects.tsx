'use client'
import { useFetchProjects } from "@/hooks/useFetchProjects";
import { fetchProjects } from "@/lib/actions/projectActions";
import ProjectCard from "./ProjectCard";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";

export default function UserProjects({ googleId }: { googleId: string }) {
    const { data, error, isLoading } = useFetchProjects(googleId)


    if (error) {
        toast.error(error.message)
    }
    if (isLoading) {
        return <div className="w-full h-[50vh] flex justify-center items-center"><LoadingSpinner /></div>
    }
    return (
        <div>
            <h1>Your Projects</h1>
            {data?.length > 0 ? (
                <div>
                    {data?.map((project: any) => (
                        <ProjectCard project={project} googleId={googleId} key={project.id} />
                    ))}
                </div>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
}
