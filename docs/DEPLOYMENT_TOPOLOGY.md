# Deployment Topology — Local-first Ecosystem

## Preferred production topology

For the local-first ecosystem, all first-party app surfaces should preferably appear under **one browser origin**:

```text
https://science.example.com/             Science Hub
https://science.example.com/math/        Mathematics
https://science.example.com/notebook/    Notebook
https://science.example.com/writer/      Writer
https://science.example.com/api/platform Platform Core (optional sync/account layer)
```

The applications may remain separate repositories and separate build/deploy units. A lightweight edge/reverse-proxy layer can route path prefixes to each app.

## Why one origin matters

Browser local storage systems are origin-scoped. Separate subdomains such as:

```text
math.example.com
notebook.example.com
writer.example.com
```

cannot directly share IndexedDB, OPFS, LocalStorage, SharedWorkers, or ordinary Service Worker state.

That would force local scientific objects to cross app boundaries through a server or complicated browser-storage bridging. This conflicts with the low-cost/local-first product thesis.

A same-origin path topology lets all apps share one local Project/Object store while computation stays on the user's device.

## Development topology

During development, apps may run on separate localhost ports. Cross-app links are configured with environment variables:

```text
NEXT_PUBLIC_SCIENCE_URL
NEXT_PUBLIC_MATH_URL
NEXT_PUBLIC_NOTEBOOK_URL
NEXT_PUBLIC_WRITER_URL
NEXT_PUBLIC_PLATFORM_API_URL
NEXT_PUBLIC_ECOSYSTEM_NAME
```

When separate origins are used in development, shared local object storage will not be visible across apps. Use a local gateway/reverse proxy for true end-to-end local-first integration testing.

## Next.js deployment note

If an app is served below a path prefix, its production build must be aware of the prefix (`basePath`/asset routing or an equivalent edge rewrite strategy). Do not hard-code repository-specific domains inside product components.

## Backend cost model

Platform Core remains small because it does not execute normal mathematics/notebook workloads. It may eventually provide:

- account/authentication;
- optional cloud sync;
- project/object metadata replication;
- public share records;
- search metadata;
- collaboration later.

Anonymous/local projects must remain usable without this service.

## Fallback topology

If same-origin deployment is impractical, separate origins are allowed, but cross-app local object transfer must then use one of:

1. optional Platform Core sync;
2. explicit portable project/object bundles;
3. a deliberately designed browser bridge with documented security constraints.

Do not silently assume LocalStorage/IndexedDB is shared across subdomains.
