import * as clack from '@clack/prompts';
import pc from 'picocolors';
import type { UserPreferences } from '../types.js';
import { validateProjectName, directoryExists, isDirectoryEmpty, getProjectPath } from '../helpers/validate.js';

/**
 * Runs interactive prompts to gather user preferences
 */
export async function runPrompts(initialProjectName?: string): Promise<UserPreferences> {
  console.log('');
  clack.intro(pc.bgCyan(pc.black(' create-react-starter ')));

  // Project name prompt
  const projectName = await clack.text({
    message: 'What is your project named?',
    placeholder: 'my-react-app',
    initialValue: initialProjectName,
    validate: (value) => {
      const validation = validateProjectName(value);
      return validation === true ? undefined : validation;
    },
  });

  if (clack.isCancel(projectName)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  // Check if directory exists and handle conflicts
  const projectPath = getProjectPath(projectName);
  if (directoryExists(projectPath) && !isDirectoryEmpty(projectPath)) {
    const overwrite = await clack.confirm({
      message: `Directory ${pc.cyan(projectName)} already exists and is not empty. Overwrite?`,
      initialValue: false,
    });

    if (clack.isCancel(overwrite)) {
      clack.cancel('Operation cancelled.');
      process.exit(0);
    }

    if (!overwrite) {
      clack.cancel('Operation cancelled.');
      process.exit(0);
    }
  }

  // Router selection
  const router = await clack.select({
    message: 'Which router would you like to use?',
    options: [
      { value: 'react-router', label: 'React Router', hint: 'Most popular, v7+' },
      { value: 'tanstack-router', label: 'TanStack Router', hint: 'Type-safe routing' },
      { value: 'none', label: 'None', hint: 'Single page app' },
    ],
    initialValue: 'react-router',
  });

  if (clack.isCancel(router)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  // Features multi-select
  const features = await clack.multiselect({
    message: 'Which additional features would you like?',
    options: [
      {
        value: 'tanstackQuery',
        label: 'TanStack Query',
        hint: 'Data fetching & caching',
      },
      {
        value: 'betterAuth',
        label: 'Better Auth',
        hint: 'Authentication framework',
      },
      {
        value: 'axios',
        label: 'Axios',
        hint: 'HTTP client',
      },
    ],
    required: false,
  });

  if (clack.isCancel(features)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  // Form library selection
  const formLibrary = await clack.select({
    message: 'Which form library would you like?',
    options: [
      { value: 'react-hook-form', label: 'React Hook Form', hint: 'Popular & performant' },
      { value: 'tanstack-form', label: 'TanStack Form', hint: 'Type-safe forms' },
      { value: 'none', label: 'None', hint: 'No form library' },
    ],
    initialValue: 'none',
  });

  if (clack.isCancel(formLibrary)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  // Git initialization
  const git = await clack.confirm({
    message: 'Initialize a new git repository?',
    initialValue: true,
  });

  if (clack.isCancel(git)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  // Dependency installation
  const install = await clack.confirm({
    message: 'Install dependencies?',
    initialValue: true,
  });

  if (clack.isCancel(install)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  return {
    projectName,
    router: router as 'react-router' | 'tanstack-router' | 'none',
    features: {
      tanstackQuery: (features as string[]).includes('tanstackQuery'),
      betterAuth: (features as string[]).includes('betterAuth'),
      axios: (features as string[]).includes('axios'),
    },
    formLibrary: formLibrary as 'react-hook-form' | 'tanstack-form' | 'none',
    git,
    install,
  };
}
