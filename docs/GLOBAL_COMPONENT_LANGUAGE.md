# Axion Science — Global Component Language

Status: canonical component contract for all first-party apps.

This document turns the visual system into reusable interaction primitives. Science Hub, Mathematics, Notebook, Writer, and future domain tools should reuse these primitives instead of inventing app-local button, field, tab, panel, badge, empty-state, or inspector styles.

## Core rule

Global components own **interaction language and visual hierarchy**. Domain components own **scientific meaning and behavior**.

Examples:

- `AxButton` owns button hierarchy, sizing, focus, disabled states.
- Integral Studio owns what `Solve` does.
- `AxInspector` owns the quiet right-side inspection shell.
- A Physics field inspector owns field-specific controls and values.

Do not put business logic into the global primitive layer.

## Canonical implementation

Current app-local mirror:

`components/axion/axion-primitives.tsx`

Import through:

```ts
import { AxButton, AxField, AxInput, AxPanel } from "@/components/axion";
```

The files are mirrored across repositories for now. Once the API stabilizes, move them into a shared package without changing consumer semantics.

## Primitive set

### AxButton

Variants:

- `primary` — one main action in a local context;
- `secondary` — normal explicit action;
- `quiet` — low-priority toolbar/navigation action;
- `danger` — destructive action only.

Do not place several primary buttons next to each other.

### AxInput / AxTextarea / AxSelect / AxField

Fields should be quiet and engineered. Labels are explicit. Help text belongs in `hint` or contextual explanation, not placeholder-only UX.

Scientific defaults:

- preserve user input while computation is pending;
- invalid scientific state must be explained, not merely colored red;
- units/precision/assumptions may appear as adjacent domain controls rather than bloating the base field primitive.

### AxTabList / AxTab

Use for a small set of mutually exclusive views or modes. Do not use tabs as generic navigation across the ecosystem; app switching and Project navigation belong to the shell.

### AxPanel

Use only when a real working surface needs separation. Prefer whitespace and hierarchy before adding panels.

`elevated` is for temporary/floating importance, not routine card grids.

### AxBadge

Badges communicate compact state/category only: Local, Saved, Exact, Approximate, Warning, Draft, etc. They should not become decorative labels on every element.

### AxEmptyState

An empty state must answer two questions:

1. Why is this area empty?
2. What is the most useful next action?

Scientific products should avoid dead ends. Example: no saved results → `Open Math`.

### AxSectionHeader

Standard section hierarchy for tool pages, project surfaces, and inspectors. It should not compete with the scientific hero/result.

### AxInspector

Canonical quiet side-inspector shell for metadata, provenance, parameters, object details, and advanced controls. It is secondary to the main scientific canvas/document.

## Interaction hierarchy

Within one working context, aim for:

```text
Primary scientific surface
  ↓
Primary action
  ↓
Secondary actions
  ↓
Metadata / status
  ↓
Advanced / inspector controls
```

Do not invert this hierarchy by giving metadata, navigation, or settings more visual weight than the equation, visualization, reasoning, or manuscript.

## Density

- Marketing / project entry: spacious.
- Math / Physics instrument: medium-dense around controls, spacious around visualization.
- Notebook: editorial, low chrome density.
- Writer: manuscript-first, minimal surrounding chrome.
- Inspector: compact but readable.

## Accessibility

Every primitive must preserve:

- keyboard access;
- visible focus;
- semantic HTML roles;
- reduced-motion behavior via shared tokens;
- sufficient text/border contrast;
- disabled state that is both visually and functionally disabled.

## Migration rule

Do not redesign a whole app in one commit merely to adopt primitives.

Migration order:

1. ecosystem chrome;
2. empty states and project surfaces;
3. repeated buttons/fields/tabs;
4. inspectors and advanced controls;
5. domain-specific surfaces only when there is a concrete UX benefit.

Existing stable scientific renderers/editors should remain intact while their surrounding controls migrate.
