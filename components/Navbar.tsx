import Image from 'next/image'
import React from 'react'
import { ModeToggle } from './ModeButton'
import SignIn from './SignIn'
import { auth } from '@/auth'
import LogOut from './LogOut'
const Navbar = async () => {
  const session = await auth()

  return (
    <div className='flex justify-between items-center h-[45px] px-5'>
      <div className='flex gap-2 items-center'>
        <Image src={'/logo.png'} alt='logo' width={32} height={32} />
        <p className='font-bold'>Flowify</p>
      </div>
      <div className='flex justify-between items-center gap-3'>
        {!session ? (<SignIn />) : (<LogOut />)}
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar