'use client'
import { useFetchProjects } from "@/hooks/useFetchProjects";
import { fetchProjects } from "@/lib/actions/projectActions";
import ProjectCard from "./ProjectCard";

export default  function UserProjects({ googleId }: { googleId: string }) {
    const { data, error, isLoading } =  useFetchProjects(googleId)
   
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    return (
        <div>
            <h1>Your Projects</h1>
            {data?.length > 0 ? (
                <div>
                    {data?.map((project:any) => (
                        <ProjectCard project={project} googleId={googleId} key={project.id} />
                    ))}
                </div>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
}
