'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { orpc } from '@/lib/orpc';

export const WorkspaceHeader: React.FC = () => {
  const {
    data: { currentWorkspace },
  } = useSuspenseQuery(orpc.channel.list.queryOptions());
  return <h2 className='text-lg font-bold'>{currentWorkspace.orgName}</h2>;
};
