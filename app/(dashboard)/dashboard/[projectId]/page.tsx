'use client'
import React, { Suspense } from 'react'
import { useParams } from 'next/navigation'
import { useFetchProject } from '@/hooks/useFethcProject'
import CreateTask from '@/components/CreateTask'
import TaskContainer from '@/components/TaskContainer'
import Loading from './loading'
const Project = () => {
  const { projectId }: { projectId: string } = useParams()
  const id = parseInt(projectId)
  const { data, error, isLoading } = useFetchProject(id)

  

  return (
    <Suspense fallback={<Loading />} >

      <div className='flex flex-col items-center px-12'>
        <div className='flex w-full justify-between items-center pt-8'>
          <h1>{data?.name}</h1>
          <CreateTask projectId={projectId} />
        </div>
        <TaskContainer id={projectId} />
      </div>
    </Suspense>
  )
}

export default Project