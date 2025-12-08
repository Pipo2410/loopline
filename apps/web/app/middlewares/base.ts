import { os } from '@orpc/server';

export const base = os.$context<{ request: Request }>().errors({
  BAD_REQUEST: {
    message: 'Bad request.',
  },
  FORBIDDEN: {
    message: 'Forbidden.',
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal server error.',
  },
  NOT_FOUND: {
    message: 'Not found.',
  },
  RATE_LIMITED: {
    message: 'You are being rate limited.',
  },
  UNAUTHORIZED: {
    message: 'You are Unauthorized.',
  },
});
