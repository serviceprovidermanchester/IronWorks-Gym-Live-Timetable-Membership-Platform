import { emailLayout, brandColors } from './base';

export interface BookingReminderProps {
  name: string;
  className: string;
  time: string;
  coach: string;
  directionsUrl?: string;
}

export function renderBookingReminder({
  name,
  className,
  time,
  coach,
  directionsUrl = 'https://maps.google.com/?q=IronWorks+Gym+Ancoats+Manchester',
}: BookingReminderProps): string {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: rgba(255, 85, 0, 0.15); border: 1px solid rgba(255, 85, 0, 0.3); color: ${brandColors.brand}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 14px; border-radius: 20px; margin-bottom: 12px;">
        ⏰ 2-Hour Reminder
      </div>
      <h1 style="font-size: 24px; font-weight: 900; color: #ffffff; margin: 0;">See You Soon, ${name}!</h1>
      <p style="font-size: 15px; color: ${brandColors.textMuted}; margin-top: 6px;">Your session starts in 2 hours.</p>
    </div>

    <div style="background-color: ${brandColors.surface2}; border-radius: 12px; padding: 22px; margin-bottom: 24px; border: 1px solid ${brandColors.border}; text-align: center;">
      <div style="font-size: 20px; font-weight: 800; color: #ffffff;">${className}</div>
      <div style="font-size: 14px; color: ${brandColors.brand}; font-weight: 600; margin: 4px 0 12px 0;">Coached by ${coach}</div>
      <div style="font-size: 28px; font-weight: 900; color: #ffffff; font-family: monospace;">Today at ${time}</div>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${directionsUrl}" class="btn" style="display: inline-block; background-color: ${brandColors.surface2}; color: #ffffff; border: 1px solid ${brandColors.border}; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 8px;">📍 Get Directions (Ancoats)</a>
    </div>

    <p style="font-size: 12px; color: ${brandColors.textDim}; text-align: center; line-height: 1.5; margin: 20px 0 0 0;">
      Please arrive 10 minutes early to lock away bags and warm up on the turf.
    </p>
  `;

  return emailLayout({
    title: `Starting Soon: ${className} at ${time} — IronWorks Gym`,
    preheader: `Reminder: ${className} starts in 2 hours with ${coach}`,
    content,
  });
}
