# Data density

Applies to any page or panel that shows data, records, lists or forms.

## List views (more than ~10 records of one type)

**Use**
- A table for structured data with sortable attributes.
- A list (stacked rows) for entities with variable content or per-row actions.
- Virtualised or paginated loading for 100+ records.

**Avoid**
- Pages of fewer than 10 rows in high-frequency workflows.
- Card grids for high-volume scanning — a linear scan is faster.

## Empty states (a list, table or query returns nothing)

**Use**
- One honest line saying what's empty and why: "No [entity] [condition]." — e.g. "No open care gaps for this patient."
- Optionally one CTA if there's a clear next action.

**Avoid**
- Celebratory copy ("All caught up!").
- Multi-paragraph explanations.
- Decorative illustrations on in-workflow empty states. (A full-page "not found" or first-run state may use the design system's EmptyState imagery.)

## Loading states

**Use**
- Placeholders that match the shape of the expected content (table loader schemas, placeholder rows/paragraphs).
- A spinner only for action feedback (a button) or when the whole panel has nothing to show yet.
- A determinate progress bar only when real progress is known (uploads, imports, batch runs).

**Avoid**
- Full-page spinners for partial loads.
- "Loading…" text on its own.
- Indeterminate progress bars.

## What to show upfront

**Use**
- Must-have fields — those needed to understand or act on a record — always visible.
- Progressive disclosure (tabs, expand, detail page) for supporting information.
- Judgement: if users must always open a detail view to decide what to do, the list is under-showing.

**Avoid**
- Hiding all secondary context behind clicks.
- Showing every field because it exists.

Users shouldn't have to navigate away to make a decision they could reasonably make inline.

## Grouping metadata

- Keep related attributes (dates, statuses, related values) next to the value they describe.
- Keep attribute order identical across every instance of the same entity.
- Don't scatter related attributes across unrelated regions.

## Choosing a density level

- **Lower density** by default for infrequent, high-stakes, form-heavy or detail-oriented workflows — space aids accuracy.
- **Higher density** by default for high-volume, repetitive, scanning workflows — it's a first-class choice, not a compromise.
- Decide per panel as well as per page. A page can mix a dense table with a spacious detail panel.

Density is a workflow concern, not an aesthetic one.
