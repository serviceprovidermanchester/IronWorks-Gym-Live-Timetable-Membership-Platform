import type { Metadata } from 'next';
import Link from 'next/link';
import { MemberOverviewWidget, QuickBookWidget } from '@/components/member/DashboardWidgets';

export const metadata: Metadata = {
  title: 'Member Dashboard | IronWorks Gym Manchester',
  description: 'Manage your gym bookings, membership status, door access pass, and training analytics.',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation sub-bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-8">
          <div>
            <span className="text-xs font-mono text-accent uppercase tracking-wider">Member Portal</span>
            <h1 className="text-3xl font-extrabold text-white mt-1">Welcome back, Alex! 💪</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/bookings"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 transition-colors"
            >
              My Bookings
            </Link>
            <Link
              href="/billing"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 transition-colors"
            >
              Billing & Invoices
            </Link>
            <Link
              href="/timetable"
              className="px-4 py-2 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-accent/10"
            >
              + Book Class
            </Link>
          </div>
        </div>

        {/* Member KPI Overview */}
        <MemberOverviewWidget />

        {/* Next Scheduled Class Callout */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-2xl font-bold shrink-0">
              🏋️
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-accent tracking-wider">Your Next Reserved Session</span>
              <h2 className="text-2xl font-bold text-white mt-0.5">Iron Strength & Barbells</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-300 mt-1">
                <span>📅 Wednesday, 25 Nov 2026</span>
                <span>⏰ 06:30 - 07:15</span>
                <span>👤 Coach Sarah Jenkins</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/bookings"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 transition-all"
            >
              Manage Booking
            </Link>
          </div>
        </div>

        {/* Quick Booking Options */}
        <QuickBookWidget />
      </div>
    </div>
  );
}
