import type { Metadata } from 'next';
import { TimetableSection } from '@/components/timetable/TimetableSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Weekly Class Timetable | IronWorks Gym Manchester',
  description: 'Explore 18 weekly classes across Strength, Conditioning, Boxing, and Recovery at IronWorks Gym, Ancoats Manchester. Filter by day and category.',
};

export default function TimetablePage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-12 pb-24 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Live Schedule</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
            Weekly Class Timetable
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            18 coach-led classes across 6 disciplines. Filter by day or training style to find your next session.
          </p>
        </div>

        {/* Timetable Interactive Grid */}
        <TimetableSection />

        {/* Booking Rules & Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block"></span>
              Booking Window
            </h3>
            <p className="text-sm text-slate-400">
              Members can reserve spots up to 7 days in advance. Classes open at 06:00 every Monday.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block"></span>
              Cancellation Policy
            </h3>
            <p className="text-sm text-slate-400">
              Cancel with at least 2 hours notice to allow waitlisted members automatic entry.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block"></span>
              Drop-In Passes
            </h3>
            <p className="text-sm text-slate-400">
              Non-members can book single sessions for £15 or join on an Unlimited plan for unmetered access.
            </p>
            <Link href="/membership" className="inline-block mt-3 text-sm text-accent hover:underline font-medium">
              View Memberships &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
