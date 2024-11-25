import React from 'react'
import { Skeleton } from './ui/skeleton'

const ProjectSceleteon = () => {
  return (
    <div className='flex flex-col gap-2 my-2'>
        <Skeleton className='w-full h-12 rounded-md shadow-sm' />
        <Skeleton className='w-full h-12 rounded-md shadow-sm' />
        <Skeleton className='w-full h-12 rounded-md shadow-sm' />
        <Skeleton className='w-full h-12 rounded-md shadow-sm' />
        <Skeleton className='w-full h-12 rounded-md shadow-sm' />
    </div>
  )
}

export default ProjectSceleteon