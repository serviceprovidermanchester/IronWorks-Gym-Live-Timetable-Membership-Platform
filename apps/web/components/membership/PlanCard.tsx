'use client';
/**
 * Plan Card — IronWorks Gym
 * SPManchester Private Limited · https://www.spmanchester.com
 */
import Link from 'next/link';
import { Check, X } from 'lucide-react';

type FeatureItem = string | { text: string; included?: boolean };

export type PlanData = {
  id?: string;
  name: string;
  slug?: string;
  tier?: string;
  tagline?: string;
  description?: string;
  price?: number;
  priceMonthly?: number;
  priceGbpPence?: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  features?: FeatureItem[];
};

export function PlanCard({ plan }: { plan: PlanData }) {
  // Safe price calculation that never produces NaN
  let priceDisplay = '49';
  if (plan.priceGbpPence != null && !isNaN(plan.priceGbpPence)) {
    priceDisplay = (plan.priceGbpPence / 100).toFixed(0);
  } else if (plan.priceMonthly != null && !isNaN(plan.priceMonthly)) {
    priceDisplay = String(plan.priceMonthly);
  } else if (plan.price != null && !isNaN(plan.price)) {
    priceDisplay = String(plan.price);
  }

  const isHighlighted = Boolean(plan.isPopular || plan.isFeatured);
  const subtitle = plan.tagline || plan.description || 'Full open gym floor access with coach-led programming.';

  // Normalize feature items whether they are strings or { text, included }
  const featureList = (plan.features || []).map((f) => {
    if (typeof f === 'string') {
      return { text: f, included: true };
    }
    return { text: f.text, included: f.included !== false };
  });

  return (
    <div
      className={`rounded-2xl p-7 md:p-8 flex flex-col relative transition-all duration-300 ${
        isHighlighted
          ? 'bg-slate-900 border-2 border-brand ring-1 ring-brand/30 shadow-2xl shadow-brand/15 md:-translate-y-2'
          : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-xl'
      }`}
    >
      {isHighlighted && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-black px-4 py-1 rounded-full whitespace-nowrap uppercase tracking-wider shadow-md">
          ⭐ Most Popular Tier
        </span>
      )}

      {/* Header */}
      <div className="mb-5">
        <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-1">
          {plan.tier || 'Rolling Membership'}
        </span>
        <h3 className="font-black text-2xl text-white uppercase tracking-tight">
          {plan.name}
        </h3>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed min-h-[42px]">
          {subtitle}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-slate-800">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black text-white tracking-tight">
            £{priceDisplay}
          </span>
          <span className="text-slate-400 font-semibold text-sm">/month</span>
        </div>
        <p className="text-xs text-emerald-400 font-medium mt-1.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Rolling 30-day agreement · Cancel anytime
        </p>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {featureList.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            {f.included ? (
              <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <X size={18} className="text-slate-600 shrink-0 mt-0.5" />
            )}
            <span className={f.included ? 'text-slate-200' : 'text-slate-500 line-through'}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Action CTA */}
      <Link
        href="/register"
        className={`block text-center font-bold py-3.5 px-6 rounded-xl transition-all duration-200 no-underline text-base ${
          isHighlighted
            ? 'bg-brand hover:bg-orange-600 text-white shadow-lg shadow-brand/25'
            : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600'
        }`}
      >
        Start {plan.name}
      </Link>
    </div>
  );
}
