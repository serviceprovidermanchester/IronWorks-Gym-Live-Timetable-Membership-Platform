'use client';
/**
 * Header — IronWorks Gym
 * SPManchester Private Limited · https://www.spmanchester.com
 */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Dumbbell } from 'lucide-react';

const NAV_LINKS = [
  { href: '/#timetable', label: 'Timetable' },
  { href: '/membership', label: 'Membership' },
  { href: '/coaches', label: 'Coaches' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-semibold text-slate-300 hover:text-white transition-colors text-sm no-underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors no-underline"
          >
            Log in
          </Link>
          <Link
            href="/membership"
            className="bg-brand hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-brand/20 no-underline"
          >
            Join now
          </Link>
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
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-semibold text-slate-200 hover:text-brand py-2.5 border-b border-slate-800/60 no-underline text-base transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
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
        </div>
      )}
    </header>
  );
}
