'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <NextThemesProvider
    attribute='class'
    defaultTheme='system'
    disableTransitionOnChange
    enableColorScheme
    enableSystem
  >
    {children}
  </NextThemesProvider>
);
