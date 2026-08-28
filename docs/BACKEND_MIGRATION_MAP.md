# Backend Migration Map

Status: **future migration guidance, not current implementation**

The current ecosystem milestone is local-first and does not introduce a new shared backend. This document exists only to prevent future work from accidentally expanding duplicated per-app infrastructure.

## Current state

```text
Browser
  local Project identity
  local Scientific Objects
  Math computation
  Notebook access to Project results
  Writer draft import from Project results

Existing app backends
  remain untouched while current consumers still need them
```

No `Platform Core` API is required or implemented for this milestone.

## Server rule for later

Only add shared server infrastructure after a concrete requirement appears, such as:

- sign-in across devices;
- cloud sync;
- collaboration;
- public sharing;
- durable server-side publication storage;
- search across synced projects.

When that happens, the smallest useful server should mirror the existing Project / Scientific Object contract instead of replacing the local-first model.

A possible future boundary may own:

```text
identity / permissions
projects
scientific object metadata
revisions
references
artifacts
sync/share/search metadata
```

It should still **not** become the default mathematics, notebook Python, simulation or visualization compute server.

## Mathematics-Frontend

Current direction:

- normal studio computation stays local whenever practical;
- active-Project Save writes a Scientific Object to the shared browser store;
- old backend-dependent paths can remain as fallbacks while they still have consumers.

Do not build a new server-compute dependency merely to standardize architecture.

## Notebook

Current backend includes Django plus PostgreSQL/Redis-oriented queued execution infrastructure.

For this milestone:

- do not expand the queue/worker system;
- Project results are read locally;
- existing server paths remain only for current product behavior.

Future simplification can move ordinary notebook execution toward JupyterLite/Pyodide/Web Workers if real workflows justify it. Remove server execution infrastructure only after every required consumer has another path.

## Writer

Current backend contains Writer-specific persistence plus a large duplicated `backend/laboratory` solver package.

For this milestone:

- no new solver logic belongs in Writer;
- local Math results can already start a Writer draft through the Project flow;
- keep existing backend routes that current Writer functionality still needs.

Later deletion gate for duplicated solver code:

- no active Writer frontend path calls duplicated laboratory endpoints;
- Project-result import covers the required scientific-result workflow;
- any remaining Writer backend responsibility is genuinely publication/document specific.

## Problem-library / Science Hub

Current Django `library` backend remains unchanged for legacy Problem Library pages.

Science Hub ecosystem work is browser-local in this milestone:

- local Projects in browser storage;
- local Scientific Objects in IndexedDB;
- ecosystem navigation carrying active Project context.

Do not add a new `platform_core` Django app until sync/share/auth is an actual product requirement.

## Cost rule

No architecture change may make first-party CPU/GPU execution a mandatory cost for ordinary user workflows without an explicit architecture decision. The ecosystem must remain useful with minimal shared infrastructure.
