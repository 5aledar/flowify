import { useFetchProject } from '@/hooks/useFethcProject'
import React from 'react'

const Invitation = ({ id, projectId, permissions }: any) => {
    const { data, error, isLoading } = useFetchProject(id)
    console.log(data);

    return (
        <>
            {!isLoading &&
                <div className='w-full h-[30px] text-sm flex  items-center'>you have been invited to {permissions == "READ" ? 'view' : 'edit'} {data?.name}</div>
            }
        </>
    )
}

export default Invitation