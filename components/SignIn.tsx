import React from 'react'
import { signIn } from '@/auth'
const SignIn = () => {
    return (
        <div className=''>
            <form className=''
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <button type="submit" className='w-[100px] h-[33px] rounded-md flex dark:bg-white dark:text-black hover:bg-blue-700 justify-center items-center cursor-pointer text-white'>Sign in</button>
            </form>
        </div>
    )
}

export default SignIn