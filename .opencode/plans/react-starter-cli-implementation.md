# React Starter Template - Implementation Plan

## 🎯 Project Overview

Create `create-react-starter` - a professional CLI tool for scaffolding React + Vite + TypeScript projects with configurable library integrations, following patterns from industry-standard tools like create-vite and create-t3-app.

**Package Name**: `create-react-starter`  
**Usage**: `npm create react-starter [project-name] [options]`

---

## 📊 Plan Status & Completion Tracking

**Plan Status**: Ready for Implementation  
**Overall Completion**: 0% (0/13 phases complete)

### How to Track Progress

This plan includes completion tracking at multiple levels:
- **Plan Level**: `is_complete` flag in the JSON version indicates overall completion
- **Phase Level**: Each of the 13 phases has an `is_complete` flag
- **Task Level**: Each task within phases has a `completed` flag
- **Validation Level**: Each validation item has a `completed` flag

**For Agents**: Check the JSON plan file (`.opencode/plans/react-starter-cli-plan-json.md`) for the structured completion data. Update completion flags as you progress through the implementation.

---

## 📐 Architecture Decisions

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| **CLI Type** | create-* package | Standard npm initializer pattern (npm create, pnpm create, etc.) |
| **Structure** | Monorepo | Separate CLI and template packages; easier development & testing |
| **Workspace Manager** | pnpm workspaces | Already in use; fast and efficient |
| **Routers** | React Router + TanStack Router | Both as user-selectable options |
| **Form Libraries** | React Hook Form + TanStack Form | Two popular options, both optional |
| **Core Features** | TanStack Query, Better Auth, Axios | All optional, user-selectable |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Always included (current setup) |
| **Linting** | ESLint | Always included with current config |
| **Package Manager** | Auto-detect | Detect from npm_config_user_agent (npm/pnpm/yarn/bun) |
| **Environment Files** | .env.example | Feature-specific variables included |
| **Better Auth Examples** | Full examples | Login, signup, and protected route with working forms |
| **Example Components** | Remove current | Clean slate; add feature-specific examples only |

---

## 📁 Monorepo Structure

```
react-starter-template/
├── packages/
│   ├── create-react-starter/              # Main CLI package (published to npm)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts
│   │   ├── README.md
│   │   ├── .npmignore
│   │   ├── src/
│   │   │   ├── index.ts                   # CLI entry point (#!/usr/bin/env node)
│   │   │   ├── cli/
│   │   │   │   ├── prompts.ts             # @clack/prompts - interactive UI
│   │   │   │   └── args.ts                # commander - CLI argument parsing
│   │   │   ├── installers/
│   │   │   │   ├── index.ts               # Installer orchestration & types
│   │   │   │   ├── react-router.ts        # React Router installer
│   │   │   │   ├── tanstack-router.ts     # TanStack Router installer
│   │   │   │   ├── tanstack-query.ts      # TanStack Query installer
│   │   │   │   ├── better-auth.ts         # Better Auth installer
│   │   │   │   ├── axios.ts               # Axios installer
│   │   │   │   ├── react-hook-form.ts     # React Hook Form installer
│   │   │   │   └── tanstack-form.ts       # TanStack Form installer
│   │   │   ├── helpers/
│   │   │   │   ├── scaffold.ts            # Project scaffolding logic
│   │   │   │   ├── install-deps.ts        # Dependency installation
│   │   │   │   ├── git.ts                 # Git initialization
│   │   │   │   ├── validate.ts            # Input validation
│   │   │   │   ├── modify-files.ts        # File content modification utilities
│   │   │   │   └── env.ts                 # .env file generation
│   │   │   └── utils/
│   │   │       ├── logger.ts              # Pretty console output (colors, spinners)
│   │   │       ├── package-manager.ts     # PM detection & execution
│   │   │       └── constants.ts           # Dependency versions & constants
│   │   ├── dist/                          # Compiled output (gitignored, npm published)
│   │   └── template/
│   │       ├── base/                      # Core template (React+Vite+TS+Tailwind+shadcn)
│   │       │   ├── package.json           # Base dependencies template
│   │       │   ├── _gitignore             # Renamed to .gitignore during copy
│   │       │   ├── _env.example           # Renamed to .env.example during copy
│   │       │   ├── index.html
│   │       │   ├── tsconfig.json
│   │       │   ├── tsconfig.app.json
│   │       │   ├── tsconfig.node.json
│   │       │   ├── vite.config.ts
│   │       │   ├── eslint.config.js
│   │       │   ├── components.json        # shadcn configuration
│   │       │   ├── public/
│   │       │   │   └── vite.svg
│   │       │   └── src/
│   │       │       ├── main.tsx           # React entry point
│   │       │       ├── App.tsx            # Minimal base app (router added by installer)
│   │       │       ├── index.css          # Tailwind directives
│   │       │       ├── lib/
│   │       │       │   └── utils.ts       # cn() utility
│   │       │       └── components/
│   │       │           └── ui/            # shadcn base components
│   │       │               ├── button.tsx
│   │       │               ├── card.tsx
│   │       │               ├── input.tsx
│   │       │               └── label.tsx
│   │       └── extras/                    # Conditional files (copied based on selection)
│   │           ├── config/
│   │           │   ├── auth/
│   │           │   │   ├── auth.ts                    # Better Auth server config
│   │           │   │   ├── auth-client.ts             # Better Auth client instance
│   │           │   │   └── middleware.ts              # Auth middleware
│   │           │   ├── query/
│   │           │   │   └── query-provider.tsx         # QueryClient + Provider setup
│   │           │   └── http/
│   │           │       └── axios-instance.ts          # Axios instance with interceptors
│   │           ├── env/
│   │           │   ├── base.env                       # Base environment variables
│   │           │   ├── auth.env                       # Better Auth env additions
│   │           │   └── axios.env                      # API base URL additions
│   │           ├── routers/
│   │           │   ├── react-router/
│   │           │   │   ├── App.tsx                    # App with BrowserRouter
│   │           │   │   ├── router.tsx                 # Route configuration
│   │           │   │   └── routes/
│   │           │   │       ├── root.tsx               # Layout component
│   │           │   │       ├── index.tsx              # Home page
│   │           │   │       ├── login.tsx              # Login page (with auth)
│   │           │   │       ├── signup.tsx             # Signup page (with auth)
│   │           │   │       └── dashboard.tsx          # Protected dashboard (with auth)
│   │           │   └── tanstack-router/
│   │           │       ├── App.tsx                    # App with RouterProvider
│   │           │       ├── router.ts                  # Router instance
│   │           │       └── routes/
│   │           │           ├── __root.tsx             # Root route
│   │           │           ├── index.tsx              # Home route
│   │           │           ├── login.tsx              # Login route (with auth)
│   │           │           ├── signup.tsx             # Signup route (with auth)
│   │           │           └── dashboard.tsx          # Protected route (with auth)
│   │           ├── hooks/
│   │           │   ├── use-auth.ts                    # Better Auth hook
│   │           │   └── use-query-example.ts           # TanStack Query example
│   │           ├── forms/
│   │           │   ├── react-hook-form/
│   │           │   │   ├── login-form.tsx             # Login form with RHF
│   │           │   │   ├── signup-form.tsx            # Signup form with RHF
│   │           │   │   └── example-form.tsx           # Generic example
│   │           │   └── tanstack-form/
│   │           │       ├── login-form.tsx             # Login form with TF
│   │           │       ├── signup-form.tsx            # Signup form with TF
│   │           │       └── example-form.tsx           # Generic example
│   │           └── components/
│   │               ├── protected-route.tsx            # Auth guard component
│   │               └── layout.tsx                     # Common layout component
│   └── template-playground/               # For manual testing (not published)
│       └── package.json
├── package.json                           # Root workspace configuration
├── pnpm-workspace.yaml                    # pnpm workspace definition
├── .opencode/
│   └── plans/
│       └── react-starter-cli-implementation.md  # This file
└── README.md                              # Project README
```

