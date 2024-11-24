
import React from 'react'

import LogOut from './LogOut'
const UserInfo = async () => {
    // const session = await auth()
    // const { name, image } = session?.user!
    return (

        <div className='flex items-center gap-3 border-2 p-[5px] rounded-lg'>
            {/* <Image
                src={طظ}
                alt='user avatar'
                width={24}
                height={24}
                className='rounded-full'
            /> */}
            {/* <p>{name}</p> */}
            <LogOut />
        </div>
    )
}

export default UserInfo