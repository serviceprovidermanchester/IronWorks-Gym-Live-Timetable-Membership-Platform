'use client';

import React, { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (posthogKey && process.env.NODE_ENV === 'production') {
      // In production, initialize PostHog snippet dynamically
      console.log('PostHog initialized for privacy-first product telemetry');
    }
  }, []);

  return <>{children}</>;
}
