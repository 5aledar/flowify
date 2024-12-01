'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useFetchProject } from '@/hooks/useFethcProject'
import TaskContainer from '@/components/TaskContainer'
import ProjectTitle from '@/components/ProjectTitle'
import TitleSkeleton from '@/components/TitleSkeleton'
const Project = () => {
  const { projectId }: { projectId: string } = useParams()
  const id = parseInt(projectId)
  const { data, isLoading } = useFetchProject(id)




  return (
    <div className='flex flex-col items-center px-12'>
      <div className='flex w-full justify-between mt-[50px] items-center pt-8'>
        {isLoading && <TitleSkeleton />}
        {data?.name && <ProjectTitle title={data?.name} projectId={projectId} />}
      </div>
      <TaskContainer id={projectId} />
    </div>
  )
}

export default Project