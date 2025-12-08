'use client';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Button } from '@workspace/ui/components/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';
import { cn } from '@workspace/ui/lib/utils';

import { orpc } from '@/lib/orpc';

const colorCombinations = [
  'bg-blue-500 hover:bg-blue-600 text-white',
  'bg-emerald-500 hover:bg-emerald-600 text-white',
  'bg-purple-500 hover:bg-purple-600 text-white',
  'bg-amber-500 hover:bg-amber-600 text-white',
  'bg-rose-500 hover:bg-rose-600 text-white',
  'bg-indigo-500 hover:bg-indigo-600 text-white',
  'bg-cyan-500 hover:bg-cyan-600 text-white',
  'bg-pink-500 hover:bg-pink-600 text-white',
];

const FIRST_ITEM = 0;
const INITIAL_VALUE = 0;

const getWorkspaceColor = (id: string): string | undefined => {
  const charSum = id
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(FIRST_ITEM), INITIAL_VALUE);

  const colorIndex = charSum % colorCombinations.length;

  return colorCombinations[colorIndex];
};

export const WorkspaceList: React.FC = () => {
  const {
    data: { workspaces, currentWorkspace },
  } = useSuspenseQuery(orpc.workspace.list.queryOptions());

  return (
    <TooltipProvider>
      <div className='flex flex-col gap-2'>
        {workspaces.map((ws) => {
          const isActive = currentWorkspace.orgCode === ws.id;

          return (
            <Tooltip key={ws.id}>
              <TooltipTrigger asChild>
                <LoginLink orgCode={ws.id}>
                  <Button
                    className={cn(
                      'size-12 transition-all duration-200',
                      getWorkspaceColor(ws.id),
                      isActive ? 'rounded-lg' : 'rounded-xl hover:rounded-lg',
                    )}
                    size='icon'
                  >
                    <span className='text-sm font-semibold'>{ws.avatar}</span>
                  </Button>
                </LoginLink>
              </TooltipTrigger>
              <TooltipContent side='right'>
                <p>
                  {ws.name} {isActive && '(Current)'}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};
