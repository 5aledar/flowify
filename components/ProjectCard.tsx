'use client'
import React from 'react'
import { MdDelete } from "react-icons/md";
import { Button } from './ui/button';
import { useDeleteProject } from '@/hooks/useDeleteProject';
import Link from 'next/link';
import DeleteProject from './DeleteProject';
const ProjectCard = ({ project, googleId }: any) => {
  
    return (
        <div className='porject-card'>
            <p>{project.name}</p>
            <div className='flex gap-2'>
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