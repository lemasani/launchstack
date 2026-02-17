import fs from 'fs-extra';
import path from 'path';
import type { Installer } from './types.js';
import type { UserPreferences } from '../types.js';
import { addDependencies } from '../utils/package-json.js';
import { getTemplatePath } from '../helpers/scaffold.js';

export const tanstackFormInstaller: Installer = {
  name: 'TanStack Form',

  shouldInstall(preferences: UserPreferences): boolean {
    return preferences.formLibrary === 'tanstack-form';
  },

  async install(projectPath: string, preferences: UserPreferences): Promise<void> {
    // Add dependencies
    await addDependencies(projectPath, {
      dependencies: {
        '@tanstack/react-form': '^0.39.2',
        '@tanstack/zod-form-adapter': '^0.39.2',
        'zod': '^3.24.1',
      },
    });

    // Get template paths
    const formTemplatePath = path.join(getTemplatePath(), 'extras', 'tanstack-form');

    // Create components/forms directory
    const formsDir = path.join(projectPath, 'src', 'components', 'forms');
    await fs.ensureDir(formsDir);

    // Copy example form
    const exampleFormSource = path.join(formTemplatePath, 'example-form.tsx');
    const exampleFormDest = path.join(formsDir, 'example-form.tsx');
    await fs.copy(exampleFormSource, exampleFormDest);
  },
};
