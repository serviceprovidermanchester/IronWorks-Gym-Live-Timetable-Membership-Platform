/**
 * Hero Section — IronWorks Gym
 * SPManchester Private Limited
 */
export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-brand to-brand-dark text-white py-24 relative overflow-hidden">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E")` }}
      />
      <div className="relative max-w-6xl mx-auto px-5">
        <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Fitness · Gym · Flagship ★
        </span>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight mb-6 max-w-3xl">
          Every class, live — and a membership you can join in two minutes
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mb-10 leading-relaxed">
          IronWorks replaces the out-of-date PDF timetable and "DM us to join" chaos with
          a live, filterable class schedule and transparent memberships — tonight.
        </p>
        <div className="flex flex-wrap gap-4 mb-14">
          <a href="/#timetable" className="bg-white text-brand font-bold px-7 py-3.5 rounded-full text-base hover:bg-brand-light transition-colors no-underline">
            See today's classes
          </a>
          <a href="/#story" className="border-2 border-white/70 text-white font-bold px-7 py-3.5 rounded-full text-base hover:bg-white/10 transition-colors no-underline">
            See the problem it solves
          </a>
        </div>

        {/* Stats */}
        <dl className="flex flex-wrap gap-10 pt-8 border-t border-white/25">
          {[
            { value: '18', label: 'classes every week' },
            { value: '£29', label: 'memberships from / month' },
            { value: '2 min', label: 'online joining' },
            { value: '05:30', label: 'doors open daily' },
          ].map((s) => (
            <div key={s.label}>
              <dt className="text-3xl font-black">{s.value}</dt>
              <dd className="text-sm opacity-80 mt-1">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
