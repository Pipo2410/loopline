import { createChannel, listChannels } from './channel';
import { createMessage, listMessages } from './message';
import { createWorkspace, listWorkspaces } from './workspace';

export const router = {
  channel: {
    create: createChannel,
    list: listChannels,
  },
  message: {
    create: createMessage,
    list: listMessages,
  },
  workspace: {
    create: createWorkspace,
    list: listWorkspaces,
  },
};
