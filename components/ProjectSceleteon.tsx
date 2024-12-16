import React from 'react';
import { Skeleton } from './ui/skeleton';

const ProjectSceleteon = () => {
  return (
    <div className="flex flex-col gap-2 mt-2 pr-3">
      <div className="flex py-2 w-full justify-between items-center">
        <Skeleton className="w-[150px] h-[20px] rounded-md" />
        <Skeleton className="w-[50px] h-[40px] rounded-md" />
      </div>
      <div className="flex py-2 w-full justify-between items-center">
        <Skeleton className="w-[150px] h-[20px] rounded-md" />
        <Skeleton className="w-[50px] h-[40px] rounded-md" />
      </div>
      <div className="flex py-2 w-full justify-between items-center">
        <Skeleton className="w-[150px] h-[20px] rounded-md" />
        <Skeleton className="w-[50px] h-[40px] rounded-md" />
      </div>
    </div>
  );
};

export default ProjectSceleteon;
