import { emailLayout, brandColors } from './base';

export interface MembershipConfirmationProps {
  name: string;
  planName: string;
  memberRef: string;
  startDate: string;
  amount: string;
  qrCodeUrl?: string;
  portalUrl: string;
}

export function renderMembershipConfirmation({
  name,
  planName,
  memberRef,
  startDate,
  amount,
  portalUrl,
}: MembershipConfirmationProps): string {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); color: ${brandColors.green}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 14px; border-radius: 20px; margin-bottom: 12px;">
        ✓ Membership Active
      </div>
      <h1 style="font-size: 26px; font-weight: 900; color: #ffffff; margin: 0;">You're Ready to Train!</h1>
      <p style="font-size: 15px; color: ${brandColors.textMuted}; margin-top: 6px;">Your ${planName} is confirmed, ${name}.</p>
    </div>

    <div style="background-color: ${brandColors.surface2}; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid ${brandColors.border};">
      <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 13px;">
        <tr>
          <td style="color: ${brandColors.textMuted};">Membership Plan:</td>
          <td align="right" style="font-weight: 700; color: #ffffff;">${planName}</td>
        </tr>
        <tr>
          <td style="color: ${brandColors.textMuted};">Member Reference:</td>
          <td align="right" style="font-weight: 700; font-family: monospace; color: ${brandColors.brand};">${memberRef}</td>
        </tr>
        <tr>
          <td style="color: ${brandColors.textMuted};">Start Date:</td>
          <td align="right" style="color: #ffffff;">${startDate}</td>
        </tr>
        <tr>
          <td style="color: ${brandColors.textMuted};">Monthly Rate:</td>
          <td align="right" style="font-weight: 700; color: ${brandColors.green};">${amount} / month</td>
        </tr>
      </table>
    </div>

    <div style="background-color: ${brandColors.surface2}; text-align: center; padding: 24px; border-radius: 12px; margin-bottom: 28px; border: 1px dashed ${brandColors.border};">
      <div style="font-size: 11px; font-weight: 700; color: ${brandColors.textMuted}; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Turnstile Entry Pass</div>
      <div style="font-family: monospace; font-size: 28px; font-weight: 900; letter-spacing: 4px; color: #ffffff; background-color: ${brandColors.bg}; display: inline-block; padding: 12px 24px; border-radius: 8px; border: 1px solid ${brandColors.border};">
        ${memberRef}
      </div>
      <div style="font-size: 11px; color: ${brandColors.textDim}; margin-top: 8px;">Scan your digital barcode or show this reference at reception.</div>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${portalUrl}" class="btn" style="display: inline-block; background-color: ${brandColors.brand}; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px;">Access Member Dashboard &rarr;</a>
    </div>
  `;

  return emailLayout({
    title: 'Membership Confirmed — IronWorks Gym',
    preheader: `Your ${planName} is now active. Ref: ${memberRef}`,
    content,
  });
}
