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

const MIN_LIMIT = 1;
const ARRAY_LAST_ITEM_INDEX_OFFSET = 1;
const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 30;

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
  .input(
    z.object({
      channelId: z.string(),
      cursor: z.string().optional(),
      limit: z.number().min(MIN_LIMIT).max(MAX_LIMIT).optional(),
    }),
  )
  .output(
    z.object({
      items: z.array(z.custom<Message>()),
      nextCursor: z.string().optional(),
    }),
  )
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

    const limit = input.limit ?? DEFAULT_LIMIT;

    const messages = await prisma.message.findMany({
      where: {
        channelId: input.channelId,
      },
      ...(input.cursor
        ? {
            cursor: { id: input.cursor },
            skip: 1,
          }
        : {}),
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: limit,
    });

    const nextCursor =
      messages.length === limit
        ? messages[messages.length - ARRAY_LAST_ITEM_INDEX_OFFSET]?.id
        : undefined;

    return {
      items: messages,
      nextCursor,
    };
  });
