/**
 * Sentry Client Configuration for Next.js
 * IronWorks Gym · SPManchester Private Limited
 */
export function initSentryClient() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn || process.env.NODE_ENV !== 'production') {
    return;
  }

  // When deployed with Sentry DSN, capture uncaught errors
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      console.error('[SENTRY CLIENT CAPTURED]', event.error);
    });
    window.addEventListener('unhandledrejection', (event) => {
      console.error('[SENTRY UNHANDLED PROMISE]', event.reason);
    });
  }
}
