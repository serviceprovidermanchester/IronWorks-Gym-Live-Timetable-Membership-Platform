/**
 * Prisma Client Singleton & Neon Serverless Connection Pooling
 * IronWorks Gym · SPManchester Private Limited
 * Supports PostgreSQL 16 local & Neon serverless pooled connections
 */
import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Detect if running on Neon serverless connection pooler
const isNeonPooler = (process.env.DATABASE_URL || '').includes('-pooler.');

const dbUrl =
  process.env.DATABASE_URL ||
  'postgresql://ironworks:ironworks_dev_password@localhost:5432/ironworks_db';

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? [{ emit: 'event', level: 'query' }, { emit: 'event', level: 'error' }]
        : [{ emit: 'event', level: 'error' }],
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

(prisma as any).$on?.('error', (e: any) => {
  logger.error({ err: e }, 'Prisma database error');
});

if (isNeonPooler) {
  logger.info('Neon serverless connection pooler configured for PostgreSQL');
}

export default prisma;
