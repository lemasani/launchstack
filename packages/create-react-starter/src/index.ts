import * as clack from '@clack/prompts';
import pc from 'picocolors';
import path from 'path';
import { parseArguments, flagsToPreferences } from './cli/args.js';
import { runPrompts } from './cli/prompts.js';
import { logger } from './utils/logger.js';
import { detectPackageManager, getRunCommand } from './utils/package-manager.js';
import { scaffoldProject } from './helpers/scaffold.js';
import { runInstallers } from './helpers/install-features.js';
import { installDependencies } from './helpers/install-dependencies.js';
import { initializeGit } from './helpers/init-git.js';
import { getProjectPath } from './helpers/validate.js';
import type { UserPreferences } from './types.js';

async function main() {
  try {
    // Parse command line arguments
    const { projectName, flags } = parseArguments();

    // Get user preferences (either from flags or interactive prompts)
    let preferences: UserPreferences;

    if (projectName && Object.keys(flags).length > 0) {
      // Non-interactive mode with flags
      const prefs = flagsToPreferences(projectName, flags);
      if (prefs) {
        preferences = prefs;
      } else {
        // Incomplete flags, fall back to interactive
        preferences = await runPrompts(projectName);
      }
    } else {
      // Interactive mode
      preferences = await runPrompts(projectName);
    }

    // Detect package manager
    const packageManager = detectPackageManager();
    
    logger.break();
    logger.info(`Using package manager: ${pc.cyan(packageManager)}`);
    logger.break();
    
    // Display selected configuration
    clack.log.step(pc.bold('Configuration:'));
    clack.log.info(`  Project: ${pc.cyan(preferences.projectName)}`);
    clack.log.info(`  Router: ${pc.cyan(preferences.router)}`);
    clack.log.info(
      `  Features: ${
        Object.entries(preferences.features)
          .filter(([_, enabled]) => enabled)
          .map(([name]) => pc.cyan(name))
          .join(', ') || pc.dim('none')
      }`
    );
    clack.log.info(`  Form Library: ${pc.cyan(preferences.formLibrary)}`);
    clack.log.info(`  Git: ${preferences.git ? pc.green('Yes') : pc.dim('No')}`);
    clack.log.info(`  Install: ${preferences.install ? pc.green('Yes') : pc.dim('No')}`);
    
    logger.break();

    // Warn if Better Auth is selected without a router
    if (preferences.features.betterAuth && preferences.router === 'none') {
      clack.log.warn(
        pc.yellow(
          '⚠️  Better Auth is enabled without a router. Auth configuration files will be created, but no login page will be generated. You\'ll need to create your own auth UI.'
        )
      );
      logger.break();
    }

    // Get project path
    const projectPath = getProjectPath(preferences.projectName);

    // Scaffold the project
    await scaffoldProject(projectPath, preferences);

    // Run installers for selected features
    await runInstallers(projectPath, preferences);

    // Install dependencies if requested
    if (preferences.install) {
      logger.break();
      await installDependencies(projectPath, packageManager);
    }

    // Initialize git if requested
    if (preferences.git) {
      logger.break();
      await initializeGit(projectPath);
    }

    logger.break();
    
    // Show next steps
    clack.log.step(pc.bold('Next steps:'));
    const relativeProjectPath = path.relative(process.cwd(), projectPath);
    const cdCommand = relativeProjectPath === '' ? '' : `cd ${relativeProjectPath}`;
    
    if (cdCommand) {
      clack.log.info(`  ${pc.cyan(cdCommand)}`);
    }
    
    if (!preferences.install) {
      clack.log.info(`  ${pc.cyan(`${packageManager} install`)}`);
    }
    
    const runCmd = getRunCommand(packageManager);
    clack.log.info(`  ${pc.cyan(`${runCmd} dev`)}`);

    logger.break();
    clack.outro(pc.green('Done! Happy coding! 🚀'));
  } catch (error) {
    logger.error('An unexpected error occurred');
    console.error(error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
