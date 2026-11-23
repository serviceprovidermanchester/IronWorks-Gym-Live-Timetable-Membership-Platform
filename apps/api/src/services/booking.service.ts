/**
 * Booking Service — Business Logic for Bookings & Waitlist Promotion
 * IronWorks Gym · SPManchester Private Limited
 */

import { prisma } from '../lib/prisma';
import { emailService } from '../lib/email';
import { logger } from '../lib/logger';
import { AppError } from '../middleware/errorHandler';

export const bookingService = {
  async createBooking({
    memberId,
    classSessionId,
    classDate,
  }: {
    memberId: string;
    classSessionId: string;
    classDate: Date;
  }) {
    // 1. Fetch class session & coach
    const session = await prisma.classSession.findUnique({
      where: { id: classSessionId },
      include: { coach: true },
    });

    if (!session || !session.isActive) {
      throw new AppError('Class session not found or inactive', 404);
    }

    // 2. Fetch member
    const member = await prisma.member.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      throw new AppError('Member not found', 404);
    }

    // 3. Check existing booking for this exact class session & date
    const existing = await prisma.booking.findFirst({
      where: {
        memberId,
        classSessionId,
        classDate,
        status: { in: ['CONFIRMED', 'WAITLISTED'] },
      },
    });

    if (existing) {
      throw new AppError('You are already booked or waitlisted for this session', 400);
    }

    // 4. Count confirmed bookings for this session & date
    const confirmedCount = await prisma.booking.count({
      where: {
        classSessionId,
        classDate,
        status: 'CONFIRMED',
      },
    });

    const bookingRef = `BK-${Date.now().toString().slice(-6)}`;

    // 5. If under capacity, confirm booking
    if (confirmedCount < session.capacity) {
      const booking = await prisma.booking.create({
        data: {
          bookingRef,
          memberId,
          classSessionId,
          classDate,
          status: 'CONFIRMED',
        },
      });

      // Send confirmation email asynchronously
      emailService.sendBookingConfirmation({
        email: member.email,
        name: `${member.firstName} ${member.lastName}`,
        bookingRef,
        className: session.name,
        date: classDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
        time: session.startTime,
        coach: session.coach.name,
      }).catch((err) => logger.error({ err }, 'Email notification failed'));

      return { booking, waitlisted: false };
    }

    // 6. Otherwise, place on waitlist
    const waitlistCount = await prisma.booking.count({
      where: {
        classSessionId,
        classDate,
        status: 'WAITLISTED',
      },
    });

    const booking = await prisma.booking.create({
      data: {
        bookingRef,
        memberId,
        classSessionId,
        classDate,
        status: 'WAITLISTED',
        waitlistPosition: waitlistCount + 1,
      },
    });

    return { booking, waitlisted: true, position: waitlistCount + 1 };
  },

  async cancelBooking({
    bookingId,
    memberId,
    isAdmin = false,
  }: {
    bookingId: string;
    memberId: string;
    isAdmin?: boolean;
  }) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { classSession: true },
    });

    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    if (!isAdmin && booking.memberId !== memberId) {
      throw new AppError('Not authorized to cancel this booking', 403);
    }

    // Update status to CANCELLED
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        waitlistPosition: null,
      },
    });

    // If it was a CONFIRMED booking, automatically promote the #1 waitlisted member
    if (booking.status === 'CONFIRMED') {
      const nextWaitlisted = await prisma.booking.findFirst({
        where: {
          classSessionId: booking.classSessionId,
          classDate: booking.classDate,
          status: 'WAITLISTED',
        },
        orderBy: { waitlistPosition: 'asc' },
        include: { member: true, classSession: true },
      });

      if (nextWaitlisted) {
        await prisma.booking.update({
          where: { id: nextWaitlisted.id },
          data: {
            status: 'CONFIRMED',
            waitlistPosition: null,
          },
        });

        // Re-index remaining waitlisted bookings
        const remainingWaitlist = await prisma.booking.findMany({
          where: {
            classSessionId: booking.classSessionId,
            classDate: booking.classDate,
            status: 'WAITLISTED',
          },
          orderBy: { waitlistPosition: 'asc' },
        });

        for (let i = 0; i < remainingWaitlist.length; i++) {
          await prisma.booking.update({
            where: { id: remainingWaitlist[i].id },
            data: { waitlistPosition: i + 1 },
          });
        }

        // Notify promoted member via email
        emailService.sendWaitlistPromotion({
          email: nextWaitlisted.member.email,
          name: `${nextWaitlisted.member.firstName} ${nextWaitlisted.member.lastName}`,
          className: nextWaitlisted.classSession.name,
          date: nextWaitlisted.classDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
          time: nextWaitlisted.classSession.startTime,
        }).catch((err) => logger.error({ err }, 'Waitlist promotion email failed'));
      }
    }

    return { success: true };
  },
};
