---
name: mds-new-page
description: Use when adding a new page or route to this MDS prototyping app — a standalone screen, a header nav item, or a page inside an existing feature.
---

# New Page

Design and component rules come from the **mds-prototype-guide** skill (composition, density, copy) and the **mds-ui** skill (MCP lookups, repo gotchas). This skill covers only the repo wiring.

Pages belong to a **sub-app** (`src/apps/<id>/`, mounted at `/apps/<id>`). If the right app doesn't exist yet, create it first with the mds-new-app skill. Reference app: `src/apps/care-management/`.

## Steps

1. **Clarify and plan**: which app it belongs to, what the page is for, what data it shows, and whether there's a Figma reference (if so, use the mds-from-figma skill). Confirm a short plan before coding.
2. **Pick components** via the mds-ui workflow (`ds_search_components` → `ds_get_component`).
3. **Create the page component**
   - App page: `src/apps/<id>/pages/<Name>Page.tsx`
   - Part of a feature: `src/apps/<id>/features/<feature>/pages/<Name>Page.tsx`
   - Export a named component (`export function <Name>Page()`).
   - Wrap in `<Page>` (`src/components/app/Page.tsx`) and start with the app `PageHeader` (`src/components/app/PageHeader.tsx`).
4. **Data**: if the page needs data, add a mock and a hook (see the mds-new-feature skill, steps 2–6). Never hardcode domain data in the component.
5. **Route constant**: add to the app's constants in `src/apps/<id>/routes.ts` (e.g. `X: BASE + '/x'` in `CARE_ROUTES`, plus a path helper like `patientPath(id)` for detail pages). Use the constant for every `navigate()` / `Link`.
6. **Route**: add a relative route to the app's `routes` in `src/apps/<id>/app.tsx`, e.g. `{ path: 'x', element: <XPage /> }` or `{ path: 'x/:id', element: <XDetailPage /> }`. Paths are relative to the app's `basePath`; the home page is `{ index: true, ... }`.
7. **Header nav**: to list the page in the app's header dropdown, add `{ label, path: 'x' }` to the app's `nav` in `app.tsx` (relative path; `''` is the app home). Detail/sub-pages don't get a nav entry; the longest matching link keeps the page and its app group highlighted. The header (`navConfig.ts`) is derived from `src/apps/registry.ts`, so don't edit it by hand.
8. **Left nav (optional)**: if the page has sections or saved views, wrap it in `SidebarLayout` (`src/components/app/SidebarLayout.tsx`) with `menus` (`{ name, label, icon, group? }`), controlled `active` + `onSelect`. Use `variant="canvas"` for card/dashboard layouts on grey, and the default `panel` for tables/lists on white. Examples: `src/apps/care-management/pages/DashboardPage.tsx`, `src/apps/care-management/features/patients/pages/PatientsPage.tsx`.
9. **Verify**: run `ds_validate_code` on the new UI, then `npx tsc -b --noEmit`; fix all errors. Open the page at `http://localhost:5173/apps/<id>/...`.

**Shell-level pages** (rare: the launcher, account settings, 404) live in `src/pages/`, take a constant in `ROUTES` (`src/app/router/routes.ts`) and a route in `src/app/router/index.tsx` above the `'*'` catch-all. Anything product-specific belongs in a sub-app instead.

Reference pages: `src/apps/care-management/pages/DashboardPage.tsx`, `src/apps/care-management/pages/ReferralPage.tsx` (form), `src/apps/care-management/features/patients/pages/`.
