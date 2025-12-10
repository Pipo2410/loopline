import { createChannel, listChannels } from './channel';
import { createWorkspace, listWorkspaces } from './workspace';

export const router = {
  channel: {
    create: createChannel,
    list: listChannels,
  },
  workspace: {
    create: createWorkspace,
    list: listWorkspaces,
  },
};
