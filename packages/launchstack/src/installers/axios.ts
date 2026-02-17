import fs from 'fs-extra';
import path from 'path';
import type { Installer } from './types.js';
import type { UserPreferences } from '../types.js';
import { addDependencies } from '../utils/package-json.js';
import { getTemplatePath } from '../helpers/scaffold.js';

export const axiosInstaller: Installer = {
  name: 'Axios',

  shouldInstall(preferences: UserPreferences): boolean {
    return preferences.features.axios;
  },

  async install(projectPath: string, preferences: UserPreferences): Promise<void> {
    // Add dependencies
    await addDependencies(projectPath, {
      dependencies: {
        'axios': '^1.7.9',
      },
    });

    // Get template paths
    const axiosTemplatePath = path.join(getTemplatePath(), 'extras', 'axios');

    // Create lib directory
    const libDir = path.join(projectPath, 'src', 'lib');
    await fs.ensureDir(libDir);

    // Copy api client
    const apiClientSource = path.join(axiosTemplatePath, 'api-client.ts');
    const apiClientDest = path.join(libDir, 'api-client.ts');
    await fs.copy(apiClientSource, apiClientDest);

    // Create .env file if it doesn't exist
    await createEnvFile(projectPath);
  },
};

async function createEnvFile(projectPath: string): Promise<void> {
  const envPath = path.join(projectPath, '.env');
  const envExists = await fs.pathExists(envPath);

  if (!envExists) {
    const envContent = `# API Configuration
VITE_API_URL=http://localhost:3000/api
`;
    await fs.writeFile(envPath, envContent);
  } else {
    // Append to existing .env if VITE_API_URL doesn't exist
    const content = await fs.readFile(envPath, 'utf-8');
    if (!content.includes('VITE_API_URL')) {
      const updated = content + '\n# API Configuration\nVITE_API_URL=http://localhost:3000/api\n';
      await fs.writeFile(envPath, updated);
    }
  }
}
