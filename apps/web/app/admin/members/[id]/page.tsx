'use client';
/**
 * Member Record & Operations Override — /admin/members/:id
 * IronWorks Gym · SPManchester Private Limited
 */
import { useState } from 'react';
import Link from 'next/link';
import { AdminSubNav } from '@/components/admin/AdminSubNav';
import { ArrowLeft, User, Shield, KeyRound, Ban, RefreshCw, CheckCircle2, AlertTriangle, CreditCard, CalendarCheck } from 'lucide-react';

export default function AdminMemberDetailPage({ params }: { params: { id: string } }) {
  const [member, setMember] = useState({
    id: params.id,
    name: 'Alex Morgan',
    email: 'member@ironworksgym.com',
    ref: 'IW-2026-M920',
    phone: '+44 7700 900123',
    role: 'MEMBER',
    status: 'ACTIVE',
    joinedDate: '01 Oct 2026',
    tier: 'UNLIMITED',
    price: '£75.00 / month',
    stripeCustomerId: 'cus_Q98xIronWorksDemo',
    emergencyContact: 'Rachel Morgan (+44 7700 900999)',
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleManualAction = (action: string) => {
    setNotification(`Action executed: ${action}`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AdminSubNav
          title={`Member Profile: ${member.name}`}
          subtitle={`Reference: ${member.ref} · Managing member record & administrative overrides`}
        />

        <div className="mb-6">
          <Link
            href="/admin/members"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Members Directory
          </Link>
        </div>

        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 size={18} />
            <span>{notification}</span>
          </div>
        )}

        {/* Member Overview Card */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand font-black text-2xl">
                  {member.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{member.name}</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{member.email}</p>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {member.status}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-6 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Member Reference:</span>
                <div className="font-mono text-sm font-bold text-brand mt-0.5">{member.ref}</div>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Phone Number:</span>
                <div className="font-mono text-sm text-slate-200 mt-0.5">{member.phone}</div>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Membership Tier:</span>
                <div className="font-bold text-sm text-white mt-0.5">{member.tier} ({member.price})</div>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Member Since:</span>
                <div className="text-sm text-slate-200 mt-0.5">{member.joinedDate}</div>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Stripe Customer ID:</span>
                <div className="font-mono text-slate-300 mt-0.5">{member.stripeCustomerId}</div>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Emergency Contact:</span>
                <div className="text-slate-300 mt-0.5">{member.emergencyContact}</div>
              </div>
            </div>
          </div>

          {/* Admin Override Actions */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                <Shield size={16} /> Operations Override
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Manual admin interventions. Actions log to audit ledger.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => handleManualAction('Turnstile Access Pass re-issued')}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all border border-slate-700 flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} /> Re-issue Turnstile Pass
                </button>
                <button
                  onClick={() => handleManualAction('Password reset link dispatched via Resend')}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all border border-slate-700 flex items-center justify-center gap-2"
                >
                  <KeyRound size={14} /> Dispatch Reset Email
                </button>
                <button
                  onClick={() => handleManualAction('Membership paused for 30 days')}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl text-xs transition-all border border-slate-700 flex items-center justify-center gap-2"
                >
                  <CalendarCheck size={14} /> Manual 30-Day Pause
                </button>
                <button
                  onClick={() => handleManualAction('Member access temporarily suspended')}
                  className="w-full py-2.5 px-4 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 font-bold rounded-xl text-xs transition-all border border-rose-500/30 flex items-center justify-center gap-2"
                >
                  <Ban size={14} /> Suspend Member Access
                </button>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 italic">
              Security note: All override modifications require role: ADMIN.
            </div>
          </div>
        </div>

        {/* Recent Member History (Bookings & Payments) */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <CalendarCheck size={18} className="text-brand" /> Recent Class Bookings
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Engine Room HIIT</div>
                  <div className="text-slate-400">Coach Marcus Vance · 25 Nov, 06:30</div>
                </div>
                <span className="text-brand font-bold">CONFIRMED</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Iron Strength &amp; Barbells</div>
                  <div className="text-slate-400">Coach Sarah Jenkins · 20 Nov, 06:30</div>
                </div>
                <span className="text-emerald-400 font-bold">ATTENDED</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-emerald-400" /> Payment Ledger
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">£75.00 — Unlimited Tier</div>
                  <div className="text-slate-400">01 Nov 2026 · Stripe Recurring</div>
                </div>
                <span className="text-emerald-400 font-bold">PAID ✓</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">£75.00 — Unlimited Tier</div>
                  <div className="text-slate-400">01 Oct 2026 · Stripe Recurring</div>
                </div>
                <span className="text-emerald-400 font-bold">PAID ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
