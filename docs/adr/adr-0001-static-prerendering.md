---
title: "ADR-0001: Static Prerendering with Host-Native 404 Handling"
status: "Proposed"
date: "2026-08-19"
authors: "Repository maintainers"
tags: ["architecture", "tanstack-start", "static-prerendering"]
supersedes: ""
superseded_by: ""
---

# ADR-0001: Static Prerendering with Host-Native 404 Handling

## Status

Proposed

## Context

This starter (`vite-react-tailwind-starter`) uses TanStack Start with static prerendering. Only finite, statically discoverable routes can be emitted at build time. A wildcard rewrite from unknown paths to `/index.html` serves the home document for paths that were not prerendered, which can produce a client/server route mismatch during hydration.

The PWA plugin remains disabled by default, but the application links a static `manifest.webmanifest`.

## Decision

Keep TanStack Start full prerendering with `spa.enabled: false`. Deploy a script-free `public/404.html` and remove the Vercel and Netlify wildcard SPA rewrites. Hosts will return the static 404 document for unknown direct paths.

Keep the existing client-side `defaultNotFoundComponent` for in-app navigation. Add a static `manifest.webmanifest` without enabling the service worker. The existing CSP (`font-src 'self'`) remains unchanged.

## Consequences

### Positive

- **POS-001**: Known routes remain statically prerendered and filesystem-served.
- **POS-002**: Unknown direct paths return HTTP 404 instead of home HTML.
- **POS-003**: The static 404 document contains no hydration scripts, eliminating the current shell mismatch path.
- **POS-004**: The manifest link resolves without enabling PWA runtime behavior.

### Negative

- **NEG-001**: Unknown direct paths do not boot the React application.
- **NEG-002**: The static 404 presentation is maintained separately from the React `Page404` component.
- **NEG-003**: Parameterized routes require explicit prerender paths before deployment.

## Assumptions

- `[verified]` TanStack Start supports static prerendering and automatic discovery of static route files.
- `[verified]` The current build writes deployable static files to `dist/client`.
- `[verified]` Netlify automatically uses a root `404.html` for unresolved static paths.
- `[inferred]` Vercel and Cloudflare Pages will use the root `404.html` as their static custom 404, consistent with their filesystem-based static hosting behavior; deploy smoke tests must confirm the status code.

## Alternatives Considered

### SPA wildcard fallback

Rejected because it serves `/index.html` for unknown paths and reproduces the hydration mismatch.

### TanStack catch-all route

Rejected as the primary direct-request solution because a dynamic catch-all cannot generate arbitrary static paths and still depends on runtime hydration.

### Generic host 404 without a custom document

Rejected because the existing starter already provides a branded not-found experience and a static custom 404 is low-cost.

## Date

2026-08-19
