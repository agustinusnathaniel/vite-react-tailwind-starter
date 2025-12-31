# Contributing Guide

This document outlines the contribution philosophy, conventions, and processes for this repository.

## Contribution Philosophy

This template prioritizes:
- **Simplicity**: Keep the starter minimal and focused
- **Type safety**: Maintain strict TypeScript configuration
- **Code quality**: Enforce consistent formatting and linting
- **Developer experience**: Provide excellent tooling and clear patterns

Contributions should align with these principles. When in doubt, prefer explicit, type-safe solutions over clever abstractions.

## Branching Strategy

This repository uses a simple branching model:
- `main`: Production-ready code
- Feature branches: `feature/description` or `fix/description`
- No long-lived development branches

### Branch Naming

Use kebab-case with a prefix:
- `feature/add-new-component`
- `fix/routing-issue`
- `docs/update-readme`

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitlint.

### Commit Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, config, etc.)
- `perf`: Performance improvements

### Scopes

Valid scopes (enforced by Commitlint):
- `components`
- `layout`
- `routes`
- `styles`
- `utils`
- `hooks`

### Examples

```bash
feat(components): add theme toggle component
fix(routes): resolve 404 page routing issue
docs(readme): update installation instructions
chore(deps): update vite to latest version
```

### Commit Message Validation

Commit messages are validated via Husky hook (`.husky/commit-msg`). Invalid messages will be rejected.

## Code Style and Formatting

### Biome Configuration

This project uses [Biome](https://biomejs.dev/) for linting and formatting (replaces ESLint and Prettier).

**Key Rules:**
- Single quotes for strings
- 2-space indentation
- Kebab-case for filenames (except route files)
- No default exports (except route files and page `index.tsx`)
- No barrel files (`index.ts` re-exports)
- No console statements (except `console.error` and `console.info`)

### Auto-formatting

Biome automatically formats code on commit via lint-staged. Manual formatting:

```bash
pnpm biome:fix
```

### File Naming

- **Components**: `kebab-case.tsx` (e.g., `theme-toggle.tsx`)
- **Routes**: Follow TanStack Router conventions (e.g., `__root.tsx`, `index.tsx`)
- **Pages**: `kebab-case/index.tsx` (e.g., `home/index.tsx`)
- **Utils**: `kebab-case.ts` (e.g., `sample.ts`)

### Import Organization

Biome automatically organizes imports with this grouping:
1. External packages (URL, Node, npm packages)
2. Blank line
3. Path aliases (`@/*`)
4. Blank line
5. Relative paths

### TypeScript Conventions

- **Strict mode**: Enabled (`strict: true`, `strictNullChecks: true`)
- **No unused variables/parameters**: Enforced at compile time
- **Explicit return types**: Not required but recommended for public APIs
- **Type imports**: Use `import type` for type-only imports when appropriate

### React Patterns

- **Functional components**: Use function declarations or arrow functions
- **Hooks**: Must be called at top level (enforced by linter)
- **Props**: Use TypeScript interfaces or types, not PropTypes
- **Default exports**: Only for route files and page `index.tsx` files

## Testing Expectations

### Test Coverage

- **Utils**: Should have comprehensive test coverage
- **Components**: Test user interactions and edge cases
- **Pages**: Test rendering and routing behavior

### Test Structure

Tests use Vitest and React Testing Library:

```typescript
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ComponentName', () => {
  test('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
pnpm test              # Run once
pnpm test:ui           # Interactive UI
pnpm test:coverage     # With coverage report
```

### Test File Location

- Co-locate with source: `utils/sample.test.ts` next to `utils/sample.ts`
- Or in `__tests__/` directories if preferred

## Code Review Process

### Before Submitting

1. **Run checks locally**:
   ```bash
   pnpm check:turbo
   ```

2. **Ensure all tests pass**:
   ```bash
   pnpm test
   ```

3. **Verify type checking**:
   ```bash
   pnpm type:check
   ```

4. **Check for unused code**:
   ```bash
   pnpm knip
   ```

### Pull Request Guidelines

- **Title**: Use conventional commit format
- **Description**: Explain what and why, not just how
- **Size**: Prefer smaller, focused PRs
- **Breaking changes**: Clearly document in description
- **Tests**: Include tests for new features
- **Documentation**: Update docs if behavior changes

### Review Checklist

Reviewers should verify:
- [ ] Code follows style guidelines
- [ ] TypeScript types are correct
- [ ] Tests are included and passing
- [ ] No console errors or warnings
- [ ] Documentation is updated if needed
- [ ] No breaking changes (or clearly documented)

## Pre-commit Hooks

Husky runs the following hooks automatically:

### Pre-commit (`.husky/pre-commit`)

Runs `lint-staged`, which executes:
- Biome formatting and linting on staged files

### Commit-msg (`.husky/commit-msg`)

Validates commit message format using Commitlint.

### Pre-push (`.husky/pre-push`)

Runs `pnpm check:turbo`, which executes:
- Biome check
- TypeScript type checking
- Test suite

**Note**: These hooks can be bypassed with `--no-verify`, but this is discouraged.

## Adding New Features

### Component Addition

1. Create component in `src/lib/components/`
2. Follow naming convention: `kebab-case.tsx`
3. Export as named export (not default)
4. Add tests if component has logic
5. Document props with TypeScript types

### Route Addition

1. Create route file in `src/routes/`
2. Follow TanStack Router file-based routing conventions
3. Create corresponding page component in `src/lib/pages/`
4. Route tree auto-generates on dev server start

### Utility Function Addition

1. Create function in `src/lib/utils/`
2. Export as named export
3. **Must include tests** (coverage enforced)
4. Keep functions pure when possible

### Style Addition

1. Prefer Tailwind utility classes
2. For custom styles, add to `src/lib/styles/globals.css`
3. Use CSS custom properties for theme values
4. Follow Tailwind v4 conventions

## Dependency Management

### Adding Dependencies

1. Use `pnpm add <package>` for production dependencies
2. Use `pnpm add -D <package>` for dev dependencies
3. Update `package.json` directly if needed, then run `pnpm install`

### Updating Dependencies

```bash
pnpm up-interactive    # Interactive update
pnpm up-latest         # Update to latest versions
```

### Dependency Review

- Prefer well-maintained packages
- Check bundle size impact
- Verify TypeScript support
- Review security advisories

## Troubleshooting

### Hooks Not Running

If Husky hooks aren't executing:

```bash
pnpm prepare  # Reinstall hooks
```

### Type Errors After Changes

```bash
pnpm type:check  # Verify types
# Delete tsconfig.tsbuildinfo if issues persist
```

### Biome Errors

```bash
pnpm biome:fix  # Auto-fix issues
```

### Route Tree Not Updating

Restart the dev server. The route tree regenerates on server start.

## Questions?

- Check existing documentation (README.md, SPEC.md, AGENTS.md)
- Review similar code in the repository
- Open an issue for clarification

