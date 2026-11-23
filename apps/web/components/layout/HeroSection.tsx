/**
 * Hero Section — IronWorks Gym
 * SPManchester Private Limited · https://www.spmanchester.com
 */
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-24 md:py-32 overflow-hidden border-b border-slate-800">
      {/* Ambient background glow & industrial pattern */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-brand/15 blur-[140px] rounded-full pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/30 text-brand text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
          Fitness · Gym · Flagship ★ Ancoats, Manchester
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.12] mb-6 max-w-4xl tracking-tight">
          Every class, live — and a membership you can join in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-amber-300">
            two minutes
          </span>
        </h1>

        {/* Lead subtext */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-normal">
          IronWorks replaces out-of-date PDF timetables and &ldquo;DM us to join&rdquo; chaos with a
          live, filterable class schedule and transparent memberships — tonight.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <a
            href="/#timetable"
            className="bg-brand hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-base transition-all shadow-xl shadow-brand/25 no-underline flex items-center gap-2"
          >
            <span>See today&apos;s classes</span>
            <span className="font-mono text-sm">&darr;</span>
          </a>
          <a
            href="/#story"
            className="border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold px-8 py-4 rounded-xl text-base transition-all no-underline backdrop-blur-sm"
          >
            See the problem it solves
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-slate-800/80">
          {[
            { value: '18', label: 'classes every week', highlight: 'text-brand' },
            { value: '£49', label: 'memberships from / month', highlight: 'text-white' },
            { value: '2 min', label: 'online joining flow', highlight: 'text-emerald-400' },
            { value: '05:30', label: 'doors open daily', highlight: 'text-amber-400' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm"
            >
              <div className={`text-3xl md:text-4xl font-black ${s.highlight}`}>{s.value}</div>
              <div className="text-xs md:text-sm text-slate-400 font-medium mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
