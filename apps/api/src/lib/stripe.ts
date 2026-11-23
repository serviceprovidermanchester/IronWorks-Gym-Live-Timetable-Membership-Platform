/**
 * Stripe Client
 * IronWorks Gym · SPManchester Private Limited
 */
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
  appInfo: {
    name: 'ironworks-gym',
    version: '2.0.0',
    url: 'https://ironworksgym.com',
  },
});

export default stripe;
