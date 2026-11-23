import { emailLayout, brandColors } from './base';

export interface PasswordResetProps {
  name?: string;
  resetUrl: string;
  expiresInMinutes?: number;
}

export function renderPasswordReset({
  name = 'Athlete',
  resetUrl,
  expiresInMinutes = 60,
}: PasswordResetProps): string {
  const content = `
    <h1 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">Reset Your Password</h1>
    <p style="font-size: 15px; color: ${brandColors.textMuted}; line-height: 1.6; margin: 0 0 24px 0;">
      Hi ${name}, we received a request to reset your password for IronWorks Gym.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${resetUrl}" class="btn" style="display: inline-block; background-color: ${brandColors.brand}; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px;">Set New Password &rarr;</a>
    </div>

    <div style="background-color: ${brandColors.surface2}; padding: 14px 18px; border-radius: 8px; font-size: 12px; color: ${brandColors.textMuted}; line-height: 1.5;">
      ⏰ <strong>Security Notice:</strong> This link will expire in <strong>${expiresInMinutes} minutes</strong>. If you did not make this request, you can safely ignore this email — your password will remain unchanged.
    </div>
  `;

  return emailLayout({
    title: 'Reset Password — IronWorks Gym',
    preheader: 'Your password reset link is valid for 1 hour.',
    content,
  });
}
