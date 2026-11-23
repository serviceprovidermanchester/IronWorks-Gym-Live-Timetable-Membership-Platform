'use client';
/**
 * Member Sub-Navigation & Profile Control Bar
 * IronWorks Gym · SPManchester Private Limited
 */
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { LayoutDashboard, Calendar, CreditCard, User, LogOut, PlusCircle, ShieldCheck } from 'lucide-react';

export function MemberSubNav({ title, subtitle }: { title?: string; subtitle?: string }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Member';
  const memberRef = (session?.user as any)?.memberRef || 'IW-2026-M4920';
  const isAdmin = Boolean((session?.user as any)?.isAdmin);

  const tabs = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/bookings', label: 'My Bookings', icon: Calendar },
    { href: '/billing', label: 'Billing', icon: CreditCard },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="border-b border-slate-800 pb-6 mb-8 space-y-5">
      {/* Top greeting and actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono text-brand uppercase tracking-wider font-bold">
              IronWorks Member Portal
            </span>
            <span className="text-xs font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
              {memberRef}
            </span>
            {isAdmin && (
              <Link
                href="/admin"
                className="text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md hover:bg-amber-500/20 transition-colors flex items-center gap-1"
              >
                <ShieldCheck size={12} /> Admin Mode
              </Link>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title || `Welcome back, ${userName}! 💪`}
          </h1>
          {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/timetable"
            className="flex items-center gap-1.5 px-4 py-2 bg-brand hover:bg-orange-600 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-brand/20 no-underline"
          >
            <PlusCircle size={14} />
            <span>Book Class</span>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-rose-950/80 border border-slate-800 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 font-bold rounded-xl text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Sign out of your IronWorks account"
          >
            <LogOut size={14} className="text-rose-400" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap no-underline ${
                active
                  ? 'bg-slate-900 text-brand border border-brand/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Icon size={14} className={active ? 'text-brand' : 'text-slate-500'} />
              <span>{tab.label}</span>
            </Link>
          );
        })}

        {isAdmin && (
          <Link
            href="/admin"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap no-underline ml-auto ${
              pathname.startsWith('/admin')
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-amber-400 hover:bg-amber-500/10 border border-amber-500/20'
            }`}
          >
            <ShieldCheck size={14} />
            <span>Admin Dashboard</span>
          </Link>
        )}
      </div>
    </div>
  );
}
