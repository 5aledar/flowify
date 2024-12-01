'use client'
import { useFetchProjects } from "@/hooks/useFetchProjects";
import ProjectCard from "./ProjectCard";

import toast from "react-hot-toast";
import ProjectSceleteon from "./ProjectSceleteon";
import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "./ui/button";

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
        <Suspense fallback={<LoadingSpinner />}>
            <section className="flex flex-col justify-between h-[100%]">
                <div className="h-[50vh]">
                    <h2>Your Projects</h2>
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
                </div>

                <div className="flex items-center flex-row-reverse justify-between gap-7 mt-6">
                    <div className='flex gap-2'>
                        <Button
                            disabled={currentPage === 1}
                            variant={'outline'}
                            onClick={prevPage}
                            className="h-[30px] text-[12px]  rounded-lg  disabled:cursor-not-allowed"
                        >
                            Previous
                        </Button>
                        <Button
                            disabled={currentPage === meta?.totalPages || isLoading}
                            variant={'outline'}
                            onClick={nextPage}

                            className=" text-[12px] h-[30px] rounded-lg  disabled:cursor-not-allowed"
                        >
                            Next
                        </Button>
                    </div>
                    <span className="text-[12px] font-normal">
                        Page {meta?.currentPage} of {meta?.totalPages}
                    </span>
                </div>
            </section>
        </Suspense>
    );
}
