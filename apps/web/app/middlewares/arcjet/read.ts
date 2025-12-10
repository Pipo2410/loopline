import { KindeUser } from '@kinde-oss/kinde-auth-nextjs';

import arcjet, { slidingWindow } from '@/lib/arcjet';

import { base } from '../base';

const buildStandardAj = () =>
  arcjet.withRule(
    slidingWindow({
      interval: '1m',
      max: 180,
      mode: 'LIVE',
    }),
  );

export const readSecurityMiddleware = base
  .$context<{
    request: Request;
    user: KindeUser<Record<string, unknown>>;
  }>()
  .middleware(async ({ context, next, errors }) => {
    const decision = await buildStandardAj().protect(context.request, {
      userId: context.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw errors.RATE_LIMITED({
          message: 'Too many impactful changes. Please slow down.',
        });
      }

      if (decision.reason.isShield()) {
        throw errors.FORBIDDEN({
          message: 'Request blocked by security policy (WAF).',
        });
      }
      throw errors.FORBIDDEN({
        message: 'Request blocked!!',
      });
    }

    return next();
  });
