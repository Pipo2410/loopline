import z from 'zod';

import prisma from '@/lib/db';
import { Message } from '@/lib/generated/prisma/client';
import { getAvatar } from '@/lib/get-avatar';

import {
  base,
  requiredAuthMiddleware,
  requiredWorkspaceMiddleware,
} from '../middlewares';
import { readSecurityMiddleware } from '../middlewares/arcjet/read';
import { standardSecurityMiddleware } from '../middlewares/arcjet/standard';
import { writeSecurityMiddleware } from '../middlewares/arcjet/write';
import { createMessageSchema } from '../schemas/message';

export const createMessage = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .use(standardSecurityMiddleware)
  .use(writeSecurityMiddleware)
  .route({
    method: 'POST',
    path: '/messages',
    summary: 'Create a message',
    tags: ['Messages'],
  })
  .input(createMessageSchema)
  .output(z.custom<Message>())
  .handler(async ({ input, context, errors }) => {
    //  verify channel belongs to user's org

    const channel = await prisma.channel.findFirst({
      where: {
        id: input.channelId,
        workspaceId: context.workspace.orgCode,
      },
    });

    if (!channel) {
      throw errors.FORBIDDEN();
    }

    const created = await prisma.message.create({
      data: {
        authorAvatar: getAvatar(context.user.picture, context.user.email!),
        authorEmail: context.user.email!,
        authorId: context.user.id,
        authorName: context.user.given_name ?? 'John Doe',
        channelId: input.channelId,
        content: input.content,
        imageUrl: input.imageUrl,
      },
    });

    return created;
  });

export const listMessages = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .use(standardSecurityMiddleware)
  .use(readSecurityMiddleware)
  .route({
    method: 'GET',
    path: '/messages',
    summary: 'List all messages',
    tags: ['Messages'],
  })
  .input(z.object({ channelId: z.string() }))
  .output(z.array(z.custom<Message>()))
  .handler(async ({ input, context, errors }) => {
    const channel = await prisma.channel.findFirst({
      where: {
        id: input.channelId,
        workspaceId: context.workspace.orgCode,
      },
    });

    if (!channel) {
      throw errors.FORBIDDEN();
    }

    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        channelId: input.channelId,
      },
    });

    return messages;
  });
