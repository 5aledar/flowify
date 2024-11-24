'use server'

import Image from 'next/image'
import React from 'react'
import { ModeToggle } from './ModeButton'
import {  SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
const Navbar = async () => {
  return (
    <nav className='flex justify-between items-center h-[55px] px-16'>
      <div className='flex gap-2 items-center'>
        <Image src={'/logo.png'} alt='logo' width={32} height={32} />
        <p className='font-bold'>Flowify</p>
      </div>
      <div className='flex justify-between items-center gap-3'>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar