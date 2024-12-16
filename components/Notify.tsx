'use client';
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { IoIosNotifications } from 'react-icons/io';
import Invitation from './Invitation';
import { useFetchInvites } from '@/hooks/useFetchInvites';
import { useUser } from '@clerk/nextjs';
const Notifications = () => {
  const { user } = useUser();
  const { data, error, isLoading } = useFetchInvites(
    user?.emailAddresses[0].emailAddress!
  );
  return (
    <Popover>
      <PopoverTrigger>
        <IoIosNotifications />
      </PopoverTrigger>
      <PopoverContent className="h-[300px]">
        {isLoading ? (
          <p>loading ...</p>
        ) : (
          data?.invitations?.map((invite: any) => (
            <Invitation key={invite.id} invite={invite} />
          ))
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
