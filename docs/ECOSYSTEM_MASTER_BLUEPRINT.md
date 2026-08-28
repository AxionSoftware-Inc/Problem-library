# Science Ecosystem Master Blueprint

Status: **canonical architecture source for ecosystem-v1**

This document is intentionally product-first. Individual repositories may change implementation details, but they must not violate these boundaries without an architecture decision record.

## Product thesis

The ecosystem is not a bundle of websites. It is one scientific environment in which a research idea can move from question to computation to evidence to publication without losing identity, provenance, or context.

The user-facing primary unit is the **Project**. The technical primary unit inside a project is the **Scientific Object**.

```text
Project
  ├─ calculations
  ├─ simulations
  ├─ datasets
  ├─ visualizations / scenes
  ├─ notebook reasoning
  ├─ findings
  └─ documents / publications
```

## Repository roles for ecosystem-v1

### Problem-library — Science Hub + Platform Core

The repository name is legacy and may be renamed later. In ecosystem-v1 it owns:

- ecosystem home / project entry point;
- public problem and example discovery;
- canonical Project model;
- canonical Scientific Object model;
- revisions and references;
- sync metadata, search metadata and sharing boundaries;
- the only first-party shared backend API.

It does **not** become a compute server.

### Mathematics-Frontend — Math instrument

Owns:

- mathematical problem composition;
- symbolic/numerical work that can run locally;
- 2D/3D scientific visualization;
- creation of math Scientific Objects;
- reopening an existing math object from a Project.

Default execution target is the user device (JS/WASM/Pyodide/Web Workers). Server compute is not a platform requirement.

### Notebook — Research memory

Owns:

- hypotheses, observations, findings, questions and decisions;
- structured notebook blocks;
- references to live scientific objects;
- `.ipynb` interoperability where useful;
- future JupyterLite/Pyodide local execution.

Notebook is not another mathematics product and should not duplicate solver logic.

### Writer — Publication instrument

Owns:

- scientific articles, papers, reports and books;
- citations and publication structure;
- `Insert from Project`;
- live / pinned / frozen references to scientific objects;
- export/publishing.

Writer must not contain a private copy of Mathematics solvers. Existing laboratory backend code is legacy migration input only.

## Product invariants

1. **Project-first UX.** Users think in projects, not storage locations or backend services.
2. **Object-first architecture.** Results cross apps by reference, never by ad-hoc copy/paste contracts.
3. **Local-first execution.** Compute uses the user's device whenever practical.
4. **No mandatory compute infrastructure.** Heavy compute is an external/local execution target, not a prerequisite for the product.
5. **Open exit.** Important data can be exported to standard formats.
6. **Progressive simplicity.** Default surfaces are simple; advanced capability is available without dominating the interface.
7. **Provenance by default.** A result knows where it came from, which revision produced it, and which objects depend on it.
8. **Renderer independence.** Scientific data/scene specs are not encoded as Plotly/Three.js component state.
9. **One identity and one project context.** Authentication, project identity and permissions are shared platform concerns.
10. **Apps do not read one another's databases.** Cross-app access goes through Platform Core contracts.

## Shared platform architecture

```text
Browser
  ├─ Math (local compute)
  ├─ Notebook (local-first reasoning/runtime)
  ├─ Writer
  └─ Science Hub
         │
         ▼
Platform Core API
  ├─ identity boundary
  ├─ projects
  ├─ scientific objects
  ├─ revisions
  ├─ references
  ├─ artifacts
  ├─ activity
  ├─ sync metadata
  └─ sharing/search metadata
         │
         ├─ relational metadata store
         └─ optional object/blob storage
```

Platform Core intentionally does not own SymPy/NumPy simulation workers in ecosystem-v1.

## Execution policy

Execution targets are an extensible concept:

```text
this-device       default
local-python      future adapter
jupyter-kernel    future adapter
external-server   future adapter
hpc-cluster       future adapter
```

A Scientific Object records the execution target and engine in provenance. The Project model does not care where the compute happened.

## Visualization policy

Visualization is a first-class scientific object, not an exported screenshot.

The canonical representation is a renderer-neutral **Scientific Scene** or chart specification. Renderers are adapters:

```text
Scientific Scene
  ├─ coordinate system
  ├─ geometry
  ├─ scalar/vector fields
  ├─ trajectories
  ├─ annotations
  ├─ time/animation state
  ├─ parameter controls
  └─ source object references
         │
         ├─ SVG/Canvas renderer
         ├─ Plot adapter where useful
         └─ Three.js/WebGL/WebGPU spatial renderer
```

Static publication export is a view of the object, not the canonical data itself.

## Cross-app reference modes

Every embedded scientific result uses one of:

- **live** — resolves to the latest compatible object revision;
- **pinned** — resolves to a specific revision;
- **frozen** — immutable publication snapshot.

Writer should make this visible and understandable instead of silently changing published evidence.

## Migration strategy

Existing app backends stay in place only until their consumers have Platform Core adapters.

Order:

1. introduce shared contracts and Platform Core;
2. add project context adapters to every frontend;
3. make Math save/reopen Scientific Objects;
4. make Notebook reference Project objects;
5. make Writer insert Project objects;
6. migrate document/notebook persistence to Platform Core where appropriate;
7. remove duplicated solver/backend code from Writer;
8. remove Notebook server execution dependency and move default execution local;
9. keep only app-specific backend logic that cannot reasonably be client-side or shared.

Do not delete a legacy backend before the frontend consumer has a replacement path.

## Ecosystem UX pipeline

### New user

```text
Try without signup
  → compute/visualize
  → Save work
  → create account/project without losing current state
  → Add note
  → Use in Writer
  → Share/export
```

### Existing researcher

```text
Create/Import Project
  → bring CSV / .ipynb / LaTeX / BibTeX / documents
  → keep original formats available
  → progressively link imported material to Scientific Objects
```

### Expert

A global command/search surface eventually provides fast actions such as New Calculation, Open Notebook, Insert Result, Search Project and Export.

## Design direction

The ecosystem should feel like a scientific instrument rather than a generic SaaS dashboard.

- calm, precise, high-information design;
- no decorative sci-fi neon/glass language;
- mathematics/data/space are the visual heroes;
- motion explains state or science rather than decorating the UI;
- one typography/spacing/control language across apps;
- app switching preserves Project context;
- simple default states with deep advanced capability.

## Extension rule

Physics, statistics, engineering or future scientific domains plug into the same Project/Object/Scene contracts. No domain may require rewriting the core Project model.

A new domain is accepted when it contributes new scientific object kinds, editors, renderers or execution adapters while preserving the shared protocol.