---

## 🎨 CLI User Experience

### Interactive Mode

```bash
npm create react-starter

# Output:
┌  Create React Starter
│
◇  What is your project named?
│  my-awesome-app
│
◇  Select a router:
│  ● React Router (Recommended)
│  ○ TanStack Router
│
◇  Select features (Space to select, Enter to confirm):
│  ◼ TanStack Query - Data fetching & caching
│  ◻ Better Auth - Authentication
│  ◻ Axios - HTTP client
│
◇  Select a form library (optional):
│  ○ None
│  ● React Hook Form (Recommended)
│  ○ TanStack Form
│
◇  Initialize git repository?
│  Yes
│
◇  Install dependencies?
│  Yes
│
◆  Scaffolding project...
◆  Installing React Router...
◆  Installing TanStack Query...
◆  Installing React Hook Form...
◆  Installing dependencies with pnpm...
◆  Initializing git...
│
└  All done! 🎉

Next steps:
  cd my-awesome-app
  pnpm dev
```

### Non-Interactive Mode (CI/Flags)

```bash
# With all options
npm create react-starter my-app -- \
  --router tanstack-router \
  --query \
  --auth \
  --axios \
  --form react-hook-form \
  --git \
  --install

# Minimal setup
npm create react-starter my-app -- \
  --router react-router \
  --no-git \
  --skip-install
```

### Available Flags

| Flag | Type | Description | Default |
|------|------|-------------|---------|
| `--router <type>` | String | Router library: `react-router` \| `tanstack-router` | Prompted |
| `--query` | Boolean | Include TanStack Query | `false` |
| `--auth` | Boolean | Include Better Auth | `false` |
| `--axios` | Boolean | Include Axios | `false` |
| `--form <library>` | String | Form library: `react-hook-form` \| `tanstack-form` \| `none` | Prompted |
| `--git` | Boolean | Initialize git repository | `true` |
| `--no-git` | Boolean | Skip git initialization | - |
| `--install` | Boolean | Install dependencies | `true` |
| `--skip-install` | Boolean | Skip dependency installation | - |
| `--help` | Boolean | Show help message | - |

---

## 📦 Dependencies

### CLI Package (`create-react-starter`)

```json
{
  "name": "create-react-starter",
  "version": "0.0.1",
  "description": "Scaffold a React + Vite + TypeScript starter with optional libraries",
  "type": "module",
  "bin": {
    "create-react-starter": "./dist/index.js"
  },
  "files": [
    "dist",
    "template"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format esm --clean",
    "dev": "tsup src/index.ts --format esm --watch",
    "typecheck": "tsc --noEmit"
  },
  "keywords": ["react", "vite", "typescript", "starter", "template", "cli", "scaffold"],
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "@clack/prompts": "^0.9.0",
    "commander": "^13.0.0",
    "fs-extra": "^11.2.0",
    "picocolors": "^1.1.0",
    "ora": "^8.1.1",
    "execa": "^9.5.2"
  },
  "devDependencies": {
    "@types/fs-extra": "^11.0.4",
    "@types/node": "^22.10.5",
    "tsup": "^8.3.5",
    "typescript": "^5.7.2"
  }
}
```

