import React from 'react'

import CreateProject from '@/components/CreateProject'
import {  currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
const Dashboard = async () => {
  const clerkUser = await currentUser()
  if (!clerkUser) {
    redirect('/')
  }
  console.log(clerkUser);
  
  return (
    <div className='px-16 pt-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold'>Welcom </h1>
        <CreateProject />
      </div>
    </div>
  )
}

export default Dashboard