'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-ink">
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-black text-white tracking-wider uppercase mb-2">
            Iron<span className="text-accent">Works</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-xs text-slate-400 mt-1">
            Enter your registered email address and we will send you a reset link.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center">
            <span className="text-3xl block mb-2">✉️</span>
            <h3 className="text-lg font-bold text-white">Check Your Inbox</h3>
            <p className="text-xs text-slate-300 mt-2">
              If an account exists for <span className="text-white font-mono">{email}</span>, you will receive password reset instructions.
            </p>
            <Link
              href="/login"
              className="inline-block mt-6 px-6 py-2.5 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl text-xs transition-colors"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase font-bold text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-accent/10 disabled:opacity-50"
            >
              {loading ? 'Sending link...' : 'Send Reset Instructions'}
            </button>

            <div className="text-center">
              <Link href="/login" className="text-xs text-slate-400 hover:text-accent transition-colors">
                &larr; Back to sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
