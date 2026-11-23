/**
 * Admin Routes — /v1/admin  (requires ADMIN or STAFF role)
 * IronWorks Gym · SPManchester Private Limited
 */
import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();
router.use(requireAuth, requireAdmin);

// GET /admin/members
router.get('/members', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '20', search = '' } = req.query as Record<string, string>;
    const p = Math.max(1, parseInt(page)); const l = Math.min(100, parseInt(limit));
    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where: search ? { OR: [{ email: { contains: search, mode: 'insensitive' } }, { firstName: { contains: search, mode: 'insensitive' } }, { lastName: { contains: search, mode: 'insensitive' } }] } : {},
        select: { id: true, email: true, firstName: true, lastName: true, role: true, isActive: true, createdAt: true, membership: { select: { tier: true, status: true } } },
        skip: (p - 1) * l, take: l, orderBy: { createdAt: 'desc' },
      }),
      prisma.member.count({ where: search ? { OR: [{ email: { contains: search, mode: 'insensitive' } }, { firstName: { contains: search, mode: 'insensitive' } }] } : {} }),
    ]);
    res.json({ success: true, data: members, pagination: { total, page: p, limit: l, pages: Math.ceil(total / l) } });
  } catch (err) { next(err); }
});

// GET /admin/analytics
router.get('/analytics', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [totalMembers, activeMembers, totalBookings, totalRevenuePence] = await Promise.all([
      prisma.member.count(),
      prisma.membership.count({ where: { status: 'ACTIVE' } }),
      prisma.booking.count({ where: { status: { in: ['CONFIRMED', 'ATTENDED'] } } }),
      prisma.payment.aggregate({ where: { status: 'COMPLETED' }, _sum: { amountGbpPence: true } }),
    ]);
    const membersByTier = await prisma.membership.groupBy({ by: ['tier'], where: { status: 'ACTIVE' }, _count: true });
    res.json({ success: true, data: { totalMembers, activeMembers, totalBookings, totalRevenueGbp: (totalRevenuePence._sum.amountGbpPence ?? 0) / 100, membersByTier } });
  } catch (err) { next(err); }
});

// GET /admin/bookings
router.get('/bookings', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '50' } = req.query as Record<string, string>;
    const p = Math.max(1, parseInt(page)); const l = Math.min(100, parseInt(limit));
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        include: { member: { select: { email: true, firstName: true, lastName: true } }, classSession: { select: { name: true, dayOfWeek: true, startTime: true } } },
        skip: (p - 1) * l, take: l, orderBy: { classDate: 'desc' },
      }),
      prisma.booking.count(),
    ]);
    res.json({ success: true, data: bookings, pagination: { total, page: p, limit: l, pages: Math.ceil(total / l) } });
  } catch (err) { next(err); }
});

// POST /admin/bookings/:id/check-in
router.post('/bookings/:id/check-in', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await prisma.booking.update({ where: { id: req.params.id as string }, data: { status: 'ATTENDED', attendedAt: new Date() } });
    res.json({ success: true, data: booking, message: 'Member checked in' });
  } catch (err) { next(err); }
});

export default router;
