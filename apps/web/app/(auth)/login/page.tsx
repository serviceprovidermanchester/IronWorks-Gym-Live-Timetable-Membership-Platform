/**
 * Login page — IronWorks Gym
 * SPManchester Private Limited
 */
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Log in' };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-3xl font-black mb-1">Iron<span className="text-brand">Works</span></div>
          <h1 className="text-2xl font-bold">Member login</h1>
          <p className="text-muted text-sm mt-1">Welcome back</p>
        </div>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1.5">Email address</label>
            <input id="email" type="email" name="email" required autoComplete="email" placeholder="you@example.com"
              className="w-full border-1.5 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1.5">Password</label>
            <input id="password" type="password" name="password" required autoComplete="current-password" placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition" />
          </div>
          <button type="submit" className="bg-brand text-white font-bold py-3.5 rounded-full mt-2 hover:bg-brand-dark transition-colors">
            Log in →
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-muted">
          <Link href="#" className="hover:text-brand">Forgot password?</Link>
          <span className="mx-3">·</span>
          <Link href="/register" className="text-brand font-semibold hover:underline">Create account</Link>
        </div>
      </div>
    </div>
  );
}
