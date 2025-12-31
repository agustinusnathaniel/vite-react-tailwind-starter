# AI Agent Guidance

This document provides a mental model of the system for AI IDE agents (Cursor, Antigravity, Zed, Windsurf) to reason accurately about structure, intent, and safe changes.

## Mental Model

This is a **starter template** for React applications. It provides:
- A minimal but complete application structure
- Type-safe routing and environment configuration
- Development tooling and quality checks
- A foundation to build upon, not a full application

**Key Insight**: The codebase is intentionally simple. Most files are examples or scaffolding. Changes should preserve the template nature while allowing customization.

## Module Responsibility Map

### Core Application Files (Rarely Modify)

| File | Responsibility | Modification Risk |
|------|---------------|-------------------|
| `src/main.tsx` | Application entry point, router setup | **HIGH** - Changes affect entire app initialization |
| `src/routes/__root.tsx` | Root route with layout and meta tags | **MEDIUM** - Meta tags and devtools setup |
| `vite.config.ts` | Build configuration, plugins | **HIGH** - Affects build output and dev experience |
| `tsconfig.json` | TypeScript compiler configuration | **HIGH** - Affects type checking behavior |
| `biome.json` | Linting and formatting rules | **MEDIUM** - Style enforcement |

### Route Files (Modify to Add Routes)

| Pattern | Responsibility | Safe Changes |
|---------|---------------|--------------|
| `src/routes/*.tsx` | Route definitions | **SAFE** - Add new routes, modify route config |
| `src/routeTree.gen.ts` | Auto-generated route tree | **NEVER EDIT** - Regenerated automatically |

### Page Components (Modify Freely)

| Location | Responsibility | Safe Changes |
|----------|---------------|--------------|
| `src/lib/pages/*/index.tsx` | Page-level components | **SAFE** - Full page implementations |
| `src/lib/pages/*/components/*.tsx` | Page-specific components | **SAFE** - Component logic and UI |

### Layout System (Modify with Caution)

| File | Responsibility | Modification Risk |
|------|---------------|-------------------|
| `src/lib/layout/index.tsx` | Main layout wrapper | **MEDIUM** - Affects all pages |
| `src/lib/layout/components/header.tsx` | Header component | **LOW** - UI only |
| `src/lib/layout/components/footer.tsx` | Footer component | **LOW** - UI only |

### Shared Components (Modify with Caution)

| File | Responsibility | Modification Risk |
|------|---------------|-------------------|
| `src/lib/components/theme-provider.tsx` | Theme context and logic | **HIGH** - Core theme functionality |
| `src/lib/components/theme-toggle.tsx` | Theme toggle UI | **LOW** - UI component |

### Services and Utilities (Modify Freely)

| Location | Responsibility | Safe Changes |
|----------|---------------|--------------|
| `src/lib/services/constants.ts` | Shared constants (QueryClient) | **SAFE** - Configuration values |
| `src/lib/utils/*.ts` | Pure utility functions | **SAFE** - Must include tests |

### Configuration Files (Modify with Understanding)

| File | Purpose | Modification Risk |
|------|---------|-------------------|
| `env.ts` | Environment variable schema | **MEDIUM** - Affects build-time validation |
| `package.json` | Dependencies and scripts | **MEDIUM** - Dependency changes need testing |
| `vitest.config.ts` | Test configuration | **LOW** - Test setup only |
| `commitlint.config.ts` | Commit message rules | **LOW** - Style only |

## Safe vs. Risky Areas

### ✅ Safe to Modify

1. **Page Components** (`src/lib/pages/`)
   - Add new pages
   - Modify page content and structure
   - Add page-specific components

2. **Route Definitions** (`src/routes/`)
   - Add new route files
   - Modify route configuration
   - Add route loaders/actions

3. **Utility Functions** (`src/lib/utils/`)
   - Add new utilities
   - Modify existing utilities
   - **Requirement**: Must include tests

4. **Layout Components** (Header/Footer)
   - Modify UI and styling
   - Add navigation elements
   - Change layout structure (with caution)

5. **Styles** (`src/lib/styles/globals.css`)
   - Add custom CSS
   - Modify Tailwind base styles
   - Add CSS custom properties

### ⚠️ Modify with Caution

1. **Theme System** (`src/lib/components/theme-provider.tsx`)
   - Changes affect theme behavior across entire app
   - Test light/dark/system modes after changes
   - Ensure localStorage persistence works

2. **Root Route** (`src/routes/__root.tsx`)
   - Meta tags affect SEO and social sharing
   - DevTools setup affects development experience
   - Layout wrapper affects all routes

