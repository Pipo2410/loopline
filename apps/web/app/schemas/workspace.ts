import { z } from 'zod';

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 50;

export const workspaceSchema = z.object({
  name: z.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH),
});

export type WorkspaceSchemaType = z.infer<typeof workspaceSchema>;
