import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import DeleteProject from './DeleteProject';
const ProjectCard = ({ project, googleId }: any) => {
  
    return (
        <div className='porject-card'>
            <h3>{project.name}</h3>
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