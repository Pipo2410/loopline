import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cache } from 'react';

import { createQueryClient } from './client';

export const getQueryClient = cache(createQueryClient);

type HydrateClientProps = {
  children: React.ReactNode;
  client: QueryClient;
};

export const HydrateClient: React.FC<HydrateClientProps> = (props) => (
  <HydrationBoundary state={dehydrate(props.client)}>
    {props.children}
  </HydrationBoundary>
);
