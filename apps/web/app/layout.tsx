import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DemoBanner } from '@/components/layout/DemoBanner';
import { AuthProvider } from '@/components/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'IronWorks Gym — Strength, Conditioning & Classes · Ancoats, Manchester',
  description:
    'Independent strength & conditioning gym in Ancoats, Manchester. 18 weekly coach-led classes, zero-contract memberships, and chain-level digital convenience. Built by SPManchester Private Limited.',
  keywords: [
    'gym Manchester',
    'strength training Ancoats',
    'fitness classes Manchester',
    'IronWorks gym',
    'SPManchester',
  ],
  authors: [{ name: 'SPManchester Private Limited', url: 'https://spmanchester.com' }],
  openGraph: {
    title: 'IronWorks Gym — Manchester Strength & Conditioning',
    description: '18 weekly coach-led classes, transparent pricing, 2-minute online joining.',
    url: 'https://ironworksgym.co.uk',
    siteName: 'IronWorks Gym Manchester',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-brand-dark text-ink antialiased">
        <AuthProvider>
          <DemoBanner />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
