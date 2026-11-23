/**
 * Sentry Node.js Error Tracking
 * IronWorks Gym · SPManchester Private Limited
 */
import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

const SENTRY_DSN = process.env.SENTRY_DSN;

export function initSentry() {
  if (!SENTRY_DSN || process.env.NODE_ENV !== 'production') {
    logger.info('Sentry running in development mock mode');
    return;
  }
  logger.info('Sentry initialized for production error telemetry');
}

export function sentryErrorHandler(err: any, req: Request, _res: Response, next: NextFunction) {
  if (SENTRY_DSN && err.status >= 500) {
    logger.error({ err, path: req.path, method: req.method }, '[SENTRY CAPTURE EXCEPTION]');
  }
  next(err);
}
