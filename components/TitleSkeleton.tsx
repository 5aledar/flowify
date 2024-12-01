import React from 'react'
import { Skeleton } from './ui/skeleton'

const TitleSkeleton = () => {
  return (
    <div className='flex gap-3 pt-8'>
        <Skeleton className='w-[200px] h-[25px]' />
        <Skeleton className='w-[25px] h-[25px]' />
    </div>
  )
}

export default TitleSkeleton