'use client'
import React from 'react'
import { MdDelete } from "react-icons/md";
import { Button } from './ui/button';
import { deleteProject } from '@/lib/actions/projectActions';
import { currentUser } from '@clerk/nextjs/server';
const ProjectCard = ({ project, googleId }: any) => {
    return (
        <div className='w-full bg-slate-800 my-2 rounded-lg h-10 flex justify-between items-center px-3'>
            <p>{project.name}</p>
            <Button className='bg-transparent w-fit' onClick={() => deleteProject(googleId!, project.id)}>
                <MdDelete color='red' />
            </Button>
        </div>
    )
}

export default ProjectCard