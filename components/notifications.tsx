'use client'
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IoIosNotifications } from "react-icons/io";
import Invitation from './Invitation';
import { useFetchInvites } from '@/hooks/useFetchInvites';
const Notifications = ({ userEmail }: { userEmail: string }) => {
    const { data, error, isLoading } = useFetchInvites(userEmail)

    return (
        <Popover>
            <PopoverTrigger>
                <IoIosNotifications />
            </PopoverTrigger>
            <PopoverContent className='h-[300px]'>
                {data?.invitations?.map((invite: any) => (
                    <Invitation key={invite.id} invite={invite} />
                ))
                }
            </PopoverContent>
        </Popover >
    )
}

export default Notifications