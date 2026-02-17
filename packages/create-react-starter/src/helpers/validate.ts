import fs from 'fs-extra';
import path from 'path';

/**
 * Validates project name according to npm package naming rules
 */
export function validateProjectName(name: string): string | true {
  if (!name || name.trim().length === 0) {
    return 'Project name cannot be empty';
  }

  // NPM package name rules
  if (name.length > 214) {
    return 'Project name must be 214 characters or less';
  }

  if (name !== name.toLowerCase()) {
    return 'Project name must be lowercase';
  }

  if (/^[._]/.test(name)) {
    return 'Project name cannot start with a dot or underscore';
  }

  if (!/^[a-z0-9-_~]+$/.test(name)) {
    return 'Project name can only contain lowercase letters, numbers, hyphens, underscores, and tildes';
  }

  if (/\s/.test(name)) {
    return 'Project name cannot contain spaces';
  }

  // Reserved names
  const reserved = ['node_modules', 'favicon.ico'];
  if (reserved.includes(name)) {
    return `Project name "${name}" is reserved`;
  }

  return true;
}

/**
 * Checks if a directory exists
 */
export function directoryExists(dirPath: string): boolean {
  return fs.existsSync(dirPath);
}

/**
 * Checks if a directory is empty
 */
export function isDirectoryEmpty(dirPath: string): boolean {
  if (!directoryExists(dirPath)) {
    return true;
  }

  const files = fs.readdirSync(dirPath);
  return files.length === 0;
}

/**
 * Gets the full path for a project
 */
export function getProjectPath(projectName: string): string {
  return path.resolve(process.cwd(), projectName);
}
