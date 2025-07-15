import { ZodError } from 'zod';

export function formatZodError(error: ZodError) {
  const formatted: Record<string, string> = {};

  for (const issue of error.issues) {
    const path = issue.path.join('.');
    formatted[path] = issue.message;
  }

  return {
    error: 'Validation error',
    fields: formatted,
  };
}
