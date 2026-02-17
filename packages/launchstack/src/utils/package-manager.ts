import { execSync } from 'node:child_process';
import type { PackageManager } from '../types.js';

/**
 * Checks if a command is available in the system
 */
function isCommandAvailable(command: string): boolean {
  try {
    execSync(`${command} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Detects the package manager being used from npm_config_user_agent
 * If not detected, checks for installed package managers and prefers pnpm > yarn > bun > npm
 */
export function detectPackageManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent;

  // First, try to detect from user agent (most reliable when CLI is run through a package manager)
  if (userAgent) {
    if (userAgent.includes('pnpm')) {
      return 'pnpm';
    }

    if (userAgent.includes('yarn')) {
      return 'yarn';
    }

    if (userAgent.includes('bun')) {
      return 'bun';
    }

    if (userAgent.includes('npm')) {
      return 'npm';
    }
  }

  // If user agent doesn't help, check what's installed on the system
  // Prefer pnpm over npm since it's faster and more efficient
  if (isCommandAvailable('pnpm')) {
    return 'pnpm';
  }

  if (isCommandAvailable('yarn')) {
    return 'yarn';
  }

  if (isCommandAvailable('bun')) {
    return 'bun';
  }

  // Fall back to npm (usually always available)
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
