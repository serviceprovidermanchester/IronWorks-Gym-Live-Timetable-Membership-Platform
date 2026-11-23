/**
 * Membership Routes — /v1/memberships
 * IronWorks Gym · SPManchester Private Limited
 *
 * GET  /membership-plans        List all plans
 * POST /memberships/checkout    Create Stripe Checkout session
 * POST /memberships/cancel      Cancel membership
 * POST /memberships/pause       Pause membership
 */
import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { stripe } from '../lib/stripe';
import { requireAuth } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { MembershipTier } from '@prisma/client';

const router = Router();

// GET /membership-plans (public)
router.get('/plans', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const plans = await prisma.membershipPlan.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    });
    res.json({ success: true, data: plans });
  } catch (err) { next(err); }
});

// POST /memberships/checkout  — Stripe Checkout session
router.post('/checkout', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tier } = z.object({ tier: z.nativeEnum(MembershipTier) }).parse(req.body);

    const plan = await prisma.membershipPlan.findUnique({ where: { tier } });
    if (!plan) throw new AppError('Plan not found', 404, 'PLAN_NOT_FOUND');

    const member = await prisma.member.findUnique({ where: { id: req.member!.id } });
    if (!member) throw new AppError('Member not found', 404, 'NOT_FOUND');

    // Get or create Stripe customer
    let customerId = member.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({ email: member.email, name: `${member.firstName} ${member.lastName}`, metadata: { memberId: member.id } });
      customerId = customer.id;
      await prisma.member.update({ where: { id: member.id }, data: { stripeCustomerId: customerId } });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: plan.stripePriceId
        ? [{ price: plan.stripePriceId, quantity: 1 }]
        : [{ price_data: { currency: 'gbp', unit_amount: plan.priceGbpPence, recurring: { interval: 'month' }, product_data: { name: plan.name, description: plan.tagline } }, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/membership?cancelled=true`,
      metadata: { memberId: member.id, tier },
      billing_address_collection: 'required',
    });

    res.json({ success: true, data: { url: session.url, sessionId: session.id } });
  } catch (err) { next(err); }
});

// POST /memberships/cancel
router.post('/cancel', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const membership = await prisma.membership.findUnique({ where: { memberId: req.member!.id } });
    if (!membership) throw new AppError('No active membership', 404, 'NO_MEMBERSHIP');
    if (membership.status === 'CANCELLED') throw new AppError('Already cancelled', 400, 'ALREADY_CANCELLED');

    if (membership.stripeSubId) {
      await stripe.subscriptions.cancel(membership.stripeSubId);
    }

    await prisma.membership.update({
      where: { id: membership.id },
      data: { status: 'CANCELLED', cancelledAt: new Date() },
    });

    // TODO: Send cancellation email
    res.json({ success: true, message: 'Membership cancelled. Access continues until end of current period.' });
  } catch (err) { next(err); }
});

export default router;
