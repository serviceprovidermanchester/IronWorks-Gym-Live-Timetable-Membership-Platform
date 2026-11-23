/**
 * Typed TanStack Query Hooks for Server State Caching
 * IronWorks Gym · SPManchester Private Limited
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './api';

export function useClassesQuery(params?: { day?: string; category?: string }) {
  return useQuery({
    queryKey: ['classes', params],
    queryFn: async () => {
      const res = await api.classes.list(params);
      return res.data;
    },
  });
}

export function useCoachesQuery() {
  return useQuery({
    queryKey: ['coaches'],
    queryFn: async () => {
      const res = await api.coaches.list();
      return res.data;
    },
  });
}

export function useMembershipPlansQuery() {
  return useQuery({
    queryKey: ['membership-plans'],
    queryFn: async () => {
      const res = await api.memberships.plans();
      return res.data;
    },
  });
}

export function useMyBookingsQuery(token?: string) {
  return useQuery({
    queryKey: ['my-bookings', token],
    queryFn: async () => {
      if (!token) return [];
      const res = await api.bookings.list(token);
      return res.data;
    },
    enabled: Boolean(token),
  });
}

export function useBookClassMutation(token?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { classSessionId: string; classDate: string }) => {
      if (!token) throw new Error('Authentication required to book a session');
      return api.bookings.create(token, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });
}

export function useCancelBookingMutation(token?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId: string) => {
      if (!token) throw new Error('Authentication required');
      return api.bookings.cancel(token, bookingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });
}
