'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface ClassItem {
  id: string;
  name: string;
  category: string;
  day: string;
  time: string;
  coach: string;
  capacity: number;
  isActive: boolean;
}

const initialClasses: ClassItem[] = [
  { id: '1', name: 'Engine Room HIIT', category: 'HIIT', day: 'Monday', time: '06:30 - 07:15', coach: 'Marcus Vance', capacity: 20, isActive: true },
  { id: '2', name: 'Iron Strength & Barbells', category: 'STRENGTH', day: 'Monday', time: '18:00 - 18:45', coach: 'Sarah Jenkins', capacity: 20, isActive: true },
  { id: '3', name: 'Striking & Heavy Bag', category: 'BOXING', day: 'Tuesday', time: '12:00 - 12:45', coach: 'Elena Rostova', capacity: 16, isActive: true },
  { id: '4', name: 'Athletic Recovery & Flow', category: 'RECOVERY', day: 'Wednesday', time: '17:30 - 18:15', coach: 'David Kim', capacity: 20, isActive: true },
  { id: '5', name: 'Barbell Conditioning', category: 'STRENGTH', day: 'Thursday', time: '07:00 - 07:45', coach: 'Sarah Jenkins', capacity: 18, isActive: true },
  { id: '6', name: 'Pugilist Combatives', category: 'BOXING', day: 'Friday', time: '18:30 - 19:15', coach: 'Elena Rostova', capacity: 16, isActive: true },
];

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>(initialClasses);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    category: 'STRENGTH',
    day: 'Monday',
    time: '07:00 - 07:45',
    coach: 'Sarah Jenkins',
    capacity: 20,
  });

  const handleToggleActive = (id: string) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    setClasses([
      ...classes,
      {
        id: Date.now().toString(),
        name: newClass.name,
        category: newClass.category,
        day: newClass.day,
        time: newClass.time,
        coach: newClass.coach,
        capacity: newClass.capacity,
        isActive: true,
      },
    ]);
    setShowAddModal(false);
    setNewClass({ name: '', category: 'STRENGTH', day: 'Monday', time: '07:00 - 07:45', coach: 'Sarah Jenkins', capacity: 20 });
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-10 pb-20 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/admin" className="text-xs text-accent hover:underline font-bold uppercase">&larr; Admin Dashboard</Link>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-1">Class Schedule & Timetable Management</h1>
            <p className="text-slate-400 text-sm">Add, configure, or adjust capacities for all weekly sessions.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-accent/10"
          >
            + Add New Class
          </button>
        </div>

        {/* Classes Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-400 bg-slate-950/60 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Class Name</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Day & Time</th>
                  <th className="py-3 px-4 font-semibold">Coach</th>
                  <th className="py-3 px-4 font-semibold text-center">Capacity</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {classes.map((cls) => (
                  <tr key={cls.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 px-4 font-bold text-white">{cls.name}</td>
                    <td className="py-4 px-4">
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                        {cls.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs">
                      <div className="font-semibold text-white">{cls.day}</div>
                      <div className="font-mono text-slate-400">{cls.time}</div>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-slate-300">{cls.coach}</td>
                    <td className="py-4 px-4 text-center font-bold text-white">{cls.capacity}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleActive(cls.id)}
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase transition-colors ${
                          cls.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {cls.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => alert(`Editing ${cls.name}`)}
                        className="text-xs text-accent hover:underline font-semibold"
                      >
                        Edit &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full">
              <h2 className="text-xl font-bold text-white mb-4">Add Class to Timetable</h2>
              <form onSubmit={handleAddClass} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Class Name</label>
                  <input
                    type="text"
                    required
                    value={newClass.name}
                    onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                    placeholder="e.g. Engine Room Sprints"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Category</label>
                    <select
                      value={newClass.category}
                      onChange={(e) => setNewClass({ ...newClass, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-accent"
                    >
                      <option value="STRENGTH">Strength</option>
                      <option value="HIIT">HIIT</option>
                      <option value="BOXING">Boxing</option>
                      <option value="YOGA">Yoga</option>
                      <option value="RECOVERY">Recovery</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Day</label>
                    <select
                      value={newClass.day}
                      onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-accent"
                    >
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Time Window</label>
                    <input
                      type="text"
                      value={newClass.time}
                      onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Capacity</label>
                    <input
                      type="number"
                      value={newClass.capacity}
                      onChange={(e) => setNewClass({ ...newClass, capacity: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl text-xs transition-colors"
                  >
                    Save Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
