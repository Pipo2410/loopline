'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { Hash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { orpc } from '@/lib/orpc';

export const ChannelList: React.FC = () => {
  const {
    data: { channels },
  } = useSuspenseQuery(orpc.channel.list.queryOptions());

  return (
    <div className='space-y-0.5 py-1'>
      {channels.map((channel) => (
        <Link
          className={buttonVariants({
            className: cn(
              'w-full justify-start px-2 py-1 h-7 text-muted-foreground hover:text-accent-foreground hover:bg-accent',
            ),
            variant: 'ghost',
          })}
          href={'#'}
          key={channel.id}
        >
          <Hash className='size-4' />
          <span className='truncate'>{channel.name}</span>
        </Link>
      ))}
    </div>
  );
};
