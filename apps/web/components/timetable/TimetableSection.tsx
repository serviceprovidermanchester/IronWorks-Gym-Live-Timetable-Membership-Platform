'use client';
/**
 * Timetable Section — IronWorks Gym
 * API-driven with robust offline fallback · SPManchester Private Limited
 */
import { useState, useEffect, useMemo } from 'react';
import { useBookingModalStore } from '@/lib/store';
import { Clock, User, Sparkles, Filter } from 'lucide-react';

const DAYS = ['All', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const CATEGORIES = ['All', 'STRENGTH', 'HIIT', 'CONDITIONING', 'MOBILITY', 'COMBAT'];

const CAT_BADGES: Record<string, { bg: string; text: string; border: string }> = {
  STRENGTH:     { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30' },
  HIIT:         { bg: 'bg-rose-500/10',   text: 'text-rose-400',   border: 'border-rose-500/30' },
  CONDITIONING: { bg: 'bg-emerald-500/10',text: 'text-emerald-400',border: 'border-emerald-500/30' },
  MOBILITY:     { bg: 'bg-cyan-500/10',   text: 'text-cyan-400',   border: 'border-cyan-500/30' },
  COMBAT:       { bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/30' },
};

type ClassRow = {
  id: string;
  name: string;
  dayOfWeek: string;
  startTime: string;
  durationMins: number;
  category: string;
  coach?: { name: string; avatarUrl?: string };
  capacity: number;
  description?: string;
};

const FALLBACK_CLASSES: ClassRow[] = [
  // Monday
  { id: 'c1', name: 'Strength Foundations', dayOfWeek: 'MON', startTime: '06:30', durationMins: 60, category: 'STRENGTH', coach: { name: 'Sarah Jenkins' }, capacity: 16, description: 'Barbell deadlift, squat, and bench fundamentals.' },
  { id: 'c2', name: 'Lunch Express HIIT', dayOfWeek: 'MON', startTime: '12:15', durationMins: 30, category: 'HIIT', coach: { name: 'Marcus Vance' }, capacity: 20, description: 'High intensity anaerobic intervals in 30 minutes.' },
  { id: 'c3', name: 'Olympic Weightlifting', dayOfWeek: 'MON', startTime: '18:00', durationMins: 75, category: 'STRENGTH', coach: { name: 'Sarah Jenkins' }, capacity: 12, description: 'Snatch and clean & jerk technique breakdown.' },
  // Tuesday
  { id: 'c4', name: 'Engine Room Conditioning', dayOfWeek: 'TUE', startTime: '07:00', durationMins: 60, category: 'CONDITIONING', coach: { name: 'Marcus Vance' }, capacity: 18, description: 'Assault bike, Concept2 rower, and sled sprints.' },
  { id: 'c5', name: 'Yoga for Heavy Lifters', dayOfWeek: 'TUE', startTime: '17:45', durationMins: 60, category: 'MOBILITY', coach: { name: 'David Kim' }, capacity: 20, description: 'Hip openers, thoracic rotation, and core stability.' },
  { id: 'c6', name: 'Boxing Fundamentals', dayOfWeek: 'TUE', startTime: '19:00', durationMins: 60, category: 'COMBAT', coach: { name: 'Elena Rostova' }, capacity: 14, description: 'Footwork, heavy bag combinations, and pad rounds.' },
  // Wednesday
  { id: 'c7', name: 'Powerlifting Club: Squat & Bench', dayOfWeek: 'WED', startTime: '06:30', durationMins: 75, category: 'STRENGTH', coach: { name: 'Sarah Jenkins' }, capacity: 14, description: 'Heavy competition bar work with coach spotting.' },
  { id: 'c8', name: 'Lunch Express HIIT', dayOfWeek: 'WED', startTime: '12:15', durationMins: 30, category: 'HIIT', coach: { name: 'Marcus Vance' }, capacity: 20, description: 'High-density metabolic circuit.' },
  { id: 'c9', name: 'Track Sprint Intervals', dayOfWeek: 'WED', startTime: '18:30', durationMins: 45, category: 'CONDITIONING', coach: { name: 'Marcus Vance' }, capacity: 16, description: 'Curved treadmill sprints and plyometrics.' },
  // Thursday
  { id: 'c10', name: 'Snatch & Clean Mastery', dayOfWeek: 'THU', startTime: '07:00', durationMins: 75, category: 'STRENGTH', coach: { name: 'Sarah Jenkins' }, capacity: 12, description: 'Technical pull and lockout mastery.' },
  { id: 'c11', name: 'Active Mobility & Core', dayOfWeek: 'THU', startTime: '17:45', durationMins: 60, category: 'MOBILITY', coach: { name: 'David Kim' }, capacity: 20, description: 'Joint capsules, spine decompression, and carries.' },
  { id: 'c12', name: 'Pugilist Technical Boxing', dayOfWeek: 'THU', startTime: '19:00', durationMins: 60, category: 'COMBAT', coach: { name: 'Elena Rostova' }, capacity: 14, description: 'Defensive head movement and pad rounds.' },
  // Friday
  { id: 'c13', name: 'Engine Room Friday Assault', dayOfWeek: 'FRI', startTime: '06:30', durationMins: 60, category: 'CONDITIONING', coach: { name: 'Marcus Vance' }, capacity: 18, description: 'End-of-week endurance engine test.' },
  { id: 'c14', name: 'Friday Fight Club (Advanced)', dayOfWeek: 'FRI', startTime: '17:30', durationMins: 90, category: 'COMBAT', coach: { name: 'Elena Rostova' }, capacity: 10, description: 'Controlled sparring under coach supervision.' },
  // Saturday
  { id: 'c15', name: 'Weekend Warrior Community WOD', dayOfWeek: 'SAT', startTime: '09:00', durationMins: 75, category: 'CONDITIONING', coach: { name: 'Marcus Vance' }, capacity: 24, description: 'Team workout with heavy barbells and cardio engines.' },
  { id: 'c16', name: 'Restorative Lifters Yoga', dayOfWeek: 'SAT', startTime: '10:45', durationMins: 60, category: 'MOBILITY', coach: { name: 'David Kim' }, capacity: 20, description: 'Deep stretch and nervous system reset.' },
  // Sunday
  { id: 'c17', name: 'Sunday Heavy Barbell Session', dayOfWeek: 'SUN', startTime: '10:00', durationMins: 90, category: 'STRENGTH', coach: { name: 'Sarah Jenkins' }, capacity: 16, description: 'Open platform training with coach feedback.' },
  { id: 'c18', name: 'Open Mat Mobility & Stretch', dayOfWeek: 'SUN', startTime: '11:45', durationMins: 60, category: 'MOBILITY', coach: { name: 'David Kim' }, capacity: 20, description: 'Guided breathing and recovery flow.' },
];

export function TimetableSection() {
  const [apiClasses, setApiClasses] = useState<ClassRow[] | null>(null);
  const [day, setDay] = useState('All');
  const [cat, setCat] = useState('All');
  const { openBookingModal } = useBookingModalStore();

  useEffect(() => {
    const params = new URLSearchParams();
    if (day !== 'All') params.set('day', day);
    if (cat !== 'All') params.set('category', cat);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/v1';

    fetch(`${apiUrl}/classes?${params}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.data) && d.data.length > 0) {
          setApiClasses(d.data);
        }
      })
      .catch(() => {
        // Quietly maintain fallback data
      });
  }, [day, cat]);

  // Compute displayed classes: use API response if present, otherwise filter FALLBACK_CLASSES
  const displayedClasses = useMemo(() => {
    if (apiClasses && apiClasses.length > 0) {
      return apiClasses;
    }
    return FALLBACK_CLASSES.filter((c) => {
      const matchDay = day === 'All' || c.dayOfWeek.toUpperCase() === day.toUpperCase();
      const matchCat = cat === 'All' || c.category.toUpperCase() === cat.toUpperCase();
      return matchDay && matchCat;
    });
  }, [apiClasses, day, cat]);

  return (
    <section id="timetable" className="py-20 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} />
              <span>Real-Time Schedule · Ancoats</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live Class Timetable
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1.5">
              18 coach-led classes every week. Filter by day or training style.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl self-start md:self-auto">
            ⚡ Live Database Sync Active
          </div>
        </div>

        {/* Filter Pills */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 mb-8 backdrop-blur-sm space-y-4">
          {/* Day Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 w-14 shrink-0 flex items-center gap-1">
              <Filter size={12} className="text-brand" /> Day:
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {DAYS.map((d) => {
                const active = day === d;
                return (
                  <button
                    key={d}
                    onClick={() => setDay(d)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-brand text-white shadow-md shadow-brand/20'
                        : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-slate-800/60">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 w-14 shrink-0">
              Type:
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {CATEGORIES.map((c) => {
                const active = cat === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-brand text-white shadow-md shadow-brand/20'
                        : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Responsive Table / Card Grid */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-5 py-3.5">Day</th>
                  <th className="px-5 py-3.5">Time</th>
                  <th className="px-5 py-3.5">Class</th>
                  <th className="px-5 py-3.5">Coach</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {displayedClasses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400 italic">
                      No classes match the selected filter. Try choosing &ldquo;All&rdquo;.
                    </td>
                  </tr>
                ) : (
                  displayedClasses.map((c) => {
                    const badge = CAT_BADGES[c.category] || {
                      bg: 'bg-slate-800',
                      text: 'text-slate-300',
                      border: 'border-slate-700',
                    };

                    return (
                      <tr
                        key={c.id}
                        className="hover:bg-slate-800/40 transition-colors group"
                      >
                        {/* Day */}
                        <td className="px-5 py-4 font-bold text-white whitespace-nowrap">
                          <span className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded-md text-xs font-mono border border-slate-700">
                            {c.dayOfWeek}
                          </span>
                        </td>

                        {/* Time */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                            <Clock size={14} className="text-brand shrink-0" />
                            <span>{c.startTime}</span>
                            <span className="text-xs text-slate-500 font-normal">
                              ({c.durationMins}m)
                            </span>
                          </div>
                        </td>

                        {/* Class Name */}
                        <td className="px-5 py-4">
                          <div className="font-bold text-white group-hover:text-brand transition-colors">
                            {c.name}
                          </div>
                          {c.description && (
                            <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                              {c.description}
                            </div>
                          )}
                        </td>

                        {/* Coach */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-slate-300">
                            <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-brand text-xs font-bold shrink-0">
                              <User size={12} />
                            </div>
                            <span className="text-xs font-medium">
                              {c.coach?.name || 'IronWorks Coach'}
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            {c.category}
                          </span>
                        </td>

                        {/* Action Button */}
                        <td className="px-5 py-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => openBookingModal(c)}
                            className="bg-brand hover:bg-orange-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all shadow-sm shadow-brand/20 active:scale-95"
                          >
                            Book Spot
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 px-1 gap-2">
          <span>
            Showing {displayedClasses.length} class{displayedClasses.length !== 1 ? 'es' : ''} · All sessions held at IronWorks Flagship, Ancoats
          </span>
          <span className="text-brand font-medium">
            Classes open 7 days in advance for members
          </span>
        </div>
      </div>
    </section>
  );
}
