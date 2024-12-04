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
        <CreateProject email={clerkUser?.emailAddresses[0].emailAddress!} />
      </header>
      <UserProjects email={clerkUser?.emailAddresses[0].emailAddress!} />
    </main>
  )
}

export default Dashboard