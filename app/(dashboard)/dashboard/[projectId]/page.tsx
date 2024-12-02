'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useFetchProject } from '@/hooks/useFethcProject'
import TaskContainer from '@/components/TaskContainer'
import ProjectTitle from '@/components/ProjectTitle'
import TitleSkeleton from '@/components/TitleSkeleton'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const Project = () => {
  const { projectId }: { projectId: string } = useParams()
  const id = parseInt(projectId)
  const { data, isLoading } = useFetchProject(id)

  return (
    <main className='flex flex-col items-center px-12'>
      <header className='flex w-full justify-between my-[25px] items-center pt-8'>
        {isLoading && <TitleSkeleton />}
        {data?.name && <ProjectTitle title={data?.name} projectId={projectId} />}
      </header>
      <DndProvider backend={HTML5Backend}>
        <TaskContainer id={projectId} />
      </DndProvider>
    </main>
  )
}

export default Project