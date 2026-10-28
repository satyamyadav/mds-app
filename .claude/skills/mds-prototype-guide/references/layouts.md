# Page compositions

Every page sits inside the app shell (top header + scrolling content area on a light grey background). Pick one of three compositions. Use MDS `Card`, `Row`/`Column`, `PageHeader`, `Divider` and helper classes to build them — look up exact props with the MDS MCP.

## 1. Dashboard grid

**Use when** the page is an overview with several independent panels, each understandable on its own.
**Don't use when** everything belongs to one task or entity — use a single-task page.

```
grey page background
├── PageHeader (title + one primary action, optional)
├── Row: KPI cards — equal columns (e.g. 4 × size="3")
├── Row: main panel (e.g. chart or table, size="8") + secondary panel (size="4")
└── Row: full-width list or table panel (size="12")
```

Rules:
- No outer card wrapping everything. Each panel is its own `Card`.
- One consistent gap between cards; the grey background always shows between them.
- Columns stay symmetric (equal splits or 8/4). No offset or masonry layouts.
- Each panel has a short title and is self-contained.

## 2. Single-task page

**Use when** the page is about one entity or one job — a patient detail, an edit form, a review step.
**Don't use when** the content is several unrelated panels — use a dashboard grid.

```
grey page background
└── Card (fills the content area)
    ├── PageHeader / card header — title, status, actions
    ├── Divider
    ├── Scrollable body
    │   ├── Section heading
    │   ├── content
    │   ├── Divider
    │   ├── Section heading
    │   └── content
    └── Footer actions — Cancel + one primary action, right-aligned
```

Rules:
- One card owns the surface. Sections inside it don't get their own card or background.
- Separate sections with `Divider` and headings, not nested boxes.
- Long forms keep actions reachable (sticky footer or actions in the header).

## 3. Landing page

**Use when** the page greets the user and leads into work — a home or overview page.

```
grey page background
├── Ambient header directly on grey — greeting, date, a few inline stats
├── Card — primary content (list, table, queue)
└── Card — optional secondary content
```

Rules:
- Ambient content (titles, greeting, inline numbers) sits on grey with no card.
- Structured, interactive content (tables, lists, forms, distinct stat tiles) gets a card.
- Cards on grey get a subtle shadow; keep the gap consistent.
- Never make the whole page one white card — that's a single-task page.
