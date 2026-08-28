# Deployment Topology — Local-first Ecosystem

## Preferred production topology

For the local-first ecosystem, all first-party app surfaces should preferably appear under **one browser origin**:

```text
https://science.example.com/             Science Hub
https://science.example.com/math/        Mathematics
https://science.example.com/notebook/    Notebook
https://science.example.com/writer/      Writer
```

The applications may remain separate repositories and separate build/deploy units. A lightweight edge/reverse-proxy layer can route path prefixes to each app.

No shared backend is required by the current milestone.

## Why one origin matters

Browser local storage systems are origin-scoped. Separate subdomains such as:

```text
math.example.com
notebook.example.com
writer.example.com
```

cannot directly share IndexedDB, OPFS, LocalStorage, SharedWorkers, or ordinary Service Worker state.

That would force local scientific objects to cross app boundaries through a server or a deliberate browser transfer mechanism. This conflicts with the low-cost/local-first product thesis if introduced prematurely.

A same-origin path topology lets all apps share one local Project/Object store while computation stays on the user's device.

## Development topology

During development, apps may run on separate localhost ports. Cross-app links can be overridden with environment variables:

```text
NEXT_PUBLIC_SCIENCE_URL
NEXT_PUBLIC_MATH_URL
NEXT_PUBLIC_NOTEBOOK_URL
NEXT_PUBLIC_WRITER_URL
NEXT_PUBLIC_ECOSYSTEM_NAME
```

Without overrides, ecosystem navigation assumes the preferred same-origin paths `/math`, `/notebook`, and `/writer`.

When separate origins are used in development, shared local object storage will not be visible across apps. Use a local gateway/reverse proxy only when true end-to-end cross-app local-storage testing is needed.

## Next.js deployment note

Path-based production deployment still needs a small deployment pass. Each app build must be aware of its public path prefix (`basePath`/asset routing or an equivalent edge rewrite strategy), and raw internal URLs must respect that prefix.

This is **not yet implemented as a mandatory build configuration**. Do it when the hosting topology is selected; do not rewrite working product routes merely for a hypothetical deployment.

## Future server option

If cross-device features later become real requirements, a small shared service may provide:

- account/authentication;
- optional cloud sync;
- Project/Object metadata replication;
- public share records;
- search metadata;
- collaboration later.

Anonymous/local Projects must remain usable without this service, and ordinary Math/Notebook computation should not be moved there by default.

## Fallback topology

If same-origin deployment is impractical, separate origins are allowed, but cross-app local object transfer must then use one of:

1. a future optional sync service;
2. explicit portable Project/Object bundles;
3. a deliberately designed browser bridge with documented security constraints.

Do not silently assume LocalStorage/IndexedDB is shared across subdomains.
