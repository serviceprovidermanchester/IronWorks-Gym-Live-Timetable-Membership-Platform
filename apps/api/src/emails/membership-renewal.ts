import { emailLayout, brandColors } from './base';

export interface MembershipRenewalProps {
  name: string;
  planName: string;
  amount: string;
  renewalDate: string;
  manageUrl: string;
}

export function renderMembershipRenewal({
  name,
  planName,
  amount,
  renewalDate,
  manageUrl,
}: MembershipRenewalProps): string {
  const content = `
    <h1 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">Upcoming Membership Renewal</h1>
    <p style="font-size: 15px; color: ${brandColors.textMuted}; line-height: 1.6; margin: 0 0 24px 0;">
      Hi ${name}, your monthly rolling membership is scheduled to renew in 3 days.
    </p>

    <div style="background-color: ${brandColors.surface2}; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid ${brandColors.border};">
      <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 13px;">
        <tr>
          <td style="color: ${brandColors.textMuted};">Plan:</td>
          <td align="right" style="font-weight: 700; color: #ffffff;">${planName}</td>
        </tr>
        <tr>
          <td style="color: ${brandColors.textMuted};">Renewal Date:</td>
          <td align="right" style="color: #ffffff; font-weight: 600;">${renewalDate}</td>
        </tr>
        <tr style="border-top: 1px solid ${brandColors.border};">
          <td style="color: ${brandColors.textMuted}; padding-top: 8px;">Amount:</td>
          <td align="right" style="font-size: 18px; font-weight: 900; color: ${brandColors.green}; padding-top: 8px;">${amount}</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 13px; color: ${brandColors.textMuted}; line-height: 1.5; margin: 0 0 24px 0;">
      Your registered payment method will be charged automatically. No action is required to keep training.
    </p>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${manageUrl}" style="color: ${brandColors.brand}; font-weight: 700; font-size: 13px; text-decoration: none;">Manage Membership &amp; Billing &rarr;</a>
    </div>
  `;

  return emailLayout({
    title: `Membership Renewal Notice — IronWorks Gym`,
    preheader: `Your ${planName} renews on ${renewalDate} for ${amount}.`,
    content,
  });
}
