import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';

import { serializer } from '../serializer';

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        serializeData(data) {
          const [json, meta] = serializer.serialize(data);
          return { json, meta };
        },
      },
      hydrate: {
        deserializeData(data) {
          return serializer.deserialize(data.json, data.meta);
        },
      },
      queries: {
        queryKeyHashFn(queryKey) {
          const [json, meta] = serializer.serialize(queryKey);
          return JSON.stringify({ json, meta });
        },
        // eslint-disable-next-line no-magic-numbers
        staleTime: 60 * 1000, // > 0 to prevent immediate refetching on mount
      },
    },
  });