### Base Template Dependencies (Always Included)

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "tailwindcss": "^4.1.17",
    "@tailwindcss/vite": "^4.1.17",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.0",
    "lucide-react": "^0.563.0",
    "react-error-boundary": "^6.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.1",
    "vite": "^7.2.4",
    "typescript": "~5.9.3",
    "eslint": "^9.39.1",
    "@eslint/js": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "typescript-eslint": "^8.46.4",
    "globals": "^16.5.0",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@types/node": "^24.10.1"
  }
}
```

### Conditional Dependencies

| Feature | Dependencies | Dev Dependencies |
|---------|--------------|------------------|
| **React Router** | `react-router-dom: ^7.13.0` | - |
| **TanStack Router** | `@tanstack/react-router: ^1.91.8` | `@tanstack/router-devtools: ^1.91.8` |
| **TanStack Query** | `@tanstack/react-query: ^5.64.2` | `@tanstack/react-query-devtools: ^5.64.2` |
| **Better Auth** | `better-auth: ^1.6.0`, `better-call: ^0.6.1` | - |
| **Axios** | `axios: ^1.7.9` | - |
| **React Hook Form** | `react-hook-form: ^7.54.2`, `@hookform/resolvers: ^3.9.1`, `zod: ^3.24.1` | - |
| **TanStack Form** | `@tanstack/react-form: ^0.42.4`, `zod: ^3.24.1` | - |

---

## 🏗️ Implementation Phases

### Phase 1: Monorepo Foundation (2-3 hours)

**Goal**: Setup monorepo structure and CLI package foundation

**Tasks**:
- [ ] Initialize root package.json with workspace configuration
- [ ] Create `pnpm-workspace.yaml` with packages config
- [ ] Create `packages/create-react-starter/` directory structure
- [ ] Setup TypeScript configuration (tsconfig.json)
- [ ] Configure tsup for building (tsup.config.ts)
- [ ] Install CLI dependencies (@clack/prompts, commander, fs-extra, etc.)
- [ ] Create basic src/ file structure (index.ts, cli/, installers/, helpers/, utils/)
- [ ] Add proper shebang to index.ts: `#!/usr/bin/env node`
- [ ] Setup build script and test compilation

**Validation**:
- [ ] `pnpm build` compiles successfully
- [ ] Workspace structure recognized by pnpm

---

### Phase 2: Base Template (2-3 hours)

**Goal**: Prepare clean base template from current setup

**Tasks**:
- [ ] Create `packages/create-react-starter/template/base/` directory
- [ ] Copy current template files to base/
  - [ ] package.json (clean, minimal dependencies)
  - [ ] index.html
  - [ ] tsconfig.json, tsconfig.app.json, tsconfig.node.json
  - [ ] vite.config.ts
  - [ ] eslint.config.js
  - [ ] components.json
  - [ ] public/ directory
  - [ ] src/ directory
- [ ] Rename `.gitignore` → `_gitignore` in template
- [ ] Rename `.env.example` → `_env.example` in template (create basic version)
- [ ] Clean up src/App.tsx to minimal structure (no router yet)
- [ ] Remove example components (component-example.tsx, example.tsx)
- [ ] Keep only essential shadcn UI components (button, card, input, label)
- [ ] Verify base template structure is clean and minimal
- [ ] Create template/extras/ directory structure

**Validation**:
- [ ] Base template has no router code
- [ ] No example components present
- [ ] All config files present and valid

---

### Phase 3: CLI Core (3-4 hours)

**Goal**: Implement interactive prompts and argument parsing

**Tasks**:
- [ ] **src/index.ts** - Main entry point
  - [ ] Add shebang: `#!/usr/bin/env node`
  - [ ] Setup main() function with error handling
  - [ ] Import and call CLI functions
  - [ ] Add process exit handlers
- [ ] **src/cli/args.ts** - CLI argument parsing
  - [ ] Setup commander with program metadata
  - [ ] Define all CLI flags (--router, --query, --auth, etc.)
  - [ ] Parse and export arguments
- [ ] **src/cli/prompts.ts** - Interactive prompts
  - [ ] Setup @clack/prompts with intro/outro
  - [ ] Create project name prompt with validation
  - [ ] Create router selection prompt (React Router vs TanStack Router)
  - [ ] Create features multiselect (Query, Auth, Axios)
  - [ ] Create form library selection (None, React Hook Form, TanStack Form)
  - [ ] Create git initialization prompt
  - [ ] Create dependency installation prompt
  - [ ] Handle Ctrl+C cancellation
- [ ] **src/helpers/validate.ts** - Input validation
  - [ ] Project name validation (npm package naming rules)
  - [ ] Directory existence check
  - [ ] Directory empty check
  - [ ] Handle directory conflicts (overwrite prompt)
- [ ] **src/utils/logger.ts** - Pretty console output
  - [ ] Setup picocolors for colored output
  - [ ] Setup ora for spinners
  - [ ] Create logging functions (info, success, error, warn)
  - [ ] Create spinner utilities
- [ ] **src/utils/package-manager.ts** - Package manager detection
  - [ ] Detect from `process.env.npm_config_user_agent`
  - [ ] Support npm, pnpm, yarn, bun
  - [ ] Export PM name and run commands

