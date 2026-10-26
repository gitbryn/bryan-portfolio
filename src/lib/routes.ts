/**
 * Hash-based routing. Section anchors (#about, #projects, …) stay on the home
 * page; `#/projects/<slug>` opens a project detail page. Works on any static
 * host (Vercel included) without server rewrites.
 */

export type Route = { name: 'home' } | { name: 'project'; slug: string };

const PROJECT_PREFIX = '#/projects/';

export function projectHref(slug: string): string {
  return `${PROJECT_PREFIX}${encodeURIComponent(slug)}`;
}

export function parseRoute(hash: string): Route {
  if (hash.startsWith(PROJECT_PREFIX)) {
    return { name: 'project', slug: decodeURIComponent(hash.slice(PROJECT_PREFIX.length)) };
  }
  return { name: 'home' };
}

/** Stable string form of a route, for effect dependencies. */
export function routeKey(route: Route): string {
  return route.name === 'project' ? `project:${route.slug}` : 'home';
}
