/**
 * Pino Logger
 * IronWorks Gym · SPManchester Private Limited
 */
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  transport:
    process.env.NODE_ENV !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'HH:MM:ss' } }
      : undefined,
  base: { service: 'ironworks-api', version: '2.0.0' },
});

export default logger;
