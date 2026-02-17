import type { UserPreferences } from '../types.js';

/**
 * Base installer interface
 */
export interface Installer {
  /**
   * Name of the installer (for logging)
   */
  name: string;

  /**
   * Checks if this installer should run based on user preferences
   */
  shouldInstall(preferences: UserPreferences): boolean;

  /**
   * Installs the feature/library
   */
  install(projectPath: string, preferences: UserPreferences): Promise<void>;
}

/**
 * Package dependencies to add
 */
export interface Dependencies {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}
