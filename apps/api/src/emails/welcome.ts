import { emailLayout, brandColors } from './base';

export interface WelcomeEmailProps {
  name: string;
  memberRef: string;
  verifyUrl: string;
}

export function renderWelcomeEmail({ name, memberRef, verifyUrl }: WelcomeEmailProps): string {
  const content = `
    <h1 style="font-size: 24px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">Welcome to IronWorks, ${name}! 🔥</h1>
    <p style="font-size: 15px; color: ${brandColors.textMuted}; line-height: 1.6; margin: 0 0 24px 0;">
      Your member account has been registered. You're now one step away from unfiltered training freedom in Ancoats, Manchester.
    </p>

    <div style="background-color: ${brandColors.surface2}; border-left: 4px solid ${brandColors.brand}; padding: 18px 20px; border-radius: 8px; margin-bottom: 28px;">
      <div style="font-size: 11px; font-weight: 700; color: ${brandColors.textMuted}; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Your Permanent Member Reference</div>
      <div style="font-size: 22px; font-weight: 900; color: ${brandColors.brand}; font-family: monospace;">${memberRef}</div>
      <div style="font-size: 12px; color: ${brandColors.textDim}; margin-top: 4px;">Quote this reference whenever contacting reception or checking in.</div>
    </div>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${verifyUrl}" class="btn" style="display: inline-block; background-color: ${brandColors.brand}; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px;">Verify Email Address &rarr;</a>
    </div>

    <p style="font-size: 13px; color: ${brandColors.textMuted}; line-height: 1.5; margin: 24px 0 0 0;">
      Once verified, you can view the live timetable, choose your membership tier, and reserve your first coached session.
    </p>
  `;

  return emailLayout({
    title: 'Welcome to IronWorks Gym Manchester',
    preheader: `Welcome ${name}! Your member reference is ${memberRef}`,
    content,
  });
}
