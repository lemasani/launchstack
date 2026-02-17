import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';

/**
 * Initializes a git repository and creates an initial commit
 */
export async function initializeGit(projectPath: string): Promise<void> {
  const spinner = ora('Initializing git repository...').start();

  try {
    // Check if git is available
    try {
      await execa('git', ['--version'], { cwd: projectPath });
    } catch {
      spinner.warn('Git not found. Skipping git initialization.');
      return;
    }

    // Check if already a git repository
    const gitDir = path.join(projectPath, '.git');
    if (await fs.pathExists(gitDir)) {
      spinner.info('Git repository already exists. Skipping initialization.');
      return;
    }

    // Initialize git repository
    await execa('git', ['init'], { cwd: projectPath });

    // Add all files
    await execa('git', ['add', '.'], { cwd: projectPath });

    // Create initial commit
    await execa(
      'git',
      ['commit', '-m', 'Initial commit from create-react-starter'],
      { cwd: projectPath }
    );

    spinner.succeed('Git repository initialized');
  } catch (error) {
    spinner.fail('Failed to initialize git repository');
    // Don't throw - git initialization is not critical
    console.warn('Warning: Git initialization failed. You can initialize it manually later.');
  }
}
