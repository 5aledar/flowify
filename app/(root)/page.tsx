import React from 'react'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import SignIn from '@/components/SignIn'
const Home = async () => {
  const session = await auth()
  // if (session) {
  //   redirect('/dashboard')
  // }
  return (
    <div className='p-7'>
      <div className="h-[400px] flex flex-col gap-5 justify-center items-center opacity-90 rounded-2xl bg-gradient-to-t  from-pink-500 to-purple-600">
        <h1 className='text-3xl font-bold'>Make your work flowless</h1>
        <SignIn />
      </div>
    </div>
  )
}

export default Home