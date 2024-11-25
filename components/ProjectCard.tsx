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
        <div className='w-full shadow-sm hover:bg-slate-100 bg-slate-50 dark:bg-[#222] dark:hover:bg-[#3f3f3f]  my-2 rounded-lg h-12 flex justify-between items-center px-3'>
            <p>{project.name}</p>
            <div>
                <Link href={`/dashboard/${project.id}`}>
                    <Button variant={'ghost'}>
                        View
                    </Button>
                </Link>
                <Button variant={'ghost'} className='text-red-500 hover:text-red-600' onClick={() => handleDelete(project.id)}>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ProjectCard