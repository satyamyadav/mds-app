# MDS Prototyping Template

A React starter for quickly building realistic UI prototypes with the **Innovaccer Masala Design System (MDS)**, set up for AI-assisted work in Claude Code. Describe a screen or paste a Figma link, and Claude builds it with real MDS components, helper classes and tokens, backed by a mock API. No backend needed.

Built for designers and engineers. The output is plain, readable React that you can hand off.

## Create a project

Use this repo as a GitHub template (**Use this template**), or:

```bash
npx degit satyamyadav/mds-app my-proto
cd my-proto
git init
npm install
npm run dev
```

Open http://localhost:5173.

## Add an app

One project can host several prototype **sub-apps**. Each lives in `src/apps/<app-id>/`, is served at `/apps/<app-id>`, gets a card on the launcher (`/`) and a dropdown in the header listing its pages.

- **With Claude Code:** run `/mds-new-app` (or just ask for a new app). Claude asks for the name, pages and data, then scaffolds it.
- **Manually:**
  1. Copy the structure of `src/apps/care-management/`: `app.tsx` (the `SubApp` definition: id, name, description, icon, `basePath`, `nav`, relative `routes`), `routes.ts` (path constants under `/apps/<app-id>`), `pages/`, `features/`, `mocks/`.
  2. Register the app in `src/apps/registry.ts`. That wires its routes, launcher card and header dropdown.
  3. Export the app's MSW handlers from `src/apps/<app-id>/mocks/index.ts` and add them to `src/mocks/handlers/index.ts`. Prefix the mock API paths with `/api/<app-id>/`.

## Requirements

- Node `^20.19.0 || >=22.12.0` (`.nvmrc` pins 22, and `engine-strict` is on, so `npm install` fails on older Node)
- npm
- [Claude Code](https://claude.com/claude-code) or Claude Desktop, for AI-assisted prototyping (optional)

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

## MCP setup

Claude looks up the design system through the [`@innovaccer/mds-mcp`](https://www.npmjs.com/package/@innovaccer/mds-mcp) MCP server instead of relying on docs kept in this repo.

- **Claude Code:** `.mcp.json` is included. It registers `masala-design-system` (`npx -y @innovaccer/mds-mcp`) and `Figma Dev Mode MCP` (`http://127.0.0.1:3845/sse`, served by the Figma desktop app when Dev Mode MCP is enabled). Run `claude` in the project, approve the servers, and check them with `/mcp`. Claude is instructed (in `CLAUDE.md`) to confirm the MDS MCP responds before any UI work, and to stop and ask you to connect it if it doesn't.
- **Claude Desktop:** see [docs/claude-desktop.md](docs/claude-desktop.md).

## Skills

Project skills live in `.claude/skills/`. Claude Code picks the right one automatically.

| Skill | Purpose |
|---|---|
| `mds-ui` | How to look up components, props, helpers and tokens via the MCP, plus repo gotchas |
| `mds-prototype-guide` | Layout, density, states and copy rules that make a prototype feel like a real product |
| `mds-new-app` | Create a sub-app at `/apps/<app-id>` with its own nav, pages, features and mocks |
| `mds-new-page` | Add a page, route and header nav item to a sub-app |
| `mds-new-feature` | Add a feature module to a sub-app: types, mock API, query hooks, pages |
| `mds-new-component` | Add a reusable component |
| `mds-from-figma` | Implement a Figma frame with MDS components |

`CLAUDE.md` holds the project rules and workflow: clarify, plan, build in small steps, and keep `npx tsc -b --noEmit` passing.

## Example pages

| Route | Page |
|---|---|
| `/` | App launcher: a card for each registered sub-app |
| `/apps/care-management` | Care Management dashboard: left nav (Overview / Care gaps / Risk), KPI cards, ECharts panels, needs-attention list |
| `/apps/care-management/patients`, `.../patients/:id` | Patients feature: async table with search and pagination, detail view, create/edit form |
| `/apps/care-management/referrals/new` | Form example (react-hook-form + zod) |
| `/settings` | Account settings, opened from the header account menu |
| `*` | 404 |

`src/apps/care-management/` is the reference sub-app, and its `features/patients/` is the reference to copy for new features.

## Project structure

```
src/
  main.tsx              # Starts the MSW worker, then renders the app
  app/                  # Providers, shell router (routes.ts, index.tsx), AppLayout + AppHeader (dropdown nav built from the app registry)
  apps/
    types.ts            # SubApp / AppNavLink types
    registry.ts         # List of sub-apps: register new apps here
    care-management/    # Example sub-app: app.tsx, routes.ts, pages/, features/ (patients, dashboard), mocks/
  components/app/       # Page, PageHeader, AppTable, EmptyState, LoadingState, SidebarLayout, Toasts
  components/patterns/  # ConfirmDialog
  pages/                # Shell pages: app launcher, settings, 404
  services/apiClient.ts # fetch wrapper for /api
  store/                # zustand stores (toast, sidebar)
  mocks/                # MSW worker + handler registry (one line per sub-app)
```

Stack: React 19, TypeScript 5.9, Vite 8 (SWC), `@innovaccer/design-system` v5, react-router 7, TanStack Query 5, zustand, react-hook-form + zod, MSW 2, ECharts.

## Deploying

`npm run build` produces a static site in `dist/`.

- **The mock API runs in production too.** MSW starts in every build, so a deployed prototype has data. `public/mockServiceWorker.js` must be served from the site root, or from your Vite `base` path.
- **SPA fallback is required.** Routes are client-side, so configure your host to serve `index.html` for unknown paths. On Netlify, use a `_redirects` file with `/* /index.html 200`. On Vercel, use a rewrite to `/index.html`. GitHub Pages needs a `404.html` copy of `index.html`.

## License

MIT