3. **Main Entry Point** (`src/main.tsx`)
   - Router configuration affects navigation
   - QueryClient setup affects data fetching
   - Provider order matters

4. **Build Configuration** (`vite.config.ts`)
   - Plugin changes affect build output
   - Environment validation affects development
   - Test all build modes after changes

### 🚫 Avoid Modifying

1. **Generated Files**
   - `src/routeTree.gen.ts` - Auto-generated, will be overwritten
   - `dist/` - Build output, regenerated on build
   - `*.tsbuildinfo` - TypeScript incremental build cache

2. **Git Hooks** (`.husky/`)
   - Pre-commit, commit-msg, pre-push hooks
   - Only modify if changing workflow requirements

3. **Package Manager Lock Files**
   - `pnpm-lock.yaml` - Managed by pnpm
   - Only commit after intentional dependency changes

## How to Reason About Refactors

### Adding a New Feature

1. **Identify the appropriate module**:
   - Page feature → `src/lib/pages/`
   - Reusable component → `src/lib/components/`
   - Utility → `src/lib/utils/` (with tests)
   - Route → `src/routes/`

2. **Check dependencies**:
   - Does it need new npm packages? Update `package.json`
   - Does it need environment variables? Update `env.ts`
   - Does it need new routes? Create route file

3. **Follow conventions**:
   - File naming: kebab-case
   - Exports: named (default only for pages/routes)
   - Types: TypeScript interfaces
   - Tests: For utilities, complex components

4. **Verify invariants**:
   - TypeScript compiles without errors
   - Biome checks pass
   - Tests pass
   - Route tree regenerates correctly

### Refactoring Existing Code

1. **Understand the change scope**:
   - Component refactor → Check all usages
   - Utility refactor → Update tests
   - Route refactor → Verify navigation still works
   - Config refactor → Test build and dev server

2. **Preserve public APIs**:
   - Component props should remain compatible
   - Utility function signatures should not break
   - Route paths should not change unexpectedly

3. **Maintain type safety**:
   - TypeScript errors indicate breaking changes
   - Update types when changing interfaces
   - Use type imports for type-only dependencies

### Removing Code

1. **Check for usages**:
   ```bash
   pnpm knip  # Finds unused code
   ```

2. **Verify no dependencies**:
   - Search codebase for imports
   - Check route references
   - Verify no test dependencies

3. **Clean up related files**:
   - Remove test files for deleted code
   - Remove route files if removing pages
   - Update exports if removing from index files

## Adding Features Without Breaking Invariants

### Adding a New Route

**Steps:**
1. Create route file: `src/routes/new-page.tsx`
2. Create page component: `src/lib/pages/new-page/index.tsx`
3. Route tree auto-generates on dev server start
4. **Invariant preserved**: Route tree structure

**Example:**
```typescript
// src/routes/new-page.tsx
import { createFileRoute } from '@tanstack/react-router';
import NewPage from '@/lib/pages/new-page';

export const Route = createFileRoute('/new-page')({
  component: NewPage,
});
```

### Adding Environment Variables

**Steps:**
1. Add schema to `env.ts`:
   ```typescript
   VITE_NEW_VAR: z.string().optional(),
   ```
2. Type definitions auto-generate in `src/env.d.ts`
3. Use in code: `import.meta.env.VITE_NEW_VAR`
4. **Invariant preserved**: Type safety and validation

### Adding a Utility Function

**Steps:**
1. Create function in `src/lib/utils/`
2. Export as named export
3. **Must create test file**: `src/lib/utils/function-name.test.ts`
4. **Invariant preserved**: Test coverage requirement

### Adding a Component

**Steps:**
1. Create component file: `src/lib/components/component-name.tsx`
2. Use named export
3. Type props with TypeScript
4. Follow kebab-case naming
5. **Invariant preserved**: Component conventions

## Common Pitfalls for Automated Edits

### ❌ Don't Do This

1. **Edit generated files**:
   ```typescript
   // DON'T edit routeTree.gen.ts manually
   ```

2. **Change export patterns inconsistently**:
   ```typescript
   // DON'T mix default and named exports randomly
   export default Component;  // Only for pages/routes
   export { Component };      // For everything else
   ```

3. **Skip tests for utilities**:
   ```typescript
   // DON'T add utils without tests
   // Test coverage is enforced
   ```

4. **Modify build config without testing**:
   ```typescript
   // DON'T change vite.config.ts without verifying build works
   ```

5. **Break TypeScript strict mode**:
   ```typescript
   // DON'T use 'any' or disable strict checks
   const value: any = ...;  // ❌
   ```

