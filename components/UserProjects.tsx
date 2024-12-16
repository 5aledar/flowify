'use client';
import { useFetchProjects } from '@/hooks/useFetchProjects';
import ProjectCard from './ProjectCard';
import toast from 'react-hot-toast';
import ProjectSceleteon from './ProjectSceleteon';
import { Suspense, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import Pagenation from './Pagenation';
import { useFetchProjectAccess } from '@/hooks/useFetchProjectAccess';
export default function UserProjects({ email }: { email: string }) {
  const {
    projects,
    meta,
    isLoading,
    isError,
    nextPage,
    prevPage,
    currentPage,
  } = useFetchProjects(email);
  const { projectAccesses, error, loading } = useFetchProjectAccess(email);
  console.log(projectAccesses);

  if (isError) {
    toast.error('error fetching projects');
  }
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <section className="flex flex-col justify-between h-[100%]">
        <div className="h-[50vh]">
          <h2>Your Projects</h2>
          {isLoading ? (
            <ProjectSceleteon />
          ) : projects?.length > 0 ? (
            <div>
              {projects?.map((project: any) => (
                <ProjectCard project={project} email={email} key={project.id} />
              ))}
            </div>
          ) : (
            <p>No projects found.</p>
          )}
        </div>

        <div className="flex flex-col justify-between h-[100%]">
          <div className="h-[50vh]">
            <h2>Team projects</h2>
            {projectAccesses &&
              projectAccesses?.map((project: any) => {
                return (
                  <ProjectCard
                    key={project.project.id}
                    project={project.project}
                    email={project.userEmail}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </Suspense>
  );
}
