---
name: mds-new-app
description: Use when the user wants to create a new app, product or module in this prototyping project — scaffolds a sub-app at /apps/<app-id> with its own nav, pages, features and mocks.
---

# New Sub-App

This project hosts several **sub-apps**, each mounted at `/apps/<app-id>/...`. The launcher at `/` shows a card per registered app, and the header shows each app as a product group with a dropdown of its pages. This skill adds a new sub-app **inside this project**. The reference implementation is `src/apps/care-management/`.

(To start a separate project from the template instead, see README → Create a project.)

Design and component rules: **mds-ui** skill (run its Step 0 MCP connection check first, and follow its dense defaults) and **mds-prototype-guide** skill. Page and feature details: **mds-new-page** and **mds-new-feature** skills.

## Steps

Run `npx tsc -b --noEmit` after each step so the app keeps compiling.

### 1. Clarify and plan

Ask, if not given:

- **Name** (shown in the launcher and header), e.g. "Utilization Review"
- **App id**: kebab-case, used in the URL and folder name, e.g. `utilization-review`
- **Pages**: which screens it needs, and which one is home (usually a dashboard)
- **Data**: entities, fields and actions
- **Figma reference**: if there is one, use the mds-from-figma skill for each screen

Confirm a short plan (pages, nav entries, data model, MDS components) before coding.

### 2. Create the folder

Model it on `src/apps/care-management/`:

```
src/apps/<id>/
  app.tsx            # SubApp definition
  routes.ts          # <ID>_ROUTES path constants
  pages/             # app pages (home, simple screens)
  features/          # data-driven feature modules (mds-new-feature)
  mocks/
    data/            # fixtures
    handlers/        # MSW handlers
    index.ts         # export const <camelId>Handlers = [...]
```

### 3. Route constants: `routes.ts`

```ts
// src/apps/utilization-review/routes.ts
const BASE = '/apps/utilization-review';

export const UR_ROUTES = {
  BASE,
  DASHBOARD: BASE,
  REQUESTS: `${BASE}/requests`,
  REQUEST_DETAIL: `${BASE}/requests/:id`,
} as const;

export const requestPath = (id: string) => `${UR_ROUTES.REQUESTS}/${id}`;
```

Use these constants for every `navigate()` / `Link` inside the app; never hardcode `/apps/...` strings in components.

### 4. App definition: `app.tsx`

`SubApp` and `AppNavLink` come from `src/apps/types.ts`. `routes` are relative to `basePath`; `nav` entries become the header dropdown (path relative too; the first entry with path `''` is the app home). Detail pages get a route but no nav entry.

```tsx
// src/apps/utilization-review/app.tsx
import type { SubApp } from '../types';
import { UR_ROUTES } from './routes';
import { DashboardPage } from './pages/DashboardPage';
import { RequestsPage } from './features/requests/pages/RequestsPage';
import { RequestDetailPage } from './features/requests/pages/RequestDetailPage';

export const utilizationReviewApp: SubApp = {
  id: 'utilization-review',
  name: 'Utilization Review',
  description: 'Review prior-auth requests and track turnaround times.',
  icon: 'fact_check', // Material icon name
  basePath: UR_ROUTES.BASE,
  nav: [
    { label: 'Dashboard', path: '' },
    { label: 'Requests', path: 'requests' },
  ],
  routes: [
    { index: true, element: <DashboardPage /> },
    { path: 'requests', element: <RequestsPage /> },
    { path: 'requests/:id', element: <RequestDetailPage /> },
  ],
};
```

### 5. Register the app

Add it to `src/apps/registry.ts`. This alone wires the routes (mounted at `basePath`), the launcher card and the header dropdown (`navConfig.ts` derives the groups from the registry, so don't edit it).

```ts
export const apps: SubApp[] = [careManagementApp, utilizationReviewApp];
```

### 6. Mocks

- Fixtures in `src/apps/<id>/mocks/data/`, handlers in `src/apps/<id>/mocks/handlers/`.
- Prefix mock API paths with the app id: `http.get('/api/<id>/requests', ...)`, called via `apiClient` as `/<id>/requests`. (The care-management example predates this and keeps `/api/patients`, `/api/dashboard/*`.)
- Export one array from `src/apps/<id>/mocks/index.ts` (`export const utilizationReviewHandlers = [...]`) and add one line to `src/mocks/handlers/index.ts`:

```ts
export const handlers = [...careManagementHandlers, ...utilizationReviewHandlers];
```

### 7. Home page

Build the home page in `src/apps/<id>/pages/` (often a dashboard: KPI cards, ECharts panels, a needs-attention list). Wrap it in `<Page>` + `PageHeader`. If it has sections or saved views, add a `SidebarLayout` left nav (see `src/apps/care-management/pages/DashboardPage.tsx`). Add more pages with the mds-new-page skill, and data-driven entities with the mds-new-feature skill (inside `src/apps/<id>/features/`).

### 8. Verify

- `ds_validate_code` on new UI, then `npx tsc -b --noEmit`; fix all errors.
- `npm run dev`, then open http://localhost:5173/apps/<id>. Check that the launcher at `/` shows the new card, that the header dropdown lists the app's pages, and that data, loading, empty and error states work.

Tell the user the app URL and what's in it.
