import React from 'react'

import CreateProject from '@/components/CreateProject'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import UserProjects from '@/components/UserProjects'
const Dashboard = async () => {
  const clerkUser = await currentUser()
  if (!clerkUser) {
    redirect('/')
  }

  return (
    <div className='px-16 pt-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold'>Welcom {clerkUser.firstName}</h1>
        <CreateProject googleId={clerkUser.id} />
      </div>
      <UserProjects googleId={clerkUser.id} />
    </div>
  )
}

export default Dashboard