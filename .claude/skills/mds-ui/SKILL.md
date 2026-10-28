---
name: mds-ui
description: Use when writing or changing any UI code in this app — choosing an MDS component, looking up its props, finding examples or patterns, picking helper classes or design tokens, or validating JSX against the Masala Design System. MCP-first workflow plus repo-specific gotchas. Pair with mds-prototype-guide for design/layout/copy rules.
---

# MDS UI

The `masala-design-system` MCP server (`@innovaccer/mds-mcp`) is the source of truth for components, props, examples, patterns, helper classes and tokens. Do not write MDS UI from memory — look it up.

## Step 0 — confirm the MCP is connected

Before any lookup, call `ds_list_components`. If the `ds_*` tools don't exist or the call errors, **stop UI work and tell the user**: in Claude Code run `/mcp` and check `masala-design-system` is connected (approve project MCP servers / restart the session; `npx -y @innovaccer/mds-mcp` must run with Node ≥ 20.19); in Claude Desktop add it to `claude_desktop_config.json` per `docs/claude-desktop.md` and restart. Never fall back to writing MDS APIs from memory.

## Workflow

1. **Find the component.** `ds_search_components "<keyword>"` (or `ds_list_components` to browse). Prefer an MDS component over raw HTML every time.
2. **Get its API.** `ds_get_component "<name>"` — props, variants, sub-components, import path. Use only props it lists.
3. **Find usage.** `ds_search_examples "<keyword>"` (optionally `component:"<name>"`) → `ds_get_example "<id>"`. For composed screens (async tables, forms, filters), check `ds_list_patterns` → `ds_get_pattern "<name>"` first.
4. **Layout and spacing.** `ds_search_helpers "<flex|spacing|text|...>"` — use helper classes, not inline styles or custom CSS.
5. **Colour, spacing, type values.** `ds_search_tokens "<keyword>"` / `ds_get_token` — use CSS variables (`var(--...)`), never hex values.
6. **Guidelines.** `ds_search_usage` / `ds_get_usage` for when-to-use guidance; the `design-system://conventions` resource for global conventions.
7. **Validate.** Run `ds_validate_code` on every new or substantially changed component, fix what it reports, then `npx tsc -b --noEmit`.

If the MCP tools become unavailable mid-session, go back to Step 0.

## Sizes and styles — follow the MDS guidelines

Check `ds_get_usage "<component>"` before choosing a size or style. The rules this template follows:

| Component | Guideline |
|---|---|
| `Table` | `standard` (default) for **resource tables** — one per page, rows open a detail view (`PatientList`). `compressed` / `tight` for **data tables** — read-only, information-dense (`PatientDetail` conditions/encounters). `AppTable` leaves the default; pass `size` explicitly. |
| `Input`, `Dropdown`, `DatePicker`, `Checkbox`, `Radio`, `Switch` in forms | `regular` (default). Small isn't supported for inputs with a left icon, metric or verification-code inputs. `Textarea` has one size. |
| `Button` | Basic: `styleType="outlined"` (the default style in the guidelines; use filled for more weight on grey). Primary: filled, one per page; outlined for secondary affirmative actions. Alert: filled when it's the most prominent action, outlined otherwise. Transparent: no `styleType`. Size `regular` for page headers, forms and dialogs; `tiny` inside dense panels, table headers/cells and card actions. |
| `Menu.List`, `Listbox` | `compressed` in menus and dense panel lists |
| `Tabs` | `small` inside detail views |

Dialogs: MDS `Dialog` has no button size/style props, so `src/components/patterns/ConfirmDialog.tsx` is built on `Modal` — use it for confirmations.

Exception: top-level header nav items in `src/app/layouts/AppHeader.tsx` are styled as text links to match the product shell. When a prop isn't listed by `ds_get_component`, check `node_modules/@innovaccer/design-system/dist/core/components/**/<Name>.d.ts`.

## Repo gotchas (verified in `src/` — the MCP won't tell you these)

- **MDS CSS is imported once** in `src/app/providers/AppProviders.tsx` (`@innovaccer/design-system/css/dist/index.css`). Don't import it again.
- **Import everything from `@innovaccer/design-system`**, including types (`import type { GridCellProps } from '@innovaccer/design-system'`).
- **`Column` `size` is a string**: `<Column size="6">`, not `size={6}`. Wrap columns in `<Row>`.
- **Async Table:** `fetchData(options)` must return `Promise<{ count, data, schema }>`. Pair with `loaderSchema`, `type="data"`, `withPagination`, `pageSize`. Reference: `src/apps/care-management/features/patients/components/PatientList.tsx` (maps the mock API's `{ data, total }` to `{ count: total, data, schema }`).
- **Form fields:** `react-hook-form` `Controller` wrapping MDS inputs. `Label withInput required` above the field; MDS `Input` `onChange` gives an event, so call `onChange(e.target.value)`; set `error={!!errors.x}`. Show errors with `<HelpText message={errors.x.message ?? ''} error />`. Reference: `src/apps/care-management/pages/ReferralPage.tsx`, `src/apps/care-management/features/patients/components/PatientForm.tsx`.
- **Toasts:** use the app store, not an MDS service — `import { toast } from '<rel>/store/useToastStore'` then `toast.add({ title, appearance: 'success' | 'info' | 'warning' | 'alert', message })`. `ToastContainer` is already mounted in `AppLayout`.
- **`@innovaccer/helpers` is not installed** — don't use `AlertService` or anything else from it.
- **Code location:** product code lives in a sub-app, `src/apps/<app-id>/` (pages, `features/`, `mocks/`), registered in `src/apps/registry.ts`. Route paths come from the app's `routes.ts` constants (e.g. `CARE_ROUTES`), never hardcoded `/apps/...` strings. Shared building blocks stay in `src/components/`.
- **Navigation:** the header is derived from `src/apps/registry.ts` by `src/app/layouts/navConfig.ts`. Each sub-app is a product group whose dropdown is that app's `nav` (`{ label, path }` in its `app.tsx`). Don't edit `navConfig.ts` by hand. In-page left nav = `SidebarLayout` (`variant="canvas"` for dashboards, `panel` for lists).
- **`Menu.Item` has no `className`** — put classes on a child element.
- **Single-select `Dropdown` `onChange` gives the value string**, not the option object. **`Checkbox` `onChange` gives only the event** — read `e.target.checked`.
- **`Card` is content-box** — `h-100` plus padding overflows its column. Don't combine them.
- **Page shell:** wrap route pages in `<Page>` (`src/components/app/Page.tsx`, handles scroll + padding) and use the app `PageHeader` wrapper (`src/components/app/PageHeader.tsx`) for title, breadcrumbs, actions.
- **Empty states:** `src/components/app/EmptyState.tsx` wraps MDS `EmptyState` (compressed). Loading: `LoadingState.tsx`.
- **Charts:** `echarts-for-react` (`ReactECharts`) inside an MDS `Card`; take series colours from tokens via `ds_search_tokens`.
- **Custom CSS** is a last resort: keep it in a co-located `.css` file using `var(--...)` tokens (see `src/app/layouts/AppLayout.css`).
