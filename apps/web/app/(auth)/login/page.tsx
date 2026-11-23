import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/components/forms/LoginForm';
import { FadeIn } from '@/components/animations/MotionWrappers';

export const metadata: Metadata = {
  title: 'Sign In | IronWorks Gym Member Portal',
  description: 'Log into your IronWorks Gym account to book classes and manage your membership.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-ink">
      <FadeIn className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-black text-white tracking-wider uppercase mb-2">
            Iron<span className="text-accent">Works</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Member Sign In</h1>
          <p className="text-xs text-slate-400 mt-1">
            Access your bookings, turnstile QR code, and membership account.
          </p>
        </div>

        <LoginForm />

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-400">
          <span>Not an IronWorks member yet? </span>
          <Link href="/register" className="text-accent font-bold hover:underline">
            Join Online Now &rarr;
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
