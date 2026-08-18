import { createRouter } from '@tanstack/react-router';

import Page404 from '@/lib/pages/404';
import { queryClient } from '@/lib/services/constants';

import { routeTree } from './routeTree.gen';

// The Start runtime awaits getRouter() (@tanstack/start-client-core/client):
// the async signature is the framework contract, even without internal awaits.
// biome-ignore lint/suspicious/useAwait: framework contract.
export async function getRouter() {
  const router = createRouter({
    context: {
      queryClient,
    },
    defaultNotFoundComponent: () => <Page404 />,
    defaultPendingComponent: () => (
      <div className="mx-auto">
        <p>Loading...</p>
      </div>
    ),
    defaultPreload: 'intent',
    defaultStructuralSharing: true,
    routeTree,
    scrollRestoration: true,
  });

  return router;
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
