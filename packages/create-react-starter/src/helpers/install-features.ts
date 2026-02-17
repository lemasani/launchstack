import ora from 'ora';
import type { UserPreferences } from '../types.js';
import type { Installer } from '../installers/types.js';
import { reactRouterInstaller } from '../installers/react-router.js';
import { tanstackRouterInstaller } from '../installers/tanstack-router.js';
import { tanstackQueryInstaller } from '../installers/tanstack-query.js';
import { betterAuthInstaller } from '../installers/better-auth.js';
import { axiosInstaller } from '../installers/axios.js';
import { reactHookFormInstaller } from '../installers/react-hook-form.js';
import { tanstackFormInstaller } from '../installers/tanstack-form.js';

// List of all available installers
const installers: Installer[] = [
  reactRouterInstaller,
  tanstackRouterInstaller,
  tanstackQueryInstaller,
  betterAuthInstaller,
  axiosInstaller,
  reactHookFormInstaller,
  tanstackFormInstaller,
];

export async function runInstallers(
  projectPath: string,
  preferences: UserPreferences
): Promise<void> {
  // Filter installers that should run based on user preferences
  const installersToRun = installers.filter((installer) =>
    installer.shouldInstall(preferences)
  );

  if (installersToRun.length === 0) {
    return; // No installers to run
  }

  // Run each installer
  for (const installer of installersToRun) {
    const spinner = ora(`Installing ${installer.name}...`).start();

    try {
      await installer.install(projectPath, preferences);
      spinner.succeed(`Installed ${installer.name}`);
    } catch (error) {
      spinner.fail(`Failed to install ${installer.name}`);
      
      // Provide helpful error context
      if (error instanceof Error) {
        throw new Error(
          `Failed to install ${installer.name}: ${error.message}\n\n` +
          'The project has been partially set up. You may need to:\n' +
          '1. Check if you have write permissions in the project directory\n' +
          '2. Manually install the failed feature\n' +
          '3. Delete the project and try again'
        );
      }
      
      throw error;
    }
  }
}
