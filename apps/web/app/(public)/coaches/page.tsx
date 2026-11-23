import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Coaches & Personal Trainers | IronWorks Gym Manchester',
  description: 'Meet the elite strength coaches, conditioning specialists, and martial arts trainers at IronWorks Gym, Ancoats.',
};

const coaches = [
  {
    name: 'Sarah Jenkins',
    slug: 'sarah-jenkins',
    title: 'Head Strength & Conditioning Coach',
    bio: 'Former national powerlifting competitor with 10+ years coaching athletes, barbell specialists, and everyday lifters looking for serious physical development.',
    specialties: ['Powerlifting', 'Barbell Mechanics', 'Hypertrophy', 'Periodization'],
    experience: '10+ Years',
    avatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800',
    instagram: '@sarahj_ironworks',
  },
  {
    name: 'Marcus Vance',
    slug: 'marcus-vance',
    title: 'Conditioning & High-Performance Coach',
    bio: 'Ex-military physical training instructor specializing in metabolic conditioning, rowing intervals, and mental grit under high cardiovascular demand.',
    specialties: ['HIIT', 'Metabolic Conditioning', 'RowErg / SkiErg', 'Breathwork'],
    experience: '8 Years',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800',
    instagram: '@marcus_ironworks',
  },
  {
    name: 'Elena Rostova',
    slug: 'elena-rostova',
    title: 'Striking & Boxing Coach',
    bio: 'Golden Gloves champion with European competition background. Combines real pugilistic footwork and combinations with intense anaerobic conditioning.',
    specialties: ['Boxing', 'Footwork & Defense', 'Heavy Bag Conditioning', 'Mittwork'],
    experience: '7 Years',
    avatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=800',
    instagram: '@elena_boxing_mcr',
  },
  {
    name: 'David Kim',
    slug: 'david-kim',
    title: 'Mobility, Recovery & Athletic Longevity',
    bio: 'Licensed physiotherapist and mobility specialist dedicated to helping heavy lifters prevent injury, restore joint range, and rebuild after athletic strain.',
    specialties: ['Joint Mobility', 'Active Recovery', 'Injury Rehabilitation', 'Yoga for Lifters'],
    experience: '9 Years',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    instagram: '@davidkim_physio',
  },
];

export default function CoachesPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-12 pb-24 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Expert Instruction</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
            Meet the Coaching Team
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            No casual reps, no generic routines. Our certified head coaches bring real athletic pedigree and personal accountability to every class.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {coaches.map((coach) => (
            <div
              key={coach.slug}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-accent/40 transition-all flex flex-col sm:flex-row group"
            >
              <div className="sm:w-2/5 relative h-64 sm:h-auto overflow-hidden bg-slate-800">
                <img
                  src={coach.avatar}
                  alt={coach.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded text-xs font-bold text-accent border border-slate-700">
                  {coach.experience}
                </div>
              </div>

              <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                    {coach.name}
                  </h3>
                  <p className="text-sm font-medium text-accent mt-0.5">{coach.title}</p>
                  <p className="text-sm text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                    {coach.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {coach.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>{coach.instagram}</span>
                  <Link
                    href={`/timetable?coach=${coach.slug}`}
                    className="text-accent hover:underline font-semibold"
                  >
                    View Classes &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-accent/20 via-slate-900 to-slate-900 border border-accent/30 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white">Want 1-on-1 Personal Training?</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto text-sm md:text-base">
            Private 60-minute coaching slots are available directly through our head coaches. Unlimited members receive 15% off personal training packages.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/membership"
              className="w-full sm:w-auto px-6 py-3 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl transition-all"
            >
              Join the Gym
            </Link>
            <a
              href="mailto:coaching@ironworksgym.co.uk"
              className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all"
            >
              Inquire About 1-on-1
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
