# Ecosystem Handoff — Science Hub / Problem Library

Active development branch: `main`
Pre-ecosystem baseline: `freeze/pre-ecosystem-main-2026-08-29`

## Role

This repository currently has the legacy name `Problem-library`. For ecosystem-v1 it acts as the **Science Hub + canonical ecosystem contract owner** while continuing to expose problem/example discovery.

The repository may be renamed later. Product contracts must not depend on the repository name.

## Current milestone: keep it simple

The current milestone is **not** a cloud-platform build. The only flow that must become reliable first is:

```text
Local Project
    ↓
Math result → Save
    ↓
local Scientific Object
    ↓
Notebook can see/use it
Writer can start a draft from it
```

Until this flow is stable, do **not** add new authentication systems, sync engines, job queues, collaboration infrastructure, remote execution orchestration, billing gates, or complex reference graphs.

There is intentionally no new shared backend in this milestone. Existing application backends remain untouched unless a current frontend consumer requires a migration.

## Science Hub responsibilities

User-facing:

- ecosystem landing / entry point;
- local Projects first;
- create/import Project;
- Explore / Problems / Examples;
- later public/share entry surfaces.

Contract ownership:

- Project identity semantics;
- Scientific Object shape;
- local object/revision storage contract;
- ecosystem app navigation contract;
- global design system semantics;
- later, only if needed, sync/share protocol semantics.

## Explicit non-responsibilities

Science Hub is **not** the mathematics/physics compute backend. It does not need SymPy workers, GPU servers or HPC infrastructure for the product to function.

Normal compute belongs on the user's device or on an explicitly selected external execution target.

## Legacy backend boundary

`backend/library/models.py` contains legacy library-domain models. Keep them working for the current Problem Library pages, but do not use them as a reason to build a new cross-app server model now.

During this milestone:

- existing problem pages may continue using `library` models;
- new ecosystem work uses browser-local Project IDs and Scientific Objects;
- do not migrate data merely to satisfy architecture diagrams;
- do not delete legacy backend code until its frontend consumer has moved away from it;
- do not add a new `platform_core` Django app yet.

The tracked SQLite database and Python cache files are development artifacts; clean them from source control in a later hygiene pass after the product flow is stable.

## Canonical architecture/design documents

- `docs/ECOSYSTEM_MASTER_BLUEPRINT.md`
- `docs/SCIENTIFIC_OBJECT_SPEC.md`
- `docs/GLOBAL_DESIGN_SYSTEM.md`
- `docs/ECOSYSTEM_DESIGN_LANGUAGE.md`
- `lib/ecosystem/contracts.ts`

These documents describe direction, not a requirement to implement every layer immediately. If another repository disagrees with the core object or global design semantics, update the canonical contract here first or record an explicit ADR.

## Server rule

No shared Platform API is implemented in this milestone.

If sync/share/auth later becomes a real user requirement, add the smallest server boundary needed at that time and keep the local object contract unchanged. Do not pre-build endpoints for hypothetical future infrastructure.

## Near-term implementation order

1. Make Project context survive navigation.
2. Make Mathematics Save create a local Project object.
3. Show saved Math objects inside Notebook.
4. Let Writer start a draft from a saved Project object.
5. Apply the shared design tokens/components without flattening app-specific strengths.
6. Verify the three-app flow visually and with browser tests.
7. Only then decide whether native Notebook insertion needs a dedicated block/reference model.
8. Only after local workflow is stable, revisit server sync/share/auth.

## Design rule

Problem Library becomes **Explore**, not the visual center of the company. The Science Hub should introduce Projects and the ecosystem with the same calm scientific design language used by Mathematics, while remaining more spatial and project-oriented than a generic SaaS dashboard.
