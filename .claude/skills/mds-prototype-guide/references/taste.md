# Taste

> Good interface design feels inevitable — like every element is in the only place it could be. That comes from rigor, not minimalism or maximalism.

## Visual identity

Flat, restrained, border-driven. Surfaces are separated by background contrast and thin borders, not shadows. The UI is quiet at rest and only gains colour or weight when communicating meaning. In a tool used hundreds of times a day, visual noise competes with the data that matters.

- **Contextual elevation.** Shadows only for elements that float (dropdowns, modals, tooltips, popovers) and for cards on a tinted background. Buttons, inputs, rows, headers and banners stay flat.
- **Borders over shadows.** A thin border says "this is a region" without weight.
- **No decorative chrome.** No gradients, inner highlights, glows or inset shadows. If it looks "designed", it's probably over-styled.
- **Colour enters with purpose.** Resting UI is almost entirely neutral. Colour means status, selection, primary action, destructive intent, or feedback.

## Design dials

Three dials govern every screen. Hold the baselines unless there's a reason. If the user asks for something fresher, turn them up; if it feels too different from the product, turn them down.

### Design variance · baseline 6
*1 = rigid symmetry · 10 = art-directed*

| Range | Character | Use for |
|---|---|---|
| 1–3 | Rigid structure. Equal columns, zero surprises. | Tables, forms, settings — anywhere users scan for values. |
| 4–6 | Structured and composed. Clean grid, even columns; interest comes from type hierarchy and content organisation, not layout tricks. | Dashboards, lists, detail screens. Most product screens. |
| 7–9 | Intentionally asymmetric. Uneven column ratios, varied card sizes. | Sparingly — feature intros, first-run moments. |
| 10 | Art-directed. Masonry, overlap, dramatic space. | Almost never in a product. |

Variance should be invisible. If someone notices the layout is unusual, dial it back.

### Motion intensity · baseline 2
*1 = static · 10 = choreographed*

| Range | Character | Use for |
|---|---|---|
| 1–2 | Hover/focus changes and fast panel open/close only. | Default for all product screens. |
| 3–4 | Subtle orientation — fades between views, smooth layout shifts. | Filtering, switching tabs, expanding sections. |
| 5–6 | Guided motion — sequenced reveals, staggered entrances. | Onboarding, first encounter with a complex layout. Needs justification. |
| 7–10 | Choreographed — springs, scroll-driven sequences. | Demos and showcases only. |

Motion must answer "where did this come from?" or "what just changed?" Otherwise it's decoration.

### Visual density · baseline 7
*1 = gallery · 10 = cockpit*

| Range | Character | Use for |
|---|---|---|
| 1–3 | Spacious, single focus. | Confirmations, empty states, single-decision moments. |
| 4–5 | Comfortable reading density. | Settings, profiles, onboarding, narrative detail views. |
| 6–7 | Productive density. Tighter spacing, strong hierarchy. | Dashboards, lists, multi-panel workflows. |
| 8–9 | Compact and utilitarian. Dividers do the grouping. | Data tables, monitoring, audit logs. |
| 10 | Maximum throughput. | Real-time monitoring only. |

Density matches how much the user must see at once. Never be dense to look "professional".

### Reading the room

- More data → higher density, lower motion, lower variance.
- Used a hundred times a day → hold baselines or go lower; users build spatial memory.
- High-stakes decision → calm and clear; low motion, low variance.
- First impression / onboarding → variance and motion can rise modestly, then return to baseline.

When the dials conflict, **density wins**.

## Typography

- **Three weights, three roles.**
  - **Regular** — body, controls, table cells, descriptions, helper text. The default.
  - **Medium** — section headings, column headers, active nav, form labels, stat labels.
  - **Semibold** — page, dialog and primary card titles only.
- **Hierarchy from size and colour, not weight stacking.** A subtle-coloured label above a larger default-coloured value beats making things bolder.
- **Numbers earn emphasis contextually.** When numbers are the content (metrics, totals), give them alignment and room. When they're supporting detail, leave them alone.
- **Use the design system's text styles** (`Heading`, `Text`, `Subheading`, `Label`). Never invent sizes or typefaces.

## Colour

- Neutral at rest, saturated with intent.
- Separate surfaces through background contrast and thin borders, not elevation.
- Use the design system's semantic colours and appearances (`primary`, `success`, `warning`, `alert`, `subtle`, `disabled`). Never introduce colours outside it.

## Space

- **Compact but not cramped.** When in doubt, add breathing room.
- **Spacing creates grouping.** Related things close, unrelated things apart. Good spacing makes many dividers unnecessary.
- **Rhythm over randomness.** Use only the spacing scale from the helper classes. Off-scale spacing reads as careless.
- **Dense and organised feels calm.** Dense and unstructured feels chaotic.
- **Let the page breathe** with max-widths and margins at the macro level.

## Motion

- Transitions answer "where".
- Speed is a feature — micro-interactions near-instant, state changes fast, only layout shifts slower.
- Ease-out for entrances, ease-in for exits, ease-in-out for repositions.
- Transition only the property that changes; never animate everything.
- No entertainment spinners, no confetti. Skeletons are fine if simple and structural.

## Layout and composition

- **Predictable regions, rich content.** Users always know where navigation, primary content and supporting context live.
- **Alignment is non-negotiable.** Approximate alignment is worse than none. In repeated items, actions and badges occupy the same slot in every row.
- **Fixed-width columns in repeated layouts.** One flexible column (usually the name/title) absorbs width by truncating. Variable-width actions and badges sit in a fixed-width group.
- **Responsive preserves hierarchy.** Target desktop and laptop widths; what matters most stays most prominent at narrower widths.

## Craft

- Icons: one style and size family across the screen.
- Radius: consistent across the screen.
- Flatness is deliberate. If you reach for a shadow on an anchored element, use a border.
- Pixel precision: consistent padding, optically centred icons.
- **Scanability test:** cover the first column of a list — can you still read every other column as a straight vertical stripe? If edges waver, fix it.

## Never

- Chase trends (glassmorphism, bouncy consumer micro-interactions).
- Decorate without purpose.
- Add weight for emphasis — use size, colour or position.
- Break consistency for novelty.
- Trade clarity for aesthetics.
