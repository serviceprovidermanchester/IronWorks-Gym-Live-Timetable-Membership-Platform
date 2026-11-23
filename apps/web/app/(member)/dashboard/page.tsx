import type { Metadata } from 'next';
import Link from 'next/link';
import { MemberSubNav } from '@/components/member/MemberSubNav';
import { MemberOverviewWidget, QuickBookWidget } from '@/components/member/DashboardWidgets';

export const metadata: Metadata = {
  title: 'Member Dashboard | IronWorks Gym Manchester',
  description: 'Manage your gym bookings, membership status, door access pass, and training analytics.',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Sub-Bar with dynamic greetings and Log Out button */}
        <MemberSubNav />

        {/* Member KPI Overview */}
        <MemberOverviewWidget />

        {/* Next Scheduled Class Callout */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-700/80 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand text-2xl font-bold shrink-0">
              🏋️
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-brand tracking-wider">
                Your Next Reserved Session
              </span>
              <h2 className="text-2xl font-bold text-white mt-0.5">Iron Strength &amp; Barbells</h2>
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
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 transition-all no-underline"
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
