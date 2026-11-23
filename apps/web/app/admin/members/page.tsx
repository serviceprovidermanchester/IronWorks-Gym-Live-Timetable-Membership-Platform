'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface AdminMember {
  id: string;
  memberRef: string;
  name: string;
  email: string;
  tier: string;
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELLED';
  joinedDate: string;
  sessionsAttended: number;
}

const mockMembers: AdminMember[] = [
  { id: '1', memberRef: 'IW-2026-M4920', name: 'Alex Morgan', email: 'alex.morgan@example.co.uk', tier: 'Unlimited', status: 'ACTIVE', joinedDate: '15 Aug 2026', sessionsAttended: 38 },
  { id: '2', memberRef: 'IW-2026-M4919', name: 'James Thornton', email: 'j.thornton@example.com', tier: 'Standard', status: 'ACTIVE', joinedDate: '01 Sep 2026', sessionsAttended: 22 },
  { id: '3', memberRef: 'IW-2026-M4918', name: 'Chloe Davies', email: 'chloe.d@example.co.uk', tier: 'Founding Member', status: 'ACTIVE', joinedDate: '01 Jul 2026', sessionsAttended: 56 },
  { id: '4', memberRef: 'IW-2026-M4917', name: 'Tariq Al-Mansoor', email: 'tariq.m@example.com', tier: 'Unlimited', status: 'ACTIVE', joinedDate: '12 Sep 2026', sessionsAttended: 29 },
  { id: '5', memberRef: 'IW-2026-M4916', name: 'Liam Patterson', email: 'liam.p@example.co.uk', tier: 'Standard', status: 'PAST_DUE', joinedDate: '03 Oct 2026', sessionsAttended: 8 },
  { id: '6', memberRef: 'IW-2026-M4915', name: 'Elena Rostova', email: 'elena.rostova@example.com', tier: 'Unlimited', status: 'CANCELLED', joinedDate: '10 Jun 2026', sessionsAttended: 14 },
];

export default function AdminMembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');

  const filtered = mockMembers.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.memberRef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'ALL' || m.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="min-h-screen bg-brand-dark pt-10 pb-20 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/admin" className="text-xs text-accent hover:underline font-bold uppercase">&larr; Admin Dashboard</Link>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-1">Member Directory</h1>
            <p className="text-slate-400 text-sm">Search, filter, and inspect member subscription accounts.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => alert('Exporting full members list...')}
              className="px-4 py-2 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl text-xs transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search by name, email, or member ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent"
          />

          <div className="flex gap-2 w-full sm:w-auto">
            {['ALL', 'Unlimited', 'Standard', 'Founding Member'].map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  tierFilter === t ? 'bg-accent text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-400 bg-slate-950/60 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Ref</th>
                  <th className="py-3 px-4 font-semibold">Member</th>
                  <th className="py-3 px-4 font-semibold">Tier</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Joined</th>
                  <th className="py-3 px-4 font-semibold text-center">Visits</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 px-4 font-mono text-xs text-accent font-semibold">{m.memberRef}</td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-white">{m.name}</div>
                      <div className="text-xs text-slate-400">{m.email}</div>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-slate-300">{m.tier}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          m.status === 'ACTIVE'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : m.status === 'PAST_DUE'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-400">{m.joinedDate}</td>
                    <td className="py-4 px-4 text-center font-bold text-white">{m.sessionsAttended}</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => alert(`Opening details for ${m.name}`)}
                        className="text-xs text-accent hover:underline font-semibold"
                      >
                        Inspect &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
