/**
 * Global Error Handler
 * IronWorks Gym · SPManchester Private Limited
 */
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../lib/logger';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR'
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Zod validation errors
  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: err.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
    });
    return;
  }

  // Application errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      code: err.code,
    });
    return;
  }

  // Prisma unique constraint
  if ((err as any).code === 'P2002') {
    res.status(409).json({
      success: false,
      error: 'A record with this value already exists',
      code: 'CONFLICT',
    });
    return;
  }

  // Unknown errors
  logger.error({ err, url: req.url, method: req.method }, 'Unhandled error');
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    code: 'INTERNAL_ERROR',
  });
}
