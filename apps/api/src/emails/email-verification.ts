import { emailLayout, brandColors } from './base';

export interface EmailVerificationProps {
  name: string;
  verifyUrl: string;
  expiresInHours?: number;
}

export function renderEmailVerification({ name, verifyUrl, expiresInHours = 24 }: EmailVerificationProps): string {
  const content = `
    <h1 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">Verify Your Email Address</h1>
    <p style="font-size: 15px; color: ${brandColors.textMuted}; line-height: 1.6; margin: 0 0 24px 0;">
      Hi ${name}, please verify your email address to secure your IronWorks Gym account and activate class bookings.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${verifyUrl}" class="btn" style="display: inline-block; background-color: ${brandColors.brand}; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px;">Confirm Email Address &rarr;</a>
    </div>

    <div style="background-color: ${brandColors.surface2}; padding: 14px 18px; border-radius: 8px; font-size: 12px; color: ${brandColors.textMuted}; line-height: 1.5;">
      ⏰ <strong>Security Notice:</strong> This verification link will expire in <strong>${expiresInHours} hours</strong>. If you did not request this, please ignore this email.
    </div>
  `;

  return emailLayout({
    title: 'Verify Your Email — IronWorks Gym',
    preheader: 'Please confirm your email address within 24 hours.',
    content,
  });
}
