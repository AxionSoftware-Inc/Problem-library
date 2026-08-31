# Axion Science Premium Workspace System

## Status

Canonical internal-page language for Science Hub, Mathematics, Notebook, Writer and future scientific instruments.

The public landing system presents the product. The workspace system is different: it should feel like a precise scientific instrument. Internal pages inherit the same brand, typography and color discipline, but use denser geometry, fewer shadows and more functional hierarchy.

## Core geometry

- Maximum primary grid: 1520px.
- Responsive side padding: 24px mobile, 32px small, 48px desktop, 64px wide desktop, 80px very wide desktop.
- Internal product/work header: 64px.
- Compact Project/context tray: about 44px where needed.
- Controls: 8px radius.
- Panels and floating surfaces: 12px radius.
- Borders are hairline cool-neutral rules.
- Shadows are reserved for actual elevated/floating layers.

## Internal navigation

Landing pages may use the 72px marketing/product navbar with Product / Workflow / Capabilities / Ecosystem navigation.

Once the user enters a work route:

- reduce the product header to 64px;
- remove marketing navigation;
- show a short workspace/context label instead;
- keep only actions relevant to the task;
- preserve a clear route back to the product home or instrument index.

Examples:

- Mathematics `/laboratory/*`: Home + All studios / relevant studio action.
- Science `/projects` and `/problems`: Home + contextual switch between Projects and Problem Library.
- Notebook `/workspace`: document toolbar and Project context only.
- Writer `/documents`, `/project`, `/new`, `/:id`: document/evidence actions only.

## Page hierarchy

List/index workspaces should use this sequence:

1. Compact internal navbar or work header.
2. Editorial page head with one clear title and concise support copy.
3. Small functional metrics/search/filter surface when useful.
4. Hairline list or one primary work canvas.
5. Empty/loading/error states using the shared Axion primitives.

Avoid dashboard card walls.

## Work surfaces

### Mathematics

The mathematical result is primary. Studio shells may be wide and dense. Use a single precise frame around the instrument rather than nested decorative cards.

### Notebook

The readable document is primary. Text, formula, code, graph and result blocks may differ semantically, but the surrounding document chrome stays quiet. Avoid turning each thought into a dashboard card.

### Writer

The manuscript is primary. Keep the paper/document surface distinct from application chrome. Toolbars, inspectors, template selection and Project evidence surfaces should use the shared 8px/12px geometry.

### Science Hub

Project and problem-library surfaces should read like scientific records and research contexts, not CRUD admin screens. Use hairline rows, clear provenance and restrained actions.

## Visual rules

- Cool white/off-white canvas.
- Deep navy primary actions.
- Scientific blue accent; violet only as a restrained signature.
- Playfair-style display typography for major titles and scientific/editorial emphasis.
- Manrope-style UI/body typography.
- No neon, heavy glass, oversized pills, decorative gradients, dense card walls or fake enterprise dashboards.
- Do not use landing-page hero animation inside workspaces unless the animation is itself the scientific result.

## Motion

Workspace motion is functional:

- hover and focus feedback: fast;
- opening a floating layer: standard;
- no decorative entrance choreography on every panel;
- respect `prefers-reduced-motion`.

## Relationship to landing design

Landing pages can be spacious and cinematic. Workspaces should be calmer and denser. They must still look like the same company through shared color, typography, spacing grid, control geometry and navigation discipline.

A useful test:

> The landing should make the instrument desirable. The workspace should make the instrument disappear behind the work.
