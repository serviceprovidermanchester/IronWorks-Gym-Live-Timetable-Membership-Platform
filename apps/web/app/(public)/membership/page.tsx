'use client';
/**
 * Membership page — IronWorks Gym
 * SPManchester Private Limited · https://www.spmanchester.com
 *
 * Component Tree: BillingToggle → PlanCards → PlanComparisonTable → FAQAccordion
 */
import { useState } from 'react';
import Link from 'next/link';
import { PlanCard } from '@/components/membership/PlanCard';
import { Check, X, Sparkles, Shield, Zap, HelpCircle } from 'lucide-react';

const STATIC_PLANS = [
  {
    name: 'Standard Tier',
    slug: 'standard-tier',
    tier: 'STANDARD',
    tagline: 'Train on your terms. Full open gym floor + 4 classes per month.',
    monthlyPrice: 49,
    annualMonthlyPrice: 41,
    isPopular: false,
    isFeatured: false,
    features: [
      { text: 'Full open gym floor access (05:30–23:00)', included: true },
      { text: '4 coach-led classes every month', included: true },
      { text: 'Locker & luxury changing facilities', included: true },
      { text: 'Free IronWorks training app', included: true },
      { text: 'Unlimited weekly class bookings', included: false },
      { text: 'Monthly 1-on-1 coaching session', included: false },
    ],
  },
  {
    name: 'Unlimited Tier',
    slug: 'unlimited-tier',
    tier: 'UNLIMITED',
    tagline: 'Our flagship membership. All 18 weekly classes unmetered.',
    monthlyPrice: 75,
    annualMonthlyPrice: 62,
    isPopular: true,
    isFeatured: true,
    features: [
      { text: 'Unlimited open gym access (05:30–23:00)', included: true },
      { text: 'All 18 weekly classes unmetered', included: true },
      { text: '7-day advance class booking window', included: true },
      { text: '1 free guest pass every month', included: true },
      { text: '15% discount on 1-to-1 personal training', included: true },
      { text: 'Monthly 1-on-1 coaching session', included: false },
    ],
  },
  {
    name: 'Founding Member',
    slug: 'founding-member',
    tier: 'FOUNDING_MEMBER',
    tagline: 'VIP athletic tier with monthly 1-on-1 coaching & programming.',
    monthlyPrice: 99,
    annualMonthlyPrice: 82,
    isPopular: false,
    isFeatured: false,
    features: [
      { text: 'Everything in Unlimited Tier', included: true },
      { text: 'Monthly 60-min 1-on-1 coaching session', included: true },
      { text: 'Custom 12-week lifting & nutrition programme', included: true },
      { text: 'Guaranteed spot in peak classes', included: true },
      { text: 'Exclusive IronWorks competition apparel pack', included: true },
      { text: 'VIP turnstile fast-pass', included: true },
    ],
  },
];

const COMPARISON_ROWS = [
  { feature: 'Open Gym Floor Access (05:30–23:00)', standard: true, unlimited: true, founding: true },
  { feature: 'Locker & Luxury Changing Rooms', standard: true, unlimited: true, founding: true },
  { feature: 'IronWorks Mobile Companion App', standard: true, unlimited: true, founding: true },
  { feature: 'Classes Included Per Month', standard: '4 classes', unlimited: 'Unlimited (18/wk)', founding: 'Unlimited (18/wk)' },
  { feature: 'Class Booking Window', standard: '3 days advance', unlimited: '7 days advance', founding: '14 days advance' },
  { feature: 'Waitlist Priority', standard: 'Standard', unlimited: 'Priority', founding: 'Guaranteed Peak' },
  { feature: 'Monthly Free Guest Passes', standard: false, unlimited: '1 pass / month', founding: '2 passes / month' },
  { feature: '1-to-1 Personal Training Discount', standard: false, unlimited: '15% off', founding: '25% off' },
  { feature: 'Dedicated 60-Min 1-on-1 Coach Session', standard: false, unlimited: false, founding: 'Monthly Included' },
  { feature: 'Custom Lifting & Nutrition Programme', standard: false, unlimited: false, founding: 'Included' },
  { feature: 'Exclusive IronWorks Competition Apparel Pack', standard: false, unlimited: false, founding: 'Included' },
];

