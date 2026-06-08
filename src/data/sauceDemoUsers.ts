import { sauceDemoCredentials } from '../types/UserCredentials';

export const sauceDemoUsers = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
} satisfies Record<string, sauceDemoCredentials>;