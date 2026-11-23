/**
 * Membership page — IronWorks Gym
 * SPManchester Private Limited
 */
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlanCard } from '@/components/membership/PlanCard';

export const metadata: Metadata = {
  title: 'Membership Plans',
  description: 'Join IronWorks Gym from £29/mo. No joining fee, no contract. Month-to-month.',
};

const STATIC_PLANS = [
  { name: 'Off-Peak', slug: 'off-peak', tagline: 'Train on your terms. 09:00–16:00 + all weekend.', priceGbpPence: 2900, isPopular: false, features: [{ text: 'Full gym access (09:00–16:00 weekdays)', included: true }, { text: 'Full weekend access (all hours)', included: true }, { text: 'All off-peak classes included', included: true }, { text: 'Locker & changing facilities', included: true }, { text: 'Peak-hour access', included: false }] },
  { name: 'All Access', slug: 'all-access', tagline: 'No restrictions. Unlimited classes, any time.', priceGbpPence: 4200, isPopular: true, features: [{ text: 'Unlimited gym access (05:30–23:00)', included: true }, { text: 'Unlimited classes (all categories)', included: true }, { text: 'Guest pass (1/month)', included: true }, { text: 'Class booking (live build)', included: true }, { text: 'PT or coaching sessions', included: false }] },
  { name: 'All Access + Coaching', slug: 'all-access-plus', tagline: 'Everything in All Access + personal coaching.', priceGbpPence: 7900, isPopular: false, features: [{ text: 'Everything in All Access', included: true }, { text: 'Monthly 1-to-1 coaching (60 min)', included: true }, { text: 'Personal 12-week programme', included: true }, { text: 'Progress tracking & check-ins', included: true }, { text: 'Guest pass (2/month)', included: true }] },
];

const FAQS = [
  { q: 'Is there a joining fee?', a: 'No joining fee ever. Pay your first month and you\'re in.' },
  { q: 'Can I cancel any time?', a: 'Yes — month-to-month only. Cancel before the next billing date.' },
  { q: 'What\'s the cooling-off period?', a: '14 days under the Consumer Contracts Regulations for online sign-ups.' },
  { q: 'Can I pause my membership?', a: 'Yes, up to 3 months per year. Manage it from your member dashboard.' },
  { q: 'Which payment methods do you accept?', a: 'Card (Stripe) and UK Direct Debit (GoCardless) — your choice.' },
];

export default function MembershipPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand to-brand-dark text-white py-20 text-center px-5">
          <span className="inline-block bg-white/20 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">Membership</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">No contract traps</h1>
          <p className="text-lg opacity-90 max-w-xl mx-auto">Month-to-month. Cancel any time. The pricing page a chain would be proud of, for a gym with a soul.</p>
        </section>

        {/* Plans */}
        <section className="py-20 px-5 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 items-start">
              {STATIC_PLANS.map((plan) => <PlanCard key={plan.slug} plan={plan} />)}
            </div>
            <p className="mt-8 text-sm text-muted text-center italic">* Prices are sample content. All plans are month-to-month. 14-day cooling-off period applies.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-5 bg-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Common questions</h2>
            <div className="flex flex-col gap-4">
              {FAQS.map((faq) => (
                <details key={faq.q} className="bg-gray-50 rounded-2xl p-6 group cursor-pointer">
                  <summary className="font-bold list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-brand text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-muted text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
