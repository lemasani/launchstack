import fs from 'fs-extra';
import path from 'path';
import type { Installer } from './types.js';
import type { UserPreferences } from '../types.js';
import { addDependencies } from '../utils/package-json.js';
import { getTemplatePath } from '../helpers/scaffold.js';

export const reactRouterInstaller: Installer = {
  name: 'React Router',

  shouldInstall(preferences: UserPreferences): boolean {
    return preferences.router === 'react-router';
  },

  async install(projectPath: string, preferences: UserPreferences): Promise<void> {
    // Add dependencies
    await addDependencies(projectPath, {
      dependencies: {
        'react-router-dom': '^7.13.0',
      },
    });

    // Get template paths
    const routerTemplatePath = path.join(getTemplatePath(), 'extras', 'react-router');

    // Create pages directory
    const pagesDir = path.join(projectPath, 'src', 'pages');
    await fs.ensureDir(pagesDir);

    // Copy page files
    const pageFiles = ['home.tsx', 'about.tsx', 'dashboard.tsx'];
    for (const file of pageFiles) {
      const sourcePath = path.join(routerTemplatePath, file);
      const destPath = path.join(pagesDir, file);
      await fs.copy(sourcePath, destPath);
    }

    // Replace App.tsx with router version
    const appSourcePath = path.join(routerTemplatePath, 'App.tsx');
    const appDestPath = path.join(projectPath, 'src', 'App.tsx');
    await fs.copy(appSourcePath, appDestPath, { overwrite: true });
  },
};
