# Scientific Object Specification v1

This is the canonical ecosystem data contract. App repositories may mirror the TypeScript interface during migration, but semantic ownership remains here.

## Identity hierarchy

```text
User / Organization
  → Project
      → Scientific Object
          → Revision
              → Artifacts
          → References
```

## Core object

A Scientific Object is a typed, versioned piece of research state. It may represent a calculation, model, simulation, dataset, visualization, finding, notebook, document, problem or future domain object.

Required conceptual fields:

```text
id
project_id
kind
schema_version
title
source_app
current_revision
metadata
created_at
updated_at
```

The object identity remains stable as content changes. Content changes create revisions.

## Revision

A revision contains the canonical payload at one point in time.

```text
object_id
revision_number
payload
provenance
content_hash
created_by
created_at
```

`payload` is domain-specific JSON. The core never assumes that all scientific objects are mathematical expressions.

## Provenance

Provenance should support at least:

```text
source_app
engine
engine_version
execution_target
inputs
parameters
assumptions
parent_objects
started_at
finished_at
```

Apps may extend provenance, but should not silently discard these fields when available.

## Artifacts

Large or render-specific outputs are artifacts associated with a revision rather than duplicated into every consumer.

Examples:

- SVG/PNG preview;
- CSV/Arrow data;
- GLB/mesh;
- animation frames or encoded video;
- publication snapshot;
- imported source file.

Metadata records media type, role, size/hash where available and a storage URI.

## References

A consumer never needs to copy a result to use it.

Reference modes:

```text
live    → latest compatible revision
pinned  → explicit revision number
frozen  → immutable snapshot/publication artifact
```

A reference also records the container/source object when possible, allowing dependency and impact analysis.

## Initial object kinds

The set is extensible. Ecosystem-v1 starts with these semantic groups:

```text
problem
solution
equation
model
calculation
simulation
dataset
visualization
scene
notebook
observation
hypothesis
finding
decision
document
publication
```

Domain-specific kinds should be namespaced in payload metadata rather than forcing a new core database table for every studio.

Examples:

```text
kind=calculation, domain=math.integral
kind=calculation, domain=math.ode
kind=simulation, domain=physics.mechanics
kind=scene, domain=physics.field
```

## Scientific Scene v1

A scene is renderer-neutral. It may include:

```text
dimension: 2d | 3d
coordinate_system
layers[]
annotations[]
controls[]
time
camera
source_refs[]
```

Layer examples:

```text
curve
surface
mesh
point-cloud
scalar-field
vector-field
trajectory
region
annotation
```

Renderer-specific configuration belongs under optional adapter metadata and must never be the only representation of scientific meaning.

## Compatibility rule

Every payload carries a schema version. Readers must either:

1. understand that version;
2. migrate it explicitly; or
3. render an honest unsupported-object state.

Silent interpretation changes are prohibited for scientific evidence.

## Export rule

Canonical objects should remain exportable. A future project bundle should include project metadata, objects/revisions, references and portable artifacts so long-lived research is not dependent on a single hosted service.
