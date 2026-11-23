'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MemberSubNav } from '@/components/member/MemberSubNav';

interface MockBooking {
  id: string;
  bookingRef: string;
  className: string;
  category: string;
  date: string;
  time: string;
  coach: string;
  status: 'CONFIRMED' | 'WAITLISTED' | 'ATTENDED' | 'CANCELLED';
  waitlistPos?: number;
}

const initialBookings: MockBooking[] = [
  {
    id: 'b-1',
    bookingRef: 'BK-94821',
    className: 'Iron Strength & Barbells',
    category: 'STRENGTH',
    date: 'Wednesday, 25 Nov 2026',
    time: '06:30 - 07:15',
    coach: 'Sarah Jenkins',
    status: 'CONFIRMED',
  },
  {
    id: 'b-2',
    bookingRef: 'BK-94822',
    className: 'Engine Room HIIT',
    category: 'HIIT',
    date: 'Friday, 27 Nov 2026',
    time: '18:00 - 18:45',
    coach: 'Marcus Vance',
    status: 'WAITLISTED',
    waitlistPos: 2,
  },
  {
    id: 'b-3',
    bookingRef: 'BK-89012',
    className: 'Striking & Heavy Bag',
    category: 'BOXING',
    date: 'Monday, 23 Nov 2026',
    time: '19:00 - 19:45',
    coach: 'Elena Rostova',
    status: 'ATTENDED',
  },
  {
    id: 'b-4',
    bookingRef: 'BK-78321',
    className: 'Athletic Recovery & Flow',
    category: 'RECOVERY',
    date: 'Sunday, 22 Nov 2026',
    time: '10:00 - 10:45',
    coach: 'David Kim',
    status: 'CANCELLED',
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<MockBooking[]>(initialBookings);
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'HISTORY'>('UPCOMING');

  const upcoming = bookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'WAITLISTED');
  const history = bookings.filter((b) => b.status === 'ATTENDED' || b.status === 'CANCELLED');

  const handleCancel = (id: string) => {
    if (confirm('Are you sure you want to cancel this booking? This will offer your slot to the next waitlisted member.')) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' } : b))
      );
    }
  };

  const displayed = activeTab === 'UPCOMING' ? upcoming : history;

  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <MemberSubNav
          title="My Class Bookings"
          subtitle="Manage your reserved spots, check waitlist positions, or schedule new sessions."
        />

        {/* Tab navigation */}
        <div className="flex gap-2 border-b border-slate-800 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('UPCOMING')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'UPCOMING'
                ? 'bg-accent/10 text-accent border border-accent/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Upcoming Reservations ({upcoming.length})
          </button>
          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'HISTORY'
                ? 'bg-accent/10 text-accent border border-accent/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Past & Cancelled ({history.length})
          </button>
        </div>

        {/* Bookings List */}
        {displayed.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
            <p className="text-slate-400 text-base">No bookings found in this view.</p>
            <Link
              href="/timetable"
              className="inline-block mt-4 text-accent font-semibold text-sm hover:underline"
            >
              Browse live timetable to book &rarr;
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {displayed.map((booking) => (
              <div
                key={booking.id}
                className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">{booking.bookingRef}</span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        booking.status === 'CONFIRMED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : booking.status === 'WAITLISTED'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : booking.status === 'ATTENDED'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {booking.status}
                      {booking.waitlistPos ? ` (#${booking.waitlistPos} in line)` : ''}
                    </span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {booking.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{booking.className}</h3>
                  <div className="text-sm text-slate-300 flex flex-wrap gap-x-4 gap-y-1">
                    <span>📅 {booking.date}</span>
                    <span>⏰ {booking.time}</span>
                    <span>🏋️ Coach {booking.coach}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  {booking.status === 'CONFIRMED' || booking.status === 'WAITLISTED' ? (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="px-4 py-2 text-sm font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 rounded-lg transition-colors"
                    >
                      Cancel Booking
                    </button>
                  ) : null}
                  <Link
                    href="/timetable"
                    className="px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
                  >
                    View Class
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
