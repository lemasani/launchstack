# create-react-starter

A modern CLI tool for scaffolding React + Vite + TypeScript projects with your choice of popular libraries and frameworks.

## Project Structure

This is a monorepo containing:

- **`packages/create-react-starter/`** - The CLI tool for scaffolding React projects
  - See [CLI README](./packages/create-react-starter/README.md) for detailed documentation

## Quick Start

```bash
npx create-react-starter my-app
```

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Build the CLI
pnpm build

# Run tests
pnpm test
```

### Testing the CLI Locally

```bash
# Build the CLI
pnpm build

# Link globally for testing
cd packages/create-react-starter
pnpm link --global

# Use it anywhere
create-react-starter test-project

# Unlink when done
pnpm uninstall --global create-react-starter
```

## Documentation

See the [CLI package README](./packages/create-react-starter/README.md) for complete documentation.

## License

MIT
