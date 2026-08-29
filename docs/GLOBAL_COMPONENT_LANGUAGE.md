# Axion Science — Global Component Language

Status: canonical component contract for all first-party apps.

This document turns the visual system into reusable interaction primitives. Science Hub, Mathematics, Notebook, Writer, and future domain tools should reuse these primitives instead of inventing app-local button, field, tab, panel, badge, toolbar, disclosure, empty-state, or inspector styles.

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
import {
  AxButton,
  AxDisclosure,
  AxField,
  AxInput,
  AxPanel,
  AxToolbar,
} from "@/components/axion";
```

The files are mirrored across repositories for now. Once the API stabilizes, move them into a shared package without changing consumer semantics.

## Primitive set

### AxButton / AxActionLink

Variants:

- `primary` — one main action in a local context;
- `secondary` — normal explicit action;
- `quiet` — low-priority toolbar/navigation action;
- `danger` — destructive action only.

Use `AxActionLink` for navigation that visually belongs to the same action hierarchy. Do not replace links with buttons merely for styling.

Do not place several primary buttons next to each other.

### AxIconButton / AxToolbar

`AxIconButton` is for compact actions with a real accessible label. Icon-only actions must always provide `aria-label`.

`AxToolbar` groups actions that operate on the current scientific/document surface. A toolbar is not ecosystem navigation and should not become a container for unrelated settings.

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

### AxDisclosure

Canonical progressive-disclosure surface for Advanced settings, diagnostics, methods, provenance detail, or secondary controls.

The summary must tell the user what is inside. Do not hide a primary scientific result behind disclosure.

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

## Current migration status

Already aligned with the global language:

- ecosystem bar across first-party apps;
- Science Hub landing, navbar, Projects creation/list/empty states;
- Mathematics shared Solve shell and Differential / Matrix / Probability / Series-Limit composers;
- Notebook Project Results tray, toolbar chrome, popovers/modals, and workspace shell surfaces;
- Writer Project Results surface and editor chrome override layer.

Intentionally preserved for now:

- approved Integral scientific hierarchy and visual renderer;
- core Notebook document/block editing behavior;
- Writer manuscript/publication rendering;
- existing scientific visualization engines.

## Migration rule

Do not redesign a whole app in one commit merely to adopt primitives.

Migration order:

1. ecosystem chrome;
2. empty states and project surfaces;
3. repeated buttons/fields/tabs;
4. toolbars, disclosures and inspectors;
5. domain-specific surfaces only when there is a concrete UX benefit.

Existing stable scientific renderers/editors should remain intact while their surrounding controls migrate.
