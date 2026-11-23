/**
 * Webhook Routes — /v1/webhooks
 * IronWorks Gym · SPManchester Private Limited
 *
 * POST /webhooks/stripe       Stripe card payment & subscription lifecycle events
 * POST /webhooks/gocardless   GoCardless UK Direct Debit events
 */
import { Router, Request, Response } from 'express';
import { stripe } from '../lib/stripe';
import { cache } from '../lib/redis';
import { logger } from '../lib/logger';
import { paymentService } from '../services/payment.service';
import Stripe from 'stripe';

const router = Router();

// ── Stripe Webhook ────────────────────────────────────────────
router.post('/stripe', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET ?? 'whsec_test_secret'
    );
  } catch (err: any) {
    logger.warn({ err: err.message }, 'Invalid Stripe webhook signature');
    res.status(400).json({ error: 'Invalid signature' });
    return;
  }

  // Idempotency: skip events already processed
  const alreadyProcessed = await cache.isEventProcessed(event.id);
  if (alreadyProcessed) {
    logger.info({ eventId: event.id }, 'Skipping already-processed Stripe event');
    res.json({ received: true, deduplicated: true });
    return;
  }

  logger.info({ type: event.type, id: event.id }, 'Stripe webhook received');

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const memberId = session.metadata?.memberId;
        const tier = session.metadata?.tier as any;
        const amountPence = session.amount_total || 4900;

        if (memberId && tier) {
          await paymentService.handleSubscriptionActivated({
            memberId,
            tier,
            provider: 'stripe',
            subscriptionId: session.subscription as string,
            paymentIntentId: session.payment_intent as string,
            amountPence,
          });
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id;
        if (subId) {
          logger.info({ invoiceId: invoice.id, subId }, 'Stripe invoice paid successfully');
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id;
        if (subId) {
          await paymentService.handlePaymentFailed({
            subscriptionId: subId,
            provider: 'stripe',
            reason: invoice.last_finalization_error?.message,
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await paymentService.handleSubscriptionCancelled({
          subscriptionId: sub.id,
          provider: 'stripe',
        });
        break;
      }

      default:
        logger.debug({ type: event.type }, 'Unhandled Stripe event type');
    }

    // Mark event as processed in Redis cache (24 hours TTL)
    await cache.markEventProcessed(event.id);
  } catch (err) {
    logger.error({ err, eventType: event.type }, 'Error processing Stripe webhook');
    res.status(500).json({ error: 'Processing error' });
    return;
  }

  res.json({ received: true });
});

// ── GoCardless Webhook ────────────────────────────────────────
router.post('/gocardless', async (req: Request, res: Response) => {
  logger.info('GoCardless webhook received');

  try {
    const events = req.body?.events ?? [];

    for (const gcEvent of events) {
      const eventKey = `gc:${gcEvent.id}`;
      const isProcessed = await cache.isEventProcessed(eventKey);
      if (isProcessed) continue;

      const action = `${gcEvent.resource_type}.${gcEvent.action}`;
      logger.info({ action, id: gcEvent.id }, 'Processing GoCardless event');

      switch (action) {
        case 'mandates.active': {
          const mandateId = gcEvent.links?.mandate;
          logger.info({ mandateId }, 'GoCardless UK Direct Debit mandate is now ACTIVE');
          break;
        }

        case 'payments.paid_out': {
          const subscriptionId = gcEvent.links?.subscription;
          const paymentId = gcEvent.links?.payment;
          logger.info({ subscriptionId, paymentId }, 'GoCardless Direct Debit payment settled');
          break;
        }

        case 'payments.failed': {
          const subscriptionId = gcEvent.links?.subscription;
          if (subscriptionId) {
            await paymentService.handlePaymentFailed({
              subscriptionId,
              provider: 'gocardless',
              reason: gcEvent.details?.description || 'Direct Debit bank rejection',
            });
          }
          break;
        }

        case 'subscriptions.cancelled': {
          const subscriptionId = gcEvent.links?.subscription;
          if (subscriptionId) {
            await paymentService.handleSubscriptionCancelled({
              subscriptionId,
              provider: 'gocardless',
            });
          }
          break;
        }
      }

      await cache.markEventProcessed(eventKey);
    }
  } catch (err) {
    logger.error({ err }, 'Error processing GoCardless webhook');
    res.status(500).json({ error: 'Processing error' });
    return;
  }

  res.status(200).json({ success: true });
});

export default router;
