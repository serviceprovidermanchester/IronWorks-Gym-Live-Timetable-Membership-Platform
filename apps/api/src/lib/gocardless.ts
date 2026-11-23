/**
 * GoCardless Client & Direct Debit Integration
 * IronWorks Gym · SPManchester Private Limited
 * https://www.spmanchester.com · info@spmanchester.com
 */

// @ts-ignore
import gocardless from 'gocardless-nodejs';
import { logger } from './logger';

const gocardlessFactory = (gocardless as any).default || gocardless;
const client = typeof gocardlessFactory === 'function' ? gocardlessFactory(
  process.env.GOCARDLESS_ACCESS_TOKEN || 'sandbox_test_token',
  (process.env.GOCARDLESS_ENVIRONMENT as 'sandbox' | 'live') || 'sandbox'
) : {} as any;

export const gocardlessClient = client;

export async function createDirectDebitRedirectFlow({
  memberId,
  email,
  name,
  successRedirectUrl,
}: {
  memberId: string;
  email: string;
  name: string;
  successRedirectUrl: string;
}) {
  try {
    const flow = await client.redirectFlows.create({
      description: 'IronWorks Gym Monthly Membership Direct Debit Mandate',
      session_token: memberId,
      success_redirect_url: successRedirectUrl,
      prefilled_customer: {
        email,
        given_name: name.split(' ')[0] || name,
        family_name: name.split(' ').slice(1).join(' ') || 'Member',
      },
    });

    return flow.redirect_url;
  } catch (error) {
    logger.error({ error, memberId }, 'Failed to create GoCardless redirect flow');
    throw error;
  }
}

export async function completeDirectDebitFlow({
  redirectFlowId,
  sessionToken,
}: {
  redirectFlowId: string;
  sessionToken: string;
}) {
  try {
    const flow = await client.redirectFlows.complete(redirectFlowId, {
      data: { session_token: sessionToken },
    });

    return {
      mandateId: flow.links.mandate,
      customerId: flow.links.customer,
    };
  } catch (error) {
    logger.error({ error, redirectFlowId }, 'Failed to complete GoCardless redirect flow');
    throw error;
  }
}

export async function createMonthlyDirectDebitSubscription({
  mandateId,
  amountPence,
  name,
}: {
  mandateId: string;
  amountPence: number;
  name: string;
}) {
  try {
    const subscription = await client.subscriptions.create({
      amount: amountPence,
      currency: 'GBP',
      name,
      interval_unit: 'monthly',
      day_of_month: 1,
      links: {
        mandate: mandateId,
      },
    });

    return subscription.id;
  } catch (error) {
    logger.error({ error, mandateId }, 'Failed to create GoCardless subscription');
    throw error;
  }
}
