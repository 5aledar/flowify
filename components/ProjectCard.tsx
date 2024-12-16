import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import DeleteProject from './DeleteProject';
const ProjectCard = ({ project, email }: any) => {
  return (
    <div className="porject-card">
      <h3>{project.name}</h3>
      <div className="flex gap-2">
        <Link href={`/dashboard/${project.id}`}>
          <Button variant={'ghost'}>View</Button>
        </Link>
        <DeleteProject id={project.id} email={email} />
      </div>
    </div>
  );
};

export default ProjectCard;
