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
import { bookingService } from '../services/booking.service';
import { requireAuth } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();
router.use(requireAuth);

const BookSchema = z.object({
  classSessionId: z.string(),
  classDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
});

const ListSchema = z.object({
  status: z.enum(['CONFIRMED', 'CANCELLED', 'ATTENDED', 'WAITLISTED', 'NO_SHOW']).optional(),
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
        where: { memberId: req.member!.id, ...(status && { status: status as any }) },
        include: {
          classSession: {
            include: { coach: { select: { name: true, avatarUrl: true } } },
          },
        },
        orderBy: { classDate: 'desc' },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where: { memberId: req.member!.id, ...(status && { status: status as any }) } }),
    ]);

    res.json({
      success: true,
      data: bookings,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) { next(err); }
});

// POST /bookings
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { classSessionId, classDate } = BookSchema.parse(req.body);

    const result = await bookingService.createBooking({
      memberId: req.member!.id,
      classSessionId,
      classDate: new Date(classDate),
    });

    res.status(201).json({
      success: true,
      message: result.waitlisted
        ? `Class is at capacity. You are placed at position #${result.position} on the waitlist.`
        : 'Spot confirmed successfully.',
      data: result,
    });
  } catch (err) { next(err); }
});

// GET /bookings/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
      include: { classSession: { include: { coach: true } } },
    });

    if (!booking) throw new AppError('Booking not found', 404);
    if (booking.memberId !== req.member!.id && req.member!.role !== 'ADMIN') {
      throw new AppError('Not authorized', 403);
    }

    res.json({ success: true, data: booking });
  } catch (err) { next(err); }
});

// DELETE /bookings/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isAdmin = req.member!.role === 'ADMIN';
    await bookingService.cancelBooking({
      bookingId: req.params.id,
      memberId: req.member!.id,
      isAdmin,
    });

    res.json({
      success: true,
      message: 'Booking cancelled successfully. If you had a confirmed spot, it has been given to the next waitlisted member.',
    });
  } catch (err) { next(err); }
});

export default router;
