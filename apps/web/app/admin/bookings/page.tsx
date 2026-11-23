'use client';
/**
 * Admin Bookings Management & Check-in Desk — /admin/bookings
 * IronWorks Gym · SPManchester Private Limited
 */
import { useState } from 'react';
import { AdminSubNav } from '@/components/admin/AdminSubNav';
import { Search, Filter, CheckCircle2, QrCode, Clock, User, Calendar, AlertCircle } from 'lucide-react';

interface BookingItem {
  id: string;
  member: { name: string; email: string; ref: string };
  className: string;
  dayOfWeek: string;
  time: string;
  coach: string;
  date: string;
  status: 'CONFIRMED' | 'ATTENDED' | 'WAITLISTED' | 'CANCELLED';
}

const INITIAL_BOOKINGS: BookingItem[] = [
  { id: 'bk_1', member: { name: 'Alex Morgan', email: 'member@ironworksgym.com', ref: 'IW-2026-M920' }, className: 'Engine Room HIIT', dayOfWeek: 'MON', time: '06:30', coach: 'Marcus Vance', date: 'Today, 25 Nov', status: 'CONFIRMED' },
  { id: 'bk_2', member: { name: 'James Thornton', email: 'james@example.com', ref: 'IW-2026-M919' }, className: 'Iron Strength & Barbells', dayOfWeek: 'MON', time: '07:30', coach: 'Sarah Jenkins', date: 'Today, 25 Nov', status: 'CONFIRMED' },
  { id: 'bk_3', member: { name: 'Chloe Davies', email: 'chloe@example.com', ref: 'IW-2026-M918' }, className: 'Striking & Heavy Bag', dayOfWeek: 'MON', time: '12:00', coach: 'Elena Rostova', date: 'Today, 25 Nov', status: 'ATTENDED' },
  { id: 'bk_4', member: { name: 'Tariq Al-Mansoor', email: 'tariq@example.com', ref: 'IW-2026-M917' }, className: 'Yoga for Heavy Lifters', dayOfWeek: 'MON', time: '17:45', coach: 'David Kim', date: 'Today, 25 Nov', status: 'CONFIRMED' },
  { id: 'bk_5', member: { name: 'Priya Sharma', email: 'priya@example.com', ref: 'IW-2026-M916' }, className: 'Boxing Fundamentals', dayOfWeek: 'MON', time: '19:00', coach: 'Elena Rostova', date: 'Today, 25 Nov', status: 'WAITLISTED' },
  { id: 'bk_6', member: { name: 'Marcus Sterling', email: 'marcus.s@example.com', ref: 'IW-2026-M915' }, className: 'Olympic Weightlifting', dayOfWeek: 'MON', time: '18:00', coach: 'Sarah Jenkins', date: 'Today, 25 Nov', status: 'CANCELLED' },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>(INITIAL_BOOKINGS);
  const [filter, setFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [scannerActive, setScannerActive] = useState(false);
  const [checkInMsg, setCheckInMsg] = useState<string | null>(null);

  const handleCheckIn = (id: string, name: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'ATTENDED' } : b))
    );
    setCheckInMsg(`Checked in ${name} successfully! Turnstile unlocked.`);
    setTimeout(() => setCheckInMsg(null), 4000);
  };

  const filtered = bookings.filter((b) => {
    const matchesFilter = filter === 'ALL' || b.status === filter;
    const matchesSearch =
      b.member.name.toLowerCase().includes(search.toLowerCase()) ||
      b.member.email.toLowerCase().includes(search.toLowerCase()) ||
      b.member.ref.toLowerCase().includes(search.toLowerCase()) ||
      b.className.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AdminSubNav
          title="Booking Management & Check-In Desk"
          subtitle="Real-time class reservations, waitlist progression, and front-desk check-in scanner."
        />

        {/* Quick Check-in Scanner Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand">
              <QrCode size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Turnstile Fast-Pass &amp; QR Scanner</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Scan member digital barcodes from mobile app for instant check-in.
              </p>
            </div>
          </div>
          <button
            onClick={() => setScannerActive(!scannerActive)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
              scannerActive
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-brand hover:bg-orange-600 text-white shadow-md shadow-brand/20'
            }`}
          >
            <QrCode size={16} />
            <span>{scannerActive ? 'Scanner Armed (Ready)' : 'Arm USB/Camera Scanner'}</span>
          </button>
        </div>

        {checkInMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 size={18} />
            <span>{checkInMsg}</span>
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search member, email, or ref..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['ALL', 'CONFIRMED', 'ATTENDED', 'WAITLISTED', 'CANCELLED'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filter === tab
                    ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="p-4">Member</th>
                  <th className="p-4">Class Session</th>
                  <th className="p-4">Time &amp; Date</th>
                  <th className="p-4">Coach</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-500">
                      No bookings found matching current filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{b.member.name}</div>
                        <div className="text-slate-400 font-mono text-[11px]">{b.member.ref}</div>
                        <div className="text-slate-500 text-[10px]">{b.member.email}</div>
                      </td>
                      <td className="p-4 font-semibold text-slate-200">
                        {b.className}
                      </td>
                      <td className="p-4">
                        <div className="font-mono text-white flex items-center gap-1">
                          <Clock size={12} className="text-brand" /> {b.time}
                        </div>
                        <div className="text-slate-500 text-[11px]">{b.date}</div>
                      </td>
                      <td className="p-4 text-slate-300 font-medium">
                        {b.coach}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'ATTENDED'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : b.status === 'CONFIRMED'
                              ? 'bg-brand/15 text-brand border border-brand/30'
                              : b.status === 'WAITLISTED'
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {b.status === 'CONFIRMED' && (
                          <button
                            onClick={() => handleCheckIn(b.id, b.member.name)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[11px] transition-all shadow-sm active:scale-95"
                          >
                            Check-In ✓
                          </button>
                        )}
                        {b.status === 'ATTENDED' && (
                          <span className="text-emerald-400 font-semibold text-[11px] flex items-center justify-end gap-1">
                            <CheckCircle2 size={13} /> Checked In
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
