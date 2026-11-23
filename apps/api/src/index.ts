/**
 * IronWorks Gym API — Entry Point
 * SPManchester Private Limited · https://www.spmanchester.com
 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { pinoHttp } from 'pino-http';

import { logger } from './lib/logger';
import { errorHandler } from './middleware/errorHandler';
import { globalRateLimiter } from './middleware/rateLimiter';

// Routes
import authRoutes from './routes/auth';
import classRoutes from './routes/classes';
import coachRoutes from './routes/coaches';
import membershipRoutes from './routes/memberships';
import bookingRoutes from './routes/bookings';
import adminRoutes from './routes/admin';
import webhookRoutes from './routes/webhooks';

const app = express();
const PORT = process.env.PORT ?? 4000;
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:3000';

// ── Security middleware ───────────────────────────────────────
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
}));

app.use(cors({
  origin: [
    FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Webhooks (raw body BEFORE json parser) ────────────────────
app.use('/v1/webhooks', express.raw({ type: 'application/json' }));

// ── Body parsing ──────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// ── Request logging ───────────────────────────────────────────
app.use(pinoHttp({ logger, autoLogging: { ignore: (req) => req.url === '/health' } }));

// ── Global rate limiting ──────────────────────────────────────
app.use(globalRateLimiter);

// ── Health check ──────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ironworks-api',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    built_by: 'SPManchester Private Limited',
  });
});

// ── API v1 routes ─────────────────────────────────────────────
app.use('/v1/auth', authRoutes);
app.use('/v1/classes', classRoutes);
app.use('/v1/coaches', coachRoutes);
app.use('/v1/memberships', membershipRoutes);
app.use('/v1/bookings', bookingRoutes);
app.use('/v1/admin', adminRoutes);
app.use('/v1/webhooks', webhookRoutes);

// ── 404 handler ───────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    code: 'NOT_FOUND',
  });
});

// ── Global error handler ──────────────────────────────────────
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────────
app.listen(PORT, () => {
  logger.info(
    { port: PORT, env: process.env.NODE_ENV },
    '🏋️ IronWorks API running'
  );
});

export default app;
