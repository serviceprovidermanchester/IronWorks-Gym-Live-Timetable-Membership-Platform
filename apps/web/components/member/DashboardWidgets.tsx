'use client';

import React from 'react';
import Link from 'next/link';

export function MemberOverviewWidget({
  tier = 'Unlimited Access',
  status = 'ACTIVE',
  memberRef = 'IW-2026-M4920',
  monthlyVisits = 14,
  streakWeeks = 6,
}: {
  tier?: string;
  status?: string;
  memberRef?: string;
  monthlyVisits?: number;
  streakWeeks?: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Membership status card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
        <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Tier</span>
        <div className="text-xl font-extrabold text-white mt-1">{tier}</div>
        <div className="mt-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-xs font-semibold text-emerald-400">{status}</span>
          <span className="text-xs font-mono text-slate-500 ml-auto">{memberRef}</span>
        </div>
      </div>

      {/* Attendance Monthly */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
        <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Sessions This Month</span>
        <div className="text-2xl font-extrabold text-accent mt-1">{monthlyVisits} classes</div>
        <p className="text-xs text-slate-400 mt-1">4 sessions above monthly goal</p>
      </div>

      {/* Consistency Streak */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
        <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Consistency Streak</span>
        <div className="text-2xl font-extrabold text-amber-400 mt-1">🔥 {streakWeeks} Weeks</div>
        <p className="text-xs text-slate-400 mt-1">At least 3 visits / week</p>
      </div>

      {/* Gym Entry QR Pass */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-accent/30 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-bold text-accent tracking-wider">Door Access Pass</span>
          <p className="text-xs text-slate-300 mt-1">Scan at turnstile</p>
          <span className="inline-block mt-2 text-xs font-mono bg-black/40 px-2 py-0.5 rounded text-accent font-bold">
            TAP TO SCAN
          </span>
        </div>
        <div className="w-14 h-14 bg-white rounded-lg p-1.5 flex items-center justify-center shadow-lg shadow-accent/10">
          <div className="w-full h-full bg-slate-950 rounded flex items-center justify-center text-white font-mono text-[9px] text-center font-bold">
            QR CODE
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuickBookWidget() {
  const upcomingToday = [
    { name: 'Engine Room HIIT', time: '18:00 - 18:45', coach: 'Marcus Vance', spots: 3, id: 'c-hiit-1' },
    { name: 'Athletic Recovery & Flow', time: '19:00 - 19:45', coach: 'David Kim', spots: 5, id: 'c-rec-1' },
  ];

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Today&apos;s Evening Slots</h2>
          <p className="text-xs text-slate-400 mt-0.5">Spots available for fast one-tap reservation</p>
        </div>
        <Link
          href="/timetable"
          className="text-xs font-bold text-accent hover:underline"
        >
          Full 7-Day Timetable &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingToday.map((cls) => (
          <div
            key={cls.id}
            className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-mono text-accent">{cls.time}</span>
              <h3 className="text-base font-bold text-white">{cls.name}</h3>
              <p className="text-xs text-slate-400">Coach: {cls.coach}</p>
            </div>
            <Link
              href="/timetable"
              className="px-4 py-2 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
            >
              Book ({cls.spots} left)
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
