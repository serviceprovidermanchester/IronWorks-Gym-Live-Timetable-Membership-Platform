'use client';

import React, { useState } from 'react';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.co.uk',
    phone: '+44 7700 900123',
    memberRef: 'IW-2026-M4920',
    emergencyName: 'Rachel Morgan',
    emergencyRelation: 'Partner',
    emergencyPhone: '+44 7700 900456',
    notificationsEmail: true,
    notificationsSms: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-10 pb-20 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white">Member Profile</h1>
          <p className="text-slate-400 text-sm mt-1">
            Keep your personal contact and emergency health information up to date.
          </p>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-semibold">
            ✓ Profile changes saved successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Member Card header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-accent font-bold">IronWorks Member ID</span>
              <div className="text-2xl font-mono font-bold text-white mt-1">{profile.memberRef}</div>
              <p className="text-xs text-slate-400 mt-1">Active Unlimited Tier · Valid through Nov 2027</p>
            </div>
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold uppercase tracking-wider">
              Gym Access Active
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">Personal Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Emergency Contact</h2>
              <p className="text-xs text-slate-400 mt-1">Required for gym floor and high-intensity class safety.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.emergencyName}
                  onChange={(e) => setProfile({ ...profile, emergencyName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Relationship
                </label>
                <input
                  type="text"
                  value={profile.emergencyRelation}
                  onChange={(e) => setProfile({ ...profile, emergencyRelation: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Emergency Phone
                </label>
                <input
                  type="tel"
                  value={profile.emergencyPhone}
                  onChange={(e) => setProfile({ ...profile, emergencyPhone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-8 py-3 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-accent/10"
            >
              Save Profile Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
