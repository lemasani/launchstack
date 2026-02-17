# create-react-starter

A modern CLI tool for scaffolding React + Vite + TypeScript projects with your choice of popular libraries and frameworks.

## Features

- 🚀 **Fast scaffolding** - Get up and running in seconds
- 🎨 **Pre-configured** - React 19, Vite, TypeScript, Tailwind CSS, and shadcn/ui
- 🔀 **Flexible routing** - Choose between React Router, TanStack Router, or none
- 📦 **Optional integrations** - TanStack Query, Better Auth, Axios
- 📝 **Form libraries** - React Hook Form or TanStack Form with Zod validation
- 🎯 **Type-safe** - Full TypeScript support throughout
- 🌈 **Beautiful UI** - 13 pre-configured shadcn/ui components
- 🔧 **Developer tools** - ESLint, git initialization, and more

## Quick Start

```bash
# Using npm
npx create-react-starter my-app

# Using pnpm
pnpm create react-starter my-app

# Using yarn
yarn create react-starter my-app

# Using bun
bunx create-react-starter my-app
```

## Usage

### Interactive Mode

Simply run the command and follow the prompts:

```bash
npx create-react-starter my-app
```

You'll be asked to choose:
- **Router**: React Router, TanStack Router, or none
- **Features**: TanStack Query, Better Auth, Axios
- **Form library**: React Hook Form, TanStack Form, or none
- **Git initialization**: Yes or No
- **Install dependencies**: Yes or No

### CLI Flags

Skip the interactive prompts by using command-line flags:

```bash
npx create-react-starter my-app \
  --router react-router \
  --query \
  --auth \
  --axios \
  --form react-hook-form \
  --no-git \
  --no-install
```

#### Available Flags

| Flag | Values | Description |
|------|--------|-------------|
| `--router` | `react-router`, `tanstack-router`, `none` | Choose routing library |
| `--query` | boolean | Include TanStack Query |
| `--auth` | boolean | Include Better Auth |
| `--axios` | boolean | Include Axios |
| `--form` | `react-hook-form`, `tanstack-form`, `none` | Choose form library |
| `--no-git` | boolean | Skip git initialization |
| `--no-install` | boolean | Skip dependency installation |

## What's Included

### Base Template

- **React 19** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool
- **TypeScript** - Full type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - 13 pre-configured components:
  - Button, Card, Input, Label, Select
  - Alert, Badge, Progress, Separator
  - Skeleton, Spinner, Tabs, Tooltip

### Routing Options

#### React Router (v7+)
- Pre-configured routes: Home, About, Dashboard
- Nested layouts
- Type-safe navigation

#### TanStack Router
- File-based routing
- Type-safe routes with auto-completion
- Route generation with Vite plugin
- Built-in devtools

### Features

#### TanStack Query
- Data fetching and caching
- Query provider setup
- Example queries with hooks
- React Query Devtools

#### Better Auth
- Email/password authentication
- SQLite database (better-sqlite3)
- Pre-configured auth client
- Login page (when using a router)
- Environment variables setup

#### Axios
- Pre-configured API client
- Request/response interceptors
- Environment-based API URL
- Error handling

### Form Libraries

#### React Hook Form
- Performant form handling
- Zod schema validation
- shadcn/ui integration
- Example form with validation

#### TanStack Form
- Type-safe forms
- Zod validation adapter
- Field-level validation
- Example form component

## Project Structure

```
my-app/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   └── forms/        # Form components (if selected)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and configuration
│   │   ├── utils.ts      # Helper functions
│   │   ├── query-provider.tsx  # If TanStack Query selected
│   │   ├── auth.ts       # If Better Auth selected
│   │   └── api-client.ts # If Axios selected
│   ├── pages/            # Page components (React Router)
│   │   or
│   ├── routes/           # Route files (TanStack Router)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env                  # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Examples

### Create a project with React Router and TanStack Query

```bash
npx create-react-starter my-app --router react-router --query
```

### Create a full-stack app with authentication

```bash
npx create-react-starter my-app \
  --router tanstack-router \
  --query \
  --auth \
  --axios \
  --form react-hook-form
```

### Create a simple SPA without routing

```bash
npx create-react-starter my-app --router none
```

## Development

After creating your project:

```bash
cd my-app

# If you skipped installation
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Requirements

- Node.js 18.0.0 or higher
- npm, pnpm, yarn, or bun

## Features Comparison

| Feature | Base | With Router | With Auth | Full Stack |
|---------|------|-------------|-----------|------------|
| React 19 | ✅ | ✅ | ✅ | ✅ |
| TypeScript | ✅ | ✅ | ✅ | ✅ |
| Tailwind CSS | ✅ | ✅ | ✅ | ✅ |
| shadcn/ui | ✅ | ✅ | ✅ | ✅ |
| Routing | ❌ | ✅ | ✅ | ✅ |
| Data Fetching | ❌ | ❌ | ❌ | ✅ |
| Authentication | ❌ | ❌ | ✅ | ✅ |
| Forms | ❌ | ❌ | ❌ | ✅ |

## Warnings

### Better Auth without Router

If you select Better Auth without a router, authentication configuration files will be created, but no login page will be generated. You'll need to create your own authentication UI.

## Publishing (for maintainers)

### Local Testing

Test the package locally before publishing:

```bash
# Build the package
pnpm build

# Create a tarball
npm pack

# Test the tarball in a temporary directory
cd /tmp
npm install -g /path/to/create-react-starter-0.0.1.tgz
create-react-starter test-app
```

### Publishing to npm

1. **Build and test**:
   ```bash
   pnpm build
   pnpm test
   ```

2. **Update version** (if needed):
   ```bash
   npm version patch  # or minor, or major
   ```

3. **Login to npm** (first time only):
   ```bash
   npm login
   ```

4. **Publish**:
   ```bash
   npm publish
   ```

5. **Verify**:
   ```bash
   npx create-react-starter@latest verify-project
   ```

Note: The `prepublishOnly` script will automatically run `pnpm build && pnpm test` before publishing.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/lemasani/react-starter-template).
