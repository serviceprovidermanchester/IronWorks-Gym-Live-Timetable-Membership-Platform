/**
 * Footer — IronWorks Gym
 * SPManchester Private Limited · https://www.spmanchester.com
 */
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-ink text-gray-400 pt-16 pb-6">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="text-white font-black text-2xl mb-3">Iron<span className="text-brand">Works</span></div>
            <p className="text-sm leading-relaxed">Strength, conditioning & classes · Ancoats, Manchester</p>
            <p className="text-xs mt-3 italic opacity-60">Fictional gym · Demo hours Mon–Sun 05:30–23:00 · All content is sample data.</p>
          </div>
          {/* Quick links */}
          <nav className="flex flex-col gap-2">
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Quick Links</h3>
            {['/#timetable|Timetable', '/membership|Membership', '/#coaches|Coaches', '/login|Member login'].map((item) => {
              const [href, label] = item.split('|');
              return <Link key={href} href={href} className="text-sm text-gray-400 hover:text-white transition-colors no-underline">{label}</Link>;
            })}
          </nav>
          {/* SPManchester */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Built by</h3>
            <a href="https://www.spmanchester.com" target="_blank" rel="noopener noreferrer" className="text-brand font-bold text-lg hover:text-orange-400 transition-colors no-underline">
              SPManchester Private Limited
            </a>
            <p className="text-sm mt-1">Web Design & Development · Manchester, UK</p>
            <div className="flex flex-col gap-1 mt-3">
              <a href="https://www.spmanchester.com" className="text-sm text-gray-400 hover:text-white no-underline">🌐 www.spmanchester.com</a>
              <a href="mailto:info@spmanchester.com" className="text-sm text-gray-400 hover:text-white no-underline">📧 info@spmanchester.com</a>
              <a href="https://www.spmanchester.com/projects" className="text-sm text-gray-400 hover:text-white no-underline">📂 Portfolio</a>
            </div>
          </div>
        </div>
        <p className="text-xs text-center mt-6 opacity-50">
          Concept website designed & built by{' '}
          <a href="https://www.spmanchester.com" className="text-gray-400 hover:text-white no-underline">SPManchester Private Limited</a>
          {' '}— MIT License · Copyright © 2026 SPManchester Private Limited
        </p>
      </div>
    </footer>
  );
}
