# Ecosystem Handoff — Science Hub / Problem Library

Branch: `ecosystem-v1-foundation-2026-08-28`
Base: `main` at `eb95d700e1b4f9e2e36402219c73bc0595feb4e0`

## Role

This repository currently has the legacy name `Problem-library`. For ecosystem-v1 it becomes the canonical **Science Hub + Platform Core** repository while continuing to expose problem/example discovery.

The repository may be renamed later. Product contracts must not depend on the repository name.

## Science Hub responsibilities

User-facing:

- ecosystem landing / entry point;
- recent and owned Projects;
- create/import Project;
- Explore / Problems / Examples;
- global project discovery/search shell;
- public/share entry surfaces.

Backend/core:

- shared Project identity;
- Scientific Objects;
- object revisions;
- live/pinned/frozen references;
- artifacts and provenance metadata;
- activity/history;
- authentication/permissions boundary;
- later sync/share/search metadata.

## Explicit non-responsibilities

Platform Core is **not** the mathematics/physics compute backend. It does not need SymPy workers, GPU servers or HPC infrastructure for the product to function.

Normal compute belongs on the user's device or on an explicitly selected external execution target.

## Legacy migration

`backend/library/models.py` currently contains a simple `Project` model. This is a legacy library-domain model and must not become the ecosystem Project definition.

Canonical Project identity now lives in `backend/platform_core/models.py`.

During migration:

- existing problem pages may continue using `library` models;
- new ecosystem work must use `platform_core.Project`;
- later add an explicit data migration only if legacy Project records matter;
- do not create new cross-app dependencies on `library.Project`.

The tracked SQLite database and Python cache files are development artifacts; clean them from source control in a later hygiene pass after the core migration is stable.

## Canonical architecture documents

- `docs/ECOSYSTEM_MASTER_BLUEPRINT.md`
- `docs/SCIENTIFIC_OBJECT_SPEC.md`
- `lib/ecosystem/contracts.ts`

If another repository disagrees with these semantics, update the architecture here first or record an explicit ADR.

## Platform API

Initial shared API is mounted under:

```text
/api/platform/projects/
/api/platform/objects/
/api/platform/revisions/
/api/platform/references/
/api/platform/artifacts/
/api/platform/activity/
```

The first version deliberately stays small. Add domain-specific APIs to their owning app rather than turning Platform Core into a monolith of every scientific feature.

## Near-term implementation order

1. Finish initial Platform Core migration and baseline tests.
2. Build Science Hub landing + Project home around the shared model.
3. Add ecosystem app routing/config without hard-coding deployment domains.
4. Wire Mathematics `Save to Project` for one reference workflow.
5. Wire Notebook object references.
6. Wire Writer `Insert from Project`.
7. Add local-first sync/cache semantics.
8. Add share/public object routes.
9. Harden production settings only when deployment target is chosen.

## Design rule

Problem Library becomes **Explore**, not the visual center of the company. The Science Hub should introduce Projects and the ecosystem with the same calm scientific design language used by Mathematics, while remaining more spatial and project-oriented than a generic SaaS dashboard.
