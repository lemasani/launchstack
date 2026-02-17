import { execa } from 'execa';
import ora from 'ora';
import type { PackageManager } from '../types.js';
import { getInstallCommand } from '../utils/package-manager.js';

/**
 * Installs project dependencies using the specified package manager
 */
export async function installDependencies(
  projectPath: string,
  packageManager: PackageManager
): Promise<void> {
  const installCommand = getInstallCommand(packageManager);
  const spinner = ora(`Installing dependencies with ${packageManager}...`).start();

  try {
    const [command, ...args] = installCommand.split(' ');
    
    await execa(command, args, {
      cwd: projectPath,
      stdio: 'pipe', // Suppress output for cleaner CLI
    });

    spinner.succeed('Dependencies installed successfully');
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    throw new Error(
      `Dependency installation failed. Please try running "${installCommand}" manually.`
    );
  }
}
