'use client'
import { useFetchProjects } from "@/hooks/useFetchProjects";
import { fetchProjects } from "@/lib/actions/projectActions";
import ProjectCard from "./ProjectCard";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";
import ProjectSceleteon from "./ProjectSceleteon";

export default function UserProjects({ googleId }: { googleId: string }) {
    const {
        projects,
        meta,
        isLoading,
        isError,
        nextPage,
        prevPage,
        currentPage,
    } = useFetchProjects(googleId);



    if (isError) {
        toast.error('error fetching projects')
    }

    return (
        <div>
            <h1>Your Projects</h1>
            {isLoading ? (<ProjectSceleteon />) :

                projects?.length > 0 ? (
                    <div>
                        {projects?.map((project: any) => (
                            <ProjectCard project={project} googleId={googleId} key={project.id} />
                        ))}
                    </div>
                ) : (
                    <p>No projects found.</p>
                )}
            {meta && (
                <div className="flex justify-between items-center">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {meta.currentPage} of {meta.totalPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === meta.totalPages}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
