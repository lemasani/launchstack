# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2026-02-17

### Added

- Initial release of create-react-starter
- Interactive CLI with beautiful prompts
- Non-interactive mode with CLI flags
- Base template with React 19, Vite, TypeScript, Tailwind CSS v4
- 13 pre-configured shadcn/ui components
- Router options: React Router v7, TanStack Router, or none
- TanStack Query integration with devtools and example queries
- Better Auth integration with SQLite database
- Axios integration with pre-configured API client
- Form library options: React Hook Form or TanStack Form
- Zod validation for all form libraries
- Automatic git initialization with initial commit
- Automatic dependency installation
- Package manager detection (npm, pnpm, yarn, bun)
- Comprehensive error handling and validation
- Template file validation
- Helpful error messages
- Unit tests for utilities
- Comprehensive documentation

### Features

- **Routers**
  - React Router with pre-configured routes
  - TanStack Router with file-based routing and type safety
  - Option for no router (SPA mode)

- **Data Fetching**
  - TanStack Query with QueryProvider setup
  - Example queries and hooks
  - React Query Devtools integration

- **Authentication**
  - Better Auth with email/password
  - SQLite database configuration
  - Pre-built login pages for each router
  - Environment variable setup

- **HTTP Client**
  - Axios with request/response interceptors
  - Environment-based configuration
  - Error handling utilities

- **Forms**
  - React Hook Form with Zod validation
  - TanStack Form with Zod adapter
  - Example forms with shadcn/ui components

### Developer Experience

- TypeScript support throughout
- ESLint configuration
- Beautiful CLI output with colors and spinners
- Progress indicators for long operations
- Validation warnings for edge cases
- Clean project structure
- Production-ready configuration

[0.0.1]: https://github.com/yourusername/create-react-starter/releases/tag/v0.0.1
