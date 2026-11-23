import { emailLayout, brandColors } from './base';

export interface BookingConfirmationProps {
  name: string;
  className: string;
  date: string;
  time: string;
  coach: string;
  bookingRef: string;
  cancelUrl: string;
}

export function renderBookingConfirmation({
  name,
  className,
  date,
  time,
  coach,
  bookingRef,
  cancelUrl,
}: BookingConfirmationProps): string {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); color: ${brandColors.green}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 14px; border-radius: 20px; margin-bottom: 12px;">
        ✓ Class Reserved
      </div>
      <h1 style="font-size: 24px; font-weight: 900; color: #ffffff; margin: 0;">Spot Confirmed!</h1>
      <p style="font-size: 15px; color: ${brandColors.textMuted}; margin-top: 6px;">You're booked in for ${className}, ${name}.</p>
    </div>

    <div style="background-color: ${brandColors.surface2}; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid ${brandColors.border};">
      <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 13px;">
        <tr>
          <td style="color: ${brandColors.textMuted};">Class:</td>
          <td align="right" style="font-weight: 700; color: #ffffff;">${className}</td>
        </tr>
        <tr>
          <td style="color: ${brandColors.textMuted};">Coach:</td>
          <td align="right" style="font-weight: 600; color: ${brandColors.brand};">${coach}</td>
        </tr>
        <tr>
          <td style="color: ${brandColors.textMuted};">Date &amp; Time:</td>
          <td align="right" style="color: #ffffff; font-weight: 600;">${date} at ${time}</td>
        </tr>
        <tr>
          <td style="color: ${brandColors.textMuted};">Location:</td>
          <td align="right" style="color: #ffffff;">IronWorks Flagship, Ancoats</td>
        </tr>
        <tr style="border-top: 1px solid ${brandColors.border};">
          <td style="color: ${brandColors.textMuted}; padding-top: 8px;">Booking Reference:</td>
          <td align="right" style="font-family: monospace; font-weight: 700; color: ${brandColors.brand}; padding-top: 8px;">${bookingRef}</td>
        </tr>
      </table>
    </div>

    <div style="background-color: ${brandColors.surface2}; padding: 14px 18px; border-radius: 8px; margin-bottom: 24px; font-size: 12px; color: ${brandColors.textMuted}; line-height: 1.5;">
      💡 <strong>Preparation:</strong> Please arrive 10 minutes prior for warm-up. Towel and clean lifting/training footwear required.
    </div>

    <div style="text-align: center; margin: 24px 0;">
      <a href="${cancelUrl}" style="color: ${brandColors.textDim}; font-size: 12px; text-decoration: underline;">Need to cancel this booking? (2h notice required)</a>
    </div>
  `;

  return emailLayout({
    title: `Class Confirmed: ${className} — IronWorks Gym`,
    preheader: `Confirmed: ${className} on ${date} at ${time} with ${coach}`,
    content,
  });
}
