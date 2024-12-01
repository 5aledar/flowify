import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const Home = async () => {
  return (
    <main className='p-16 h-[100vh] ' >
      <header className="h-fit flex m-auto flex-col max-w-[900px] gap-5 justify-center md:p-16 p-8 items-start opacity-90 rounded-2xl bg-gradient-to-t  from-pink-500 to-purple-600">
        <h1 className='sm:text-3xl text-md font-bold'>Simplify your workflow and get things done effortlessly. Designed for individuals</h1>
        <p className='sm:text-md text-sm'>Flowify streamlines task management and keeps your projects flowing no clutter, just productivity.</p>
        <Link href={'/sign-up'}>
          <Button variant={'outline'}>
            Get started
          </Button>
        </Link>
      </header>
    </main>
  )
}

export default Home