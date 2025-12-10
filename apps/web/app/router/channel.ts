import {
  init,
  organization_user,
  Organizations,
} from '@kinde/management-api-js';
import { KindeOrganization } from '@kinde-oss/kinde-auth-nextjs';
import z from 'zod';

import prisma from '@/lib/db';
import { Channel } from '@/lib/generated/prisma/client';

import {
  base,
  requiredAuthMiddleware,
  requiredWorkspaceMiddleware,
} from '../middlewares';
import { heavyWriteSecurityMiddleware } from '../middlewares/arcjet/heavy-write';
import { standardSecurityMiddleware } from '../middlewares/arcjet/standard';
import { channelNameSchema } from '../schemas/channel';

export const createChannel = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .use(standardSecurityMiddleware)
  .use(heavyWriteSecurityMiddleware)
  .route({
    method: 'POST',
    path: '/',
    summary: 'Create a new channel',
    tags: ['channels'],
  })
  .input(channelNameSchema)
  .output(z.custom<Channel>())
  .handler(async ({ input, context }) => {
    const channel = await prisma.channel.create({
      data: {
        createdById: context.user.id,
        name: input.name,
        workspaceId: context.workspace.orgCode,
      },
    });

    return channel;
  });

export const listChannels = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .route({
    method: 'GET',
    path: '/channels',
    summary: 'List all channels',
    tags: ['channels'],
  })
  .input(z.void())
  .output(
    z.object({
      channels: z.array(z.custom<Channel>()),
      currentWorkspace: z.custom<KindeOrganization<unknown>>(),
      members: z.array(z.custom<organization_user>()),
    }),
  )
  .handler(async ({ context }) => {
    const [channels, members] = await Promise.all([
      await prisma.channel.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          workspaceId: context.workspace.orgCode,
        },
      }),
      (async (): Promise<organization_user[]> => {
        init();

        const usersInOrg = await Organizations.getOrganizationUsers({
          orgCode: context.workspace.orgCode,
          sort: 'name_asc',
        });

        return usersInOrg.organization_users ?? [];
      })(),
    ]);

    return {
      channels,
      currentWorkspace: context.workspace,
      members,
    };
  });
