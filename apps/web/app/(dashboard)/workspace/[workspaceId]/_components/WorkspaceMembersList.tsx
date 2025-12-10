'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback } from '@workspace/ui/components/avatar';
import Image from 'next/image';
import React from 'react';

import { getAvatar } from '@/lib/get-avatar';
import { orpc } from '@/lib/orpc';

const FIRST_CHARACTER_INDEX = 0;

export const WorkspaceMembersList: React.FC = () => {
  const {
    data: { members },
  } = useSuspenseQuery(orpc.channel.list.queryOptions());
  return (
    <div className='space-y-0.5 py-1'>
      {members.map((member) => (
        <div
          className='px-3 py-2 hover:bg-accent cursor-pointer transition-colors flex items-center space-x-3'
          key={member.id}
        >
          <div className='relative'>
            <Avatar className='size-8 relative'>
              <AvatarFallback>
                {member.full_name?.charAt(FIRST_CHARACTER_INDEX).toUpperCase()}
              </AvatarFallback>
              <Image
                alt={'User Image'}
                className='object-cover'
                fill
                src={getAvatar(member.picture ?? null, member.email!)}
              />
            </Avatar>
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium truncate'>{member.full_name}</p>
            <p className='text-xs text-muted-foreground truncate'>
              {member.email}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