**Validation**:
- [ ] CLI prompts display correctly
- [ ] Arguments parse correctly
- [ ] Validation works for invalid names
- [ ] Cancellation (Ctrl+C) handled gracefully

---

### Phase 4: Scaffolding System (3-4 hours)

**Goal**: Implement base project scaffolding

**Tasks**:
- [ ] **src/helpers/scaffold.ts** - Project scaffolding
  - [ ] Create project directory
  - [ ] Copy base template to target directory
  - [ ] Implement file renaming logic (_gitignore → .gitignore, _env.example → .env.example)
  - [ ] Handle file/directory copying with fs-extra
  - [ ] Create src/lib, src/components, src/hooks directories
- [ ] **src/helpers/modify-files.ts** - File modification utilities
  - [ ] Function to read/write package.json
  - [ ] Function to add dependencies to package.json
  - [ ] Function to add dev dependencies
  - [ ] Function to sort dependencies alphabetically
  - [ ] Function to update package name in package.json
  - [ ] Function to modify file content (add imports, wrap components)
  - [ ] Function to merge providers in App.tsx
- [ ] **src/helpers/env.ts** - Environment file generation
  - [ ] Read base env template
  - [ ] Merge feature-specific env sections
  - [ ] Write final .env.example file
  - [ ] Add comments for each variable
- [ ] **src/utils/constants.ts** - Version constants
  - [ ] Export all dependency versions
  - [ ] Export package metadata
  - [ ] Export template paths

**Validation**:
- [ ] Base template copies successfully
- [ ] Files renamed correctly
- [ ] package.json modified correctly
- [ ] Directories created properly

---

### Phase 5: Router Installers (4-6 hours)

**Goal**: Implement React Router and TanStack Router installers

#### React Router

