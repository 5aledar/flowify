import React from 'react'
import { saveUserToDatabase } from '@/lib/actions/userActions'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { url } from 'inspector'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const Home = async () => {
  return (
    <main className='p-16 h-[100vh] ' >
      <div className="h-[400px] flex m-auto flex-col max-w-[900px] gap-5 justify-center p-16 items-start opacity-90 rounded-2xl bg-gradient-to-t  from-pink-500 to-purple-600">
        <h1 className='text-3xl font-bold'>Simplify your workflow and get things done effortlessly. Designed for individuals</h1>
        <p>Flowify streamlines task management and keeps your projects flowing no clutter, just productivity.</p>
        <Link href={'/sign-up'}>
        <Button>
          Get started
        </Button>
        </Link>
      </div>
    </main>
  )
}

export default Home