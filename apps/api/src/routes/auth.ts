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

// In-memory fallback user store for resilient development
interface InMemoryUser {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: string;
  memberRef: string;
}

const IN_MEMORY_USERS = new Map<string, InMemoryUser>();

// Pre-seed demo users
(async () => {
  try {
    const memberHash = await bcrypt.hash('MemberPassword123!', 10);
    const adminHash = await bcrypt.hash('AdminPassword123!', 10);

    IN_MEMORY_USERS.set('member@ironworksgym.com', {
      id: 'member-ironworks-id',
      email: 'member@ironworksgym.com',
      passwordHash: memberHash,
      firstName: 'Alex',
      lastName: 'Hunter',
      role: 'MEMBER',
      memberRef: 'IW-2026-M8842',
    });

    IN_MEMORY_USERS.set('admin@ironworksgym.com', {
      id: 'admin-ironworks-id',
      email: 'admin@ironworksgym.com',
      passwordHash: adminHash,
      firstName: 'IronWorks',
      lastName: 'Administrator',
      role: 'ADMIN',
      memberRef: 'IW-ADMIN-01',
    });
  } catch {}
})();

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
    const normalizedEmail = body.email.toLowerCase().trim();

    try {
      const existing = await prisma.member.findUnique({ where: { email: normalizedEmail } });
      if (existing) throw new AppError('Email already registered', 409, 'EMAIL_TAKEN');

      const passwordHash = await bcrypt.hash(body.password, 10);
      const member = await prisma.member.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
        },
        select: { id: true, email: true, firstName: true, lastName: true, createdAt: true },
      });

      const memberRef = `IW-2026-M${member.id.slice(-4).toUpperCase()}`;

      // Mirror into memory store so login works instantly
      IN_MEMORY_USERS.set(normalizedEmail, {
        id: member.id,
        email: normalizedEmail,
        passwordHash,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        role: 'MEMBER',
        memberRef,
      });

      emailService.sendWelcomeEmail({
        email: member.email,
        name: `${member.firstName} ${member.lastName}`,
        memberRef,
      }).catch(() => {});

      return res.status(201).json({
        success: true,
        message: 'Account created successfully. You can now sign in.',
        data: { member: { ...member, memberRef } },
      });
    } catch (dbErr: any) {
      if (dbErr instanceof AppError) throw dbErr;

      // PostgreSQL offline — fall back to in-memory store
      if (IN_MEMORY_USERS.has(normalizedEmail)) {
        throw new AppError('Email already registered', 409, 'EMAIL_TAKEN');
      }

      const passwordHash = await bcrypt.hash(body.password, 10);
      const memberId = `mem_${Date.now().toString(36)}`;
      const memberRef = `IW-2026-M${memberId.slice(-4).toUpperCase()}`;

      const newMember: InMemoryUser = {
        id: memberId,
        email: normalizedEmail,
        passwordHash,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        role: 'MEMBER',
        memberRef,
      };

      IN_MEMORY_USERS.set(normalizedEmail, newMember);

      emailService.sendWelcomeEmail({
        email: newMember.email,
        name: `${newMember.firstName} ${newMember.lastName}`,
        memberRef: newMember.memberRef,
      }).catch(() => {});

      return res.status(201).json({
        success: true,
        message: 'Account created successfully. You can now sign in.',
        data: {
          member: {
            id: newMember.id,
            email: newMember.email,
            firstName: newMember.firstName,
            lastName: newMember.lastName,
            memberRef: newMember.memberRef,
            createdAt: new Date(),
          },
        },
      });
    }
  } catch (err) { next(err); }
});

