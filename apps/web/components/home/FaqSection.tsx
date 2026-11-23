'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'Are there any tie-in contracts or joining cancellation fees?',
    a: 'None whatsoever. All IronWorks memberships are rolling 30-day agreements. You can cancel anytime from your member portal with zero penalty fees before the next billing cycle.',
  },
  {
    q: 'Can beginners join the strength and barbell classes?',
    a: 'Absolutely. Every class is capped at 16–20 members so our head coaches can scale movements to your current ability level. Whether you are squatting empty bar or 140kg, our coaches guide your mechanics.',
  },
  {
    q: 'How does the class waitlist work if a session is full?',
    a: 'When a class reaches capacity, you can join the queue with one tap. If an existing attendee cancels (members must cancel with 2 hours notice), our automated booking engine promotes the next waitlisted member instantly and sends an SMS/email notification.',
  },
  {
    q: 'What facilities are available on-site in Ancoats?',
    a: 'We feature competition Eleiko barbells and bumper plates, 6 Rogue power cages, Concept2 SkiErgs, RowErgs, Rogue Echo bikes, a dedicated striking zone with 6 heavy bags, and luxury showers with lockers.',
  },
  {
    q: 'Can I pay monthly via UK Direct Debit instead of a debit card?',
    a: 'Yes! We support automated monthly Direct Debit through GoCardless (UK Bacs scheme) as well as all major credit/debit cards via Stripe.',
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 bg-brand-dark border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold text-accent tracking-wider">Frequently Asked Questions</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Everything You Need to Know</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-6 font-bold text-white flex items-center justify-between gap-4 hover:text-accent transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <span className="text-2xl font-light text-slate-400 shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
