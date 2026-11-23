/**
 * Resend Email Service & Transactional Notifications
 * IronWorks Gym · SPManchester Private Limited
 * https://www.spmanchester.com · info@spmanchester.com
 */

import { Resend } from 'resend';
import { logger } from './logger';
import {
  renderWelcomeEmail,
  renderEmailVerification,
  renderMembershipConfirmation,
  renderPaymentReceipt,
  renderPaymentFailed,
  renderBookingConfirmation,
  renderBookingReminder,
  renderBookingCancelled,
  renderPasswordReset,
  renderMembershipRenewal,
  renderMembershipCancellation,
} from '../emails';

const resendApiKey = process.env.RESEND_API_KEY || 're_placeholder_dev_key';
export const resend = new Resend(resendApiKey);

const FROM_EMAIL = process.env.EMAIL_FROM || 'IronWorks Gym <notifications@ironworksgym.co.uk>';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

async function sendOrLog({
  to,
  subject,
  html,
  tag,
}: {
  to: string;
  subject: string;
  html: string;
  tag: string;
}) {
  try {
    if (process.env.NODE_ENV !== 'production' && !process.env.RESEND_API_KEY) {
      logger.info({ to, subject, tag }, `[DEV EMAIL] ${tag} triggered (offline mock)`);
      return { success: true, id: `mock-${tag}-${Date.now()}` };
    }
    return await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
  } catch (error) {
    logger.error({ error, to, tag }, `Failed to send email: ${tag}`);
    return { success: false, error };
  }
}

