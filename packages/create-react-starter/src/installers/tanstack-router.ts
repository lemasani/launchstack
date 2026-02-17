import fs from 'fs-extra';
import path from 'path';
import type { Installer } from './types.js';
import type { UserPreferences } from '../types.js';
import { addDependencies } from '../utils/package-json.js';
import { getTemplatePath } from '../helpers/scaffold.js';

export const tanstackRouterInstaller: Installer = {
  name: 'TanStack Router',

  shouldInstall(preferences: UserPreferences): boolean {
    return preferences.router === 'tanstack-router';
  },

  async install(projectPath: string, preferences: UserPreferences): Promise<void> {
    // Add dependencies
    await addDependencies(projectPath, {
      dependencies: {
        '@tanstack/react-router': '^1.91.8',
      },
      devDependencies: {
        '@tanstack/router-devtools': '^1.91.8',
        '@tanstack/router-plugin': '^1.91.7',
      },
    });

    // Get template paths
    const routerTemplatePath = path.join(getTemplatePath(), 'extras', 'tanstack-router');

    // Create routes directory
    const routesDir = path.join(projectPath, 'src', 'routes');
    await fs.ensureDir(routesDir);

    // Copy route files
    const routeFiles = ['__root.tsx', 'index.tsx', 'about.tsx', 'dashboard.tsx'];
    for (const file of routeFiles) {
      const sourcePath = path.join(routerTemplatePath, file);
      const destPath = path.join(routesDir, file);
      await fs.copy(sourcePath, destPath);
    }

    // Copy routeTree.gen.ts to src/
    const routeTreeSource = path.join(routerTemplatePath, 'routeTree.gen.ts');
    const routeTreeDest = path.join(projectPath, 'src', 'routeTree.gen.ts');
    await fs.copy(routeTreeSource, routeTreeDest);

    // Replace App.tsx with router version
    const appSourcePath = path.join(routerTemplatePath, 'App.tsx');
    const appDestPath = path.join(projectPath, 'src', 'App.tsx');
    await fs.copy(appSourcePath, appDestPath, { overwrite: true });

    // Update vite.config.ts to include TanStack Router plugin
    await updateViteConfig(projectPath);
  },
};

async function updateViteConfig(projectPath: string): Promise<void> {
  const viteConfigPath = path.join(projectPath, 'vite.config.ts');
  const content = await fs.readFile(viteConfigPath, 'utf-8');

  // Add TanStack Router plugin import
  const updatedContent = content
    .replace(
      'import react from "@vitejs/plugin-react"',
      'import react from "@vitejs/plugin-react"\nimport { TanStackRouterVite } from "@tanstack/router-plugin/vite"'
    )
    .replace(
      'plugins: [react(), tailwindcss()]',
      'plugins: [TanStackRouterVite(), react(), tailwindcss()]'
    );

  await fs.writeFile(viteConfigPath, updatedContent);
}
