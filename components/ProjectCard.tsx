'use client'
import React from 'react'
import { MdDelete } from "react-icons/md";
import { Button } from './ui/button';
import { useDeleteProject } from '@/hooks/useDeleteProject';
import Link from 'next/link';
const ProjectCard = ({ project, googleId }: any) => {
    const deleteProjectMutation = useDeleteProject(googleId);
    const handleDelete = (id: number) => {
        deleteProjectMutation.mutate({ googleId, id });
    };
    return (
            <div className='w-full cursor-pointer shadow-md bg-slate-100 dark:bg-slate-800  my-2 rounded-lg h-12 flex justify-between items-center px-3'>
                <p>{project.name}</p>
                <Button variant={'ghost'} onClick={() => handleDelete(project.id)}>
                    <MdDelete color='red' />
                </Button>
            </div>
    )
}

export default ProjectCard