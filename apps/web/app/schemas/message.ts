import z from 'zod';

export const createMessageSchema = z.object({
  channelId: z.string(),
  content: z.string(),
  imageUrl: z.string().url().optional(), // TODO: double check
});

export type CreateMessageSchema = z.infer<typeof createMessageSchema>;
