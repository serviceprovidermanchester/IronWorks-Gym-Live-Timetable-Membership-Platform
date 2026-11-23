/**
 * Register page — IronWorks Gym
 * SPManchester Private Limited
 */
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Create account' };

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-3xl font-black mb-1">Iron<span className="text-brand">Works</span></div>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted text-sm mt-1">Join online in 2 minutes</p>
        </div>
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold mb-1.5">First name</label>
              <input id="firstName" name="firstName" required placeholder="Alex"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold mb-1.5">Last name</label>
              <input id="lastName" name="lastName" required placeholder="Johnson"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1.5">Email</label>
            <input id="email" type="email" name="email" required placeholder="alex@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1.5">Password</label>
            <input id="password" type="password" name="password" required placeholder="Min. 8 characters"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition" />
          </div>
          <button type="submit" className="bg-brand text-white font-bold py-3.5 rounded-full mt-2 hover:bg-brand-dark transition-colors">
            Create account →
          </button>
          <p className="text-xs text-muted text-center">By joining you agree to our Terms & Privacy Policy.</p>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          Already a member?{' '}
          <Link href="/login" className="text-brand font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
