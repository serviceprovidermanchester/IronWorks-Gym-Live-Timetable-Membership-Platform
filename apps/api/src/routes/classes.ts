/**
 * Class Routes — /v1/classes
 * IronWorks Gym · SPManchester Private Limited
 *
 * GET /classes              List all (filterable: ?day=MON&category=STRENGTH)
 * GET /classes/categories   List all categories
 * GET /classes/:id          Single class + coach
 * GET /classes/:id/schedule Weekly schedule with capacity
 */
import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { cache } from '../lib/redis';
import { optionalAuth } from '../middleware/auth';
import { ClassCategory, DayOfWeek } from '@prisma/client';

const router = Router();

const ListSchema = z.object({
  day: z.nativeEnum(DayOfWeek).optional(),
  category: z.nativeEnum(ClassCategory).optional(),
  active: z.coerce.boolean().optional().default(true),
});

// GET /classes
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { day, category, active } = ListSchema.parse(req.query);
    const cacheKey = `classes:${day ?? 'ALL'}:${category ?? 'ALL'}:${active}`;
    const cached = await cache.get(cacheKey);
    if (cached) return res.json({ success: true, data: cached, cached: true });

    const classes = await prisma.classSession.findMany({
      where: {
        isActive: active,
        ...(day && { dayOfWeek: day }),
        ...(category && { category }),
      },
      include: { coach: { select: { id: true, name: true, slug: true, role: true, avatarUrl: true } } },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });

    await cache.set(cacheKey, classes, 60); // Cache 1 min
    res.json({ success: true, data: classes, count: classes.length });
  } catch (err) { next(err); }
});

// GET /classes/categories
router.get('/categories', (_req: Request, res: Response) => {
  res.json({ success: true, data: Object.values(ClassCategory) });
});

// GET /classes/:id
router.get('/:id', optionalAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cls = await prisma.classSession.findUnique({
      where: { id: req.params.id },
      include: {
        coach: true,
        _count: { select: { bookings: true } },
      },
    });
    if (!cls) return res.status(404).json({ success: false, error: 'Class not found', code: 'NOT_FOUND' });
    res.json({ success: true, data: cls });
  } catch (err) { next(err); }
});

// GET /classes/:id/schedule  — returns next 7 occurrences with booking count
router.get('/:id/schedule', optionalAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cls = await prisma.classSession.findUnique({ where: { id: req.params.id } });
    if (!cls) return res.status(404).json({ success: false, error: 'Class not found', code: 'NOT_FOUND' });

    // Build next 7 days of this class
    const DAY_MAP: Record<DayOfWeek, number> = { MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, SUN: 0 };
    const targetDay = DAY_MAP[cls.dayOfWeek];
    const occurrences: { date: string; bookedCount: number; available: number }[] = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (d.getDay() !== targetDay) continue;
      const dateStr = d.toISOString().split('T')[0];
      const bookedCount = await prisma.booking.count({
        where: { classSessionId: cls.id, classDate: d, status: { in: ['CONFIRMED', 'WAITLISTED'] } },
      });
      occurrences.push({ date: dateStr, bookedCount, available: Math.max(0, cls.capacity - bookedCount) });
      if (occurrences.length >= 4) break;
    }

    res.json({ success: true, data: { class: cls, schedule: occurrences } });
  } catch (err) { next(err); }
});

export default router;
