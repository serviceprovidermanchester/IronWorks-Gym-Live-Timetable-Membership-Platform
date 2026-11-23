/**
 * Coach Routes — /v1/coaches
 * IronWorks Gym · SPManchester Private Limited
 */
import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { cache } from '../lib/redis';
import { MOCK_COACHES } from '../lib/mockData';

const router = Router();

// GET /coaches
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    try {
      const cached = await cache.get('coaches:all');
      if (cached) return res.json({ success: true, data: cached, cached: true });
    } catch {}

    try {
      const coaches = await prisma.coach.findMany({
        where: { isActive: true },
        include: {
          classes: {
            where: { isActive: true },
            select: { id: true, name: true, dayOfWeek: true, startTime: true, category: true },
            orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
          },
        },
        orderBy: { displayOrder: 'asc' },
      });

      if (coaches.length > 0) {
        try { await cache.set('coaches:all', coaches, 300); } catch {}
        return res.json({ success: true, data: coaches, count: coaches.length });
      }
    } catch (dbErr) {
      // Database offline — fall back to mock data
    }

    res.json({ success: true, data: MOCK_COACHES, count: MOCK_COACHES.length, fallback: true });
  } catch (err) { next(err); }
});

// GET /coaches/:slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coach = await prisma.coach.findUnique({
      where: { slug: req.params.slug as string },
      include: {
        classes: {
          where: { isActive: true },
          orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
        },
      },
    });
    if (!coach) return res.status(404).json({ success: false, error: 'Coach not found', code: 'NOT_FOUND' });
    res.json({ success: true, data: coach });
  } catch (err) { next(err); }
});

export default router;