export const emailService = {
  // 1. Welcome Email (Register)
  async sendWelcomeEmail({ email, name, memberRef }: { email: string; name: string; memberRef: string }) {
    const html = renderWelcomeEmail({
      name,
      memberRef,
      verifyUrl: `${FRONTEND_URL}/verify-email?ref=${memberRef}`,
    });
    return sendOrLog({ to: email, subject: 'Welcome to IronWorks Gym Manchester', html, tag: 'welcome' });
  },

  // 2. Email Verification (Register)
  async sendEmailVerification({ email, name, token }: { email: string; name: string; token: string }) {
    const html = renderEmailVerification({
      name,
      verifyUrl: `${FRONTEND_URL}/verify-email?token=${token}`,
      expiresInHours: 24,
    });
    return sendOrLog({ to: email, subject: 'Verify Your Email — IronWorks Gym', html, tag: 'email-verification' });
  },

  // 3. Membership Confirmation (Payment success)
  async sendMembershipConfirmation({
    email,
    name,
    planName,
    memberRef,
    startDate,
    amount,
  }: {
    email: string;
    name: string;
    planName: string;
    memberRef: string;
    startDate: string;
    amount: string;
  }) {
    const html = renderMembershipConfirmation({
      name,
      planName,
      memberRef,
      startDate,
      amount,
      portalUrl: `${FRONTEND_URL}/dashboard`,
    });
    return sendOrLog({ to: email, subject: `Membership Confirmed: ${planName} — IronWorks Gym`, html, tag: 'membership-confirmation' });
  },

  // 4. Payment Receipt (Payment collected)
  async sendPaymentReceipt({
    email,
    name,
    amount,
    date,
    invoiceId,
    planName,
    downloadUrl,
  }: {
    email: string;
    name: string;
    amount: string;
    date: string;
    invoiceId: string;
    planName?: string;
    downloadUrl?: string;
  }) {
    const html = renderPaymentReceipt({ name, amount, date, invoiceId, planName, downloadUrl });
    return sendOrLog({ to: email, subject: `Payment Receipt: ${amount} — IronWorks Gym (${invoiceId})`, html, tag: 'payment-receipt' });
  },

  // 5. Payment Failed (Stripe/GC failure)
  async sendPaymentFailed({
    email,
    name,
    amount,
    reason,
  }: {
    email: string;
    name: string;
    amount: string;
    reason?: string;
  }) {
    const html = renderPaymentFailed({
      name,
      amount,
      reason,
      updatePaymentUrl: `${FRONTEND_URL}/billing`,
    });
    return sendOrLog({ to: email, subject: 'Payment Failed: Action Required — IronWorks Gym', html, tag: 'payment-failed' });
  },

  // 6. Booking Confirmation (Booking created)
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
    const html = renderBookingConfirmation({
      name,
      className,
      date,
      time,
      coach,
      bookingRef,
      cancelUrl: `${FRONTEND_URL}/bookings`,
    });
    return sendOrLog({ to: email, subject: `Class Confirmed: ${className} on ${date}`, html, tag: 'booking-confirmation' });
  },

  // 7. Booking Reminder (2h before class)
  async sendBookingReminder({
    email,
    name,
    className,
    time,
    coach,
  }: {
    email: string;
    name: string;
    className: string;
    time: string;
    coach: string;
  }) {
    const html = renderBookingReminder({ name, className, time, coach });
    return sendOrLog({ to: email, subject: `Reminder: ${className} starts in 2 hours`, html, tag: 'booking-reminder' });
  },

  // 8. Booking Cancelled (Cancellation)
  async sendBookingCancelled({
    email,
    name,
    className,
    date,
    time,
    bookingRef,
  }: {
    email: string;
    name: string;
    className: string;
    date: string;
    time: string;
    bookingRef: string;
  }) {
    const html = renderBookingCancelled({
      name,
      className,
      date,
      time,
      bookingRef,
      rebookUrl: `${FRONTEND_URL}/timetable`,
    });
    return sendOrLog({ to: email, subject: `Booking Cancelled: ${className} on ${date}`, html, tag: 'booking-cancelled' });
  },

  // 9. Password Reset (Forgot password)
  async sendPasswordResetEmail({
    email,
    resetToken,
    name,
  }: {
    email: string;
    resetToken: string;
    name?: string;
  }) {
    const html = renderPasswordReset({
      name,
      resetUrl: `${FRONTEND_URL}/reset-password?token=${resetToken}`,
      expiresInMinutes: 60,
    });
    return sendOrLog({ to: email, subject: 'Reset Your Password — IronWorks Gym', html, tag: 'password-reset' });
  },

  // 10. Membership Renewal (3 days before renewal)
  async sendMembershipRenewalNotice({
    email,
    name,
    planName,
    amount,
    renewalDate,
  }: {
    email: string;
    name: string;
    planName: string;
    amount: string;
    renewalDate: string;
  }) {
    const html = renderMembershipRenewal({
      name,
      planName,
      amount,
      renewalDate,
      manageUrl: `${FRONTEND_URL}/billing`,
    });
    return sendOrLog({ to: email, subject: `Upcoming Membership Renewal — ${planName}`, html, tag: 'membership-renewal' });
  },

  // 11. Membership Cancellation (Cancel confirmed)
  async sendMembershipCancellationNotice({
    email,
    name,
    planName,
    accessEndDate,
    coolingOffApplied,
  }: {
    email: string;
    name: string;
    planName: string;
    accessEndDate: string;
    coolingOffApplied?: boolean;
  }) {
    const html = renderMembershipCancellation({
      name,
      planName,
      accessEndDate,
      coolingOffApplied,
      rejoinUrl: `${FRONTEND_URL}/membership`,
    });
    return sendOrLog({ to: email, subject: 'Membership Cancellation Confirmed — IronWorks Gym', html, tag: 'membership-cancellation' });
  },

  // Waitlist Promotion
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
    return sendOrLog({
      to: email,
      subject: `Spot Available! Promoted into ${className}`,
      html: `<div style="font-family: sans-serif; background:#0f172a; color:#fff; padding:24px; border-radius:12px;"><h2>Spot Confirmed for ${className} on ${date} at ${time}!</h2><p>Hi ${name}, you were promoted from the waitlist into a confirmed spot.</p></div>`,
      tag: 'waitlist-promotion',
    });
  },
};
