import React from 'react'

import CreateProject from '@/components/CreateProject'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import UserProjects from '@/components/UserProjects'
const Dashboard = async () => {
  const clerkUser = await currentUser()
  


  return (
    <div className='px-16 pt-4 h-[82vh]'>
      <div className='flex justify-between mt-[50px]'>
        <h1 className='text-2xl font-bold'>Welcom {clerkUser?.firstName}</h1>
        <CreateProject googleId={clerkUser?.id!} />
      </div>
      <UserProjects googleId={clerkUser?.id!} />
    </div>
  )
}

export default Dashboard