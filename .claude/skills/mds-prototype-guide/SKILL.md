---
name: mds-prototype-guide
description: Use when designing or building any prototype UI in this app — pages, layouts, dashboards, lists, forms, dialogs, empty/error states, or UI copy. Gives the visual, layout, density and copy rules that make a prototype feel like a real product. Pair with the mds-ui skill for component lookup.
---

# Prototype Guide

Design rules for prototypes built in this template. These cover *how a screen should feel and read*. For *which component to use and its props*, use the `mds-ui` skill and the MDS MCP tools.

## Before building a screen

1. **Name the job.** What does the user need to do next on this screen, and what must they know to do it? Organise the screen around that action.
2. **Pick a composition** (see [references/layouts.md](references/layouts.md)):
   - **Dashboard grid** — multiple independent panels (KPIs, charts, lists).
   - **Single-task page** — one entity or one task (detail view, form, wizard step).
   - **Landing page** — ambient header + one or two content panels.
3. **Set the dials** (see [references/taste.md](references/taste.md)). Default **variance 6 · motion 2 · density 7** — the platform is data-dense, expressed through layout and table type, not by shrinking every control. Only move them with a reason.
4. **Write the copy** using [references/copy-voice.md](references/copy-voice.md) — labels, empty states, errors, confirmations.
5. **Check density** for lists, tables, loading and empty states with [references/density.md](references/density.md).

## Critical rules (always apply)

- **MDS only.** Use design-system components and helper classes. No raw HTML controls, hex colours, inline layout styles, or new typefaces. Validate with `ds_validate_code` when unsure.
- **Sizes follow MDS guidelines.** Resource tables `standard`, data tables `compressed`/`tight`, form fields `regular`, basic buttons outlined — see the sizes table in the `mds-ui` skill.
- **One primary action per screen.** Only one `appearance="primary"` Button in view.
- **Neutral at rest, colour with meaning.** Colour appears only for status, selection, primary action, destructive intent, or feedback.
- **Flat and border-driven.** Shadows only for floating layers (dropdowns, modals, popovers) and cards on a tinted background.
- **No hardcoded domain data in components.** Names, dates, IDs and clinical values come from props or mock APIs (`src/mocks/`). Make mock data realistic.
- **Honest states.** Every data view has loading, empty, and error states. Empty = one honest line + optional CTA. Errors = what happened + what to do.
- **Confirmation proportional to consequence.** Routine actions: no friction. Destructive or broad actions: a dialog that states the consequence.

## The test

Before calling a screen done, both must pass:

1. **Can someone arrive at this screen and know what to do?** Hierarchy, layout and labels make the next action obvious.
2. **Could it sit next to any other screen in the product and feel like it belongs?** Same rhythm, typographic voice, surfaces and restraint.

If either fails, identify which — clarity or coherence — and fix that.

## References

| File | Read when |
|---|---|
| [references/principles.md](references/principles.md) | Deciding what a screen should prioritise |
| [references/taste.md](references/taste.md) | Any visual decision — dials, type, colour, space, motion, layout |
| [references/layouts.md](references/layouts.md) | Choosing and structuring a page composition |
| [references/density.md](references/density.md) | Lists, tables, loading, empty states, information disclosure |
| [references/copy-voice.md](references/copy-voice.md) | Writing any user-facing string |
