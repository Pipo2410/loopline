import { init, Organizations } from '@kinde/management-api-js';
import { KindeOrganization, KindeUser } from '@kinde-oss/kinde-auth-nextjs';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import z from 'zod';

import {
  base,
  requiredAuthMiddleware,
  requiredWorkspaceMiddleware,
} from '../middlewares';
import { workspaceSchema } from '../schemas/workspace';

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

export const createWorkspace = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .route({
    method: 'POST',
    path: '/workspace',
    summary: 'Create a new workspace',
    tags: ['workspace'],
  })
  .input(workspaceSchema)
  .output(
    z.object({
      orgCode: z.string(),
      workspaceName: z.string(),
    }),
  )
  .handler(async ({ context, input, errors }) => {
    init();
    let data;

    try {
      data = await Organizations.createOrganization({
        requestBody: {
          name: input.name,
        },
      });
    } catch {
      throw errors.FORBIDDEN();
    }

    if (!data.organization?.code) {
      throw errors.FORBIDDEN({
        message: 'Org code is not defined',
      });
    }

    try {
      await Organizations.addOrganizationUsers({
        orgCode: data.organization.code,
        requestBody: {
          users: [
            {
              id: context.user.id,
              roles: ['admin'],
            },
          ],
        },
      });
    } catch {
      throw errors.FORBIDDEN();
    }

    const { refreshTokens } = getKindeServerSession();

    await refreshTokens();

    return {
      orgCode: data.organization.code,
      workspaceName: input.name,
    };
  });
