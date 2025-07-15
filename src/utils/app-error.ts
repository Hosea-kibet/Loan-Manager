type AppError = {
  statusCode: number;
  message: string;
  isOperational: boolean;
};

export const createError = (
  message: string,
  statusCode = 500,
  isOperational = true
): AppError => ({
  message,
  statusCode,
  isOperational,
});

export const isAppError = (err: any): err is AppError =>
  err && typeof err.statusCode === 'number' && typeof err.message === 'string';
