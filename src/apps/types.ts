import type { RouteObject } from 'react-router';

/** A link in a sub-app's header dropdown. `path` is relative to the app's basePath; '' is the app home. */
export interface AppNavLink {
  label: string;
  path: string;
}

/** A self-contained sub-app mounted at `basePath` (e.g. /apps/care-management). */
export interface SubApp {
  /** URL-safe id, matches the folder name under src/apps/ */
  id: string;
  name: string;
  /** One line shown on the launcher card */
  description: string;
  /** Material icon name shown on the launcher card */
  icon: string;
  basePath: string;
  /** Header dropdown entries for this app */
  nav: AppNavLink[];
  /** Child routes relative to basePath — use `index: true` for the app home */
  routes: RouteObject[];
}
