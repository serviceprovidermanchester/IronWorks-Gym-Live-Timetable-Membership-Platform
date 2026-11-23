/**
 * Rate Limiters
 * IronWorks Gym · SPManchester Private Limited
 */
import rateLimit from 'express-rate-limit';

/** Global: 200 req/min per IP */
export const globalRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests — slow down.', code: 'RATE_LIMITED' },
});

/** Auth routes: 10 req/min per IP */
export const authRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many auth attempts — try again in a minute.', code: 'AUTH_RATE_LIMITED' },
});

/** Register: 5 req/15min per IP */
export const registerRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many registrations from this IP.', code: 'REGISTER_RATE_LIMITED' },
});
