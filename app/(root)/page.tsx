import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Features from '@/components/Features'

const Home = async () => {
  return (
    <>
      <main className='main-home' style={{ backgroundImage: 'url("/bg-img.jpg")', backgroundRepeat: 'no-repeat' }} >
        <div className='flex w-full gap-7 h-[50%] items-center mt-[40px] justify-center flex-col md:flex-row'>

          <header className="bg-header">
            <h1 className='sm:text-3xl text-md font-bold'>Simplify Your Workflow with Flowify</h1>
            <p className='sm:text-md text-sm'>Flowify is a simple task management tool that keeps your projects flowing effortlessly. Ideal for teams and individuals to stay productive.</p>
            <Link href={'/sign-up'}>
              <Button variant={'outline'}>
                Get Started Free
              </Button>
            </Link>
          </header>
          <section className='md:max-w-[40%] max-w-[95%] h-[35%] '>
            <h2 className='md:text-lg font-bold md:mb-5 mb-3 text-white'>Features :</h2>
            <Features />
          </section>
        </div>
      </main>
    </>
  )
}

export default Home