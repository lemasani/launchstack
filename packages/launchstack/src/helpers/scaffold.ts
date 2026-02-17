import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import pc from 'picocolors';
import { createSpinner } from '../utils/logger.js';
import type { UserPreferences } from '../types.js';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Gets the path to the template directory
 */
export function getTemplatePath(): string {
  // __dirname will be dist/ after build
  // So we need to go up one level and find template/
  // In development: packages/launchstack/template
  // In production (installed): node_modules/launchstack/template
  
  // From dist/index.js, go up one level to package root
  return path.resolve(__dirname, '../template');
}

/**
 * Gets the path to the base template
 */
export function getBaseTemplatePath(): string {
  return path.join(getTemplatePath(), 'base');
}

/**
 * Creates the project directory and scaffolds the base template
 */
export async function scaffoldProject(
  projectPath: string,
  preferences: UserPreferences
): Promise<void> {
  const spinner = createSpinner('Scaffolding project...').start();

  try {
    // Ensure the project directory exists and is empty
    await fs.ensureDir(projectPath);
    
    // If directory exists and has files, remove them (overwrite confirmed in prompts)
    const files = await fs.readdir(projectPath);
    if (files.length > 0) {
      spinner.text = 'Cleaning existing directory...';
      await fs.emptyDir(projectPath);
    }

    // Copy base template
    spinner.text = 'Copying base template...';
    const baseTemplatePath = getBaseTemplatePath();
    await copyTemplate(baseTemplatePath, projectPath);

    // Rename dotfiles
    spinner.text = 'Setting up configuration files...';
    await renameDotfiles(projectPath);

    // Replace placeholders in package.json
    spinner.text = 'Configuring package.json...';
    await replacePlaceholders(projectPath, preferences);

    spinner.succeed(pc.green('Project scaffolded successfully!'));
  } catch (error) {
    spinner.fail(pc.red('Failed to scaffold project'));
    
    // Provide more helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('EACCES') || error.message.includes('EPERM')) {
        throw new Error(
          `Permission denied when creating project at ${projectPath}. ` +
          'Try running with appropriate permissions or choose a different directory.'
        );
      } else if (error.message.includes('ENOSPC')) {
        throw new Error(
          'Not enough disk space to create project. Free up some space and try again.'
        );
      } else if (error.message.includes('Template not found')) {
        throw new Error(
          'Template files are missing. This might be a corrupted installation. ' +
          'Try reinstalling launchstack.'
        );
      }
    }
    
    throw error;
  }
}

/**
 * Copies template files from source to destination
 */
async function copyTemplate(sourcePath: string, destPath: string): Promise<void> {
  // Check if source template exists
  if (!(await fs.pathExists(sourcePath))) {
    throw new Error(`Template not found at: ${sourcePath}`);
  }

  // Verify the template has required files
  const requiredFiles = ['package.json', 'src', 'vite.config.ts'];
  for (const file of requiredFiles) {
    const filePath = path.join(sourcePath, file);
    if (!(await fs.pathExists(filePath))) {
      throw new Error(
        `Template is incomplete: missing ${file}. ` +
        'This might be a corrupted installation.'
      );
    }
  }

  // Copy all files
  try {
    await fs.copy(sourcePath, destPath, {
      overwrite: true,
      errorOnExist: false,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to copy template files: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Renames template dotfiles (prefixed with _) to actual dotfiles
 */
async function renameDotfiles(projectPath: string): Promise<void> {
  const dotfileMap = {
    '_gitignore': '.gitignore',
    '_env.example': '.env.example',
    '_env': '.env',
  };

  for (const [templateName, actualName] of Object.entries(dotfileMap)) {
    const templatePath = path.join(projectPath, templateName);
    const actualPath = path.join(projectPath, actualName);

    if (await fs.pathExists(templatePath)) {
      await fs.rename(templatePath, actualPath);
    }
  }
}

/**
 * Replaces placeholders in template files
 */
async function replacePlaceholders(
  projectPath: string,
  preferences: UserPreferences
): Promise<void> {
  const filesToUpdate = ['package.json', 'README.md'];
  
  for (const fileName of filesToUpdate) {
    const filePath = path.join(projectPath, fileName);
    
    if (await fs.pathExists(filePath)) {
      let content = await fs.readFile(filePath, 'utf-8');
      
      // Replace {{PROJECT_NAME}} with actual project name
      content = content.replace(/\{\{PROJECT_NAME\}\}/g, preferences.projectName);
      
      await fs.writeFile(filePath, content, 'utf-8');
    }
  }
}
