'use client'
import React, { Suspense } from 'react'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useFetchProject } from '@/hooks/useFethcProject'
import CreateTask from '@/components/CreateTask'
import TaskContainer from '@/components/TaskContainer'
import Loading from './loading'
import Image from 'next/image'
import ProjectTitle from '@/components/ProjectTitle'
const Project = () => {
  const { projectId }: { projectId: string } = useParams()
  const id = parseInt(projectId)
  const { data, error, isLoading } = useFetchProject(id)




  return (
    <Suspense fallback={<Loading />}>

      <div className='flex flex-col items-center px-12'>
        <div className='flex w-full justify-between mt-[50px] items-center pt-8'>
         {data?.name&& <ProjectTitle title={data?.name} projectId={projectId} />}
        </div>
        <TaskContainer id={projectId} />
      </div>
    </Suspense>
  )
}

export default Project