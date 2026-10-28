---
name: mds-new-feature
description: Use when adding a new data-driven feature module to this MDS prototyping app — an entity with list/detail/create/edit screens, its own mock API, types, and query hooks.
---

# New Feature

Features live inside a sub-app: `src/apps/<app-id>/features/<name>/`. Copy the structure of `src/apps/care-management/features/patients/`, which is the reference implementation. If the app doesn't exist yet, create it with the mds-new-app skill. Design and component rules come from the **mds-prototype-guide** and **mds-ui** skills.

Below, `<app>` = `src/apps/<app-id>`.

## Steps

Build in this order; run `npx tsc -b --noEmit` after each step so the app stays working.

1. **Clarify and plan**: which app it belongs to, entity fields, screens (list / detail / form), actions, Figma reference. Confirm before coding.
2. **Types**: `<app>/features/<name>/types/<name>.ts`, with Zod schema(s) and inferred TS types (see `care-management/features/patients/types/patient.ts`).
3. **Mock data**: `<app>/mocks/data/<name>.ts`, with realistic healthcare fixtures (names, ICD codes, dates, IDs).
4. **MSW handlers**: `<app>/mocks/handlers/<name>Handlers.ts` under `/api/<app-id>/<name>` (the care-management example predates the prefix and uses `/api/patients`): list (`page`, `limit`, `search` → `{ data, total, page, limit }`), get by id (404 if missing), create, update, delete. Spread them into the app's array in `<app>/mocks/index.ts`. That array is already registered in `src/mocks/handlers/index.ts` (if the app is new, add one line there, as described in the mds-new-app skill).
5. **API service**: `<app>/features/<name>/services/<name>Api.ts` using `apiClient` from `src/services/apiClient.ts` (paths are relative to `/api`, e.g. `/<app-id>/<name>`).
6. **Hooks**: `<app>/features/<name>/hooks/`, with TanStack Query `useQuery` for list/single and `useMutation` for writes, calling `queryClient.invalidateQueries` on success (see `usePatients.ts`, `usePatientMutation.ts` in the patients feature).
7. **Components**: `<app>/features/<name>/components/`: list (async `Table` with `fetchData`, see `PatientList.tsx`), detail, form (`react-hook-form` + `zodResolver`, see `PatientForm.tsx`). Notify with `toast.add()` from `src/store/useToastStore.ts`.
8. **Pages + routing**: pages in `<app>/features/<name>/pages/`, then follow the mds-new-page skill steps 5–7 (constants in `<app>/routes.ts`, relative routes in `<app>/app.tsx`, a `{ label, path }` entry in the app's `nav` for the list page).
9. **Verify**: run `ds_validate_code` on new UI and `npx tsc -b --noEmit`, then load the page in `npm run dev` and check data, loading, empty and error states.
