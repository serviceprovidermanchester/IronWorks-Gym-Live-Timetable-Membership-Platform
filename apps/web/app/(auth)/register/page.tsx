import type { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { FadeIn } from '@/components/animations/MotionWrappers';

export const metadata: Metadata = {
  title: 'Create Account | IronWorks Gym Manchester',
  description: 'Join IronWorks Gym online in under 2 minutes. Transparent rolling monthly memberships.',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-ink">
      <FadeIn className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block text-2xl font-black text-white tracking-wider uppercase mb-2">
            Iron<span className="text-accent">Works</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Join IronWorks Gym</h1>
          <p className="text-xs text-slate-400 mt-1">
            Create your member account in under 2 minutes. No contract lock-ins.
          </p>
        </div>

        <RegisterForm />

        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center text-xs text-slate-400">
          <span>Already registered? </span>
          <Link href="/login" className="text-accent font-bold hover:underline">
            Sign In &rarr;
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
