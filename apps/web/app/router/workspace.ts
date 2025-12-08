import { KindeOrganization, KindeUser } from '@kinde-oss/kinde-auth-nextjs';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import z from 'zod';

import {
  base,
  requiredAuthMiddleware,
  requiredWorkspaceMiddleware,
} from '../middlewares';

export const listWorkspaces = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .route({
    method: 'GET',
    path: '/workspace',
    summary: 'List all workspaces',
    tags: ['workspace'],
  })
  .input(z.void())
  .output(
    z.object({
      currentWorkspace: z.custom<KindeOrganization<unknown>>(),
      user: z.custom<KindeUser<Record<string, unknown>>>(),
      workspaces: z.array(
        z.object({
          avatar: z.string(),
          id: z.string(),
          name: z.string(),
        }),
      ),
    }),
  )
  .handler(async ({ context, errors }) => {
    const { getUserOrganizations } = getKindeServerSession();

    const organizations = await getUserOrganizations();

    if (!organizations) {
      throw errors.FORBIDDEN();
    }

    return {
      currentWorkspace: context.workspace,
      user: context.user,
      workspaces: organizations?.orgs.map((org) => ({
        // eslint-disable-next-line no-magic-numbers
        avatar: org.name?.charAt(0) ?? 'My',
        id: org.code,
        name: org.name ?? 'My Workspace',
      })),
    };
  });