// POST /login
router.post('/login', authRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Fast path: in-memory store (covers demo accounts & recently registered users)
    const memUser = IN_MEMORY_USERS.get(normalizedEmail);
    if (memUser) {
      const valid = await bcrypt.compare(password, memUser.passwordHash);
      if (valid) {
        const accessToken = await signAccessToken(memUser.id, memUser.email, memUser.role);
        const sessionToken = uuidv4();
        const refreshToken = await signRefreshToken(sessionToken);
        setRefreshCookie(res, refreshToken);

        return res.json({
          success: true,
          data: {
            accessToken,
            member: {
              id: memUser.id,
              email: memUser.email,
              firstName: memUser.firstName,
              lastName: memUser.lastName,
              role: memUser.role,
              isAdmin: memUser.role === 'ADMIN',
              memberRef: memUser.memberRef,
            },
          },
        });
      }
    }

    // 2. Try DB if available
    try {
      const member = await prisma.member.findUnique({ where: { email: normalizedEmail } });
      if (member) {
        const valid = await bcrypt.compare(password, member.passwordHash);
        if (valid) {
          const sessionToken = uuidv4();
          const role = (member as any).role || 'MEMBER';
          const accessToken = await signAccessToken(member.id, member.email, role);
          const refreshToken = await signRefreshToken(sessionToken);
          setRefreshCookie(res, refreshToken);

          return res.json({
            success: true,
            data: {
              accessToken,
              member: {
                id: member.id,
                email: member.email,
                firstName: member.firstName,
                lastName: member.lastName,
                role,
                isAdmin: role === 'ADMIN',
                memberRef: `IW-2026-M${member.id.slice(-4).toUpperCase()}`,
              },
            },
          });
        }
      }
    } catch {}

    throw new AppError('Invalid email or password. Please try again.', 401, 'INVALID_CREDENTIALS');
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
    const rawToken = req.cookies?.refreshToken;
    if (!rawToken) throw new AppError('No refresh token provided', 401, 'NO_TOKEN');

    let payload: any;
    try {
      const verified = await jwtVerify(rawToken, JWT_REFRESH_SECRET);
      payload = verified.payload;
    } catch {
      throw new AppError('Invalid or expired refresh token', 401, 'INVALID_TOKEN');
    }

    const session = await prisma.session.findUnique({
      where: { token: payload.sessionToken },
      include: { member: true },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new AppError('Session expired', 401, 'SESSION_EXPIRED');
    }

    const role = (session.member as any).role || 'MEMBER';
    const newAccessToken = await signAccessToken(session.member.id, session.member.email, role);
    const newSessionToken = uuidv4();
    const newRefreshToken = await signRefreshToken(newSessionToken);

    await prisma.session.update({
      where: { id: session.id },
      data: { token: newSessionToken },
    });

    setRefreshCookie(res, newRefreshToken);
    res.json({ success: true, data: { accessToken: newAccessToken } });
  } catch (err) { next(err); }
});

// GET /me
router.get('/me', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const memUser = IN_MEMORY_USERS.get(req.member!.email.toLowerCase());
    if (memUser) {
      return res.json({
        success: true,
        data: {
          id: memUser.id,
          email: memUser.email,
          firstName: memUser.firstName,
          lastName: memUser.lastName,
          role: memUser.role,
          memberRef: memUser.memberRef,
        },
      });
    }

    const member = await prisma.member.findUnique({
      where: { id: req.member!.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatarUrl: true,
        membership: true,
        _count: { select: { bookings: true } },
      },
    });

    if (!member) throw new AppError('Member not found', 404, 'NOT_FOUND');
    res.json({ success: true, data: member });
  } catch (err) { next(err); }
});

// In-memory token store for password resets (dev-only)
const PASSWORD_RESET_TOKENS = new Map<string, { email: string; expires: number }>();
const EMAIL_VERIFY_TOKENS  = new Map<string, { email: string; expires: number }>();

// POST /forgot-password
router.post('/forgot-password', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = z.object({ email: z.string().email() }).parse(req.body);
    const normalized = email.toLowerCase().trim();
    const token = uuidv4();
    PASSWORD_RESET_TOKENS.set(token, { email: normalized, expires: Date.now() + 60 * 60 * 1000 });

    // Send email (silently ignore errors in dev)
    (emailService as any).sendPasswordResetEmail?.({ email: normalized, resetToken: token })?.catch?.(() => {});

    // Always return success (don't reveal if email exists)
    res.json({
      success: true,
      message: 'If that email is registered, a password reset link has been sent.',
      ...(process.env.NODE_ENV !== 'production' && { devToken: token }),
    });
  } catch (err) { next(err); }
});

// POST /reset-password
router.post('/reset-password', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = z.object({
      token: z.string().uuid(),
      password: z.string().min(8, 'Password must be at least 8 characters'),
    }).parse(req.body);

    const record = PASSWORD_RESET_TOKENS.get(token);
    if (!record || record.expires < Date.now()) {
      throw new AppError('Reset token is invalid or expired', 400, 'TOKEN_EXPIRED');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    PASSWORD_RESET_TOKENS.delete(token);

    // Update in-memory store
    const memUser = IN_MEMORY_USERS.get(record.email);
    if (memUser) {
      memUser.passwordHash = passwordHash;
      IN_MEMORY_USERS.set(record.email, memUser);
    }

    // Update DB if available
    try {
      await prisma.member.update({ where: { email: record.email }, data: { passwordHash } });
    } catch {}

    res.json({ success: true, message: 'Password has been reset successfully. You can now log in.' });
  } catch (err) { next(err); }
});

// GET /verify-email/:token
router.get('/verify-email/:token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.params.token as string;
    const record = EMAIL_VERIFY_TOKENS.get(token);
    if (!record || record.expires < Date.now()) {
      throw new AppError('Verification token is invalid or expired', 400, 'TOKEN_EXPIRED');
    }
    EMAIL_VERIFY_TOKENS.delete(token);

    try {
      await prisma.member.update({ where: { email: record.email }, data: { emailVerifiedAt: new Date() } });
    } catch {}

    res.json({ success: true, message: 'Email verified successfully. Welcome to IronWorks!' });
  } catch (err) { next(err); }
});

export default router;
