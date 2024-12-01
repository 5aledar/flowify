import React from 'react'
import CreateProject from '@/components/CreateProject'
import { currentUser } from '@clerk/nextjs/server'
import UserProjects from '@/components/UserProjects'
import { saveUserToDatabase } from '@/lib/actions/userActions'
const Dashboard = async () => {
  const clerkUser = await currentUser()
  await saveUserToDatabase(clerkUser)
  return (
    <main className='px-16 pt-4 h-[82vh]'>
      <header className='flex justify-between mt-[50px]'>
        <b className='text-2xl'>Welcom {clerkUser?.firstName}</b>
        <CreateProject googleId={clerkUser?.id!} />
      </header>
      <UserProjects googleId={clerkUser?.id!} />
    </main>
  )
}

export default Dashboard