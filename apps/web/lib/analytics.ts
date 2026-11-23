/**
 * PostHog & Product Telemetry Analytics Helper
 * IronWorks Gym · SPManchester Private Limited · https://www.spmanchester.com
 *
 * Implements PRD event tracking specification:
 * - timetable_filtered   { day, category, results_count }
 * - class_card_expanded  { class_name, category, coach }
 * - checkout_started     { tier, payment_method }
 * - checkout_completed   { tier, revenue_gbp }
 * - checkout_abandoned   { tier, step }
 * - booking_created      { class_name, day, time }
 * - booking_cancelled    { class_name, reason }
 */

export type PostHogEvents = {
  timetable_filtered: { day: string; category: string; results_count: number };
  class_card_expanded: { class_name: string; category: string; coach: string };
  checkout_started: { tier: string; payment_method: 'stripe' | 'gocardless' | string };
  checkout_completed: { tier: string; revenue_gbp: number };
  checkout_abandoned: { tier: string; step: 'plan_selected' | 'details_entered' | 'payment_form' | string };
  booking_created: { class_name: string; day: string; time: string };
  booking_cancelled: { class_name: string; reason?: string };
};

export function trackEvent<E extends keyof PostHogEvents>(
  eventName: E,
  properties: PostHogEvents[E]
): void {
  if (typeof window !== 'undefined') {
    const ph = (window as any).posthog;
    if (ph && typeof ph.capture === 'function') {
      ph.capture(eventName, properties);
    } else {
      // In development or when PostHog is offline, log telemetry
      console.log(`📊 [PostHog Telemetry] ${eventName}`, properties);
    }
  }
}

// ── Specific Action Helpers ─────────────────────────────────────
export const analytics = {
  timetableFiltered: (props: PostHogEvents['timetable_filtered']) =>
    trackEvent('timetable_filtered', props),

  classCardExpanded: (props: PostHogEvents['class_card_expanded']) =>
    trackEvent('class_card_expanded', props),

  checkoutStarted: (props: PostHogEvents['checkout_started']) =>
    trackEvent('checkout_started', props),

  checkoutCompleted: (props: PostHogEvents['checkout_completed']) =>
    trackEvent('checkout_completed', props),

  checkoutAbandoned: (props: PostHogEvents['checkout_abandoned']) =>
    trackEvent('checkout_abandoned', props),

  bookingCreated: (props: PostHogEvents['booking_created']) =>
    trackEvent('booking_created', props),

  bookingCancelled: (props: PostHogEvents['booking_cancelled']) =>
    trackEvent('booking_cancelled', props),
};
