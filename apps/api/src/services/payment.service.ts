/**
 * Payment Service — Orchestrating Stripe & GoCardless Subscription Lifecycles
 * IronWorks Gym · SPManchester Private Limited
 */
import prisma from '../lib/prisma';
import { stripe } from '../lib/stripe';
import { emailService } from '../lib/email';
import { logger } from '../lib/logger';
import { AppError } from '../middleware/errorHandler';
import { MembershipTier } from '@prisma/client';

export const paymentService = {
  /**
   * Handle successful subscription checkout completion
   */
  async handleSubscriptionActivated({
    memberId,
    tier,
    provider,
    subscriptionId,
    paymentIntentId,
    amountPence,
  }: {
    memberId: string;
    tier: any;
    provider: 'stripe' | 'gocardless';
    subscriptionId?: string;
    paymentIntentId?: string;
    amountPence: number;
  }) {
    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member) {
      logger.error({ memberId }, 'Member not found on subscription activation');
      return;
    }

    const plan = await prisma.membershipPlan.findFirst({ where: { tier: tier as any } });

    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setMonth(periodEnd.getMonth() + 1);

    // Upsert membership record
    const membership = await prisma.membership.upsert({
      where: { memberId },
      update: {
        tier: tier as any,
        status: 'ACTIVE',
        stripeSubId: provider === 'stripe' ? subscriptionId : undefined,
        gcSubscriptionId: provider === 'gocardless' ? subscriptionId : undefined,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        cancelledAt: null,
      },
      create: {
        memberId,
        tier: tier as any,
        status: 'ACTIVE',
        priceGbpPence: amountPence,
        stripeSubId: provider === 'stripe' ? subscriptionId : undefined,
        gcSubscriptionId: provider === 'gocardless' ? subscriptionId : undefined,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
      },
    });

    // Record completed transaction ledger
    await prisma.payment.create({
      data: {
        memberId,
        membershipId: membership.id,
        amountGbpPence: amountPence,
        provider,
        providerPaymentId: paymentIntentId || subscriptionId,
        status: 'COMPLETED',
        paidAt: now,
        description: `${plan?.name || tier} monthly subscription via ${provider.toUpperCase()}`,
      },
    });

    // Send receipt email
    const invoiceId = `INV-${Date.now().toString().slice(-6)}`;
    emailService.sendPaymentReceipt({
      email: member.email,
      name: `${member.firstName} ${member.lastName}`,
      amount: `£${(amountPence / 100).toFixed(2)}`,
      date: now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      invoiceId,
    }).catch((err) => logger.error({ err }, 'Failed to send receipt email'));

    logger.info({ memberId, tier, provider }, 'Subscription and payment activated successfully');
  },

  /**
   * Handle subscription payment failure
   */
  async handlePaymentFailed({
    subscriptionId,
    provider,
    reason,
  }: {
    subscriptionId: string;
    provider: 'stripe' | 'gocardless';
    reason?: string;
  }) {
    const where = provider === 'stripe'
      ? { stripeSubId: subscriptionId }
      : { gcSubscriptionId: subscriptionId };

    const membership = await prisma.membership.findFirst({
      where,
      include: { member: true },
    });

    if (!membership) {
      logger.warn({ subscriptionId, provider }, 'No membership found for failed payment');
      return;
    }

    await prisma.membership.update({
      where: { id: membership.id },
      data: { status: 'PENDING_PAYMENT' },
    });

    // Record failed payment in ledger
    await prisma.payment.create({
      data: {
        memberId: membership.memberId,
        membershipId: membership.id,
        amountGbpPence: membership.priceGbpPence,
        provider,
        status: 'FAILED',
        failureReason: reason || 'Insufficient funds or card decline',
        failedAt: new Date(),
        description: `Failed recurring payment via ${provider.toUpperCase()}`,
      },
    });

    logger.warn({ memberId: membership.memberId, reason }, 'Membership marked PAST_DUE due to failed payment');
  },

  /**
   * Handle subscription cancellation
   */
  async handleSubscriptionCancelled({
    subscriptionId,
    provider,
  }: {
    subscriptionId: string;
    provider: 'stripe' | 'gocardless';
  }) {
    const where = provider === 'stripe'
      ? { stripeSubId: subscriptionId }
      : { gcSubscriptionId: subscriptionId };

    await prisma.membership.updateMany({
      where,
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
      },
    });

    logger.info({ subscriptionId, provider }, 'Subscription marked CANCELLED');
  },
};
