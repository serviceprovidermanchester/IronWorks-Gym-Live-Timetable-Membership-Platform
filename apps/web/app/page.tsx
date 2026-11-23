/**
 * Homepage — IronWorks Gym
 * SPManchester Private Limited · https://www.spmanchester.com
 */
import { Suspense } from 'react';
import { DemoBanner } from '@/components/layout/DemoBanner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/layout/HeroSection';
import { TimetableSection } from '@/components/timetable/TimetableSection';
import { PlanCard } from '@/components/membership/PlanCard';

// Fetch plans server-side for SSG
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

export default async function HomePage() {
  const plans = await getPlans();

  return (
    <>
      <DemoBanner />
      <Header />
      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────── */}
        <HeroSection />

        {/* ── Problem → Solution ───────────────────────────── */}
        <section id="story" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl font-bold mb-3">The problem → the solution</h2>
            <p className="text-muted text-lg mb-10 max-w-2xl">
              Every SPManchester concept project starts from a real market problem —
              the same story we pitch to a client in this sector.
            </p>
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
              <div className="bg-white rounded-2xl shadow-md p-7 border-t-4 border-brand">
                <h3 className="font-bold text-lg mb-3">❌ The problem</h3>
                <p className="text-muted">
                  Independent gyms run from a noticeboard: timetable screenshots on Instagram,
                  pricing by DM, joining via paper form. Every friction point sends ready-to-join
                  members to the budget chains.
                </p>
              </div>
              <div className="flex items-center justify-center text-4xl font-black text-brand px-2 md:rotate-0 rotate-90">→</div>
              <div className="bg-white rounded-2xl shadow-md p-7 border-t-4 border-accent">
                <h3 className="font-bold text-lg mb-3">✅ The solution — this website</h3>
                <p className="text-muted">
                  A data-driven gym website with live class filters, honest membership tiers,
                  and an online joining flow — indie character, chain-level convenience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Timetable ─────────────────────────────────────── */}
        <Suspense fallback={<div className="py-20 text-center text-muted">Loading timetable…</div>}>
          <TimetableSection />
        </Suspense>

        {/* ── Membership Plans ──────────────────────────────── */}
        <section id="plans" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl font-bold mb-3">Membership — no contract traps</h2>
            <p className="text-muted text-lg mb-10">Month-to-month. Cancel any time. Transparent pricing.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.length > 0
                ? plans.map((plan: any) => <PlanCard key={plan.id} plan={plan} />)
                : (
                  // Static fallback if API is not running
                  <>
                    <PlanCard plan={{ name: 'Off-Peak', slug: 'off-peak', tagline: 'Train on your terms', priceGbpPence: 2900, isPopular: false, features: [{ text: 'Full gym access (09:00–16:00)', included: true }, { text: 'All off-peak classes', included: true }, { text: 'Peak-hour access', included: false }] }} />
                    <PlanCard plan={{ name: 'All Access', slug: 'all-access', tagline: 'No restrictions. Any time.', priceGbpPence: 4200, isPopular: true, features: [{ text: 'Unlimited gym access', included: true }, { text: 'Unlimited classes', included: true }, { text: 'Guest pass (1/month)', included: true }] }} />
                    <PlanCard plan={{ name: 'All Access + Coaching', slug: 'all-access-plus', tagline: 'Everything + personal coaching', priceGbpPence: 7900, isPopular: false, features: [{ text: 'Everything in All Access', included: true }, { text: 'Monthly 1-to-1 coaching', included: true }, { text: 'Personal programme', included: true }] }} />
                  </>
                )
              }
            </div>
            <p className="mt-6 text-sm text-muted italic">* Prices are sample content. Month-to-month — cancel any time.</p>
          </div>
        </section>

        {/* ── Coaches ───────────────────────────────────────── */}
        <section id="coaches" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl font-bold mb-3">Meet the coaches</h2>
            <p className="text-muted text-lg mb-10">Every class led by a specialist — not a generalist with a clipboard.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Coach Dee', role: 'Strength & Olympic Lifting', color: 'from-brand to-brand-dark', initial: 'D' },
                { name: 'Coach Marco', role: 'HIIT & Conditioning', color: 'from-accent to-accent-dark', initial: 'M' },
                { name: 'Coach Ana', role: 'Yoga & Mobility', color: 'from-purple-600 to-purple-900', initial: 'A' },
                { name: 'Coach Jay', role: 'Boxing & Combat', color: 'from-orange-600 to-red-900', initial: 'J' },
              ].map((coach) => (
                <div key={coach.name} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${coach.color} flex items-center justify-center text-white text-3xl font-black mx-auto mb-4`}>
                    {coach.initial}
                  </div>
                  <h3 className="font-bold text-lg">{coach.name}</h3>
                  <p className="text-brand font-semibold text-sm mt-1 mb-3">{coach.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-br from-brand to-brand-dark text-white text-center">
          <div className="max-w-2xl mx-auto px-5">
            <h2 className="text-4xl font-black mb-4">Ready to start?</h2>
            <p className="text-lg opacity-90 mb-8">Join tonight. Your first class is waiting.</p>
            <a href="/membership" className="inline-block bg-white text-brand font-bold px-8 py-4 rounded-full text-lg hover:bg-brand-light transition-colors">
              See membership plans →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
