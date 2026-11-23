'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminSubNav } from '@/components/admin/AdminSubNav';

interface Transaction {
  id: string;
  memberRef: string;
  memberName: string;
  amount: string;
  provider: 'Stripe' | 'GoCardless';
  status: 'SUCCEEDED' | 'PENDING' | 'FAILED';
  date: string;
  type: 'Monthly Subscription' | 'Joining Fee' | 'Drop-In Pass';
}

const mockTransactions: Transaction[] = [
  { id: 'tx_109281', memberRef: 'IW-2026-M4920', memberName: 'Alex Morgan', amount: '£75.00', provider: 'Stripe', status: 'SUCCEEDED', date: '23 Nov 2026, 14:20', type: 'Monthly Subscription' },
  { id: 'tx_109280', memberRef: 'IW-2026-M4919', memberName: 'James Thornton', amount: '£49.00', provider: 'GoCardless', status: 'SUCCEEDED', date: '23 Nov 2026, 11:05', type: 'Monthly Subscription' },
  { id: 'tx_109279', memberRef: 'IW-2026-M4918', memberName: 'Chloe Davies', amount: '£99.00', provider: 'Stripe', status: 'SUCCEEDED', date: '22 Nov 2026, 19:40', type: 'Monthly Subscription' },
  { id: 'tx_109278', memberRef: 'IW-2026-M4917', memberName: 'Tariq Al-Mansoor', amount: '£15.00', provider: 'Stripe', status: 'SUCCEEDED', date: '22 Nov 2026, 16:15', type: 'Drop-In Pass' },
  { id: 'tx_109277', memberRef: 'IW-2026-M4916', memberName: 'Liam Patterson', amount: '£49.00', provider: 'GoCardless', status: 'FAILED', date: '21 Nov 2026, 09:30', type: 'Monthly Subscription' },
  { id: 'tx_109276', memberRef: 'IW-2026-M4915', memberName: 'Marcus Bell', amount: '£20.00', provider: 'Stripe', status: 'SUCCEEDED', date: '20 Nov 2026, 18:00', type: 'Joining Fee' },
];

export default function AdminPaymentsPage() {
  const [providerFilter, setProviderFilter] = useState('ALL');

  const filtered = mockTransactions.filter((tx) =>
    providerFilter === 'ALL' ? true : tx.provider === providerFilter
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminSubNav
          title="Payments &amp; Settlement Ledger"
          subtitle="Real-time payment logs across Stripe card billing and GoCardless Direct Debit."
        />

        <div className="flex gap-2 mb-6">
          {['ALL', 'Stripe', 'GoCardless'].map((p) => (
            <button
              key={p}
              onClick={() => setProviderFilter(p)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                providerFilter === p ? 'bg-accent text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Ledger Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-400 bg-slate-950/60 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Transaction ID</th>
                  <th className="py-3 px-4 font-semibold">Member</th>
                  <th className="py-3 px-4 font-semibold">Amount</th>
                  <th className="py-3 px-4 font-semibold">Gateway</th>
                  <th className="py-3 px-4 font-semibold">Description</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 px-4 font-mono text-xs text-accent font-semibold">{tx.id}</td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-white">{tx.memberName}</div>
                      <div className="text-xs text-slate-400 font-mono">{tx.memberRef}</div>
                    </td>
                    <td className="py-4 px-4 font-bold text-white">{tx.amount}</td>
                    <td className="py-4 px-4">
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                        {tx.provider}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-300">{tx.type}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          tx.status === 'SUCCEEDED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : tx.status === 'PENDING'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-xs text-slate-400">{tx.date}</td>
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
