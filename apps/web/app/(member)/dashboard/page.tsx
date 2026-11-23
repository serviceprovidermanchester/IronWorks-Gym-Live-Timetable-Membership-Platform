/**
 * Member Dashboard — IronWorks Gym
 * SPManchester Private Limited
 */
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="font-black text-xl">Iron<span className="text-brand">Works</span></div>
        <nav className="flex gap-4 text-sm">
          <Link href="/dashboard" className="font-semibold text-brand no-underline">Dashboard</Link>
          <Link href="/bookings" className="text-muted hover:text-brand no-underline">Bookings</Link>
          <Link href="/profile" className="text-muted hover:text-brand no-underline">Profile</Link>
          <Link href="/billing" className="text-muted hover:text-brand no-underline">Billing</Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-10">
        {/* Greeting */}
        <div className="mb-10">
          <h1 className="text-3xl font-black">Good morning! 💪</h1>
          <p className="text-muted mt-1">Your IronWorks member dashboard.</p>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Membership', value: 'All Access', sub: 'Active · Renews 1 Jan', color: 'text-accent' },
            { label: 'Classes this month', value: '7', sub: 'Target: 12', color: 'text-brand' },
            { label: 'Next class', value: 'Strength Foundations', sub: 'Mon 06:30 · Coach Dee', color: 'text-ink' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <p className="text-xs font-bold uppercase tracking-widest text-muted mb-2">{s.label}</p>
              <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Quick book */}
        <div className="bg-white rounded-2xl shadow-sm p-7 border border-gray-100 mb-6">
          <h2 className="font-bold text-lg mb-4">Today's available classes</h2>
          <p className="text-muted text-sm">Connect the API to see live class availability and book your spot.</p>
          <Link href="/#timetable" className="inline-block mt-4 bg-brand text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-brand-dark transition-colors no-underline">
            View full timetable
          </Link>
        </div>
      </main>
    </div>
  );
}
