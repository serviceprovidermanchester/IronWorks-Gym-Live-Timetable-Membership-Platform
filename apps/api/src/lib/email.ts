/**
 * Resend Email Service & Transactional Notifications
 * IronWorks Gym · SPManchester Private Limited
 * https://www.spmanchester.com · info@spmanchester.com
 */

import { Resend } from 'resend';
import { logger } from './logger';

const resendApiKey = process.env.RESEND_API_KEY || 're_placeholder_dev_key';
export const resend = new Resend(resendApiKey);

const FROM_EMAIL = process.env.EMAIL_FROM || 'IronWorks Gym <notifications@ironworksgym.co.uk>';

export const emailService = {
  async sendWelcomeEmail({
    email,
    name,
    memberRef,
  }: {
    email: string;
    name: string;
    memberRef: string;
  }) {
    try {
      if (process.env.NODE_ENV !== 'production' && !process.env.RESEND_API_KEY) {
        logger.info({ email, memberRef }, '[DEV EMAIL] Welcome email triggered (mock)');
        return { success: true, id: 'mock-email-id' };
      }

      return await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Welcome to IronWorks Gym Manchester — Membership Confirmed',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 32px; border-radius: 12px; border: 1px solid #334155;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #f97316; font-size: 28px; margin: 0; text-transform: uppercase; letter-spacing: 2px;">IronWorks Gym</h1>
              <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Ancoats, Manchester · Strength & Conditioning</p>
            </div>
            <div style="background: #1e293b; padding: 24px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #f97316;">
              <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Welcome to the family, ${name}!</h2>
              <p style="color: #cbd5e1; line-height: 1.6;">Your membership has been activated. You now have full access to our timetable, facilities, and coaching team.</p>
              <div style="margin-top: 16px; padding: 12px; background: #0f172a; border-radius: 6px; display: inline-block;">
                <span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; display: block;">Your Member Reference</span>
                <span style="color: #f97316; font-family: monospace; font-size: 20px; font-weight: bold;">${memberRef}</span>
              </div>
            </div>
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5;">You can book classes up to 7 days in advance via your member portal.</p>
            <hr style="border: 0; border-top: 1px solid #334155; margin: 24px 0;" />
            <p style="color: #64748b; font-size: 11px; text-align: center;">Built with pride by SPManchester Private Limited · <a href="https://www.spmanchester.com" style="color: #f97316; text-decoration: none;">www.spmanchester.com</a></p>
          </div>
        `,
      });
    } catch (error) {
      logger.error({ error, email }, 'Failed to send welcome email');
    }
  },

  async sendBookingConfirmation({
    email,
    name,
    bookingRef,
    className,
    date,
    time,
    coach,
  }: {
    email: string;
    name: string;
    bookingRef: string;
    className: string;
    date: string;
    time: string;
    coach: string;
  }) {
    try {
      if (process.env.NODE_ENV !== 'production' && !process.env.RESEND_API_KEY) {
        logger.info({ email, bookingRef, className }, '[DEV EMAIL] Booking confirmation sent (mock)');
        return { success: true, id: 'mock-booking-id' };
      }

      return await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Class Confirmed: ${className} on ${date}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 32px; border-radius: 12px; border: 1px solid #334155;">
            <h2 style="color: #f97316; margin-top: 0;">Reservation Confirmed ✓</h2>
            <p style="color: #cbd5e1;">Hi ${name}, your spot in <strong>${className}</strong> is secured.</p>
            <div style="background: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 6px 0; color: #cbd5e1;"><strong>Booking Ref:</strong> <span style="font-family: monospace; color: #f97316;">${bookingRef}</span></p>
              <p style="margin: 6px 0; color: #cbd5e1;"><strong>Date:</strong> ${date}</p>
              <p style="margin: 6px 0; color: #cbd5e1;"><strong>Time:</strong> ${time}</p>
              <p style="margin: 6px 0; color: #cbd5e1;"><strong>Coach:</strong> ${coach}</p>
            </div>
            <p style="color: #94a3b8; font-size: 13px;">Please arrive 10 minutes prior to warm up. Need to cancel? Give at least 2 hours notice to free up the slot.</p>
          </div>
        `,
      });
    } catch (error) {
      logger.error({ error, email }, 'Failed to send booking confirmation email');
    }
  },

  async sendWaitlistPromotion({
    email,
    name,
    className,
    date,
    time,
  }: {
    email: string;
    name: string;
    className: string;
    date: string;
    time: string;
  }) {
    try {
      if (process.env.NODE_ENV !== 'production' && !process.env.RESEND_API_KEY) {
        logger.info({ email, className }, '[DEV EMAIL] Waitlist promotion sent (mock)');
        return { success: true, id: 'mock-waitlist-id' };
      }

      return await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Spot Available! You've been promoted into ${className}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 32px; border-radius: 12px; border: 1px solid #334155;">
            <h2 style="color: #10b981; margin-top: 0;">You're In! Spot Confirmed 🎉</h2>
            <p style="color: #cbd5e1;">Hi ${name}, a spot has opened up for <strong>${className}</strong> on ${date} at ${time}.</p>
            <p style="color: #cbd5e1;">Because you were next on the waitlist, your reservation has automatically been upgraded to <strong>CONFIRMED</strong>.</p>
          </div>
        `,
      });
    } catch (error) {
      logger.error({ error, email }, 'Failed to send waitlist promotion email');
    }
  },

  async sendPaymentReceipt({
    email,
    name,
    amount,
    date,
    invoiceId,
  }: {
    email: string;
    name: string;
    amount: string;
    date: string;
    invoiceId: string;
  }) {
    try {
      if (process.env.NODE_ENV !== 'production' && !process.env.RESEND_API_KEY) {
        logger.info({ email, amount, invoiceId }, '[DEV EMAIL] Payment receipt sent (mock)');
        return { success: true, id: 'mock-receipt-id' };
      }

      return await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Payment Receipt: ${amount} — IronWorks Gym (${invoiceId})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 32px; border-radius: 12px; border: 1px solid #334155;">
            <h2 style="color: #f97316; margin-top: 0;">Payment Receipt</h2>
            <p style="color: #cbd5e1;">Hi ${name}, thank you for your monthly membership payment.</p>
            <div style="background: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 6px 0; color: #cbd5e1;"><strong>Invoice #:</strong> <span style="font-family: monospace; color: #f97316;">${invoiceId}</span></p>
              <p style="margin: 6px 0; color: #cbd5e1;"><strong>Date:</strong> ${date}</p>
              <p style="margin: 6px 0; color: #cbd5e1;"><strong>Amount Paid:</strong> <span style="font-size: 18px; font-weight: bold; color: #10b981;">${amount}</span></p>
              <p style="margin: 6px 0; color: #cbd5e1;"><strong>Status:</strong> Paid in full</p>
            </div>
            <p style="color: #94a3b8; font-size: 12px;">This is your official receipt for tax or company wellness reimbursement.</p>
          </div>
        `,
      });
    } catch (error) {
      logger.error({ error, email }, 'Failed to send receipt email');
    }
  },
};
