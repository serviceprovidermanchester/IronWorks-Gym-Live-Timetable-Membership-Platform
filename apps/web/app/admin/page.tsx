'use client';

import React, { useState } from 'react';
import { AdminSubNav } from '@/components/admin/AdminSubNav';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Active Members', value: '418', change: '+12% this month', color: 'text-emerald-400' },
    { label: 'Monthly Recurring Revenue', value: '£28,450', change: '+8.4% vs Oct', color: 'text-accent' },
    { label: "Today's Bookings", value: '94 / 110', change: '85.4% capacity', color: 'text-blue-400' },
    { label: 'Waitlist Requests', value: '14', change: 'Across 3 classes', color: 'text-amber-400' },
  ];

  const todayClasses = [
    { id: 'c1', name: 'Engine Room HIIT', time: '06:30 - 07:15', coach: 'Marcus Vance', booked: 20, cap: 20, waitlist: 4 },
    { id: 'c2', name: 'Iron Strength & Barbells', time: '07:30 - 08:15', coach: 'Sarah Jenkins', booked: 18, cap: 20, waitlist: 0 },
    { id: 'c3', name: 'Striking & Heavy Bag', time: '12:00 - 12:45', coach: 'Elena Rostova', booked: 16, cap: 16, waitlist: 2 },
    { id: 'c4', name: 'Athletic Recovery & Flow', time: '17:30 - 18:15', coach: 'David Kim', booked: 14, cap: 20, waitlist: 0 },
    { id: 'c5', name: 'Engine Room HIIT', time: '18:30 - 19:15', coach: 'Marcus Vance', booked: 20, cap: 20, waitlist: 6 },
  ];

  const recentMembers = [
    { ref: 'IW-2026-M4920', name: 'Alex Morgan', email: 'alex.m@example.co.uk', tier: 'Unlimited', date: 'Today, 14:20' },
    { ref: 'IW-2026-M4919', name: 'James Thornton', email: 'j.thornton@example.com', tier: 'Standard', date: 'Today, 11:05' },
    { ref: 'IW-2026-M4918', name: 'Chloe Davies', email: 'chloe.d@example.co.uk', tier: 'Founding Member', date: 'Yesterday' },
    { ref: 'IW-2026-M4917', name: 'Tariq Al-Mansoor', email: 'tariq.m@example.com', tier: 'Unlimited', date: 'Yesterday' },
  ];

  const [checkedIn, setCheckedIn] = useState<Record<string, boolean>>({});

  const toggleCheckIn = (id: string) => {
    setCheckedIn((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminSubNav
          title="Admin Operations Dashboard"
          subtitle="Real-time occupancy, revenue overview, and live class check-ins."
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
              <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
              <div className={`text-2xl md:text-3xl font-extrabold mt-1 ${stat.color}`}>{stat.value}</div>
              <span className="text-xs text-slate-400 mt-1 block">{stat.change}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Classes Check-in */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Today&apos;s Class Schedule & Capacity</h2>
            <div className="space-y-3">
              {todayClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-xs font-mono text-accent">{cls.time}</span>
                    <h3 className="text-base font-bold text-white">{cls.name}</h3>
                    <p className="text-xs text-slate-400">Coach: {cls.coach}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">
                        {cls.booked} / {cls.cap} booked
                      </div>
                      {cls.waitlist > 0 && (
                        <span className="text-xs text-amber-400 block font-medium">
                          {cls.waitlist} on waitlist
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleCheckIn(cls.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        checkedIn[cls.id]
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {checkedIn[cls.id] ? '✓ Active Session' : 'Check-In Desk'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Member Registrations */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Joiners</h2>
            <div className="divide-y divide-slate-800">
              {recentMembers.map((m) => (
                <div key={m.ref} className="py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{m.name}</span>
                    <span className="text-xs font-mono text-slate-400">{m.ref}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-slate-400">{m.tier}</span>
                    <span className="text-accent">{m.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
