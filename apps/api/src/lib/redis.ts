/**
 * Redis Client (ioredis)
 * IronWorks Gym · SPManchester Private Limited
 * Usage: sessions, rate-limit counters, timetable cache
 */
import Redis from 'ioredis';
import { logger } from './logger';

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';

export const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: false,
});

redis.on('connect', () => logger.info('Redis connected'));
redis.on('error', (err) => logger.error({ err }, 'Redis error'));
redis.on('close', () => logger.warn('Redis connection closed'));

/** Cache helpers */
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const val = await redis.get(key);
    return val ? (JSON.parse(val) as T) : null;
  },
  async set(key: string, value: unknown, ttlSeconds = 300): Promise<void> {
    await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  },
  async del(key: string): Promise<void> {
    await redis.del(key);
  },
  async flush(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length) await redis.del(...keys);
  },
};

export default redis;
