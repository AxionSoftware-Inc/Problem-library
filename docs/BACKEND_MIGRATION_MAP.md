# Backend Migration Map

This file prevents ecosystem-v1 work from accidentally expanding legacy per-app backends.

## Target state

```text
Platform Core backend
  auth / permissions
  projects
  scientific objects
  revisions
  references
  artifacts
  activity
  sync/share/search metadata

Browser / external execution
  mathematics
  notebook Python
  simulations where practical
  visualization

App-specific backend only when justified
  Writer publication/export operations that cannot be local
  future integration/webhook services
```

## Mathematics-Frontend

Current: a `Mathematics-Back` repository/submodule reference and browser-side Laboratory logic.

Target: normal studio computation runs locally. Platform Core stores project/object metadata and portable artifacts.

Deletion gate for Mathematics backend dependency:

- all normal studios work without mandatory backend compute;
- Save/Open Scientific Object works;
- any server-only capability is explicitly classified as optional external compute or removed.

## Notebook

Current: Django + PostgreSQL/Redis-oriented deployment + queued execution worker.

Target: local-first runtime using browser execution (JupyterLite/Pyodide/Web Workers where appropriate), with Platform Core for synced metadata/state.

Deletion gate for queue/worker stack:

- notebook editing persists locally when offline;
- computational blocks have a local execution path;
- project/object references persist through Platform Core when signed in;
- import/export/checkpoint behavior no longer depends on execution jobs.

Until then, do not add new product features to the worker architecture unless needed for migration safety.

## Writer

Current: Django `application`, `paper_builder`, and a very large duplicated `laboratory` solver package.

Target: Writer consumes Scientific Objects created by domain tools. It never needs a private math solver copy.

Deletion gate for `backend/laboratory`:

- `Insert from Project` can browse and resolve scientific objects;
- current lab-result cards render generic object payloads/scenes;
- live/pinned/frozen references work;
- no Writer route directly calls the duplicated laboratory endpoints.

`paper_builder` may remain temporarily for document persistence/export. Shared project identity must migrate to Platform Core before final backend simplification.

## Problem-library / Science Hub

Current: small Django `library` backend with a legacy Project model and SQLite development DB.

Target: this repository hosts canonical Platform Core plus Explore/Problem Library domain data.

Migration rule:

- new ecosystem projects use `platform_core.Project` only;
- `library.Project` is legacy and receives no new cross-app dependencies;
- legacy problem/example data can remain in `library` until a later domain cleanup.

## Cost rule

No architecture change may make first-party CPU/GPU execution a mandatory cost for ordinary user workflows without an explicit architecture decision. The ecosystem must remain viable on minimal shared infrastructure.
