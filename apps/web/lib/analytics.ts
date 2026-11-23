/**
 * PostHog & Product Analytics Helper
 * IronWorks Gym · SPManchester Private Limited
 */

export function trackEvent(
  eventName:
    | 'timetable_filtered'
    | 'class_card_expanded'
    | 'checkout_started'
    | 'checkout_completed'
    | 'checkout_abandoned'
    | 'booking_created'
    | 'booking_cancelled',
  properties?: Record<string, any>
) {
  if (typeof window !== 'undefined') {
    // If posthog is loaded in browser
    if ((window as any).posthog) {
      (window as any).posthog.capture(eventName, properties);
    } else if (process.env.NODE_ENV !== 'production') {
      // In dev, log events for verification
      console.log(`[ANALYTICS EVENT] ${eventName}`, properties);
    }
  }
}
