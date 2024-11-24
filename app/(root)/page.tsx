import React from 'react'
import { saveUserToDatabase } from '@/lib/actions/userActions'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
const Home = async () => {
  const clerkUser = await currentUser()
  if (clerkUser) {
    await saveUserToDatabase(clerkUser);

    redirect('/dashboard')
  }
  return (
    <div className='p-16'>
      <div className="h-[400px] flex flex-col gap-5 justify-center items-center opacity-90 rounded-2xl bg-gradient-to-t  from-pink-500 to-purple-600">
        <h1 className='text-3xl font-bold'>Make your work flowless</h1>

      </div>
    </div>
  )
}

export default Home