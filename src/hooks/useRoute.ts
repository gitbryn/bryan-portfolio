import { useEffect, useState } from 'react';
import { parseRoute, type Route } from '../lib/routes';

/** Current route from the URL hash; updates on navigation and back/forward. */
export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}
