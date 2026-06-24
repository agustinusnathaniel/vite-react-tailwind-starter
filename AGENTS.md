# AI Agent Guidance

This is a **starter template** for React applications, not a full application.
Everything here is intentionally minimal example code meant to be customized.

## Core Values

- **Type safety over convenience.** TypeScript strict mode, no `any`, Zod at every
  external boundary. Don't reach for escape hatches.
- **Templates teach by example.** Code in this template must stay instructive.
  Resist project-specific logic that doesn't generalize.
- **Tools do the work.** Biome (via Ultracite) handles formatting and linting.
  Vite+ handles builds and dev servers. Turborepo orchestrates checks.
  Never fight the toolchain — let automation do its job.
- **Preserve the foundation.** This is a starting point for many projects.
  Changes should keep the template general, not pin it to one use case.

## Hard Invariants

If you violate any of these, the template's guarantees break.

- **Routes are files in `src/routes/`.** The route tree at `src/routeTree.gen.ts`
  is auto-generated — never edit it.
- **Exports are positional.** Page components (`src/lib/pages/<name>/index.tsx`)
  use `export default`. Everything else uses named exports.
  Route files in `src/routes/` import from their corresponding page component.
- **Filenames are kebab-case.** Everywhere, except route files.
- **Utilities require tests.** Every file in `src/lib/utils/` must have a
  colocated `.test.ts` alongside it.
- **No barrel files.** No `index.ts` that re-exports from siblings.
- **CSP source of truth** is `src/lib/constants/security-headers.ts`. Platform
  configs (vercel.json, netlify.toml, wrangler.toml) must mirror it.

## Verification

Before considering work done:

```
vp check    # format + lint + typecheck
vp test     # run all tests
vp build    # production build — must pass
```

Deviations from these invariants require explicit justification.
When in doubt, check `SPEC.md` — it is the authoritative system specification.
