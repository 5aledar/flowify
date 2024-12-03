'use server'

import Image from 'next/image'
import React from 'react'
import { ModeToggle } from './ModeButton'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Notifications from './Notifications'
import { auth, currentUser } from '@clerk/nextjs/server'
const Navbar = async () => {
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0].emailAddress
  return (
    <nav className='flex justify-between fixed w-full bg-white dark:bg-[#09090B] items-center md:h-[45px] h-[40px]  md:px-12 px-6 z-50'>
      <Link href={'/'}>
        <div className='flex gap-2 items-center'>
          <Image src={'/logo.png'} alt='logo' width={28} height={28} />
          <p className='font-bold text-sm md:text-md'>Flowify</p>
        </div>
      </Link>
      <div className='flex justify-between items-center gap-3'>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <Notifications userEmail={userEmail!} />
        </SignedIn>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar