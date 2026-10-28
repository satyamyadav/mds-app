---
name: mds-from-figma
description: Use when the user shares a Figma URL or asks to implement a Figma design/frame as a page or component in this MDS prototyping app.
---

# From Figma

Requires the Figma MCP (`Figma Dev Mode MCP` in `.mcp.json`, served by the Figma desktop app at `http://127.0.0.1:3845/sse`). If it isn't connected, ask the user to enable Dev Mode MCP in Figma desktop, or to share a screenshot instead.

## Steps

1. **Parse the URL** — `figma.com/design/:fileKey/:fileName?node-id=:nodeId`; convert `-` to `:` in `nodeId`. For branch URLs (`/design/:fileKey/branch/:branchKey/...`) use `branchKey`.
2. **Get the design** — call `get_design_context` (fileKey + nodeId); use `get_screenshot` if you need a closer look.
3. **Treat the output as reference only** — never paste its Tailwind/HTML. Map every element to MDS via the **mds-ui** workflow (`ds_search_components` → `ds_get_component`), helper classes via `ds_search_helpers`, colours/spacing via `ds_search_tokens` (CSS variables, no hex).
4. **Fill the gaps** with the **mds-prototype-guide** rules (states, copy, density) for anything the frame doesn't specify — loading, empty, error.
5. **Build** — inside the target sub-app (`src/apps/<app-id>/`; create one with the mds-new-app skill if needed): page via the mds-new-page skill, components via the mds-new-component skill, data via the mds-new-feature skill's mock/hook steps.
6. **Verify** — `ds_validate_code`, `npx tsc -b --noEmit`, then compare the running page against the Figma screenshot and fix differences.

Match the design precisely; where Figma and MDS disagree, use the MDS component and tell the user what differs.
