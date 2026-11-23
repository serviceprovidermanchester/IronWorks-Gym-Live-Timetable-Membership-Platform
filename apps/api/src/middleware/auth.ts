/**
 * Auth Middleware — JWT verification
 * IronWorks Gym · SPManchester Private Limited
 *
 * Verifies the Bearer token, attaches req.member to the request.
 * Use requireAdmin() on top of requireAuth() for admin-only routes.
 */
import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';
import prisma from '../lib/prisma';
import { logger } from '../lib/logger';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'dev-secret-change-in-production'
);

export interface AuthPayload {
  sub: string;      // memberId
  email: string;
  role: string;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      member?: { id: string; email: string; role: string };
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'No token provided', code: 'UNAUTHORIZED' });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    req.member = {
      id: payload.sub as string,
      email: payload['email'] as string,
      role: payload['role'] as string,
    };
    next();
  } catch (err) {
    logger.warn({ err }, 'JWT verification failed');
    res.status(401).json({ success: false, error: 'Invalid or expired token', code: 'TOKEN_INVALID' });
  }
}

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.member) {
    res.status(401).json({ success: false, error: 'Unauthorized', code: 'UNAUTHORIZED' });
    return;
  }
  if (req.member.role !== 'ADMIN' && req.member.role !== 'STAFF') {
    res.status(403).json({ success: false, error: 'Forbidden — admin access required', code: 'FORBIDDEN' });
    return;
  }
  next();
}

export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return next();
  const token = authHeader.slice(7);
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    req.member = {
      id: payload.sub as string,
      email: payload['email'] as string,
      role: payload['role'] as string,
    };
  } catch {
    // Ignore — optional auth
  }
  next();
}
