import { createWorkspace, listWorkspaces } from './workspace';

export const router = {
  workspace: {
    create: createWorkspace,
    list: listWorkspaces,
  },
};
