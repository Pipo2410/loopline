'use client';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { PortalLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { CreditCard, LogOutIcon, User } from 'lucide-react';
import React from 'react';

import { getAvatar } from '@/lib/get-avatar';
import { orpc } from '@/lib/orpc';

const FIRST_POSITION = 0;
const END_POSITION = 1;

export const UserNav: React.FC = () => {
  const {
    data: { user },
  } = useSuspenseQuery(orpc.workspace.list.queryOptions());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='size-12 rounded-xl hover:rounded-lg transition-all duration-200 bg-background/50 border-border/50 hover:bg-accent hover:text-accent-foreground'
          size='icon'
          variant='outline'
        >
          <Avatar>
            <AvatarImage
              alt='User Image'
              className='object-cover'
              // user.email => users only auth with email or OAuth = always have email
              src={getAvatar(user.picture, user.email!)}
            />
            <AvatarFallback>
              {user.given_name
                ?.slice(FIRST_POSITION, END_POSITION)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[200px]'
        side='right'
        sideOffset={8}
      >
        <DropdownMenuLabel className='font-normal flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
          <Avatar className='relative size-8 rounded-lg'>
            <AvatarImage
              alt='User Image'
              className='object-cover'
              src={getAvatar(user.picture, user.email!)}
            />
            <AvatarFallback>
              {user.given_name
                ?.slice(FIRST_POSITION, END_POSITION)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <p className='truncate font-medium'>{user.given_name}</p>
            <p className='text-muted-foreground truncate text-xs'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <PortalLink>
              <User />
              Account
            </PortalLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <PortalLink>
              <CreditCard />
              Billing
            </PortalLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutLink>
            <LogOutIcon />
            Log out
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
