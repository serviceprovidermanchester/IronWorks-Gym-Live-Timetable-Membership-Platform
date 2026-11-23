import { emailLayout, brandColors } from './base';

export interface PaymentFailedProps {
  name: string;
  amount: string;
  reason?: string;
  updatePaymentUrl: string;
}

export function renderPaymentFailed({
  name,
  amount,
  reason = 'Card declined or bank mandate unavailable',
  updatePaymentUrl,
}: PaymentFailedProps): string {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: ${brandColors.red}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 14px; border-radius: 20px; margin-bottom: 12px;">
        ⚠️ Action Required
      </div>
      <h1 style="font-size: 24px; font-weight: 900; color: #ffffff; margin: 0;">Payment Attempt Unsuccessful</h1>
      <p style="font-size: 15px; color: ${brandColors.textMuted}; margin-top: 6px;">We were unable to process your monthly payment of ${amount}.</p>
    </div>

    <div style="background-color: ${brandColors.surface2}; border-left: 4px solid ${brandColors.red}; padding: 18px 20px; border-radius: 8px; margin-bottom: 24px;">
      <div style="font-size: 12px; font-weight: 700; color: ${brandColors.textMuted}; text-transform: uppercase; margin-bottom: 4px;">Failure Reason</div>
      <div style="font-size: 14px; color: #ffffff; font-weight: 600;">${reason}</div>
      <div style="font-size: 12px; color: ${brandColors.textDim}; margin-top: 6px;">
        Your gym access will remain active for a 3-day grace period while you update your payment method.
      </div>
    </div>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${updatePaymentUrl}" class="btn" style="display: inline-block; background-color: ${brandColors.brand}; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px;">Update Payment Method Now &rarr;</a>
    </div>

    <p style="font-size: 12px; color: ${brandColors.textDim}; line-height: 1.5; margin: 24px 0 0 0;">
      Need help? Reply directly to this email or speak to our team at reception.
    </p>
  `;

  return emailLayout({
    title: 'Payment Failed — Action Required · IronWorks Gym',
    preheader: `We were unable to collect ${amount}. Please update your payment method to keep access active.`,
    content,
  });
}
