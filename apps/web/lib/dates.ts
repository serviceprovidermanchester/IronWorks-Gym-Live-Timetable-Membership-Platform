/**
 * Date utilities powered by date-fns
 * IronWorks Gym · SPManchester Private Limited
 */
import { format, isToday, isTomorrow, addDays, parseISO } from 'date-fns';

export function formatClassDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (isToday(d)) return `Today, ${format(d, 'd MMM')}`;
  if (isTomorrow(d)) return `Tomorrow, ${format(d, 'd MMM')}`;
  return format(d, 'EEEE, d MMM yyyy');
}

export function formatTimeSlot(start: string, durationMins: number): string {
  // e.g. "06:30" + 45 mins -> "06:30 - 07:15"
  const [hours, mins] = start.split(':').map(Number);
  const totalMins = hours * 60 + mins + durationMins;
  const endHours = String(Math.floor(totalMins / 60) % 24).padStart(2, '0');
  const endMins = String(totalMins % 60).padStart(2, '0');
  return `${start} - ${endHours}:${endMins}`;
}

export function getUpcomingWeekDates(startDate: Date = new Date()): { date: string; label: string; day: string }[] {
  return Array.from({ length: 7 }).map((_, i) => {
    const d = addDays(startDate, i);
    return {
      date: format(d, 'yyyy-MM-dd'),
      day: format(d, 'EEEE').toUpperCase(),
      label: format(d, 'EEE d MMM'),
    };
  });
}
