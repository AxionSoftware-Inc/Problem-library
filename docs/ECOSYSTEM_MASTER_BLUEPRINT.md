# Science Ecosystem Master Blueprint

Status: **canonical product direction; implementation is intentionally incremental**

The ecosystem is not a bundle of websites. It is one scientific environment in which a research idea can move from question to computation to evidence to publication without losing its Project context.

The user-facing primary unit is the **Project**. The portable technical unit inside a Project is the **Scientific Object**.

```text
Project
  ├─ calculations
  ├─ simulations
  ├─ datasets
  ├─ visualizations
  ├─ notebook reasoning
  ├─ findings
  └─ documents / publications
```

## Current ecosystem-v1 milestone

Do the smallest useful thing first:

```text
Local Project
    ↓
Math: solve + visualize
    ↓ Save
local Scientific Object
    ↓
Notebook: see/use result
Writer: start draft from result
```

The current implementation uses browser-local Project context plus IndexedDB Scientific Objects. It does **not** require a new shared backend, account system, sync engine, collaboration service, remote execution layer, or reference graph.

Those capabilities remain future options and must be justified by real workflows before implementation.

## Repository roles

### Problem-library — Science Hub / Explore

The repository name is legacy and may be renamed later. It currently owns:

- ecosystem landing and Project entry point;
- local Project creation/listing;
- public problem/example discovery;
- canonical ecosystem contract documentation;
- browser-local Project/Object utilities used as the reference implementation.

Its existing Django `library` backend remains a legacy Problem Library concern. It is not the new shared ecosystem backend.

### Mathematics-Frontend — Math instrument

Owns:

- mathematical problem composition;
- symbolic/numerical work that can run locally;
- 2D/3D scientific visualization;
- creation of math Scientific Objects;
- later reopening/editing compatible math objects when that workflow is needed.

Default execution stays on the user device whenever practical. Server compute is not a platform requirement.

### Notebook — Research memory

Owns:

- hypotheses, observations, findings, questions and decisions;
- structured notebook blocks;
- access to Project scientific results;
- `.ipynb` interoperability where useful;
- future local Python execution when real notebook workflows require it.

During the current milestone Notebook only needs a simple, reliable Project-results seam. A complex object-reference block system is not required yet.

### Writer — Publication instrument

Owns:

- scientific articles, papers, reports and books;
- citations and publication structure;
- starting/inserting content from Project results;
- export/publishing.

Writer must not gain new mathematical solver logic. Existing duplicated laboratory backend code is legacy migration input only.

## Product invariants

1. **Project-first UX.** Users think in projects, not databases or services.
2. **Portable result contract.** Scientific results have a common object shape instead of app-specific export formats.
3. **Local-first execution.** Compute uses the user's device whenever practical.
4. **No mandatory compute infrastructure.** Heavy compute may later be an optional execution target.
5. **Open exit.** Important data can be exported to standard formats.
6. **Progressive simplicity.** Default surfaces stay simple; advanced capability appears only when invoked.
7. **Provenance where useful.** Results can record source app, inputs, engine and execution target without forcing a large provenance UI.
8. **Renderer independence where practical.** Scientific data should not be trapped inside a renderer-specific component state.
9. **Project context survives app switching.** The active Project is part of the workflow.
10. **No premature shared infrastructure.** Cross-device identity/sync/permissions are added only when users actually need them.

## Current technical shape

```text
same browser origin (preferred)

Science Hub
  local Project metadata
        │
        ├───────────────┬────────────────┐
        ▼               ▼                ▼
      Math           Notebook          Writer
   local compute      reasoning       publication
        │               │                │
        └──── shared local Scientific Object store ────┘
                      IndexedDB
```

A same-origin deployment is preferred because browser storage such as IndexedDB and OPFS is origin-scoped. A future cross-origin deployment would need an explicit transfer/sync layer; do not build that layer until deployment actually requires it.

## Optional future server boundary

A future server may become useful for cross-device sign-in, sync, collaboration, public sharing or durable cloud storage.

If implemented, it should mirror the Project / Scientific Object contract and may own metadata such as:

```text
identity / permissions
projects
object metadata and revisions
references / artifacts
sync / share / search metadata
```

It should not automatically become a SymPy, notebook Python, simulation, GPU or visualization compute service.

## Execution policy

Execution targets are an extensible concept, not a current infrastructure checklist:

```text
this-device       current default
local-python      possible future adapter
jupyter-kernel    possible future adapter
external-server   possible future adapter
hpc-cluster       possible future adapter
```

Only implement an adapter when a real workflow needs it.

## Visualization policy

Visualization is scientific output, not merely decoration. Over time, useful visualization data should be representable independently of a particular renderer so Math and later Physics can evolve their render stacks without changing the Project contract.

Possible adapters include SVG/Canvas, Plotly, Three.js/WebGL/WebGPU and publication/static export. This is a direction, not a requirement to rewrite current working visualizers.

## Reference semantics — later

The contract allows future `live`, `pinned`, and `frozen` references, especially for publication stability. The current milestone does **not** need UI or infrastructure for all three modes.

Start with simple saved Project objects. Introduce richer reference semantics only after a concrete editing/publication workflow demonstrates the need.

## Migration strategy

Current order:

1. establish shared Project context and object contract;
2. make Math save a local Scientific Object;
3. make Notebook expose Project results;
4. make Writer start a draft from a Project result;
5. visually/runtime-test that complete workflow;
6. clean internal Notebook/Writer state models where necessary;
7. only then decide which richer references, local Python, sync, auth or sharing features deserve implementation;
8. retire legacy backend duplication only after no active consumer needs it.

Do not delete a legacy backend before its frontend consumer has a replacement path, and do not expand a legacy backend merely because it already exists.

## Ecosystem UX pipeline

### New user

```text
Open ecosystem
  → create local Project or try a tool
  → compute / visualize
  → Save to Project
  → reason in Notebook or write in Writer
  → export
```

Signup should not be required to discover the product's value. If cloud sync arrives later, account creation should preserve the existing local Project rather than forcing a restart.

### Existing researcher

Later import paths can include CSV, `.ipynb`, LaTeX, BibTeX and documents. Original formats should remain available rather than being destructively converted into proprietary storage.

## Design direction

The ecosystem should feel like a scientific instrument rather than a generic SaaS dashboard.

- calm, precise, high-information design;
- no decorative sci-fi neon/glass language;
- mathematics, data and scientific space are the visual heroes;
- motion explains state or science rather than decorating the UI;
- one typography/spacing/control philosophy across apps;
- app switching preserves Project context;
- simple default states with deep capability underneath.

## Extension rule

Physics, statistics, engineering and future scientific domains should plug into the same Project/Object philosophy. A new domain should add domain-specific editors, computations, renderers and object kinds without forcing a rewrite of the basic Project workflow.
