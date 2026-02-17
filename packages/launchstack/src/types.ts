export interface UserPreferences {
  projectName: string;
  router: 'react-router' | 'tanstack-router' | 'none';
  features: {
    tanstackQuery: boolean;
    betterAuth: boolean;
    axios: boolean;
  };
  formLibrary: 'react-hook-form' | 'tanstack-form' | 'none';
  git: boolean;
  install: boolean;
}

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';
