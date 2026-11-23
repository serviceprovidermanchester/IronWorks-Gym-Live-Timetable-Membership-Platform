'use client';
/**
 * Admin Sub-Navigation & Control Bar
 * IronWorks Gym · SPManchester Private Limited
 */
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, Dumbbell, Users, CreditCard, LogOut, UserCheck, ExternalLink, CalendarCheck } from 'lucide-react';

export function AdminSubNav({ title, subtitle }: { title?: string; subtitle?: string }) {
  const pathname = usePathname();

  const tabs = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/classes', label: 'Class Timetable', icon: Dumbbell },
    { href: '/admin/members', label: 'Members Directory', icon: Users },
    { href: '/admin/bookings', label: 'Bookings & Check-In', icon: CalendarCheck },
    { href: '/admin/payments', label: 'Revenue & Payments', icon: CreditCard },
  ];

  return (
    <div className="border-b border-slate-800 pb-6 mb-8 space-y-5">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
              IronWorks Management Console · Flagship Ancoats
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title || 'Gym Operations & Admin Control'}
          </h1>
          {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold rounded-xl text-xs transition-all border border-slate-700 no-underline"
          >
            <UserCheck size={14} className="text-brand" />
            <span>Member View</span>
          </Link>

          <a
            href="http://localhost:3001/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl text-xs transition-all border border-slate-800 no-underline"
          >
            <ExternalLink size={13} />
            <span>Payload CMS</span>
          </a>

          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-rose-950/80 border border-slate-800 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 font-bold rounded-xl text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Sign out of Admin Session"
          >
            <LogOut size={14} className="text-rose-400" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href as any}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap no-underline ${
                active
                  ? 'bg-slate-900 text-amber-400 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Icon size={14} className={active ? 'text-amber-400' : 'text-slate-500'} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
