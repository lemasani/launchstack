import { describe, it, expect } from 'vitest';
import { detectPackageManager, getRunCommand, getInstallCommand } from '../src/utils/package-manager.js';

describe('package-manager', () => {
  describe('detectPackageManager', () => {
    it('should detect npm when no user agent is present', () => {
      const originalAgent = process.env.npm_config_user_agent;
      delete process.env.npm_config_user_agent;
      
      expect(detectPackageManager()).toBe('npm');
      
      process.env.npm_config_user_agent = originalAgent;
    });

    it('should detect pnpm from user agent', () => {
      const originalAgent = process.env.npm_config_user_agent;
      process.env.npm_config_user_agent = 'pnpm/9.0.0';
      
      expect(detectPackageManager()).toBe('pnpm');
      
      process.env.npm_config_user_agent = originalAgent;
    });
  });

  describe('getRunCommand', () => {
    it('should return correct run commands', () => {
      expect(getRunCommand('npm')).toBe('npm run');
      expect(getRunCommand('pnpm')).toBe('pnpm');
      expect(getRunCommand('yarn')).toBe('yarn');
      expect(getRunCommand('bun')).toBe('bun');
    });
  });

  describe('getInstallCommand', () => {
    it('should return correct install commands', () => {
      expect(getInstallCommand('npm')).toBe('npm install');
      expect(getInstallCommand('pnpm')).toBe('pnpm install');
      expect(getInstallCommand('yarn')).toBe('yarn');
      expect(getInstallCommand('bun')).toBe('bun install');
    });
  });
});
