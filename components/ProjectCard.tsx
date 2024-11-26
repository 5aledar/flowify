'use client'
import React from 'react'
import { MdDelete } from "react-icons/md";
import { Button } from './ui/button';
import { useDeleteProject } from '@/hooks/useDeleteProject';
import Link from 'next/link';
import DeleteProject from './DeleteProject';
const ProjectCard = ({ project, googleId }: any) => {
  
    return (
        <div className='w-full shadow-sm hover:bg-slate-100 bg-slate-50 dark:bg-[#222] dark:hover:bg-[#3f3f3f]  my-2 rounded-lg h-12 flex justify-between items-center px-3'>
            <p>{project.name}</p>
            <div>
                <Link href={`/dashboard/${project.id}`}>
                    <Button variant={'ghost'}>
                        View
                    </Button>
                </Link>
                <DeleteProject id={project.id} googleId={googleId} />
                
            </div>
        </div>
    )
}

export default ProjectCard