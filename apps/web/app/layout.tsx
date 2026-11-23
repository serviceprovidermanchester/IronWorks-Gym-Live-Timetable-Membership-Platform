/**
 * Root Layout — IronWorks Gym
 * SPManchester Private Limited · https://www.spmanchester.com
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'IronWorks Gym — Live Timetable & Membership Platform',
    template: '%s | IronWorks Gym',
  },
  description:
    'Live filterable class timetable, transparent membership plans from £29/mo, and 2-minute online joining. Built by SPManchester Private Limited.',
  keywords: ['gym', 'manchester', 'fitness', 'timetable', 'membership', 'classes', 'ironworks'],
  authors: [{ name: 'SPManchester Private Limited', url: 'https://www.spmanchester.com' }],
  creator: 'SPManchester Private Limited',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ironworksgym.com',
    siteName: 'IronWorks Gym',
    title: 'IronWorks Gym — Live Timetable & Membership Platform',
    description: 'Indie gyms, chain-level convenience. Live timetable · transparent plans · 2-min joining.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
