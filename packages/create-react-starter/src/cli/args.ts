import { Command } from 'commander';
import type { UserPreferences } from '../types.js';

interface CLIFlags {
  router?: string;
  query?: boolean;
  auth?: boolean;
  axios?: boolean;
  form?: string;
  git?: boolean;
  install?: boolean;
}

/**
 * Parses CLI arguments and returns preferences if provided via flags
 * Returns null if interactive mode should be used
 */
export function parseArguments(): { projectName?: string; flags: CLIFlags } {
  const program = new Command();

  program
    .name('create-react-starter')
    .description('Create a new React + Vite + TypeScript project with configurable features')
    .version('0.0.1')
    .argument('[project-name]', 'Name of the project')
    .option('--router <type>', 'Router to use: react-router, tanstack-router, or none')
    .option('--query', 'Include TanStack Query')
    .option('--auth', 'Include Better Auth')
    .option('--axios', 'Include Axios')
    .option('--form <type>', 'Form library: react-hook-form, tanstack-form, or none')
    .option('--no-git', 'Skip git initialization')
    .option('--no-install', 'Skip dependency installation')
    .parse();

  const projectName = program.args[0];
  const options = program.opts() as CLIFlags;

  return {
    projectName,
    flags: options,
  };
}

/**
 * Converts CLI flags to UserPreferences
 * Returns null if flags are incomplete (need interactive mode)
 */
export function flagsToPreferences(
  projectName: string,
  flags: CLIFlags
): UserPreferences | null {
  // If no flags provided, use interactive mode
  const hasAnyFlag =
    flags.router !== undefined ||
    flags.query !== undefined ||
    flags.auth !== undefined ||
    flags.axios !== undefined ||
    flags.form !== undefined ||
    flags.git !== undefined ||
    flags.install !== undefined;

  if (!hasAnyFlag) {
    return null;
  }

  // Validate router flag
  const router = flags.router || 'none';
  if (!['react-router', 'tanstack-router', 'none'].includes(router)) {
    console.error(`Invalid router: ${router}`);
    process.exit(1);
  }

  // Validate form flag
  const formLibrary = flags.form || 'none';
  if (!['react-hook-form', 'tanstack-form', 'none'].includes(formLibrary)) {
    console.error(`Invalid form library: ${formLibrary}`);
    process.exit(1);
  }

  return {
    projectName,
    router: router as 'react-router' | 'tanstack-router' | 'none',
    features: {
      tanstackQuery: flags.query ?? false,
      betterAuth: flags.auth ?? false,
      axios: flags.axios ?? false,
    },
    formLibrary: formLibrary as 'react-hook-form' | 'tanstack-form' | 'none',
    git: flags.git ?? true,
    install: flags.install ?? true,
  };
}
