/**
 * Membership page — IronWorks Gym
 * SPManchester Private Limited · https://www.spmanchester.com
 */
import { Metadata } from 'next';
import { PlanCard } from '@/components/membership/PlanCard';

export const metadata: Metadata = {
  title: 'Membership Plans | IronWorks Gym Manchester',
  description: 'Join IronWorks Gym from £29/mo. No joining fee, no lock-in contracts. Month-to-month freedom.',
};

const STATIC_PLANS = [
  {
    name: 'Standard Tier',
    slug: 'standard-tier',
    tier: 'STANDARD',
    tagline: 'Train on your terms. Full open gym floor + 4 classes per month.',
    priceGbpPence: 4900,
    priceMonthly: 49,
    isPopular: false,
    isFeatured: false,
    features: [
      { text: 'Full open gym floor access (05:30–23:00)', included: true },
      { text: '4 coach-led classes every month', included: true },
      { text: 'Locker & luxury changing facilities', included: true },
      { text: 'Free IronWorks training app', included: true },
      { text: 'Unlimited weekly class bookings', included: false },
    ],
  },
  {
    name: 'Unlimited Tier',
    slug: 'unlimited-tier',
    tier: 'UNLIMITED',
    tagline: 'Our flagship membership. All 18 weekly classes unmetered.',
    priceGbpPence: 7500,
    priceMonthly: 75,
    isPopular: true,
    isFeatured: true,
    features: [
      { text: 'Unlimited open gym access (05:30–23:00)', included: true },
      { text: 'All 18 weekly classes unmetered', included: true },
      { text: '7-day advance class booking window', included: true },
      { text: '1 free guest pass every month', included: true },
      { text: '15% discount on 1-to-1 personal training', included: true },
    ],
  },
  {
    name: 'Founding Member',
    slug: 'founding-member',
    tier: 'FOUNDING_MEMBER',
    tagline: 'VIP athletic tier with monthly 1-on-1 coaching & programming.',
    priceGbpPence: 9900,
    priceMonthly: 99,
    isPopular: false,
    isFeatured: false,
    features: [
      { text: 'Everything in Unlimited Tier', included: true },
      { text: 'Monthly 60-min 1-on-1 coaching session', included: true },
      { text: 'Custom 12-week lifting & nutrition programme', included: true },
      { text: 'Guaranteed spot in peak classes', included: true },
      { text: 'Exclusive IronWorks competition apparel pack', included: true },
    ],
  },
];

const FAQS = [
  { q: 'Is there a joining fee or setup charge?', a: 'No joining fee ever. Pay your first month and you are ready to train on day one.' },
  { q: 'Can I cancel any time?', a: 'Yes — month-to-month only. Cancel before your next billing date with zero penalty or exit fees.' },
  { q: 'What is the cooling-off period?', a: '14 days statutory cooling-off under Consumer Contracts Regulations for online sign-ups.' },
  { q: 'Can I pause my membership if I travel or get injured?', a: 'Yes, pause for up to 3 months per year with 1 click from your member dashboard.' },
  { q: 'Which payment methods do you accept?', a: 'Major credit/debit cards via Stripe and UK Direct Debit via GoCardless.' },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 md:py-28 text-center px-5 border-b border-slate-800 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-brand/10 border border-brand/30 text-brand text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            ★ Transparent Pricing · Ancoats, Manchester
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            No contract traps. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-amber-300">Total training freedom.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Month-to-month freedom. Cancel anytime online. The transparent pricing a chain would be proud of, for an independent gym with serious standards.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-5 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {STATIC_PLANS.map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
          <p className="mt-10 text-xs sm:text-sm text-slate-500 text-center italic">
            * All memberships are rolling 30-day subscriptions. 14-day cooling-off period applies. Bacs Direct Debit and card checkout available.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-5 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold text-brand tracking-wider">Got Questions?</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => (
              <details key={faq.q} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 group cursor-pointer hover:border-slate-700 transition-colors">
                <summary className="font-bold text-white text-base list-none flex justify-between items-center select-none">
                  <span>{faq.q}</span>
                  <span className="text-brand text-xl transition-transform group-open:rotate-45 font-mono">+</span>
                </summary>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 pt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
