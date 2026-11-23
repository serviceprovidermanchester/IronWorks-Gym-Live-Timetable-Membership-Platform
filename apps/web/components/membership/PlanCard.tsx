/**
 * Plan Card — IronWorks Gym
 * SPManchester Private Limited
 */
import Link from 'next/link';
import { Check, X } from 'lucide-react';

type Feature = { text: string; included: boolean };
type Plan = { name: string; slug: string; tagline: string; priceGbpPence: number; isPopular: boolean; features: Feature[]; };

export function PlanCard({ plan }: { plan: Plan }) {
  const price = (plan.priceGbpPence / 100).toFixed(0);
  return (
    <div className={`bg-white rounded-2xl shadow-md p-7 flex flex-col relative transition-all hover:shadow-lg ${plan.isPopular ? 'border-2 border-brand ring-2 ring-brand/10 scale-105' : ''}`}>
      {plan.isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">
          ⭐ Most Popular
        </span>
      )}
      <h3 className="font-black text-lg text-brand uppercase tracking-wide mb-1">{plan.name}</h3>
      <p className="text-muted text-sm mb-4">{plan.tagline}</p>
      <div className="mb-6">
        <span className="text-5xl font-black text-ink">£{price}</span>
        <span className="text-muted font-medium">/mo</span>
      </div>
      <ul className="flex flex-col gap-2.5 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f.text} className="flex items-start gap-2 text-sm">
            {f.included
              ? <Check size={16} className="text-accent mt-0.5 shrink-0" />
              : <X size={16} className="text-gray-300 mt-0.5 shrink-0" />}
            <span className={f.included ? 'text-ink' : 'text-gray-400 line-through'}>{f.text}</span>
          </li>
        ))}
      </ul>
      <Link href="/membership" className={`block text-center font-bold py-3.5 rounded-full transition-colors no-underline ${plan.isPopular ? 'bg-brand text-white hover:bg-brand-dark' : 'border-2 border-brand text-brand hover:bg-brand-light'}`}>
        Start {plan.name}
      </Link>
    </div>
  );
}
