import fs from 'fs-extra';
import path from 'path';
import type { Installer } from './types.js';
import type { UserPreferences } from '../types.js';
import { addDependencies } from '../utils/package-json.js';
import { getTemplatePath } from '../helpers/scaffold.js';

export const tanstackQueryInstaller: Installer = {
  name: 'TanStack Query',

  shouldInstall(preferences: UserPreferences): boolean {
    return preferences.features.tanstackQuery;
  },

  async install(projectPath: string, preferences: UserPreferences): Promise<void> {
    // Add dependencies
    await addDependencies(projectPath, {
      dependencies: {
        '@tanstack/react-query': '^5.64.2',
      },
      devDependencies: {
        '@tanstack/react-query-devtools': '^5.64.2',
      },
    });

    // Get template paths
    const queryTemplatePath = path.join(getTemplatePath(), 'extras', 'tanstack-query');

    // Create lib directory for providers
    const libDir = path.join(projectPath, 'src', 'lib');
    await fs.ensureDir(libDir);

    // Copy query provider
    const providerSource = path.join(queryTemplatePath, 'query-provider.tsx');
    const providerDest = path.join(libDir, 'query-provider.tsx');
    await fs.copy(providerSource, providerDest);

    // Create hooks directory
    const hooksDir = path.join(projectPath, 'src', 'hooks');
    await fs.ensureDir(hooksDir);

    // Copy example queries
    const queriesSource = path.join(queryTemplatePath, 'example-queries.ts');
    const queriesDest = path.join(hooksDir, 'example-queries.ts');
    await fs.copy(queriesSource, queriesDest);

    // Update main.tsx to wrap App with QueryProvider
    await updateMainTsx(projectPath);
  },
};

async function updateMainTsx(projectPath: string): Promise<void> {
  const mainTsxPath = path.join(projectPath, 'src', 'main.tsx');
  const content = await fs.readFile(mainTsxPath, 'utf-8');

  // Add QueryProvider import and wrap App
  const updated = content
    .replace(
      'import "./index.css"',
      'import "./index.css"\nimport { QueryProvider } from \'./lib/query-provider\''
    )
    .replace(
      '    <App />',
      '    <QueryProvider>\n      <App />\n    </QueryProvider>'
    );

  await fs.writeFile(mainTsxPath, updated);
}
