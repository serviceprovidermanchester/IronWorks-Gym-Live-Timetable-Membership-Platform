'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-ink">
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-black text-white tracking-wider uppercase mb-2">
            Iron<span className="text-accent">Works</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Create New Password</h1>
          <p className="text-xs text-slate-400 mt-1">Must be at least 8 characters.</p>
        </div>

        {done ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-bold text-white">Password Updated!</h3>
            <p className="text-xs text-slate-300 mt-2">
              Your password has been securely updated. You can now log into your account.
            </p>
            <Link
              href="/login"
              className="inline-block mt-6 px-6 py-2.5 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl text-xs transition-colors"
            >
              Sign In Now
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase font-bold text-slate-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-slate-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-accent/10"
            >
              Save New Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
