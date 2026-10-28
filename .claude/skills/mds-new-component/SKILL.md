---
name: mds-new-component
description: Use when creating a reusable UI component in this MDS prototyping app — a wrapper around an MDS component, a composed pattern, or a feature-specific building block.
---

# New Component

Component lookups and repo gotchas: **mds-ui** skill. Visual/copy rules: **mds-prototype-guide** skill.

## Steps

1. **Check MDS first** — `ds_search_components`, `ds_list_patterns` / `ds_get_pattern`. If MDS already has it, use it directly; only wrap it if the app needs consistent defaults (like `src/components/app/EmptyState.tsx`).
2. **Otherwise compose** from MDS primitives using helper classes and tokens — no raw HTML controls, hex colours or inline layout styles.
3. **Place it**
   - `src/components/app/` — app-wide building blocks (Page, PageHeader, EmptyState…)
   - `src/components/patterns/` — composed multi-component patterns (e.g. ConfirmDialog)
   - `src/apps/<app-id>/features/<name>/components/` — used by one feature only
   - `src/apps/<app-id>/components/` — shared across one sub-app's features (create the folder if needed)
4. **Interface** — named export, typed `Props` interface, domain data via props (never hardcoded). Keep it flat and readable top to bottom — designers read this code.
5. **Verify** — `ds_validate_code`, then `npx tsc -b --noEmit`.
