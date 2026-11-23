'use client';
/**
 * Header — IronWorks Gym
 * Session-aware navbar with authenticated controls & Log Out
 * SPManchester Private Limited · https://www.spmanchester.com
 */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Dumbbell, User, LogOut, ShieldCheck, LayoutDashboard } from 'lucide-react';

const PUBLIC_LINKS = [
  { href: '/#timetable', label: 'Timetable' },
  { href: '/membership', label: 'Membership' },
  { href: '/coaches', label: 'Coaches' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated' && Boolean(session?.user);
  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Member';
  const isAdmin = Boolean((session?.user as any)?.isAdmin);
  const userInitial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-xl border-b border-slate-800/90 py-3.5'
          : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/60 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-black text-xl text-white tracking-tight no-underline group"
        >
          <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand group-hover:scale-105 transition-transform">
            <Dumbbell size={20} />
          </div>
          <span className="text-xl font-black">
            Iron<span className="text-brand">Works</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {PUBLIC_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-semibold text-slate-300 hover:text-white transition-colors text-sm no-underline"
            >
              {l.label}
            </Link>
          ))}

          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="font-semibold text-brand hover:text-orange-400 transition-colors text-sm no-underline flex items-center gap-1.5"
            >
              <LayoutDashboard size={14} />
              <span>Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Desktop CTA / Auth Controls */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Member Profile Chip */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-bold transition-all no-underline"
              >
                <div className="w-6 h-6 rounded-lg bg-brand/20 border border-brand/40 text-brand flex items-center justify-center font-bold text-xs">
                  {userInitial}
                </div>
                <span className="max-w-[130px] truncate">{userName}</span>
              </Link>

              {/* Admin Chip if user is Admin */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition-all flex items-center gap-1 no-underline"
                >
                  <ShieldCheck size={13} />
                  <span>Admin</span>
                </Link>
              )}

              {/* Log Out Button */}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/80 border border-slate-800 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Log out of your account"
              >
                <LogOut size={13} className="text-rose-400" />
                <span>Log out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors no-underline px-2"
              >
                Log in
              </Link>
              <Link
                href="/membership"
                className="bg-brand hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-brand/20 no-underline"
              >
                Join now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors rounded-xl bg-slate-900 border border-slate-800 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-slate-950/98 backdrop-blur-xl px-5 py-5 flex flex-col gap-3">
          {isAuthenticated && (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 mb-1 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand/20 border border-brand/40 text-brand flex items-center justify-center font-bold text-sm">
                  {userInitial}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{userName}</div>
                  <div className="text-xs text-slate-400 font-mono truncate max-w-[180px]">
                    {session?.user?.email}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                ACTIVE
              </span>
            </div>
          )}

          {PUBLIC_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-semibold text-slate-200 hover:text-brand py-2 border-b border-slate-800/60 no-underline text-base transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="font-semibold text-slate-200 hover:text-brand py-2 border-b border-slate-800/60 no-underline text-base"
                onClick={() => setMobileOpen(false)}
              >
                Member Dashboard
              </Link>
              <Link
                href="/bookings"
                className="font-semibold text-slate-200 hover:text-brand py-2 border-b border-slate-800/60 no-underline text-base"
                onClick={() => setMobileOpen(false)}
              >
                My Bookings
              </Link>
              <Link
                href="/billing"
                className="font-semibold text-slate-200 hover:text-brand py-2 border-b border-slate-800/60 no-underline text-base"
                onClick={() => setMobileOpen(false)}
              >
                Billing & Membership
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  className="font-semibold text-amber-400 hover:text-amber-300 py-2 border-b border-slate-800/60 no-underline text-base flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShieldCheck size={16} />
                  <span>Admin Panel</span>
                </Link>
              )}

              <button
                onClick={() => {
                  setMobileOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
                className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 font-bold text-sm transition-all"
              >
                <LogOut size={16} />
                <span>Log Out of Account</span>
              </button>
            </div>
          ) : (
            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href="/login"
                className="text-center py-2.5 text-sm font-semibold text-slate-300 hover:text-white no-underline border border-slate-800 rounded-xl bg-slate-900/60"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/membership"
                className="bg-brand hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-center no-underline shadow-lg shadow-brand/20 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Join now
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
