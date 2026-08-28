# Ecosystem Handoff — Science Hub / Problem Library

Branch: `ecosystem-v1-foundation-2026-08-28`
Base: `main` at `eb95d700e1b4f9e2e36402219c73bc0595feb4e0`

## Role

This repository currently has the legacy name `Problem-library`. For ecosystem-v1 it becomes the canonical **Science Hub + Platform Core** repository while continuing to expose problem/example discovery.

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

The Django Platform Core is an optional future sync/share boundary. It must not become a prerequisite for ordinary local work.

## Science Hub responsibilities

User-facing:

- ecosystem landing / entry point;
- local Projects first;
- create/import Project;
- Explore / Problems / Examples;
- later public/share entry surfaces.

Backend/core, only when needed:

- shared Project identity;
- Scientific Objects;
- object revisions;
- references and artifacts;
- later authentication, permissions, sync/share/search metadata.

## Explicit non-responsibilities

Platform Core is **not** the mathematics/physics compute backend. It does not need SymPy workers, GPU servers or HPC infrastructure for the product to function.

Normal compute belongs on the user's device or on an explicitly selected external execution target.

## Legacy migration

`backend/library/models.py` currently contains a simple `Project` model. This is a legacy library-domain model and must not become the ecosystem Project definition.

Canonical Project identity for the optional server layer lives in `backend/platform_core/models.py`. Local-first Project identity is allowed to exist entirely in the browser during this milestone.

During migration:

- existing problem pages may continue using `library` models;
- new ecosystem work must not create dependencies on `library.Project`;
- do not migrate data merely to satisfy architecture diagrams;
- do not delete legacy backend code until its frontend consumer has moved away from it.

The tracked SQLite database and Python cache files are development artifacts; clean them from source control in a later hygiene pass after the product flow is stable.

## Canonical architecture documents

- `docs/ECOSYSTEM_MASTER_BLUEPRINT.md`
- `docs/SCIENTIFIC_OBJECT_SPEC.md`
- `lib/ecosystem/contracts.ts`

If another repository disagrees with these semantics, update the architecture here first or record an explicit ADR.

## Optional Platform API

An initial shared API exists under:

```text
/api/platform/projects/
/api/platform/objects/
/api/platform/revisions/
/api/platform/references/
/api/platform/artifacts/
/api/platform/activity/
```

It is **not required** for the current local-first milestone. Do not expand it until a concrete sync/share requirement appears.

## Near-term implementation order

1. Make Project context survive navigation.
2. Make Mathematics Save create a local Project object.
3. Show saved Math objects inside Notebook.
4. Let Writer start a draft from a saved Project object.
5. Verify the three-app flow visually and with browser tests.
6. Only then decide whether native Notebook insertion needs a dedicated block/reference model.
7. Only after local workflow is stable, revisit server sync/share/auth.

## Design rule

Problem Library becomes **Explore**, not the visual center of the company. The Science Hub should introduce Projects and the ecosystem with the same calm scientific design language used by Mathematics, while remaining more spatial and project-oriented than a generic SaaS dashboard.
