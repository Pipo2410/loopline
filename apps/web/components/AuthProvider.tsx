'use client';

import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs';
import { FC, PropsWithChildren } from 'react';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => (
  <KindeProvider>{children}</KindeProvider>
);
