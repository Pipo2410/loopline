import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@workspace/ui/components/empty';
import { Cloud } from 'lucide-react';
import { redirect } from 'next/navigation';

import { client } from '@/lib/orpc';

import { CreateNewChannel } from './_components/CreateNewChannel';

type WorkspaceIdPageProps = {
  params: Promise<{ workspaceId: string }>;
};

const FIRST_ITEM = 0;
const ZERO = 0;

const WorkspaceIdPage: React.FC<WorkspaceIdPageProps> = async ({ params }) => {
  const { workspaceId } = await params;
  const { channels } = await client.channel.list();
  console.log('WorkspaceIdPage', workspaceId);

  if (channels.length > ZERO) {
    return redirect(
      `/workspace/${workspaceId}/channel/${channels[FIRST_ITEM]?.id}`,
    );
  }

  return (
    <div className='flex flex-1 p-10'>
      <Empty className='border border-dashed from-muted/50 to-background h-full bg-linear-to-b from-30%'>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <Cloud />
          </EmptyMedia>
          <EmptyTitle>No channels yet!</EmptyTitle>
          <EmptyDescription>
            Create your first channel to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className='max-w-2xs mx-auto'>
          <CreateNewChannel />
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default WorkspaceIdPage;
