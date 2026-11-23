/**
 * Redis Client & Upstash / Local Cache Engine
 * IronWorks Gym · SPManchester Private Limited
 * Usage: sessions, rate-limit counters, timetable cache, webhook idempotency
 */
import Redis from 'ioredis';
import { logger } from './logger';

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';

// Configure ioredis with TLS if using Upstash (rediss://)
const isUpstash = REDIS_URL.startsWith('rediss://');

export const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 1,
  enableReadyCheck: false,
  lazyConnect: true,
  retryStrategy: () => null,
  tls: isUpstash ? { rejectUnauthorized: false } : undefined,
});

redis.on('connect', () => logger.info({ isUpstash }, 'Redis cache connected'));
redis.on('error', (err) => logger.warn({ err: err.message }, 'Redis cache warning (falling back gracefully)'));
redis.on('close', () => logger.warn('Redis connection closed'));

/** Cache helpers */
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const val = await redis.get(key);
      return val ? (JSON.parse(val) as T) : null;
    } catch {
      return null;
    }
  },

  async set(key: string, value: unknown, ttlSeconds = 300): Promise<void> {
    try {
      await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch (err) {
      logger.warn({ key, err }, 'Failed to set cache key');
    }
  },

  async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (err) {
      logger.warn({ key, err }, 'Failed to delete cache key');
    }
  },

  async flush(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length) await redis.del(...keys);
    } catch (err) {
      logger.warn({ pattern, err }, 'Failed to flush cache keys');
    }
  },

  /** Webhook Idempotency: Prevent processing duplicate Stripe/GoCardless events */
  async isEventProcessed(eventId: string): Promise<boolean> {
    try {
      const exists = await redis.get(`event:processed:${eventId}`);
      return Boolean(exists);
    } catch {
      return false;
    }
  },

  async markEventProcessed(eventId: string, ttlSeconds = 86400): Promise<void> {
    try {
      await redis.set(`event:processed:${eventId}`, '1', 'EX', ttlSeconds); // Store for 24h
    } catch (err) {
      logger.warn({ eventId, err }, 'Failed to mark event processed');
    }
  },

  /** Invalidate all timetable cache keys when classes change */
  async invalidateTimetableCache(): Promise<void> {
    await this.flush('classes:*');
  },
};

export default redis;
