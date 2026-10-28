import { apps } from '../../apps/registry';

export interface NavLink {
  label: string;
  link: string;
}

/** A top-level header entry: either a direct link, or a product group with a dropdown of links. */
export type NavEntry = NavLink | { label: string; items: NavLink[] };

// Header entries are derived from the sub-app registry: one dropdown per app.
// To add an app (and its pages) to the header, register it in src/apps/registry.ts.
export const navConfig: NavEntry[] = apps.map((app) => ({
  label: app.name,
  items: app.nav.map((n) => ({
    label: n.label,
    link: n.path ? `${app.basePath}/${n.path}` : app.basePath,
  })),
}));

export function isGroup(entry: NavEntry): entry is { label: string; items: NavLink[] } {
  return 'items' in entry;
}

function matches(pathname: string, link: string) {
  if (link === '/') return pathname === '/';
  return pathname === link || pathname.startsWith(`${link}/`);
}

/**
 * Longest matching link wins, so /apps/care-management/patients/123 keeps "Patients" (and its
 * app group) active rather than the app home link.
 */
export function getActiveLink(pathname: string): string | undefined {
  return navConfig
    .flatMap((entry) => (isGroup(entry) ? entry.items : [entry]))
    .map((item) => item.link)
    .filter((link) => matches(pathname, link))
    .sort((a, b) => b.length - a.length)[0];
}
