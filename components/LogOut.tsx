import React from 'react'
import { signOut } from '@/auth'

const LogOut = () => {
    return (
        <div>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <button type="submit" className='w-[100px] h-[33px] rounded-md flex bg-blue-600 hover:bg-blue-700 justify-center items-center cursor-pointer text-white'>Log out</button>
            </form>
        </div>
    )

}

export default LogOut