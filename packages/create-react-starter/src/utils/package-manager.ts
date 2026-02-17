import type { PackageManager } from '../types.js';

/**
 * Detects the package manager being used from npm_config_user_agent
 */
export function detectPackageManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent;

  if (!userAgent) {
    return 'npm';
  }

  if (userAgent.includes('pnpm')) {
    return 'pnpm';
  }

  if (userAgent.includes('yarn')) {
    return 'yarn';
  }

  if (userAgent.includes('bun')) {
    return 'bun';
  }

  return 'npm';
}

/**
 * Gets the appropriate run command for the detected package manager
 */
export function getRunCommand(pm: PackageManager): string {
  switch (pm) {
    case 'npm':
      return 'npm run';
    case 'pnpm':
      return 'pnpm';
    case 'yarn':
      return 'yarn';
    case 'bun':
      return 'bun';
  }
}

/**
 * Gets the install command for the detected package manager
 */
export function getInstallCommand(pm: PackageManager): string {
  switch (pm) {
    case 'npm':
      return 'npm install';
    case 'pnpm':
      return 'pnpm install';
    case 'yarn':
      return 'yarn';
    case 'bun':
      return 'bun install';
  }
}
