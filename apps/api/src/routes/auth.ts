/**
 * Auth Routes — /v1/auth
 * IronWorks Gym · SPManchester Private Limited
 *
 * POST /auth/register
 * POST /auth/login
 * POST /auth/logout
 * POST /auth/refresh
 * GET  /auth/me
 */
import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { emailService } from '../lib/email';
import { logger } from '../lib/logger';
import { requireAuth } from '../middleware/auth';
import { authRateLimiter, registerRateLimiter } from '../middleware/rateLimiter';
import { AppError } from '../middleware/errorHandler';

const router = Router();

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev_jwt_secret_change_in_production');
const JWT_REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET || 'dev_jwt_refresh_secret');
const JWT_EXPIRES_IN = '15m';
const JWT_REFRESH_EXPIRES_IN = '30d';

const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
  phone: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

async function signAccessToken(memberId: string, email: string, role: string): Promise<string> {
  return new SignJWT({ email, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(memberId)
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET);
}

async function signRefreshToken(sessionToken: string): Promise<string> {
  return new SignJWT({ sessionToken })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_REFRESH_EXPIRES_IN)
    .sign(JWT_REFRESH_SECRET);
}

function setRefreshCookie(res: Response, token: string): void {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/v1/auth',
  });
}

// POST /register
router.post('/register', registerRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = RegisterSchema.parse(req.body);
    const existing = await prisma.member.findUnique({ where: { email: body.email } });
    if (existing) throw new AppError('Email already registered', 409, 'EMAIL_TAKEN');

    const passwordHash = await bcrypt.hash(body.password, 12);
    const member = await prisma.member.create({
      data: {
        email: body.email,
        passwordHash,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
      },
      select: { id: true, email: true, firstName: true, lastName: true, createdAt: true },
    });

    const memberRef = `IW-2026-M${member.id.slice(-4).toUpperCase()}`;

    // Disptach welcome email via Resend
    emailService.sendWelcomeEmail({
      email: member.email,
      name: `${member.firstName} ${member.lastName}`,
      memberRef,
    }).catch((err) => logger.error({ err }, 'Welcome email trigger failed'));

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: { member: { ...member, memberRef } },
    });
  } catch (err) { next(err); }
});

// POST /login
router.post('/login', authRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);
    const member = await prisma.member.findUnique({ where: { email } });
    if (!member) throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');

    const valid = await bcrypt.compare(password, member.passwordHash);
    if (!valid) throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');

    const sessionToken = uuidv4();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await prisma.session.create({
      data: {
        token: sessionToken,
        memberId: member.id,
        expiresAt,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
      },
    });

    const role = (member as any).role || 'MEMBER';
    const accessToken = await signAccessToken(member.id, member.email, role);
    const refreshToken = await signRefreshToken(sessionToken);

    setRefreshCookie(res, refreshToken);
    await prisma.member.update({ where: { id: member.id }, data: { lastLoginAt: new Date() } });

    res.json({
      success: true,
      data: {
        accessToken,
        member: {
          id: member.id,
          email: member.email,
          firstName: member.firstName,
          lastName: member.lastName,
          role,
          memberRef: `IW-2026-M${member.id.slice(-4).toUpperCase()}`,
        },
      },
    });
  } catch (err) { next(err); }
});

// POST /logout
router.post('/logout', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawCookie = req.cookies?.refreshToken;
    if (rawCookie) {
      try {
        const { payload } = await jwtVerify(rawCookie, JWT_REFRESH_SECRET);
        await prisma.session.deleteMany({ where: { token: payload.sessionToken as string } });
      } catch {}
    }
    res.clearCookie('refreshToken', { path: '/v1/auth' });
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) { next(err); }
});

// POST /refresh
router.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawCookie = req.cookies?.refreshToken;
    if (!rawCookie) throw new AppError('Refresh token required', 401, 'NO_REFRESH_TOKEN');

    let sessionToken: string;
    try {
      const { payload } = await jwtVerify(rawCookie, JWT_REFRESH_SECRET);
      sessionToken = payload.sessionToken as string;
    } catch {
      throw new AppError('Invalid or expired refresh token', 401, 'INVALID_REFRESH_TOKEN');
    }

    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { member: true },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new AppError('Session expired', 401, 'SESSION_EXPIRED');
    }

    const role = (session.member as any).role || 'MEMBER';
    const accessToken = await signAccessToken(session.member.id, session.member.email, role);
    res.json({ success: true, data: { accessToken } });
  } catch (err) { next(err); }
});

// GET /me
router.get('/me', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const member = await prisma.member.findUnique({
      where: { id: req.member!.id },
      include: {
        membership: true,
        _count: { select: { bookings: true } },
      },
    });
    if (!member) throw new AppError('Member not found', 404, 'NOT_FOUND');

    res.json({
      success: true,
      data: {
        id: member.id,
        email: member.email,
        firstName: member.firstName,
        lastName: member.lastName,
        phone: member.phone,
        memberRef: `IW-2026-M${member.id.slice(-4).toUpperCase()}`,
        membership: member.membership,
        totalBookings: member._count.bookings,
        createdAt: member.createdAt,
      },
    });
  } catch (err) { next(err); }
});

export default router;