const FAQS = [
  { q: 'Is there a joining fee or setup charge?', a: 'No joining fee ever. Pay your first month and you are ready to train on day one.' },
  { q: 'Can I cancel any time?', a: 'Yes — month-to-month only. Cancel before your next billing date with zero penalty or exit fees.' },
  { q: 'What is the cooling-off period?', a: '14 days statutory cooling-off under Consumer Contracts Regulations for online sign-ups.' },
  { q: 'Can I pause my membership if I travel or get injured?', a: 'Yes, pause for up to 3 months per year with 1 click from your member dashboard.' },
  { q: 'Which payment methods do you accept?', a: 'Major credit/debit cards via Stripe and UK Direct Debit via GoCardless.' },
];

export default function MembershipPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

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

          {/* 1. BillingToggle */}
          <div className="mt-10 inline-flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl shadow-xl">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-brand text-white shadow-md shadow-brand/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Rolling
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                billingPeriod === 'annual'
                  ? 'bg-brand text-white shadow-md shadow-brand/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                Save 17% (2 Mo Free)
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. PlanCards */}
      <section className="py-20 px-5 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {STATIC_PLANS.map((plan) => {
              const price = billingPeriod === 'annual' ? plan.annualMonthlyPrice : plan.monthlyPrice;
              const formattedPlan = {
                name: plan.name,
                slug: plan.slug,
                tier: plan.tier,
                tagline: plan.tagline,
                priceMonthly: price,
                priceGbpPence: price * 100,
                isPopular: plan.isPopular,
                isFeatured: plan.isFeatured,
                features: plan.features,
              };
              return <PlanCard key={plan.slug} plan={formattedPlan} />;
            })}
          </div>
          <p className="mt-10 text-xs sm:text-sm text-slate-500 text-center italic">
            * All memberships are rolling subscriptions. 14-day statutory cooling-off period applies. Stripe Card &amp; GoCardless Direct Debit available.
          </p>
        </div>
      </section>

      {/* 3. PlanComparisonTable */}
      <section className="py-20 px-5 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold text-brand tracking-wider">Side-by-Side</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Full Tier Comparison</h2>
            <p className="text-slate-400 text-sm mt-2">
              Compare features and booking privileges across each IronWorks membership level.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800">
                    <th className="p-4 sm:p-5 text-slate-400 font-bold uppercase text-xs tracking-wider">Features &amp; Access</th>
                    <th className="p-4 sm:p-5 text-center text-white font-bold uppercase text-xs tracking-wider">Standard (£49)</th>
                    <th className="p-4 sm:p-5 text-center text-brand font-bold uppercase text-xs tracking-wider bg-brand/5">Unlimited (£75) ⭐</th>
                    <th className="p-4 sm:p-5 text-center text-amber-400 font-bold uppercase text-xs tracking-wider">Founding (£99)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 sm:p-5 font-medium text-slate-200">{row.feature}</td>
                      <td className="p-4 sm:p-5 text-center text-slate-300">
                        {typeof row.standard === 'boolean' ? (
                          row.standard ? <Check size={18} className="text-emerald-400 mx-auto" /> : <X size={18} className="text-slate-600 mx-auto" />
                        ) : (
                          <span className="font-semibold text-xs">{row.standard}</span>
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center text-slate-200 bg-brand/5">
                        {typeof row.unlimited === 'boolean' ? (
                          row.unlimited ? <Check size={18} className="text-emerald-400 mx-auto" /> : <X size={18} className="text-slate-600 mx-auto" />
                        ) : (
                          <span className="font-bold text-xs text-brand">{row.unlimited}</span>
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center text-slate-200">
                        {typeof row.founding === 'boolean' ? (
                          row.founding ? <Check size={18} className="text-emerald-400 mx-auto" /> : <X size={18} className="text-slate-600 mx-auto" />
                        ) : (
                          <span className="font-bold text-xs text-amber-400">{row.founding}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQAccordion */}
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
