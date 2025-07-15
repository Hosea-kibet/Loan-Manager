// src/middleware/error-handler.ts
import { ErrorRequestHandler } from 'express';
import { isAppError } from '../utils/app-error';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('[Global Error Handler]', err);

  if (isAppError(err)) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Something went wrong' });
  }

  return;
};
