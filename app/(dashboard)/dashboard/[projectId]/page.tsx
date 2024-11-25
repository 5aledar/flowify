'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useFetchProject } from '@/hooks/useFethcProject'
const Project = () => {
  const { projectId }: { projectId: string } = useParams()
  const id = parseInt(projectId)
  const {data , error , isLoading} = useFetchProject(id)

  
  
  return (
    <div className='flex flex-col items-center'>
      <h1>{data?.name}</h1>
      
    </div>
  )
}

export default Project