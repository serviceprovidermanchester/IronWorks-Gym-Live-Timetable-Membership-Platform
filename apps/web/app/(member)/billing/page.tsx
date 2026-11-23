'use client';

import React from 'react';
import Link from 'next/link';

export default function BillingPage() {
  const currentPlan = {
    name: 'Unlimited Tier',
    price: '£75.00',
    billingCycle: 'Monthly (renews 1st of each month)',
    status: 'ACTIVE',
    provider: 'Stripe Direct Debit',
    nextBillDate: '1 December 2026',
    card: 'Mastercard ending in 4242',
  };

  const invoices = [
    { id: 'INV-2026-11', date: '01 Nov 2026', amount: '£75.00', status: 'PAID', pdf: '#' },
    { id: 'INV-2026-10', date: '01 Oct 2026', amount: '£75.00', status: 'PAID', pdf: '#' },
    { id: 'INV-2026-09', date: '01 Sep 2026', amount: '£75.00', status: 'PAID', pdf: '#' },
    { id: 'INV-2026-08', date: '01 Aug 2026', amount: '£95.00', status: 'PAID', note: 'Includes £20 joining fee', pdf: '#' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-10 pb-20 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white">Membership & Billing</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your subscription tier, payment methods, and billing receipts.
          </p>
        </div>

        {/* Current Plan Card */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase font-bold text-accent tracking-wider">Current Membership</span>
              <h2 className="text-2xl font-extrabold text-white mt-1">{currentPlan.name}</h2>
              <p className="text-slate-400 text-sm">{currentPlan.billingCycle}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-3xl font-extrabold text-accent">{currentPlan.price}</div>
              <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {currentPlan.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 text-sm">
            <div>
              <span className="text-slate-400 block text-xs">Payment Method:</span>
              <span className="font-semibold text-white mt-0.5 block">💳 {currentPlan.card}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">Next Billing Date:</span>
              <span className="font-semibold text-white mt-0.5 block">📅 {currentPlan.nextBillDate}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
            <Link
              href="/membership"
              className="px-5 py-2.5 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl text-sm transition-all"
            >
              Change Tier
            </Link>
            <button
              onClick={() => alert('Redirecting to Stripe Customer Portal...')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm border border-slate-700 transition-all"
            >
              Update Payment Card
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to cancel your membership? It will remain active until the end of the billing period.')) {
                  alert('Membership set to cancel at end of billing cycle.');
                }
              }}
              className="px-5 py-2.5 text-rose-400 hover:bg-rose-500/10 rounded-xl text-sm font-semibold border border-rose-500/30 ml-auto transition-all"
            >
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-6">Payment History</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="pb-3 font-semibold">Invoice</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 font-mono font-medium text-white">{inv.id}</td>
                    <td className="py-4 text-slate-300">{inv.date}</td>
                    <td className="py-4 font-bold text-white">
                      {inv.amount}
                      {inv.note && <span className="block text-xs text-slate-400 font-normal">{inv.note}</span>}
                    </td>
                    <td className="py-4">
                      <span className="text-xs px-2 py-0.5 rounded font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <a
                        href={inv.pdf}
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Downloading receipt for ${inv.id}...`);
                        }}
                        className="text-xs font-semibold text-accent hover:underline"
                      >
                        Download PDF
                      </a>
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
