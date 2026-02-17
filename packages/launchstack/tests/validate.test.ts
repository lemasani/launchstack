import { describe, it, expect } from 'vitest';
import { validateProjectName } from '../src/helpers/validate.js';

describe('validateProjectName', () => {
  it('should accept valid project names', () => {
    expect(validateProjectName('my-app')).toBe(true);
    expect(validateProjectName('my-react-app')).toBe(true);
    expect(validateProjectName('app123')).toBe(true);
    expect(validateProjectName('my_app')).toBe(true);
    expect(validateProjectName('123app')).toBe(true); // Numbers at start are allowed
  });

  it('should reject empty names', () => {
    const result = validateProjectName('');
    expect(result).toContain('Project name cannot be empty');
  });

  it('should reject names starting with dots', () => {
    const result = validateProjectName('.hidden');
    expect(result).toContain('cannot start with a dot');
  });

  it('should reject names with invalid characters', () => {
    const result = validateProjectName('my app');
    expect(result).toContain('can only contain');
  });

  it('should reject uppercase names', () => {
    const result = validateProjectName('MyApp');
    expect(result).toContain('must be lowercase');
  });

  it('should reject reserved npm package names', () => {
    expect(validateProjectName('node_modules')).toContain('reserved');
    // Note: favicon.ico would be rejected by the character validation before reserved check
  });

  it('should reject names that are too long', () => {
    const longName = 'a'.repeat(215);
    const result = validateProjectName(longName);
    expect(result).toContain('214 characters or less');
  });
});
