'use client';

import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBookingModalStore } from '@/lib/store';
import { formatTimeSlot } from '@/lib/dates';
import { Calendar, Clock, User, CheckCircle2 } from 'lucide-react';

export function BookClassModal() {
  const { isOpen, classSession, selectedDate, closeBookingModal } = useBookingModalStore();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!classSession) return null;

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
      setTimeout(() => {
        setConfirmed(false);
        closeBookingModal();
      }, 1800);
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeBookingModal}>
      <DialogHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="accent">{classSession.category}</Badge>
          <span className="text-xs font-mono text-slate-400">Cap: {classSession.capacity} spots</span>
        </div>
        <DialogTitle>{classSession.name}</DialogTitle>
        <DialogDescription>
          {classSession.description || 'High-energy coach-led training session at IronWorks Gym Ancoats.'}
        </DialogDescription>
      </DialogHeader>

      {confirmed ? (
        <div className="py-8 text-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white">Booking Confirmed!</h3>
          <p className="text-xs text-slate-300 mt-1">See you on the gym floor.</p>
        </div>
      ) : (
        <div className="space-y-4 py-2">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="w-4 h-4 text-accent shrink-0" />
              <span><strong>Date:</strong> {selectedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-accent shrink-0" />
              <span><strong>Time:</strong> {formatTimeSlot(classSession.startTime || '07:00', classSession.durationMins || 45)}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <User className="w-4 h-4 text-accent shrink-0" />
              <span><strong>Head Coach:</strong> {classSession.coach?.name || 'IronWorks Head Coach'}</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Reservations are included with Unlimited membership. Cancel at least 2 hours before the start time to free your slot.
          </p>

          <DialogFooter>
            <Button variant="ghost" onClick={closeBookingModal} disabled={loading}>
              Cancel
            </Button>
            <Button variant="accent" onClick={handleConfirm} loading={loading}>
              Confirm Reservation
            </Button>
          </DialogFooter>
        </div>
      )}
    </Dialog>
  );
}
