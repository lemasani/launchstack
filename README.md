# LaunchStack

Launch production-ready React apps in seconds with your choice of routing, state management, and authentication.

## Project Structure

This is a monorepo containing:

- **`packages/launchstack/`** - The CLI tool for scaffolding React projects
  - See [CLI README](./packages/launchstack/README.md) for detailed documentation

## Quick Start

```bash
npx launchstack my-app
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
cd packages/launchstack
pnpm link --global

# Use it anywhere
launchstack test-project

# Unlink when done
pnpm uninstall --global launchstack
```

## Documentation

See the [CLI package README](./packages/launchstack/README.md) for complete documentation.

## License

MIT
