'use client';
/**
 * Timetable Section — IronWorks Gym
 * API-driven · SPManchester Private Limited
 */
import { useState, useEffect } from 'react';

const DAYS = ['All', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const CATEGORIES = ['All', 'STRENGTH', 'HIIT', 'CONDITIONING', 'MOBILITY', 'COMBAT'];

const CAT_COLORS: Record<string, string> = {
  STRENGTH:     'bg-blue-100 text-blue-800',
  HIIT:         'bg-red-100 text-red-800',
  CONDITIONING: 'bg-green-100 text-green-800',
  MOBILITY:     'bg-purple-100 text-purple-800',
  COMBAT:       'bg-orange-100 text-orange-800',
};

type ClassRow = { id: string; name: string; dayOfWeek: string; startTime: string; durationMins: number; category: string; coach: { name: string }; capacity: number; };

export function TimetableSection() {
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [day, setDay] = useState('All');
  const [cat, setCat] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (day !== 'All') params.set('day', day);
    if (cat !== 'All') params.set('category', cat);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/v1';
    setLoading(true);
    fetch(`${apiUrl}/classes?${params}`)
      .then((r) => r.json())
      .then((d) => { setClasses(d.data ?? []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [day, cat]);

  return (
    <section id="timetable" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl font-bold mb-3">Live class timetable</h2>
        <p className="text-muted text-lg mb-8">Rendered from the database — filter by day or category in real time.</p>

        {/* Day filter */}
        <div className="flex gap-2 flex-wrap mb-3" role="group" aria-label="Filter by day">
          <span className="text-xs font-bold uppercase tracking-widest text-muted self-center mr-1 w-16">Day:</span>
          {DAYS.map((d) => (
            <button key={d} onClick={() => setDay(d)} aria-pressed={day === d}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-colors ${day === d ? 'bg-brand text-white border-brand' : 'bg-white text-brand border-brand hover:bg-brand-light'}`}>
              {d}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Filter by category">
          <span className="text-xs font-bold uppercase tracking-widest text-muted self-center mr-1 w-16">Type:</span>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-colors ${cat === c ? 'bg-brand text-white border-brand' : 'bg-white text-brand border-brand hover:bg-brand-light'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl shadow-md" role="region" aria-label="Class timetable">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-brand text-white text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Day</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Class</th>
                <th className="px-4 py-3 text-left">Coach</th>
                <th className="px-4 py-3 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-10 text-muted italic">Loading timetable…</td></tr>
              ) : error ? (
                <tr><td colSpan={5} className="text-center py-10 text-muted italic">⚠️ Could not load classes. Run the API first.</td></tr>
              ) : classes.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10 text-muted italic">No classes match — try another filter.</td></tr>
              ) : classes.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-brand-light/40 transition-colors">
                  <td className="px-4 py-3 font-bold text-sm">{c.dayOfWeek}</td>
                  <td className="px-4 py-3 text-sm">{c.startTime}</td>
                  <td className="px-4 py-3 font-semibold">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-muted">{c.coach?.name ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${CAT_COLORS[c.category] ?? 'bg-gray-100 text-gray-700'}`}>
                      {c.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted italic" aria-live="polite">
          {!loading && !error && `${classes.length} class${classes.length !== 1 ? 'es' : ''} shown`}
        </p>
      </div>
    </section>
  );
}
