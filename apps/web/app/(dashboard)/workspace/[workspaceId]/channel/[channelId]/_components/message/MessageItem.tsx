import { SafeContent } from '@workspace/ui/components/rich-text-editor/SafeContent';
import Image from 'next/image';
import React from 'react';

import { Message } from '@/lib/generated/prisma/client';
import { getAvatar } from '@/lib/get-avatar';

interface iAppProps {
  message: Message;
}

export const MessageItem: React.FC<iAppProps> = ({ message }) => (
  <div className='flex space-x-3 relative p-3 rounded-lg group hover:bg-muted/50'>
    <Image
      alt={message.authorName}
      className='size-8 rounded-lg'
      height={32}
      src={getAvatar(message.authorAvatar, message.authorEmail)}
      width={32}
    />
    <div className='flex-1 space-y-1 min-w-0'>
      <div className='flex items-center gap-x-2'>
        <p className='font-medium leading-none'>{message.authorName}</p>
        <p className='text-xs text-muted-foreground leading-none'>
          {new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(message.createdAt)}{' '}
          {new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            hour12: false,
            minute: '2-digit',
          }).format(message.createdAt)}
        </p>
      </div>

      {message.content && (
        <SafeContent
          className='text-sm wrap-break-word prose dark:prose-invert max-w-none marker:text-primary'
          content={JSON.parse(message.content)}
        />
      )}
    </div>
  </div>
);
