/**
 * Coach Profile Page — /coaches/:slug
 * IronWorks Gym · SPManchester Private Limited
 *
 * Component Tree: CoachHero → CoachClasses → CoachCredentials
 */
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Award, Calendar, Clock, Instagram, ShieldCheck, Sparkles, User, ArrowLeft } from 'lucide-react';

interface CoachData {
  slug: string;
  name: string;
  role: string;
  experience: string;
  avatar: string;
  instagram: string;
  bio: string;
  story: string;
  certifications: string[];
  classes: {
    name: string;
    dayOfWeek: string;
    time: string;
    duration: string;
    category: string;
  }[];
}

const COACHES: Record<string, CoachData> = {
  'sarah-jenkins': {
    slug: 'sarah-jenkins',
    name: 'Sarah Jenkins (Coach Dee)',
    role: 'Head Strength & Olympic Lifting Specialist',
    experience: '10+ Years Competitive & Coaching',
    avatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800',
    instagram: '@sarahj_ironworks',
    bio: 'Former national powerlifting competitor dedicated to helping athletes master compound barbell mechanics, technical Olympic lifts, and periodized strength progressions.',
    story: 'Sarah began her lifting career in regional British Powerlifting championships before heading strength programmes across Northern UK sports academies. At IronWorks, she leads our heavy barbell floor and Olympic lifting programming.',
    certifications: ['NSCA Certified Strength & Conditioning Specialist (CSCS)', 'USAW Level 2 Weightlifting Coach', 'British Powerlifting Coach Cert', 'Level 4 Strength & Conditioning'],
    classes: [
      { name: 'Strength Foundations', dayOfWeek: 'MON', time: '06:30', duration: '60 min', category: 'STRENGTH' },
      { name: 'Olympic Weightlifting', dayOfWeek: 'MON', time: '18:00', duration: '75 min', category: 'STRENGTH' },
      { name: 'Powerlifting Club: Squat & Bench', dayOfWeek: 'WED', time: '06:30', duration: '75 min', category: 'STRENGTH' },
      { name: 'Snatch & Clean Mastery', dayOfWeek: 'THU', time: '07:00', duration: '75 min', category: 'STRENGTH' },
      { name: 'Sunday Heavy Barbell Session', dayOfWeek: 'SUN', time: '10:00', duration: '90 min', category: 'STRENGTH' },
    ],
  },
  'marcus-vance': {
    slug: 'marcus-vance',
    name: 'Marcus Vance (Coach Marco)',
    role: 'Conditioning & High-Performance Head Coach',
    experience: '8 Years Military & S&C',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800',
    instagram: '@marcus_ironworks',
    bio: 'Ex-military physical training instructor specializing in high-density anaerobic intervals, Concept2 ergometer mechanics, and mental fortitude under fatigue.',
    story: 'After serving 6 years as an RAF Physical Training Instructor, Marcus developed the proprietary Engine Room conditioning curriculum now used exclusively at IronWorks Gym Flagship.',
    certifications: ['Level 3 Personal Training & Nutrition', 'Concept2 Master Trainer (RowErg, SkiErg, BikeErg)', 'UK Athletics Sprint Mechanics Coach', 'Military Physical Training Instructor (PTI)'],
    classes: [
      { name: 'Lunch Express HIIT', dayOfWeek: 'MON', time: '12:15', duration: '30 min', category: 'HIIT' },
      { name: 'Engine Room Conditioning', dayOfWeek: 'TUE', time: '07:00', duration: '60 min', category: 'CONDITIONING' },
      { name: 'Track Sprint Intervals', dayOfWeek: 'WED', time: '18:30', duration: '45 min', category: 'CONDITIONING' },
      { name: 'Engine Room Friday Assault', dayOfWeek: 'FRI', time: '06:30', duration: '60 min', category: 'CONDITIONING' },
      { name: 'Weekend Warrior Community WOD', dayOfWeek: 'SAT', time: '09:00', duration: '75 min', category: 'CONDITIONING' },
    ],
  },
  'elena-rostova': {
    slug: 'elena-rostova',
    name: 'Elena Rostova (Coach Ana)',
    role: 'Striking & Boxing Head Coach',
    experience: '7 Years Competition & Instruction',
    avatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=800',
    instagram: '@elena_boxing_mcr',
    bio: 'Golden Gloves champion with European competition background. Combines real pugilistic head movement, distance management, and pad rounds with anaerobic conditioning.',
    story: 'Elena grew up training in legendary Eastern European boxing clubs before competing internationally. She brings authentic ring discipline, reactive mittwork, and combat conditioning to IronWorks members.',
    certifications: ['England Boxing Coach Level 2', 'Level 3 Personal Trainer', 'Combat Conditioning Specialist', 'First Aid at Work & CPR'],
    classes: [
      { name: 'Boxing Fundamentals', dayOfWeek: 'TUE', time: '19:00', duration: '60 min', category: 'COMBAT' },
      { name: 'Pugilist Technical Boxing', dayOfWeek: 'THU', time: '19:00', duration: '60 min', category: 'COMBAT' },
      { name: 'Friday Fight Club (Advanced)', dayOfWeek: 'FRI', time: '17:30', duration: '90 min', category: 'COMBAT' },
    ],
  },
  'david-kim': {
    slug: 'david-kim',
    name: 'David Kim (Coach Jay)',
    role: 'Mobility, Recovery & Longevity Specialist',
    experience: '9 Years Clinical & Athletic',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    instagram: '@davidkim_physio',
    bio: 'Licensed physiotherapist and mobility coach dedicated to helping heavy lifters prevent injury, restore joint mechanics, and recover from intense athletic demands.',
    story: 'David bridges the gap between rehabilitation clinics and the gym floor. His classes focus on joint capsules, thoracic rotation, spinal decompression, and active breathing protocols.',
    certifications: ['BSc (Hons) Physiotherapy', 'Functional Range Conditioning (FRC) Specialist', '200-hr RYT Yoga Alliance', 'Myofascial Release Practitioner'],
    classes: [
      { name: 'Yoga for Heavy Lifters', dayOfWeek: 'TUE', time: '17:45', duration: '60 min', category: 'MOBILITY' },
      { name: 'Active Mobility & Core', dayOfWeek: 'THU', time: '17:45', duration: '60 min', category: 'MOBILITY' },
      { name: 'Restorative Lifters Yoga', dayOfWeek: 'SAT', time: '10:45', duration: '60 min', category: 'MOBILITY' },
      { name: 'Open Mat Mobility & Stretch', dayOfWeek: 'SUN', time: '11:45', duration: '60 min', category: 'MOBILITY' },
    ],
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const coach = COACHES[params.slug];
  if (!coach) return { title: 'Coach Not Found | IronWorks Gym' };
  return {
    title: `${coach.name} — Coach Profile | IronWorks Gym Manchester`,
    description: coach.bio,
  };
}

export default function CoachDetailPage({ params }: { params: { slug: string } }) {
  const coach = COACHES[params.slug];
  if (!coach) notFound();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-8 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/coaches"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to All Coaches</span>
          </Link>
        </div>

        {/* 1. CoachHero */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl relative overflow-hidden">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-xl">
                <img
                  src={coach.avatar}
                  alt={coach.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 bg-brand text-white font-bold text-xs uppercase px-3 py-1.5 rounded-full shadow-lg">
                {coach.experience}
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-brand tracking-widest block mb-2">
                  IronWorks Coaching Staff
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {coach.name}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-orange-400 mt-2">
                  {coach.role}
                </p>
                <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
                  {coach.bio}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800/80 text-sm text-slate-400 flex items-center gap-2">
                  <Instagram size={16} className="text-brand" />
                  <span className="font-mono">{coach.instagram}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/membership"
                  className="bg-brand hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-brand/20 text-sm"
                >
                  Join to Train With {coach.name.split(' ')[0]}
                </Link>
                <Link
                  href="/timetable"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl border border-slate-700 text-sm transition-all"
                >
                  View Weekly Schedule
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CoachClasses */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase font-bold text-brand tracking-wider">Schedule</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Classes Coached by {coach.name.split(' ')[0]}
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              {coach.classes.length} sessions weekly
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coach.classes.map((cls, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-brand/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-slate-800 text-brand font-mono font-bold text-xs px-2.5 py-1 rounded-md border border-slate-700">
                      {cls.dayOfWeek}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock size={12} /> {cls.time} ({cls.duration})
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">{cls.name}</h3>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {cls.category}
                  </span>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-800/80">
                  <Link
                    href={`/timetable?day=${cls.dayOfWeek}`}
                    className="text-xs text-brand hover:underline font-bold flex items-center gap-1"
                  >
                    Reserve in Timetable &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. CoachCredentials */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck size={16} /> Verified Athletic Pedigree
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-4">Background &amp; Accreditations</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {coach.story}
            </p>

            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
              Official Certifications:
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm">
              {coach.certifications.map((cert, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <Award size={16} className="text-brand shrink-0 mt-0.5" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
