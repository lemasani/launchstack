import fs from 'fs-extra';
import path from 'path';
import type { Dependencies } from '../installers/types.js';

/**
 * Reads package.json from the project
 */
export async function readPackageJson(projectPath: string): Promise<any> {
  const packageJsonPath = path.join(projectPath, 'package.json');
  const content = await fs.readFile(packageJsonPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Writes package.json to the project
 */
export async function writePackageJson(
  projectPath: string,
  packageJson: any
): Promise<void> {
  const packageJsonPath = path.join(projectPath, 'package.json');
  const content = JSON.stringify(packageJson, null, 2) + '\n';
  await fs.writeFile(packageJsonPath, content, 'utf-8');
}

/**
 * Adds dependencies to package.json
 */
export async function addDependencies(
  projectPath: string,
  deps: Dependencies
): Promise<void> {
  const packageJson = await readPackageJson(projectPath);

  if (deps.dependencies) {
    packageJson.dependencies = {
      ...(packageJson.dependencies || {}),
      ...deps.dependencies,
    };
    // Sort dependencies alphabetically
    packageJson.dependencies = Object.keys(packageJson.dependencies)
      .sort()
      .reduce((acc, key) => {
        acc[key] = packageJson.dependencies[key];
        return acc;
      }, {} as Record<string, string>);
  }

  if (deps.devDependencies) {
    packageJson.devDependencies = {
      ...(packageJson.devDependencies || {}),
      ...deps.devDependencies,
    };
    // Sort devDependencies alphabetically
    packageJson.devDependencies = Object.keys(packageJson.devDependencies)
      .sort()
      .reduce((acc, key) => {
        acc[key] = packageJson.devDependencies[key];
        return acc;
      }, {} as Record<string, string>);
  }

  await writePackageJson(projectPath, packageJson);
}
