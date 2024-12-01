import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const Home = async () => {
  return (
    <main className='p-16 h-[100vh] ' >
      <header className="h-fit flex m-auto flex-col max-w-[900px] gap-5 justify-center md:p-16 p-8 items-start opacity-90 rounded-2xl bg-gradient-to-t  from-pink-500 to-purple-600">
        <h1 className='sm:text-3xl text-md font-bold'>Simplify Your Workflow with Flowify</h1>
        <p className='sm:text-md text-sm'>Flowify is a simple task management tool that keeps your projects flowing effortlessly. Ideal for teams and individuals to stay productive.</p>
        <Link href={'/sign-up'}>
          <Button variant={'outline'}>
          Get Started Free
          </Button>
        </Link>
      </header>
    </main>
  )
}

export default Home