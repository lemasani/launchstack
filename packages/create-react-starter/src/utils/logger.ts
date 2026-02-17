import pc from 'picocolors';
import ora, { Ora } from 'ora';

/**
 * Console logger with colored output
 */
export const logger = {
  info: (message: string) => {
    console.log(pc.blue('ℹ'), message);
  },

  success: (message: string) => {
    console.log(pc.green('✔'), message);
  },

  error: (message: string) => {
    console.log(pc.red('✖'), message);
  },

  warn: (message: string) => {
    console.log(pc.yellow('⚠'), message);
  },

  break: () => {
    console.log('');
  },
};

/**
 * Creates a spinner for loading states
 */
export function createSpinner(text: string): Ora {
  return ora({
    text,
    color: 'cyan',
  });
}
