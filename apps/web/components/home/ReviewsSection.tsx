'use client';

import React from 'react';

const reviews = [
  {
    author: 'Liam Patterson',
    role: 'Member since Jan 2026',
    rating: 5,
    text: 'IronWorks completely changed how I train. The coaches actually coach—they check your barbell path and correct form rather than just shouting into a microphone. The 6:30 AM Engine Room HIIT has transformed my stamina.',
    tag: 'Strength & Conditioning',
  },
  {
    author: 'Sophie Green',
    role: 'Unlimited Member',
    rating: 5,
    text: 'The best gym community in Ancoats. Being able to book classes in 2 taps on mobile without dealing with Instagram DMs or paper forms is chain-gym convenient, but with 10x the character.',
    tag: 'Daily Classes',
  },
  {
    author: 'Tariq Al-Mansoor',
    role: 'Founding Member',
    rating: 5,
    text: 'Top tier Eleiko plates, Rogue racks, and coaches who know their craft. No contracts or sneaky lock-ins. Worth every penny of the membership fee.',
    tag: 'Barbell & Powerlifting',
  },
];

export function ReviewsSection() {
  return (
    <section className="py-20 bg-slate-950/80 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            ★ ★ ★ ★ ★ 4.9 / 5.0 on Google Reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Built for Members Who Take Training Seriously
          </h2>
          <p className="mt-3 text-slate-400 text-sm md:text-base">
            Read what Ancoats lifters, runners, and everyday athletes say about IronWorks Gym.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.author}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-sm mb-4">
                  {'★'.repeat(rev.rating)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm">{rev.author}</h4>
                  <p className="text-xs text-slate-500">{rev.role}</p>
                </div>
                <span className="text-[10px] uppercase font-bold bg-slate-800 text-accent px-2.5 py-1 rounded">
                  {rev.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
