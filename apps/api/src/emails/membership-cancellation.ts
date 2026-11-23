import { emailLayout, brandColors } from './base';

export interface MembershipCancellationProps {
  name: string;
  planName: string;
  accessEndDate: string;
  coolingOffApplied?: boolean;
  rejoinUrl: string;
}

export function renderMembershipCancellation({
  name,
  planName,
  accessEndDate,
  coolingOffApplied = false,
  rejoinUrl,
}: MembershipCancellationProps): string {
  const content = `
    <h1 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">Membership Cancellation Confirmed</h1>
    <p style="font-size: 15px; color: ${brandColors.textMuted}; line-height: 1.6; margin: 0 0 24px 0;">
      Hi ${name}, your cancellation request for <strong>${planName}</strong> has been processed.
    </p>

    <div style="background-color: ${brandColors.surface2}; border-left: 4px solid ${brandColors.amber}; padding: 18px 20px; border-radius: 8px; margin-bottom: 24px;">
      <div style="font-size: 12px; font-weight: 700; color: ${brandColors.textMuted}; text-transform: uppercase; margin-bottom: 4px;">Access Period</div>
      <div style="font-size: 15px; color: #ffffff; font-weight: 600;">
        You can continue to train until <strong>${accessEndDate}</strong>.
      </div>
      <div style="font-size: 12px; color: ${brandColors.textDim}; margin-top: 6px;">
        ${coolingOffApplied
          ? 'Statutory 14-day cooling-off refund applied under Consumer Contracts Regulations.'
          : 'Month-to-month freedom: No exit fees or administrative penalties apply.'}
      </div>
    </div>

    <p style="font-size: 13px; color: ${brandColors.textMuted}; line-height: 1.5; margin: 0 0 24px 0;">
      We're sorry to see you go! If your schedule frees up or you want to restart training, you can rejoin at any time with zero joining fees.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${rejoinUrl}" class="btn" style="display: inline-block; background-color: ${brandColors.surface2}; color: #ffffff; border: 1px solid ${brandColors.border}; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 8px;">Rejoin Online &rarr;</a>
    </div>
  `;

  return emailLayout({
    title: 'Membership Cancellation Confirmed — IronWorks Gym',
    preheader: `Your ${planName} cancellation is confirmed. Access active until ${accessEndDate}.`,
    content,
  });
}
