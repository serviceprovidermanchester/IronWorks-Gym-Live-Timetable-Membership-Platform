import { emailLayout, brandColors } from './base';

export interface BookingCancelledProps {
  name: string;
  className: string;
  date: string;
  time: string;
  bookingRef: string;
  rebookUrl: string;
}

export function renderBookingCancelled({
  name,
  className,
  date,
  time,
  bookingRef,
  rebookUrl,
}: BookingCancelledProps): string {
  const content = `
    <h1 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">Booking Cancelled</h1>
    <p style="font-size: 15px; color: ${brandColors.textMuted}; line-height: 1.6; margin: 0 0 24px 0;">
      Hi ${name}, your reservation for <strong>${className}</strong> on <strong>${date} at ${time}</strong> (Ref: ${bookingRef}) has been successfully cancelled.
    </p>

    <div style="background-color: ${brandColors.surface2}; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px; font-size: 13px; color: ${brandColors.textMuted}; line-height: 1.5;">
      Your spot has automatically been released to the next member on the waitlist. Thank you for giving advance notice!
    </div>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${rebookUrl}" class="btn" style="display: inline-block; background-color: ${brandColors.brand}; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px;">Explore Timetable &amp; Rebook &rarr;</a>
    </div>
  `;

  return emailLayout({
    title: `Booking Cancelled: ${className} — IronWorks Gym`,
    preheader: `Your reservation for ${className} on ${date} has been cancelled.`,
    content,
  });
}
