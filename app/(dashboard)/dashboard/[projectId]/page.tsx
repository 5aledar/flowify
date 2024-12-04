'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useFetchProject } from '@/hooks/useFethcProject'
import TaskContainer from '@/components/TaskContainer'
import ProjectTitle from '@/components/ProjectTitle'
import TitleSkeleton from '@/components/TitleSkeleton'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Invite from '@/components/Invite'
import { useUser } from '@clerk/nextjs'
import { useFetchProjectAccess } from '@/hooks/useFetchProjectAccess'
const Project = () => {
  const { projectId }: { projectId: string } = useParams()
  const id = parseInt(projectId)
  const { data, isLoading } = useFetchProject(id)
  const { user } = useUser()
  const owner = data?.ownerEmail == user?.emailAddresses[0].emailAddress

  if (!owner) {
    const { data, error, isLoading } = useFetchProjectAccess(projectId)
    console.log(data);
  }
  return (
    <main className='flex flex-col items-center px-12'>
      <header className='flex w-full justify-between my-[25px] items-center pt-8'>
        {isLoading && <TitleSkeleton />}
        {data?.name && <ProjectTitle title={data?.name} projectId={projectId} />}
        <Invite projectId={projectId} />
      </header>
      <DndProvider backend={HTML5Backend}>
        <TaskContainer id={projectId} />
      </DndProvider>
    </main>
  )
}

export default Project