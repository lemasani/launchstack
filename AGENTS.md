# Agent Guidelines for react-starter-template

This document provides essential information for AI coding agents working in this repository.

## Project Overview

This is a **monorepo** containing:
1. **Root template**: A React 19 + Vite + TypeScript starter template with shadcn/ui (base-lyra style) and Tailwind CSS v4
2. **CLI package** (`packages/create-react-starter`): A CLI tool for scaffolding React projects with optional features

**Tech Stack**: React 19.2, TypeScript 5.9, Vite 7.x, Base UI, Tailwind CSS v4, pnpm workspaces

## Build, Lint & Test Commands

### Root Level (Monorepo)
```bash
# Type check all packages
pnpm typecheck

# Build CLI package
pnpm build

# Build template for distribution
pnpm build:template

# Run CLI in dev mode
pnpm dev
```

### CLI Package (`packages/create-react-starter`)
```bash
# Navigate to CLI package
cd packages/create-react-starter

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Run a single test file
pnpm exec vitest run tests/validate.test.ts

# Run a single test by name pattern
pnpm exec vitest run -t "validateProjectName"

# Type checking
pnpm typecheck

# Build
pnpm build
```

### Template Project (Generated Projects)
```bash
# Start dev server
pnpm dev

# Lint code
pnpm lint

# Type check and build
pnpm build

# Preview production build
pnpm preview
```

## Code Style Guidelines

### Import Organization
1. External packages first (React, third-party libraries)
2. Internal modules with path aliases (`@/...`)
3. Relative imports last
4. Type imports use `type` keyword: `import type { TypeName } from '...'`

**Example:**
```typescript
import * as clack from '@clack/prompts';
import pc from 'picocolors';
import { Button } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { UserPreferences } from './types.js';
```

### File Extensions
- Use `.js` extensions in imports for Node.js packages (CLI package)
- No extensions needed for React/Vite template code
- Example: `import { logger } from './utils/logger.js';`

### Formatting & Style
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for Node.js code, double quotes for React/JSX code
- **Semicolons**: Required (enforced by ESLint)
- **Line length**: No strict limit, but keep reasonable (~100-120 chars)
- **Trailing commas**: Used in multiline structures

### TypeScript
- **Strict mode enabled** with additional strict checks:
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noFallthroughCasesInSwitch: true`
  - `noUncheckedSideEffectImports: true`
- Always use explicit types for function parameters and return values
- Use `interface` for object shapes, `type` for unions/intersections
- Prefer type inference for simple variable assignments
- Path aliases: `@/*` maps to `./src/*`

**Example:**
```typescript
export interface UserPreferences {
  projectName: string;
  router: 'react-router' | 'tanstack-router' | 'none';
  features: {
    tanstackQuery: boolean;
    betterAuth: boolean;
  };
}

export function validateProjectName(name: string): boolean | string {
  // Implementation
}
```

### Naming Conventions
- **Variables/Functions**: camelCase (`getUserPreferences`, `projectPath`)
- **Types/Interfaces**: PascalCase (`UserPreferences`, `PackageManager`)
- **Constants**: camelCase (not SCREAMING_SNAKE_CASE)
- **Files**: kebab-case for utilities (`package-manager.ts`, `install-features.ts`)
- **Components**: PascalCase files and exports (`Button.tsx`, `ComponentExample.tsx`)
- **React Components**: Named exports preferred, default exports acceptable for App/pages

### React Components
- Use function declarations for components: `function Button() { }`
- Destructure props in function signature
- Use `cn()` utility for className merging (from `@/lib/utils`)
- Spread remaining props with `{...props}`

**Example:**
```typescript
function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

### Error Handling
- Use try-catch for async operations
- Log errors with the `logger` utility (CLI code)
- Exit with code 1 on fatal errors
- Use clack prompts for user-facing errors

**Example:**
```typescript
try {
  await scaffoldProject(projectPath, preferences);
} catch (error) {
  logger.error('Failed to scaffold project');
  console.error(error);
  process.exit(1);
}
```

### Logging (CLI Package Only)
Use the `logger` utility from `src/utils/logger.ts`:
```typescript
logger.info('Using package manager: pnpm');
logger.success('Project created successfully');
logger.error('Failed to install dependencies');
logger.warn('Better Auth requires a router');
logger.break(); // Empty line
```

For spinners:
```typescript
const spinner = createSpinner('Installing dependencies...');
spinner.start();
// Do work
spinner.succeed('Dependencies installed');
```

### Comments & Documentation
- Use JSDoc for exported functions/utilities
- Single-line comments for complex logic
- No obvious comments ("incrementing i")
- Comment the "why", not the "what"

**Example:**
```typescript
/**
 * Validates a project name against npm package naming rules
 * @param name - The project name to validate
 * @returns true if valid, or an error message string
 */
export function validateProjectName(name: string): boolean | string {
  // Implementation
}
```

## Testing Guidelines

- **Framework**: Vitest with Node.js environment
- **Globals**: Enabled (no need to import `describe`, `it`, `expect`)
- **File naming**: `*.test.ts` in `tests/` directory
- Use descriptive test names: `'should reject names starting with dots'`
- Group related tests with `describe` blocks
- Test both success and failure cases

## ESLint Configuration

- Uses **flat config** format (ESLint 9.x)
- Extends: `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`
- Target files: `**/*.{ts,tsx}`
- Ignores: `dist/` directories
- ECMAScript version: 2020
- Environment: Browser globals

## Key Project Patterns

### Component Variants (shadcn/ui style)
Use `class-variance-authority` (cva) for component variants:
```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", outline: "..." },
      size: { default: "...", sm: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);
```

### CLI Structure
- Commands: Use `commander` for argument parsing
- Prompts: Use `@clack/prompts` for interactive UI
- Process execution: Use `execa` for running commands
- File operations: Use `fs-extra` for enhanced file system methods
- Colored output: Use `picocolors` for terminal colors

## Important Notes

- **Node version**: Requires >=18.0.0
- **Package manager**: pnpm (with workspaces)
- **Module system**: ESM only (`"type": "module"`)
- **No Prettier**: Formatting handled by editor/ESLint only
- **Path aliases**: Always use `@/` for src imports in template code
- **Tailwind v4**: Uses `@tailwindcss/vite` plugin (newer syntax)

## Common Tasks

### Adding a new shadcn/ui component
Components are already included. Customize in `src/components/ui/`.

### Adding a new CLI installer
1. Create file in `packages/create-react-starter/src/installers/`
2. Export an installer function matching the `Installer` type
3. Register in the installers map

### Running the CLI locally
```bash
pnpm dev
# In another terminal:
node packages/create-react-starter/dist/index.js my-app
```

## References

- shadcn/ui docs: https://ui.shadcn.com
- Base UI docs: https://base-ui.com
- Vite docs: https://vite.dev
- Vitest docs: https://vitest.dev
