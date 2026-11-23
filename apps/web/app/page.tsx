/**
 * Homepage — IronWorks Gym
 * SPManchester Private Limited · https://www.spmanchester.com
 */
import { Suspense } from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/layout/HeroSection';
import { TimetableSection } from '@/components/timetable/TimetableSection';
import { PlanCard } from '@/components/membership/PlanCard';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { FaqSection } from '@/components/home/FaqSection';

async function getPlans() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/v1';
  try {
    const res = await fetch(`${apiUrl}/memberships/plans`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

const fallbackPlans = [
  {
    id: 'plan_standard',
    name: 'Standard Tier',
    tier: 'STANDARD',
    priceMonthly: 49,
    priceGbpPence: 4900,
    description: 'Full open gym floor access and 4 coach-led classes per month.',
    features: [
      { text: 'Full open gym floor access (05:30–23:00)', included: true },
      { text: '4 coach-led classes every month', included: true },
      { text: 'Locker & luxury shower facilities', included: true },
      { text: 'Free IronWorks training mobile app', included: true },
      { text: 'Unlimited weekly class bookings', included: false },
    ],
    isFeatured: false,
  },
  {
    id: 'plan_unlimited',
    name: 'Unlimited Tier',
    tier: 'UNLIMITED',
    priceMonthly: 75,
    priceGbpPence: 7500,
    description: 'Our most popular membership. All 18 weekly classes unmetered.',
    features: [
      { text: 'Unlimited gym floor access (05:30–23:00)', included: true },
      { text: 'All 18 weekly classes unmetered', included: true },
      { text: '7-day advance class booking window', included: true },
      { text: '1 free guest pass every month', included: true },
      { text: '15% discount on 1-on-1 personal training', included: true },
    ],
    isFeatured: true,
  },
  {
    id: 'plan_founding',
    name: 'Founding Member',
    tier: 'FOUNDING_MEMBER',
    priceMonthly: 99,
    priceGbpPence: 9900,
    description: 'All-inclusive VIP athletic tier with dedicated 1-on-1 coach check-ins.',
    features: [
      { text: 'Everything in Unlimited Tier', included: true },
      { text: 'Monthly 60-min 1-on-1 coaching session', included: true },
      { text: 'Custom 12-week lifting & nutrition programme', included: true },
      { text: 'Guaranteed spot in peak classes', included: true },
      { text: 'Exclusive IronWorks competition apparel pack', included: true },
    ],
    isFeatured: false,
  },
];

export default async function HomePage() {
  const plans = await getPlans();
  const displayPlans = plans.length > 0 ? plans : fallbackPlans;

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* The Problem → Solution pitch */}
      <section id="story" className="py-20 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold text-accent tracking-wider">Concept Demo #01</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">The Problem → The Solution</h2>
            <p className="text-slate-400 text-sm mt-2">
              Every SPManchester concept project solves a concrete commercial problem in the sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-slate-950 border border-rose-500/30 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">❌ The Market Problem</div>
                <h3 className="text-xl font-bold text-white mb-3">Noticeboards & Instagram DMs</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Independent gyms run from paper forms and timetable screenshot stories. When a prospective member has to message for pricing or visit a desk to sign up, they abandon and join a budget chain with an instant mobile app.
                </p>
              </div>
              <div className="mt-6 text-xs text-rose-400/80 font-mono">High member drop-off · Lost revenue</div>
            </div>

            <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">✅ The Solution — IronWorks Platform</div>
                <h3 className="text-xl font-bold text-white mb-3">Indie Character, Chain-Level Convenience</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Live data-driven timetable with 1-tap booking, transparent rolling monthly pricing, instant Stripe / GoCardless joining, and headless CMS control for gym coaches without touching code.
                </p>
              </div>
              <div className="mt-6 text-xs text-emerald-400/80 font-mono">2-minute joining flow · Zero contract friction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timetable Section */}
      <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading timetable…</div>}>
        <TimetableSection />
      </Suspense>

      {/* Membership Plans Section */}
      <section id="plans" className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold text-brand tracking-wider">Transparent Pricing</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
              Membership — No Contract Traps
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2">
              Month-to-month freedom. Cancel anytime online. No hidden administrative fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {displayPlans.map((plan: any) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof & Reviews */}
      <ReviewsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Ready to Experience Serious Training?
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Join online in under 2 minutes and book your first session today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3.5 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-accent/15"
            >
              Get Started Now
            </Link>
            <Link
              href="/timetable"
              className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all"
            >
              Browse Timetable
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
