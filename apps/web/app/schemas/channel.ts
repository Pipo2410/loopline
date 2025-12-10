/* eslint-disable no-magic-numbers */
import z from 'zod';

export const transformChannelName = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, '') // Remove special characters (keep letters,numbers and dashes)
    .replace(/-+/g, '-') // Replace multiple dashes with a single dash
    .replace(/^-|-$/g, ''); // Remove leading/trailing dashes

export const channelNameSchema = z.object({
  name: z
    .string()
    .min(2, 'Channel name must be at least 2 characters')
    .max(50, 'Channel name must be at most 50 characters')
    .transform((name, ctx) => {
      const transformed = transformChannelName(name);
      if (transformed.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Channel name must be at least 2 characters',
        });
        return z.NEVER;
      }
      return transformed;
    }),
});

export type ChannelSchemaNameType = z.infer<typeof channelNameSchema>;
