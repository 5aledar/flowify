import { useFetchProject } from '@/hooks/useFethcProject'
import React from 'react'
import { Button } from './ui/button'
import { useUser } from '@clerk/nextjs'
const Invitation = ({ invite }: any) => {
    const { data, error, isLoading } = useFetchProject(invite.projectId)
    
    return (
        <>
            {!isLoading &&
                <div className='w-full h-[40px] gap-1 text-sm flex flex-col justify-start  items-start mb-7 mx-4'>
                    <p>
                        you have been invited you to {invite.permissions == "READ" ? 'view' : 'edit'} {data?.name}
                    </p>
                    <div className='flex items-center'>
                        <p className='text-xs text-gray-500'>{invite.createdAt}</p>
                        <Button className='h-[30px] text-xs' variant={'link'}>view invite</Button>
                    </div>
                </div>
            }
        </>
    )
}

export default Invitation