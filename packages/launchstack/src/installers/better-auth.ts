import fs from 'fs-extra';
import path from 'path';
import type { Installer } from './types.js';
import type { UserPreferences } from '../types.js';
import { addDependencies } from '../utils/package-json.js';
import { getTemplatePath } from '../helpers/scaffold.js';

export const betterAuthInstaller: Installer = {
  name: 'Better Auth',

  shouldInstall(preferences: UserPreferences): boolean {
    return preferences.features.betterAuth;
  },

  async install(projectPath: string, preferences: UserPreferences): Promise<void> {
    // Add dependencies
    await addDependencies(projectPath, {
      dependencies: {
        'better-auth': '^1.4.1',
        'better-sqlite3': '^11.8.1',
      },
    });

    // Get template paths
    const authTemplatePath = path.join(getTemplatePath(), 'extras', 'better-auth');

    // Create lib directory
    const libDir = path.join(projectPath, 'src', 'lib');
    await fs.ensureDir(libDir);

    // Copy auth config files
    const authSource = path.join(authTemplatePath, 'auth.ts');
    const authDest = path.join(libDir, 'auth.ts');
    await fs.copy(authSource, authDest);

    const authClientSource = path.join(authTemplatePath, 'auth-client.ts');
    const authClientDest = path.join(libDir, 'auth-client.ts');
    await fs.copy(authClientSource, authClientDest);

    // Create pages directory if using a router
    if (preferences.router !== 'none') {
      await copyAuthPages(projectPath, preferences.router, authTemplatePath);
    }

    // Create .env file with auth config
    await updateEnvFile(projectPath);
  },
};

async function copyAuthPages(
  projectPath: string,
  router: string,
  authTemplatePath: string
): Promise<void> {
  const loginSource = path.join(authTemplatePath, 'login.tsx');
  
  if (router === 'react-router') {
    // Copy to pages directory
    const pagesDir = path.join(projectPath, 'src', 'pages');
    await fs.ensureDir(pagesDir);
    const loginDest = path.join(pagesDir, 'login.tsx');
    await fs.copy(loginSource, loginDest);
  } else if (router === 'tanstack-router') {
    // Copy to routes directory
    const routesDir = path.join(projectPath, 'src', 'routes');
    await fs.ensureDir(routesDir);
    const loginDest = path.join(routesDir, 'login.tsx');
    await fs.copy(loginSource, loginDest);
  }
}

async function updateEnvFile(projectPath: string): Promise<void> {
  const envPath = path.join(projectPath, '.env');
  const envExists = await fs.pathExists(envPath);

  const authConfig = `
# Better Auth Configuration
BETTER_AUTH_SECRET=your-secret-key-here-change-in-production
BETTER_AUTH_URL=http://localhost:5173
`;

  if (!envExists) {
    await fs.writeFile(envPath, authConfig);
  } else {
    const content = await fs.readFile(envPath, 'utf-8');
    if (!content.includes('BETTER_AUTH_SECRET')) {
      await fs.writeFile(envPath, content + authConfig);
    }
  }
}
