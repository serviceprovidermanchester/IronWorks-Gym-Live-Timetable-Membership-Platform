/**
 * Webhook Routes — /v1/webhooks
 * IronWorks Gym · SPManchester Private Limited
 *
 * POST /webhooks/stripe       Stripe payment events
 * POST /webhooks/gocardless   GoCardless DD events
 */
import { Router, Request, Response } from 'express';
import { stripe } from '../lib/stripe';
import prisma from '../lib/prisma';
import { logger } from '../lib/logger';
import Stripe from 'stripe';

const router = Router();

// ── Stripe Webhook ────────────────────────────────────────────
router.post('/stripe', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET ?? '');
  } catch (err) {
    logger.warn({ err }, 'Invalid Stripe webhook signature');
    res.status(400).json({ error: 'Invalid signature' });
    return;
  }

  // Idempotency: skip events already processed
  const eventKey = `stripe:event:${event.id}`;
  // TODO: Check Redis for already-processed event

  logger.info({ type: event.type, id: event.id }, 'Stripe webhook received');

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const memberId = session.metadata?.memberId;
        const tier = session.metadata?.tier as 'OFF_PEAK' | 'ALL_ACCESS' | 'ALL_ACCESS_PLUS';
        if (!memberId || !tier) break;

        const plan = await prisma.membershipPlan.findUnique({ where: { tier } });
        if (!plan) break;

        const now = new Date();
        const periodEnd = new Date(now);
        periodEnd.setMonth(periodEnd.getMonth() + 1);

        await prisma.membership.upsert({
          where: { memberId },
          update: { status: 'ACTIVE', tier, stripeSubId: session.subscription as string, currentPeriodStart: now, currentPeriodEnd: periodEnd },
          create: { memberId, tier, status: 'ACTIVE', priceGbpPence: plan.priceGbpPence, stripeSubId: session.subscription as string, currentPeriodStart: now, currentPeriodEnd: periodEnd },
        });

        await prisma.payment.create({
          data: { memberId, amountGbpPence: plan.priceGbpPence, provider: 'stripe', providerPaymentId: session.payment_intent as string, status: 'COMPLETED', paidAt: now, description: `${plan.name} membership` },
        });

        logger.info({ memberId, tier }, 'Membership activated via Stripe checkout');
        // TODO: Send confirmation email
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const sub = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id;
        if (sub) {
          await prisma.membership.updateMany({ where: { stripeSubId: sub }, data: { status: 'PENDING_PAYMENT' } });
          // TODO: Send payment failed email
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await prisma.membership.updateMany({ where: { stripeSubId: sub.id }, data: { status: 'CANCELLED', cancelledAt: new Date() } });
        break;
      }

      default:
        logger.debug({ type: event.type }, 'Unhandled Stripe event');
    }
  } catch (err) {
    logger.error({ err, eventType: event.type }, 'Error processing Stripe webhook');
    res.status(500).json({ error: 'Processing error' });
    return;
  }

  res.json({ received: true });
});

// ── GoCardless Webhook ────────────────────────────────────────
router.post('/gocardless', async (req: Request, res: Response) => {
  // GoCardless sends JSON in the body; signature in header
  const signature = req.headers['webhook-signature'];
  logger.info({ signature }, 'GoCardless webhook received');

  try {
    const events = req.body?.events ?? [];
    for (const gcEvent of events) {
      logger.info({ action: gcEvent.action, resource: gcEvent.resource_type }, 'GoCardless event');
      switch (`${gcEvent.resource_type}.${gcEvent.action}`) {
        case 'mandates.active': {
          const mandateId = gcEvent.links?.mandate;
          if (mandateId) {
            await prisma.member.updateMany({ where: { gcMandateId: mandateId }, data: {} });
          }
          break;
        }
        case 'payments.paid_out': {
          // Activate membership and record payment
          const paymentId = gcEvent.links?.payment;
          logger.info({ paymentId }, 'GoCardless payment confirmed');
          // TODO: Full implementation
          break;
        }
        case 'payments.failed': {
          logger.warn({ event: gcEvent }, 'GoCardless payment failed');
          // TODO: Update membership status, send email
          break;
        }
      }
    }
  } catch (err) {
    logger.error({ err }, 'Error processing GoCardless webhook');
    res.status(500).json({ error: 'Processing error' });
    return;
  }

  res.status(200).json({ success: true });
});

export default router;
