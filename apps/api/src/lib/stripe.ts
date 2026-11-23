/**
 * Stripe Client
 * IronWorks Gym · SPManchester Private Limited
 */
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_dev_key';

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-02-24.acacia' as any,
  typescript: true,
  appInfo: {
    name: 'ironworks-gym',
    version: '2.0.0',
    url: 'https://ironworksgym.com',
  },
});

export default stripe;
