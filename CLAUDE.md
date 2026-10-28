# CLAUDE.md — MDS Prototyping Template

A client-only React app for **rapid UI prototyping with the Innovaccer Masala Design System (MDS)**. Output should be real, readable React built from MDS components, helper classes and tokens — every screen should look like it belongs in the Innovaccer product suite. Users include designers, so keep code flat and easy to read.

## Commands

- `npm run dev` — Vite dev server (http://localhost:5173)
- `npm run build` — `tsc -b` + production build
- `npm run lint` — ESLint 9 (flat config)
- `npm run preview` — serve the production build
- `npx tsc -b --noEmit` — type-check; run after every change

Node `^20.19.0 || >=22.12.0` (`.nvmrc`: 22; `.npmrc` sets `engine-strict`). Plain `npm install`.

## Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript 5.9 + Vite 8 (`@vitejs/plugin-react-swc`) |
| UI | `@innovaccer/design-system` v5 (`next`) |
| Routing | `react-router` v7 (`createBrowserRouter`) |
| Server state | `@tanstack/react-query` v5 |
| Client state | `zustand` |
| Forms | `react-hook-form` + `@hookform/resolvers` + `zod` |
| Mock API | `msw` v2 — browser worker, started in `src/main.tsx` in **all** builds |
| Charts | `echarts` + `echarts-for-react` |
| Tooling | ESLint, Prettier, Husky + lint-staged |

## Design system knowledge: MCP + skills

Do **not** write MDS code from memory. Use the `masala-design-system` MCP (`ds_*` tools, configured in `.mcp.json`) for components, props, examples, patterns, helper classes and tokens.

### Check the MDS MCP is connected — before any UI work

At the start of a session (and before writing or changing UI), confirm the `masala-design-system` MCP is available:

1. Call `ds_list_components` (or any `ds_*` tool). If it returns the component list, you're good.
2. If the `ds_*` tools are missing or the call errors, **stop and tell the user** — don't fall back to writing MDS code from memory. Ask them to:
   - **Claude Code:** run `/mcp` and check `masala-design-system` is listed and connected. If it isn't, approve the project MCP servers when prompted (or restart the session), and make sure `npx -y @innovaccer/mds-mcp` runs in a terminal (needs Node ≥ 20.19).
   - **Claude Desktop:** add the server to `claude_desktop_config.json` (see `docs/claude-desktop.md`) and restart the app.
3. Only continue with UI work once a `ds_*` call succeeds. Non-UI work (mocks, types, hooks) can proceed meanwhile.

### Component sizes follow the MDS guidelines

Pick sizes and styles from the MDS usage guidelines (`ds_get_usage "<component>"`), not one global rule:

- **Tables** — `standard` (default) for resource tables whose rows open a detail view (e.g. the patients list); `compressed` / `tight` only for dense, read-only data tables (e.g. a patient's conditions/encounters).
- **Form fields** — `regular` (default). Form action buttons match the field size.
- **Buttons** — basic is outlined by default (`styleType="outlined"`); one filled primary per page; alert filled only when it's the most prominent action. `regular` size for page and dialog actions; `tiny` only inside dense panels, table headers/cells and card actions.

Details in the `mds-ui` skill.

## Architecture

The project hosts multiple **sub-apps**, each mounted at `/apps/<app-id>/...` and registered in `src/apps/registry.ts`. `/` is an app launcher (a card per registered app); `/settings` is a shell-level account settings page opened from the header account menu.

```
src/
  main.tsx                         # Starts MSW worker (all builds), then renders <AppProviders />
  app/
    providers/AppProviders.tsx     # QueryClient + RouterProvider + MDS CSS import
    router/routes.ts               # ROUTES { HOME: '/', SETTINGS: '/settings' } — shell routes only
    router/index.tsx               # '/' launcher, every app mounted at app.basePath, /settings, *
    layouts/AppLayout.tsx          # AppHeader + <Outlet /> + toasts
    layouts/AppHeader.tsx          # 48px product header: logo, grouped dropdown nav, account menu
    layouts/navConfig.ts           # Builds header groups from src/apps/registry.ts (don't edit by hand)
    layouts/AppLayout.css          # The only global custom CSS (header, page, sidebar)
    currentUser.ts                 # Mock signed-in user
  apps/
    types.ts                       # AppNavLink { label, path }, SubApp { id, name, description, icon, basePath, nav, routes }
    registry.ts                    # export const apps: SubApp[] = [...]  ← register new sub-apps here
    care-management/               # Reference sub-app
      app.tsx                      # careManagementApp definition (nav + relative routes)
      routes.ts                    # CARE_ROUTES { BASE, DASHBOARD, PATIENTS, PATIENT_DETAIL, NEW_REFERRAL } + patientPath(id)
      pages/                       # DashboardPage (SidebarLayout left nav), ReferralPage (form example)
      features/patients/           # Reference feature: types/ services/ hooks/ components/ pages/
      features/dashboard/          # Dashboard widgets/data
      mocks/data/ mocks/handlers/  # Fixtures + MSW handlers
      mocks/index.ts               # export const careManagementHandlers
  components/
    app/                           # Page, PageHeader, AppTable, EmptyState, LoadingState,
                                   # SidebarLayout, ToastContainer
    patterns/                      # ConfirmDialog
  pages/                           # Shell pages: AppLauncherPage, SettingsPage, NotFoundPage
  services/apiClient.ts            # fetch wrapper, base URL /api
  store/                           # useToastStore (toast.add), useSidebarStore
  mocks/
    browser.ts                     # setupWorker(...handlers)
    handlers/index.ts              # handlers = [...careManagementHandlers, ...] — one line per sub-app
  types/                           # Shared types
```

`SubApp.routes` are `RouteObject[]` relative to `basePath`; `SubApp.nav` paths are relative too (`''` = app home).

Routes: `/` app launcher · `/apps/care-management` dashboard (left-nav example) · `/apps/care-management/patients` · `/apps/care-management/patients/:id` · `/apps/care-management/referrals/new` (form example) · `/settings` (account settings) · `*` 404.

Header nav: each registered sub-app is a product group (e.g. **Care Management ▾** → Dashboard, Patients, New referral) whose dropdown comes from that app's `nav`; account menu on the right (Settings). `navConfig.ts` derives this from the registry — change an app's `nav` instead.

## Adding things

**Sub-app** (new app / product / module) — create `src/apps/<app-id>/` modelled on `care-management/` (`app.tsx`, `routes.ts`, `pages/`, `features/`, `mocks/`), register it in `src/apps/registry.ts`, add its handlers to `src/mocks/handlers/index.ts`. Details: `mds-new-app` skill.

**Page** — create in `src/apps/<app-id>/pages/` (or a feature's `pages/`), wrap in `<Page>` + `PageHeader`; add a constant to the app's `routes.ts`; add a relative route to `routes` in the app's `app.tsx`; add `{ label, path }` to the app's `nav` to show it in the header dropdown. Pages with in-page sections use `SidebarLayout` for a left nav (see care-management `DashboardPage` and `PatientsPage`). Shell pages (rare) go in `src/pages/` + `ROUTES`. Details: `mds-new-page` skill.

**Feature** — copy `src/apps/care-management/features/patients/` into `src/apps/<app-id>/features/<name>/` (types → services → hooks → components → pages). Details: `mds-new-feature` skill.

**Mock endpoint** — in the app's `mocks/`: fixtures in `src/apps/<app-id>/mocks/data/<name>.ts`, handlers in `src/apps/<app-id>/mocks/handlers/<name>Handlers.ts` (`http.get('/api/<app-id>/<name>', ...)` from `msw`), spread into the app's array in `mocks/index.ts` (already registered in `src/mocks/handlers/index.ts`). Call it via `apiClient` (paths relative to `/api`). Prefix new mock paths with the app id; care-management keeps `/api/patients` and `/api/dashboard/*`.

## Workflow

1. **Clarify first** — ask what's being built, what data it needs, and whether there's a Figma reference. Don't assume.
2. **Plan and confirm** — propose a short plan (pages, components, data model, MDS components). Wait for confirmation.
3. **Build in small working steps** — types + mocks → hooks → UI components one at a time → routing/nav. Each step leaves the app working.
4. **Parallelise independent work** (e.g. mock data and types) with subagents; serialise dependent steps.
5. **Keep it compiling** — after every change run `npx tsc -b --noEmit` and fix errors before moving on. Run `ds_validate_code` on new UI.
6. **Done means working** — TypeScript compiles, the page renders, interactions work, data loads, loading/empty/error states exist. Fix reported issues immediately.

## Principles

- **MDS-first** — components, helper classes and tokens from MDS; no raw HTML controls, hex colours or inline layout styles.
- **Flat over abstract** — readable, minimal indirection, copy-paste friendly.
- **Figma-accurate** — match provided designs precisely.
- **Realistic healthcare data** — patient names, conditions, ICD codes — always from mocks, never hardcoded in components.