**Tasks**:
- [ ] **template/extras/routers/react-router/** - Create files
  - [ ] App.tsx - BrowserRouter setup with outlet
  - [ ] router.tsx - Route configuration using createBrowserRouter
  - [ ] routes/root.tsx - Root layout component
  - [ ] routes/index.tsx - Home page
  - [ ] routes/login.tsx - Login page (placeholder for auth)
  - [ ] routes/signup.tsx - Signup page (placeholder for auth)
  - [ ] routes/dashboard.tsx - Protected dashboard (placeholder for auth)
- [ ] **src/installers/react-router.ts** - Installer implementation
  - [ ] Add `react-router-dom` to dependencies
  - [ ] Copy router-specific App.tsx to src/
  - [ ] Copy router.tsx to src/
  - [ ] Create src/routes/ directory
  - [ ] Copy route files to src/routes/
  - [ ] Update main.tsx if needed

#### TanStack Router

**Tasks**:
- [ ] **template/extras/routers/tanstack-router/** - Create files
  - [ ] App.tsx - RouterProvider setup
  - [ ] router.ts - Router instance creation
  - [ ] routes/__root.tsx - Root route with Outlet
  - [ ] routes/index.tsx - Home route
  - [ ] routes/login.tsx - Login route (placeholder for auth)
  - [ ] routes/signup.tsx - Signup route (placeholder for auth)
  - [ ] routes/dashboard.tsx - Protected route (placeholder for auth)
- [ ] **src/installers/tanstack-router.ts** - Installer implementation
  - [ ] Add `@tanstack/react-router` to dependencies
  - [ ] Add `@tanstack/router-devtools` to dev dependencies
  - [ ] Copy router-specific App.tsx to src/
  - [ ] Copy router.ts to src/
  - [ ] Create src/routes/ directory
  - [ ] Copy route files to src/routes/
  - [ ] Update vite.config.ts with TanStack Router plugin if needed

**Validation**:
- [ ] React Router project runs with basic routing
- [ ] TanStack Router project runs with basic routing
- [ ] Routes navigate correctly
- [ ] No console errors

---

### Phase 6: Feature Installers (6-8 hours)

#### TanStack Query Installer

**Tasks**:
- [ ] **template/extras/config/query/** - Create files
  - [ ] query-provider.tsx - QueryClient setup and Provider component
- [ ] **template/extras/hooks/** - Create files
  - [ ] use-query-example.ts - Example query hook with placeholder API
- [ ] **src/installers/tanstack-query.ts** - Installer implementation
  - [ ] Add `@tanstack/react-query` to dependencies
  - [ ] Add `@tanstack/react-query-devtools` to dev dependencies
  - [ ] Copy query-provider.tsx to src/lib/
  - [ ] Copy use-query-example.ts to src/hooks/
  - [ ] Update App.tsx to wrap with QueryProvider
  - [ ] Add import for QueryProvider

**Validation**:
- [ ] QueryClient initializes correctly
- [ ] Devtools appear in development
- [ ] Example query hook works

#### Better Auth Installer

**Tasks**:
- [ ] **template/extras/config/auth/** - Create files
  - [ ] auth.ts - Better Auth server configuration
  - [ ] auth-client.ts - Better Auth client instance
  - [ ] middleware.ts - Auth middleware for protected routes
- [ ] **template/extras/hooks/** - Create files
  - [ ] use-auth.ts - Auth hook (login, logout, user state)
- [ ] **template/extras/components/** - Create files
  - [ ] protected-route.tsx - Auth guard wrapper component
- [ ] **template/extras/env/** - Create files
  - [ ] auth.env - Better Auth environment variables
- [ ] **src/installers/better-auth.ts** - Installer implementation
  - [ ] Add `better-auth` and `better-call` to dependencies
  - [ ] Copy auth config files to src/lib/auth/
  - [ ] Copy use-auth.ts to src/hooks/
  - [ ] Copy protected-route.tsx to src/components/
  - [ ] Update router files to add auth routes (login, signup, dashboard)
  - [ ] Update dashboard route to use ProtectedRoute
  - [ ] Merge auth.env into .env.example
  - [ ] Update App.tsx if needed

**Note**: Better Auth requires form library for login/signup forms. Integration happens in form installer phase.

**Validation**:
- [ ] Auth client initializes
- [ ] Protected routes block unauthenticated access
- [ ] Auth hook provides user state

#### Axios Installer

**Tasks**:
- [ ] **template/extras/config/http/** - Create files
  - [ ] axios-instance.ts - Axios instance with interceptors
- [ ] **template/extras/env/** - Create files
  - [ ] axios.env - API base URL variable
- [ ] **src/installers/axios.ts** - Installer implementation
  - [ ] Add `axios` to dependencies
  - [ ] Copy axios-instance.ts to src/lib/
  - [ ] Merge axios.env into .env.example
  - [ ] If TanStack Query selected, update use-query-example to use axios instance

**Validation**:
- [ ] Axios instance exports correctly
- [ ] Interceptors work (can test with dummy request)
- [ ] Integration with TanStack Query works if both selected

---

### Phase 7: Form Library Installers (4-6 hours)

#### React Hook Form Installer

**Tasks**:
- [ ] **template/extras/forms/react-hook-form/** - Create files
  - [ ] example-form.tsx - Generic example form with validation
  - [ ] login-form.tsx - Login form using shadcn components + RHF + Zod
  - [ ] signup-form.tsx - Signup form using shadcn components + RHF + Zod
- [ ] **src/installers/react-hook-form.ts** - Installer implementation
  - [ ] Add `react-hook-form`, `@hookform/resolvers`, `zod` to dependencies
  - [ ] Copy form components to src/components/forms/
  - [ ] If Better Auth selected:
    - [ ] Update login route to import and use login-form
    - [ ] Update signup route to import and use signup-form
    - [ ] Connect forms to auth hooks
  - [ ] If Better Auth not selected:
    - [ ] Only copy example-form.tsx
    - [ ] Add example route or component using the form

**Validation**:
- [ ] Forms render correctly
- [ ] Validation works (Zod schemas)
- [ ] Form submission handling works
- [ ] Integration with Better Auth works if both selected

#### TanStack Form Installer

**Tasks**:
- [ ] **template/extras/forms/tanstack-form/** - Create files
  - [ ] example-form.tsx - Generic example form with validation
  - [ ] login-form.tsx - Login form using shadcn components + TanStack Form + Zod
  - [ ] signup-form.tsx - Signup form using shadcn components + TanStack Form + Zod
- [ ] **src/installers/tanstack-form.ts** - Installer implementation
  - [ ] Add `@tanstack/react-form`, `zod` to dependencies
  - [ ] Copy form components to src/components/forms/
  - [ ] If Better Auth selected:
    - [ ] Update login route to import and use login-form
    - [ ] Update signup route to import and use signup-form
    - [ ] Connect forms to auth hooks
  - [ ] If Better Auth not selected:
    - [ ] Only copy example-form.tsx
    - [ ] Add example route or component using the form

**Validation**:
- [ ] Forms render correctly
- [ ] Validation works (Zod schemas)
- [ ] Form submission handling works
- [ ] Integration with Better Auth works if both selected

---

### Phase 8: Installer Orchestration (2-3 hours)

**Goal**: Coordinate installer execution and handle dependencies

**Tasks**:
- [ ] **src/installers/index.ts** - Orchestration logic
  - [ ] Define `InstallerOptions` interface
  - [ ] Define `Installer` function type
  - [ ] Create `buildInstallerMap` function
  - [ ] Implement sequential installer execution
  - [ ] Handle installer dependencies (e.g., auth needs forms)
  - [ ] Add error handling for failed installers
- [ ] **App.tsx Provider Wrapping Logic**
  - [ ] Determine provider order (Query → Auth → Router)
  - [ ] Generate nested provider structure
  - [ ] Add all necessary imports
  - [ ] Write final App.tsx with all providers
- [ ] **Integration Testing**
  - [ ] Test router + query combination
  - [ ] Test router + auth + form combination
  - [ ] Test all features combined
  - [ ] Test router + query + axios combination

**Validation**:
- [ ] All installer combinations work
- [ ] Providers nest correctly
- [ ] No duplicate dependencies
- [ ] No import conflicts

---

### Phase 9: Dependency Installation & Git (2-3 hours)

**Goal**: Implement dependency installation and git initialization

**Tasks**:
- [ ] **src/helpers/install-deps.ts** - Dependency installation
  - [ ] Implement install function for each package manager
  - [ ] Use execa to spawn install process
  - [ ] Show spinner during installation
  - [ ] Handle installation errors gracefully
  - [ ] Support npm, pnpm, yarn, bun
  - [ ] Set proper environment variables (ADBLOCK=1, etc.)
- [ ] **src/helpers/git.ts** - Git initialization
  - [ ] Check if git is available
  - [ ] Run `git init`
  - [ ] Run `git add -A`
  - [ ] Run `git commit -m "Initial commit from create-react-starter"`
  - [ ] Handle errors gracefully (show warning, don't fail)

**Validation**:
- [ ] Dependencies install correctly with all package managers
- [ ] Git repo initializes properly
- [ ] Initial commit created
- [ ] Errors handled without crashing

---

### Phase 10: Polish & Error Handling (2-3 hours)

**Goal**: Improve UX and add comprehensive error handling

**Tasks**:
- [ ] **Error Handling**
  - [ ] Wrap all async operations in try-catch
  - [ ] Show helpful error messages
  - [ ] Provide troubleshooting hints
  - [ ] Clean up partial installations on error
- [ ] **Loading States**
  - [ ] Add spinners for all long operations
  - [ ] Show progress indicators
  - [ ] Update spinner text with current step
- [ ] **Success Messages**
  - [ ] Show completion message with project name
  - [ ] Display next steps (cd, install if skipped, run dev)
  - [ ] Show relevant documentation links
- [ ] **Update Check** (optional)
  - [ ] Check for newer version of create-react-starter
  - [ ] Show update notification if available
- [ ] **Help Text**
  - [ ] Comprehensive --help output
  - [ ] Examples for common use cases
  - [ ] Link to documentation

**Validation**:
- [ ] Error messages are helpful
- [ ] Spinners work correctly
- [ ] Success message shows correct info
- [ ] Help text is comprehensive

---

### Phase 11: Testing (4-6 hours)

**Goal**: Thoroughly test all combinations and scenarios

**Tasks**:
- [ ] **Template Combinations Testing**
  - [ ] Minimal: React Router only
  - [ ] React Router + TanStack Query
  - [ ] React Router + Better Auth + React Hook Form
  - [ ] React Router + All features + React Hook Form
  - [ ] TanStack Router + All features + TanStack Form
  - [ ] All possible combinations (systematic matrix)
- [ ] **Package Manager Testing**
  - [ ] Test with npm
  - [ ] Test with pnpm
  - [ ] Test with yarn
  - [ ] Test with bun
- [ ] **Non-Interactive Mode Testing**
  - [ ] Test all flag combinations
  - [ ] Test --skip-install
  - [ ] Test --no-git
  - [ ] Test invalid flags
- [ ] **Error Scenario Testing**
  - [ ] Invalid project name
  - [ ] Existing non-empty directory
  - [ ] No internet (install fails)
  - [ ] Git not available
  - [ ] Cancellation at various prompts
- [ ] **Template Playground Testing**
  - [ ] Create packages/template-playground
  - [ ] Manually test generated projects
  - [ ] Verify all features work in browser
  - [ ] Check for console errors/warnings

**Validation**:
- [ ] All combinations generate working projects
- [ ] Projects build successfully
- [ ] Projects run in development mode
- [ ] No TypeScript errors
- [ ] No runtime errors

---

### Phase 12: Documentation (2-3 hours)

**Goal**: Create comprehensive documentation

**Tasks**:
- [ ] **CLI Package README** (packages/create-react-starter/README.md)
  - [ ] Project description
  - [ ] Installation/usage instructions
  - [ ] Interactive mode example
  - [ ] Non-interactive mode examples
  - [ ] All available flags documented
  - [ ] Feature descriptions
  - [ ] Troubleshooting section
  - [ ] Contributing guidelines
- [ ] **Project Root README** (README.md)
  - [ ] Monorepo overview
  - [ ] Development setup instructions
  - [ ] How to test locally
  - [ ] Publishing workflow
- [ ] **Package.json Metadata**
  - [ ] Accurate description
  - [ ] Relevant keywords
  - [ ] Repository URL
  - [ ] License
  - [ ] Author info
- [ ] **Help Command**
  - [ ] Detailed CLI help text
  - [ ] Usage examples

**Validation**:
- [ ] README clear and comprehensive
- [ ] Examples work when copy-pasted
- [ ] Links are valid

---

### Phase 13: Publishing (1-2 hours)

**Goal**: Prepare and publish to npm registry

**Tasks**:
- [ ] **Pre-publish Checklist**
  - [ ] Test with `npm link` locally
  - [ ] Test complete end-to-end flow
  - [ ] Verify .npmignore excludes dev files
  - [ ] Verify package.json `files` field is correct
  - [ ] Ensure dist/ folder is built
  - [ ] Update version number
- [ ] **npm Setup**
  - [ ] Create npm account (if needed)
  - [ ] Login with `npm login`
  - [ ] Check package name availability
- [ ] **Publishing**
  - [ ] Run `npm publish` from CLI package directory
  - [ ] Verify package appears on npmjs.com
  - [ ] Test installation: `npm create react-starter test-app`
  - [ ] Verify published version works
- [ ] **GitHub Repository**
  - [ ] Create repository
  - [ ] Push code
  - [ ] Add description and tags
  - [ ] Enable GitHub Pages for docs (optional)

**Validation**:
- [ ] Package published successfully
- [ ] Can install and use from npm
- [ ] GitHub repo is public and documented

---

## 🏛️ Design Patterns & Implementation Details

### Installer Pattern

Each installer is a self-contained module that:
1. Adds dependencies to package.json
2. Copies required template files
3. Modifies existing files (App.tsx, router config, etc.)
4. Adds environment variables

```typescript
// src/installers/index.ts
export interface InstallerOptions {
  projectDir: string;
  projectName: string;
  packages: {
    router: 'react-router' | 'tanstack-router';
    query: boolean;
    auth: boolean;
    axios: boolean;
    form?: 'react-hook-form' | 'tanstack-form' | 'none';
  };
}

export type Installer = (opts: InstallerOptions) => Promise<void>;

export const buildInstallerMap = (selections: InstallerOptions['packages']) => ({
  router: {
    inUse: true, // Always installed
    installer: selections.router === 'react-router' 
      ? reactRouterInstaller 
      : tanstackRouterInstaller
  },
  query: {
    inUse: selections.query,
    installer: tanstackQueryInstaller
  },
  auth: {
    inUse: selections.auth,
    installer: betterAuthInstaller
  },
  axios: {
    inUse: selections.axios,
    installer: axiosInstaller
  },
  form: {
    inUse: !!selections.form && selections.form !== 'none',
    installer: selections.form === 'react-hook-form' 
      ? reactHookFormInstaller 
      : tanstackFormInstaller
  }
});

export async function runInstallers(opts: InstallerOptions) {
  const installers = buildInstallerMap(opts.packages);
  
  // Execute in order: router -> query -> axios -> form -> auth
  for (const [name, config] of Object.entries(installers)) {
    if (config.inUse) {
      await config.installer(opts);
    }
  }
}
```

### Progressive App Wrapping

Build provider structure dynamically based on selections:

```typescript
// In src/installers/index.ts or helper
function generateAppContent(opts: InstallerOptions): string {
  const { packages } = opts;
  const providers: Array<{ name: string; import: string }> = [];
  
  // Add providers in order (outermost to innermost)
  if (packages.query) {
    providers.push({
      name: 'QueryProvider',
      import: "import { QueryProvider } from './lib/query-provider'"
    });
  }
  
  if (packages.auth) {
    providers.push({
      name: 'AuthProvider',
      import: "import { AuthProvider } from './lib/auth/auth-provider'"
    });
  }
  
  // Router is always present
  const routerComponent = packages.router === 'react-router' 
    ? '<RouterProvider router={router} />'
    : '<RouterProvider router={router} />';
  
  // Build nested structure
  let content = routerComponent;
  providers.reverse().forEach(provider => {
    content = `<${provider.name}>\n    ${content}\n  </${provider.name}>`;
  });
  
  // Generate imports
  const imports = providers.map(p => p.import).join('\n');
  
  return `
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
${imports}
${packages.router === 'react-router' 
  ? "import { router } from './router'"
  : "import { router } from './router'"}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    ${content}
  </StrictMode>,
)
`;
}
```

### File Modification Utilities

```typescript
// src/helpers/modify-files.ts
import fs from 'fs-extra';
import path from 'path';

export function addDependencies(
  projectDir: string,
  deps: Record<string, string>,
  dev = false
) {
  const pkgPath = path.join(projectDir, 'package.json');
  const pkg = fs.readJSONSync(pkgPath);
  
  const field = dev ? 'devDependencies' : 'dependencies';
  pkg[field] = { ...pkg[field], ...deps };
  
  // Sort alphabetically
  pkg[field] = Object.fromEntries(
    Object.entries(pkg[field]).sort(([a], [b]) => a.localeCompare(b))
  );
  
  fs.writeJSONSync(pkgPath, pkg, { spaces: 2 });
}

export function updatePackageName(projectDir: string, name: string) {
  const pkgPath = path.join(projectDir, 'package.json');
  const pkg = fs.readJSONSync(pkgPath);
  pkg.name = name;
  fs.writeJSONSync(pkgPath, pkg, { spaces: 2 });
}

export function replaceInFile(
  filePath: string,
  searchValue: string | RegExp,
  replaceValue: string
) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const updated = content.replace(searchValue, replaceValue);
  fs.writeFileSync(filePath, updated, 'utf-8');
}
```

### Environment File Merging

```typescript
// src/helpers/env.ts
import fs from 'fs-extra';
import path from 'path';

export function generateEnvFile(
  projectDir: string,
  templateDir: string,
  features: { auth: boolean; axios: boolean }
) {
  let envContent = fs.readFileSync(
    path.join(templateDir, 'extras/env/base.env'),
    'utf-8'
  );
  
  if (features.auth) {
    const authEnv = fs.readFileSync(
      path.join(templateDir, 'extras/env/auth.env'),
      'utf-8'
    );
    envContent += '\n\n' + authEnv;
  }
  
  if (features.axios) {
    const axiosEnv = fs.readFileSync(
      path.join(templateDir, 'extras/env/axios.env'),
      'utf-8'
    );
    envContent += '\n\n' + axiosEnv;
  }
  
  fs.writeFileSync(
    path.join(projectDir, '.env.example'),
    envContent,
    'utf-8'
  );
}
```

---

## 🎯 Critical Implementation Notes

### 1. File Naming in Templates
- Use `_gitignore` instead of `.gitignore` in template (npm publishing issue)
- Use `_env.example` instead of `.env.example` in template
- Rename during copy operation: `_file → .file`

### 2. Package Manager Detection
```typescript
export function detectPackageManager(): 'npm' | 'pnpm' | 'yarn' | 'bun' {
  const userAgent = process.env.npm_config_user_agent;
  
  if (userAgent?.startsWith('pnpm')) return 'pnpm';
  if (userAgent?.startsWith('yarn')) return 'yarn';
  if (userAgent?.startsWith('bun')) return 'bun';
  
  return 'npm';
}
```

### 3. Dependency Version Synchronization
- Store all versions in `src/utils/constants.ts`
- Keep template package.json and constants in sync
- Use constants when adding dependencies in installers

### 4. Provider Ordering (Outermost to Innermost)
1. QueryProvider (TanStack Query)
2. AuthProvider (Better Auth)
3. RouterProvider (Router)

### 5. TypeScript Path Aliases
- Ensure `@/` alias works with all file placements
- Update tsconfig.json paths if needed
- Verify imports resolve correctly

### 6. Error Handling Strategy
- Never crash on git failure (just warn)
- Never crash on install failure (show manual install instructions)
- Always clean up on critical errors
- Provide helpful, actionable error messages

### 7. Template Testing Workflow
- Create `packages/template-playground` for manual testing
- Use `npm link` for local CLI testing
- Test each combination systematically
- Verify in browser, not just compilation

### 8. Better Auth + Form Integration
- Auth installer should check if form library selected
- If form library present, wire up login/signup forms to auth hooks
- If no form library, provide basic form examples or skip auth UI

---

## 📊 Time Estimates

| Phase | Estimated Time | Critical Path |
|-------|----------------|---------------|
| Phase 1: Monorepo Foundation | 2-3 hours | ✓ |
| Phase 2: Base Template | 2-3 hours | ✓ |
| Phase 3: CLI Core | 3-4 hours | ✓ |
| Phase 4: Scaffolding System | 3-4 hours | ✓ |
| Phase 5: Router Installers | 4-6 hours | ✓ |
| Phase 6: Feature Installers | 6-8 hours | ✓ |
| Phase 7: Form Library Installers | 4-6 hours | ✓ |
| Phase 8: Installer Orchestration | 2-3 hours | ✓ |
| Phase 9: Dependency Installation & Git | 2-3 hours | ✓ |
| Phase 10: Polish & Error Handling | 2-3 hours | - |
| Phase 11: Testing | 4-6 hours | ✓ |
| Phase 12: Documentation | 2-3 hours | - |
| Phase 13: Publishing | 1-2 hours | - |
| **Total** | **35-54 hours** | **4-7 days** |

---

## ✅ Success Criteria

### Technical
- [ ] All library combinations generate working projects
- [ ] Projects build without TypeScript errors
- [ ] Projects run in development mode without errors
- [ ] All features work as expected in browser
- [ ] Compatible with npm, pnpm, yarn, bun
- [ ] Works on Windows, macOS, Linux

### User Experience
- [ ] Interactive prompts are intuitive and helpful
- [ ] Non-interactive mode works with flags
- [ ] Error messages are clear and actionable
- [ ] Loading states show progress
- [ ] Success messages include next steps
- [ ] Generated projects follow best practices

### Quality
- [ ] Code is well-typed (TypeScript)
- [ ] No duplicate dependencies
- [ ] No unused dependencies
- [ ] Clean, readable code structure
- [ ] Comprehensive error handling
- [ ] Good test coverage (manual testing checklist)

### Documentation
- [ ] README is comprehensive
- [ ] Examples work when copy-pasted
- [ ] All flags documented
- [ ] Troubleshooting guide included
- [ ] Help command is useful

### Publishing
- [ ] Package published to npm
- [ ] Can be installed globally: `npm create react-starter`
- [ ] Works from npm (not just local)
- [ ] GitHub repo is public and documented

---

## 🚀 Getting Started (For Implementation Agents)

1. **Read this entire plan** before starting
2. **Check the JSON plan file** at `.opencode/plans/react-starter-cli-plan-json.md` for structured completion tracking
3. **Start with Phase 1** and proceed sequentially
4. **Update completion status** as you work:
   - Mark tasks as `completed: true` when finished
   - Mark validations as `completed: true` when they pass
   - Mark phase as `is_complete: true` when all tasks and validations are done
5. **Validate each phase** before moving to the next
6. **Ask questions** if anything is unclear
7. **Update this plan** if you discover issues or better approaches
8. **Test frequently** - don't wait until the end
9. **Save progress** - Commit the updated JSON plan after completing each phase

### Completion Workflow

```
For each phase:
  1. Check if phase.is_complete === true
     → If true: Skip to next phase
     → If false: Continue
  
  2. Execute all tasks in sequence
     → Mark each task.completed = true as you finish
  
  3. Run all validation checks
     → Mark each validation.completed = true as they pass
  
  4. When all tasks AND validations are complete:
     → Set phase.is_complete = true
     → Save/commit the updated plan
  
  5. Move to next phase

When all 13 phases complete:
  → Set planMetadata.is_complete = true
  → Plan execution finished! 🎉
```

---

## 📝 Notes & Considerations

### Future Enhancements (Post-MVP)
- State management options (Zustand, Redux Toolkit, Jotai)
- Testing setup (Vitest, React Testing Library)
- Prettier configuration option
- Storybook integration
- Docker setup
- CI/CD templates (GitHub Actions, GitLab CI)
- More UI library options (MUI, Chakra UI, Ant Design)
- i18n support (react-i18next)
- PWA option

### Known Limitations
- Only supports React 19+ and Vite 7+
- Requires Node.js 18+
- Better Auth requires form library for full functionality
- TanStack Router may need additional configuration for advanced features

### Maintenance Considerations
- Keep dependency versions updated regularly
- Monitor for breaking changes in dependencies
- Update templates when React/Vite release major versions
- Add tests as project matures

---

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

Areas for contribution:
- Bug fixes
- New library integrations
- Documentation improvements
- Testing improvements
- Performance optimizations

---

**Version**: 1.0  
**Last Updated**: 2026-02-17  
**Status**: Ready for Implementation
