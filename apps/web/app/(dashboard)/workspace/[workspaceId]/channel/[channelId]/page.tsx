import React from 'react';

import { ChannelHeader } from './_components/ChannelHeader';
import { MessageInputForm } from './_components/message/MessageInputForm';
import { MessageList } from './_components/MessageList';

type ChannelPageMainProps = {
  params: Promise<{ channelId: string }>;
};

const ChannelPageMain: React.FC<ChannelPageMainProps> = async ({ params }) => {
  const { channelId } = await params;
  return (
    <div className='flex h-screen w-full'>
      {/* Main channel Area */}
      <div className='flex flex-col flex-1 min-w-0'>
        {/* Fixed Header */}
        <ChannelHeader />
        {/* Scrollable Messages Area */}
        <div className='flex-1 overflow-y-auto mb-4'>
          {/* Messages */}
          <MessageList />
        </div>
        {/* Fixed input */}
        <div className='border-t bg-background p-4'>
          <MessageInputForm channelId={channelId} />
        </div>
      </div>
    </div>
  );
};

export default ChannelPageMain;
