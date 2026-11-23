'use client';
/**
 * Header — IronWorks Gym
 * SPManchester Private Limited
 */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Dumbbell } from 'lucide-react';

const NAV_LINKS = [
  { href: '/#timetable', label: 'Timetable' },
  { href: '/membership', label: 'Membership' },
  { href: '/#coaches', label: 'Coaches' },
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
    <header className={`sticky top-0 z-50 transition-shadow duration-200 ${scrolled ? 'shadow-md' : ''} bg-white/95 backdrop-blur-sm border-b border-gray-100`}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between py-4 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-ink no-underline">
          <Dumbbell className="text-brand" size={22} />
          Iron<span className="text-brand">Works</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="font-semibold text-ink hover:text-brand transition-colors text-sm no-underline">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold text-ink hover:text-brand transition-colors no-underline">Log in</Link>
          <Link href="/membership" className="bg-brand text-white font-bold px-5 py-2.5 rounded-full text-sm hover:bg-brand-dark transition-colors no-underline">
            Join now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-ink hover:text-brand transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="font-semibold text-ink py-2 border-b border-gray-100 no-underline" onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/membership" className="bg-brand text-white font-bold px-5 py-3 rounded-full text-center mt-2 no-underline" onClick={() => setMobileOpen(false)}>
            Join now
          </Link>
        </div>
      )}
    </header>
  );
}