### ✅ Do This Instead

1. **Let tools generate files**:
   - Route tree auto-generates
   - Type definitions auto-generate
   - Build output auto-generates

2. **Follow export conventions**:
   ```typescript
   // Pages/routes: default export
   export default HomePage;
   
   // Everything else: named export
   export const UtilityFunction = () => { ... };
   ```

3. **Include tests for utilities**:
   ```typescript
   // src/lib/utils/example.ts
   export const example = () => { ... };
   
   // src/lib/utils/example.test.ts
   import { describe, test, expect } from 'vitest';
   import { example } from './example';
   // ... tests
   ```

4. **Test after config changes**:
   ```bash
   pnpm build    # Verify build works
   pnpm dev      # Verify dev server works
   ```

5. **Use proper types**:
   ```typescript
   // Use specific types
   const value: string = ...;
   // Or infer types
   const value = ...;  // TypeScript infers
   ```

## IDE-Specific Guidance

### Cursor

**Recommended Settings:**
- Enable Biome extension for formatting
- Use TypeScript strict mode checking
- Enable TanStack Router file-based routing support

**Suggested Prompts:**
- "Add a new route for `/about` page following the existing pattern"
- "Create a utility function with tests for [functionality]"
- "Add an environment variable `VITE_API_URL` with validation"

**Navigation Hints:**
- Route files are in `src/routes/`
- Page components are in `src/lib/pages/`
- Generated files are in `src/routeTree.gen.ts` (read-only)

### Antigravity

**Recommended Workflow:**
1. Use codebase search to find similar patterns before adding features
2. Check `SPEC.md` for system invariants
3. Verify changes with `pnpm check:turbo` before committing

**Common Tasks:**
- Adding routes: Follow pattern in `src/routes/index.tsx`
- Adding components: Follow pattern in `src/lib/components/theme-toggle.tsx`
- Adding utilities: Follow pattern in `src/lib/utils/sample.ts` with tests

### Zed

**Recommended Extensions:**
- TypeScript language server
- Biome formatter
- TanStack Router file watcher

**File Organization:**
- Use file tree to navigate by module (routes, pages, components)
- Generated files are clearly marked (`.gen.ts`)
- Config files are at root level

### Windsurf

**Context Awareness:**
- Understand this is a starter template, not a full application
- Preserve template structure when making changes
- Follow existing patterns rather than introducing new abstractions

**Safe Refactoring:**
- Component extraction: Move to `src/lib/components/`
- Utility extraction: Move to `src/lib/utils/` with tests
- Route extraction: Create new route file in `src/routes/`

## Testing Strategy for Agents

When making changes, verify:

1. **Type Safety**:
   ```bash
   pnpm type:check
   ```

2. **Code Quality**:
   ```bash
   pnpm biome:check
   ```

3. **Tests Pass**:
   ```bash
   pnpm test
   ```

4. **Build Works**:
   ```bash
   pnpm build
   ```

5. **Dev Server Starts**:
   ```bash
   pnpm dev
   # Verify route tree generates
   # Verify no console errors
   ```

## File Modification Priority

When asked to modify the codebase:

1. **High Priority** (User explicitly requested):
   - User-specified files
   - Feature additions
   - Bug fixes

2. **Medium Priority** (Related changes):
   - Update types when adding features
   - Update tests when modifying utilities
   - Update routes when adding pages

3. **Low Priority** (Avoid unless necessary):
   - Build configuration
   - TypeScript configuration
   - Linting rules
   - Git hooks

## Quick Reference: File Patterns

| Pattern | Location | Export | Tests Required |
|---------|----------|--------|----------------|
| Route | `src/routes/*.tsx` | Default (`Route`) | No |
| Page | `src/lib/pages/*/index.tsx` | Default | No |
| Component | `src/lib/components/*.tsx` | Named | If complex logic |
| Utility | `src/lib/utils/*.ts` | Named | **Yes** |
| Service | `src/lib/services/*.ts` | Named | No |
| Layout | `src/lib/layout/**/*.tsx` | Named | No |

## Summary

**Key Principles for AI Agents:**

1. **Preserve template nature**: Keep code simple and example-focused
2. **Follow conventions**: File naming, exports, types
3. **Maintain invariants**: Type safety, test coverage, route structure
4. **Test changes**: Run checks before and after modifications
5. **Document assumptions**: Mark inferred behavior vs. explicit code

**When in doubt:**
- Check `SPEC.md` for system behavior
- Check `CONTRIBUTING.md` for conventions
- Look at existing code for patterns
- Run `pnpm check:turbo` to verify changes

