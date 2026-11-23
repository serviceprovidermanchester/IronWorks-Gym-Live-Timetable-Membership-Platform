/**
 * Zustand Global State Management
 * IronWorks Gym · SPManchester Private Limited
 */
import { create } from 'zustand';

interface TimetableState {
  selectedDay: string;
  selectedCategory: string;
  searchQuery: string;
  setSelectedDay: (day: string) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useTimetableStore = create<TimetableState>((set) => ({
  selectedDay: 'ALL',
  selectedCategory: 'ALL',
  searchQuery: '',
  setSelectedDay: (day) => set({ selectedDay: day }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () => set({ selectedDay: 'ALL', selectedCategory: 'ALL', searchQuery: '' }),
}));

interface BookingModalState {
  isOpen: boolean;
  classSession: any | null;
  selectedDate: string;
  openBookingModal: (classSession: any, date?: string) => void;
  closeBookingModal: () => void;
}

export const useBookingModalStore = create<BookingModalState>((set) => ({
  isOpen: false,
  classSession: null,
  selectedDate: new Date().toISOString().split('T')[0],
  openBookingModal: (classSession, date) =>
    set({
      isOpen: true,
      classSession,
      selectedDate: date || new Date().toISOString().split('T')[0],
    }),
  closeBookingModal: () => set({ isOpen: false, classSession: null }),
}));
