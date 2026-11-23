/**
 * Auth Routes — /v1/auth
 * IronWorks Gym · SPManchester Private Limited
 *
 * POST /auth/register
 * POST /auth/login
 * POST /auth/logout
 * POST /auth/refresh
 * POST /auth/forgot-password
 * POST /auth/reset-password
 * GET  /auth/verify-email/:token
 * GET  /auth/me
 */
import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../lib/prisma';
import { redis } from '../lib/redis';
import { requireAuth } from '../middleware/auth';
import { authRateLimiter, registerRateLimiter } from '../middleware/rateLimiter';
import { AppError } from '../middleware/errorHandler';

const router = Router();

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'dev-secret');
const JWT_REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret');
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN ?? '30d';

// ── Schemas ───────────────────────────────────────────────────
const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// ── Helpers ───────────────────────────────────────────────────
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
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: '/v1/auth',
  });
}

// ── POST /register ────────────────────────────────────────────
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
      select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true },
    });

    // TODO: Send verification email via Resend
    res.status(201).json({ success: true, message: 'Account created — check your email to verify.', data: member });
  } catch (err) { next(err); }
});

// ── POST /login ───────────────────────────────────────────────
router.post('/login', authRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);
    const member = await prisma.member.findUnique({ where: { email } });
    if (!member || !await bcrypt.compare(password, member.passwordHash)) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }
    if (!member.isActive) throw new AppError('Account suspended — contact support.', 403, 'ACCOUNT_SUSPENDED');

    const sessionToken = uuidv4();
    await prisma.session.create({
      data: {
        token: sessionToken,
        memberId: member.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
      },
    });

    await prisma.member.update({ where: { id: member.id }, data: { lastLoginAt: new Date() } });

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(member.id, member.email, member.role),
      signRefreshToken(sessionToken),
    ]);

    setRefreshCookie(res, refreshToken);
    res.json({
      success: true,
      data: {
        accessToken,
        member: { id: member.id, email: member.email, firstName: member.firstName, lastName: member.lastName, role: member.role },
      },
    });
  } catch (err) { next(err); }
});

// ── POST /logout ──────────────────────────────────────────────
router.post('/logout', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.session.deleteMany({ where: { memberId: req.member!.id } });
    res.clearCookie('refreshToken', { path: '/v1/auth' });
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) { next(err); }
});

// ── POST /refresh ─────────────────────────────────────────────
router.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) throw new AppError('No refresh token', 401, 'NO_REFRESH_TOKEN');

    const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
    const sessionToken = payload['sessionToken'] as string;

    const session = await prisma.session.findUnique({ where: { token: sessionToken }, include: { member: true } });
    if (!session || session.expiresAt < new Date()) throw new AppError('Session expired', 401, 'SESSION_EXPIRED');

    const accessToken = await signAccessToken(session.member.id, session.member.email, session.member.role);
    res.json({ success: true, data: { accessToken } });
  } catch (err) { next(err); }
});

// ── GET /me ───────────────────────────────────────────────────
router.get('/me', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const member = await prisma.member.findUnique({
      where: { id: req.member!.id },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true, avatarUrl: true, role: true, emailVerifiedAt: true, lastLoginAt: true, createdAt: true, membership: { select: { tier: true, status: true, currentPeriodEnd: true } } },
    });
    if (!member) throw new AppError('Member not found', 404, 'NOT_FOUND');
    res.json({ success: true, data: member });
  } catch (err) { next(err); }
});

export default router;
