/**
 * Booking Routes — /v1/bookings
 * IronWorks Gym · SPManchester Private Limited
 *
 * GET    /bookings        My bookings
 * POST   /bookings        Book a class slot
 * GET    /bookings/:id    Single booking
 * DELETE /bookings/:id    Cancel booking
 */
import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();
router.use(requireAuth);

const BookSchema = z.object({
  classSessionId: z.string().cuid(),
  classDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
});

const ListSchema = z.object({
  status: z.enum(['CONFIRMED', 'CANCELLED', 'ATTENDED', 'WAITLISTED']).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

// GET /bookings
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, page, limit } = ListSchema.parse(req.query);
    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where: { memberId: req.member!.id, ...(status && { status }) },
        include: { classSession: { include: { coach: { select: { name: true, avatarUrl: true } } } } },
        orderBy: { classDate: 'desc' },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where: { memberId: req.member!.id, ...(status && { status }) } }),
    ]);
    res.json({ success: true, data: bookings, pagination: { total, page, limit, pages: Math.ceil(total / limit) } });
  } catch (err) { next(err); }
});

// POST /bookings
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { classSessionId, classDate } = BookSchema.parse(req.body);

    // Verify membership is active
    const membership = await prisma.membership.findUnique({ where: { memberId: req.member!.id } });
    if (!membership || membership.status !== 'ACTIVE') {
      throw new AppError('Active membership required to book classes', 403, 'NO_ACTIVE_MEMBERSHIP');
    }

    const cls = await prisma.classSession.findUnique({ where: { id: classSessionId } });
    if (!cls || !cls.isActive) throw new AppError('Class not found or not available', 404, 'CLASS_NOT_FOUND');

    const classDateObj = new Date(classDate + 'T00:00:00.000Z');
    if (classDateObj < new Date()) throw new AppError('Cannot book a class in the past', 400, 'PAST_DATE');

    // Check capacity
    const confirmedCount = await prisma.booking.count({
      where: { classSessionId, classDate: classDateObj, status: 'CONFIRMED' },
    });

    const status = confirmedCount >= cls.capacity ? 'WAITLISTED' : 'CONFIRMED';
    const waitlistPosition = status === 'WAITLISTED'
      ? await prisma.booking.count({ where: { classSessionId, classDate: classDateObj, status: 'WAITLISTED' } }) + 1
      : null;

    const booking = await prisma.booking.create({
      data: { memberId: req.member!.id, classSessionId, classDate: classDateObj, status, waitlistPosition },
      include: { classSession: { include: { coach: { select: { name: true } } } } },
    });

    // TODO: Send booking confirmation email
    res.status(201).json({ success: true, data: booking });
  } catch (err) { next(err); }
});

// GET /bookings/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await prisma.booking.findFirst({
      where: { id: req.params.id, memberId: req.member!.id },
      include: { classSession: { include: { coach: true } } },
    });
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found', code: 'NOT_FOUND' });
    res.json({ success: true, data: booking });
  } catch (err) { next(err); }
});

// DELETE /bookings/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await prisma.booking.findFirst({
      where: { id: req.params.id, memberId: req.member!.id },
    });
    if (!booking) throw new AppError('Booking not found', 404, 'NOT_FOUND');
    if (booking.status === 'CANCELLED') throw new AppError('Booking already cancelled', 400, 'ALREADY_CANCELLED');

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: { status: 'CANCELLED', cancelledAt: new Date() },
    });

    // Promote waitlist if was confirmed
    if (booking.status === 'CONFIRMED') {
      const nextWaitlisted = await prisma.booking.findFirst({
        where: { classSessionId: booking.classSessionId, classDate: booking.classDate, status: 'WAITLISTED' },
        orderBy: { waitlistPosition: 'asc' },
      });
      if (nextWaitlisted) {
        await prisma.booking.update({
          where: { id: nextWaitlisted.id },
          data: { status: 'CONFIRMED', waitlistPosition: null },
        });
        // TODO: Send promotion email to nextWaitlisted member
      }
    }

    res.json({ success: true, data: updated, message: 'Booking cancelled successfully' });
  } catch (err) { next(err); }
});

export default router;
