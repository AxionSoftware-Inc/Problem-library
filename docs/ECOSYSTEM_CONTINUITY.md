# Axion Science Ecosystem Continuity

## Status

Canonical continuity contract for Science, Mathematics, Notebook and Writer.

The four applications may have different working surfaces, but switching instruments must feel like moving inside one scientific product. Project identity, Scientific Object identity, provenance and navigation context should survive the transition.

## Product family

- Axion Science — Project and ecosystem front door.
- Axion Mathematics — mathematical instrument family.
- MathSphere Laboratory — the focused Mathematics laboratory/workspace sub-brand.
- Axion Notebook — research reasoning and computational document workspace.
- Axion Writer — manuscript and publication workspace.

## Project continuity

A Project is the primary user-facing research context.

When an active Project exists:

- ecosystem navigation carries the Project id;
- keyboard app switching carries the Project id;
- Mathematics Save writes results into that Project;
- Notebook resolves and links results from that Project;
- Writer can start a manuscript from evidence in that Project;
- the ecosystem bar displays the active Project context.

Do not silently create a second independent Project model for a feature page. Science `/projects` and `/problems` use the same local-first Project model.

## Scientific Object continuity

The technical unit is a Scientific Object.

Mathematics Save with an active Project creates a Scientific Object in the local IndexedDB Platform store, including:

- object id;
- Project id;
- kind and domain;
- current revision;
- structured payload;
- human-readable summary/report;
- input snapshot;
- provenance and execution metadata.

Scientific data should cross applications by reference when possible, not by opaque clipboard-only copying.

## Mathematics → Notebook

Notebook's Project result tray exposes saved Mathematics objects.

`Insert` creates a `ScientificObjectReference` with default mode `live` and stores a reference record with role `notebook-block`.

Notebook also stores lightweight document-view linkage so the referenced result appears inside the readable document surface.

A linked result displays:

- source application;
- domain/kind;
- current revision;
- title;
- readable summary;
- the fact that it is a live Project reference.

Removing the document link does not delete the source Scientific Object.

## Notebook → Writer

A linked Notebook result can be opened in Writer as Project evidence.

Writer navigation uses the route-aware ecosystem helper rather than string replacement so the flow works with:

- same-origin path deployment;
- application prefixes such as `/writer`;
- local development URLs configured by environment variables.

Writer receives `source=project` and `objectId` and hydrates the Scientific Object from the active Project.

The new Writer draft includes an `axion-scientific-reference` metadata marker containing the source Project id, object id, reference mode, source revision, source app and domain. The readable evidence may be rendered into the manuscript, but object identity is not discarded.

## Reference modes

Shared contracts support:

- `live` — resolve the latest current object revision;
- `pinned` — resolve a specific revision;
- `frozen` — snapshot/export semantics; local v1 resolver does not yet hydrate frozen references.

Notebook insertion currently defaults to `live`.

## Route continuity

Use `getEcosystemHref()` for each application's primary work surface.

Use `getEcosystemRouteHref()` when opening a specific route inside another application, for example Writer `/new` or Mathematics `/laboratory/integral-studio`.

The helper must preserve Project context and application path prefixes.

## Keyboard continuity

Outside text-entry controls:

- `G`, then `M` → Axion Mathematics
- `G`, then `N` → Axion Notebook
- `G`, then `W` → Axion Writer
- `G`, then `S` → Axion Science

The active Project is preserved during the switch.

Notebook keeps its local command palette shortcut (`⌘/Ctrl + K`) for document actions.

Keyboard shortcuts must not fire while the user is typing in an input, textarea, select or contenteditable surface.

## UI continuity

The ecosystem bar is the persistent cross-product context layer. It should remain quiet and compact while exposing:

- product family navigation;
- active product;
- active Project;
- discoverable keyboard navigation hints.

Landing navigation and workspace navigation can differ in density, but application switching must not visually feel like leaving the product family.

## QA contract

Mathematics, Notebook and Writer include responsive Playwright visual smoke tests for desktop and mobile. Tests check primary surfaces and horizontal overflow and emit screenshots as CI artifacts.

Science currently runs lint/build CI without Playwright until the repository adopts the browser-test dependency in its lockfile.

Route helpers have unit regression tests in Mathematics, Notebook and Writer.

CI success must not be claimed unless GitHub Actions actually allocates a runner and executes the workflow steps.
