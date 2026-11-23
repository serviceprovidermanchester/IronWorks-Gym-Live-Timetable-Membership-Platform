'use client';
/**
 * Demo Banner — IronWorks Gym
 * SPManchester Private Limited
 */
import { useState } from 'react';
import { X } from 'lucide-react';

export function DemoBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="bg-ink text-gray-300 text-center text-sm py-2 px-4 relative">
      ★ <strong className="text-yellow-300">Concept / Demo Project</strong> — IronWorks Gym is a fictional business.
      {' '}Built by{' '}
      <a href="https://www.spmanchester.com" className="text-yellow-300 font-semibold hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
        SPManchester Private Limited
      </a>
      . No real bookings or payments processed.
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
        aria-label="Dismiss banner"
      >
        <X size={16} />
      </button>
    </div>
  );
}
