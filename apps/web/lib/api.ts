/**
 * API client — typed fetch wrapper + TanStack Query hooks
 * IronWorks Gym · SPManchester Private Limited
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/v1';

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { token?: string }
): Promise<T> {
  const { token, ...rest } = options ?? {};
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...rest,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error ?? `HTTP ${res.status}`);
  }
  return data as T;
}

// ── API helpers ─────────────────────────────────────────────

export const api = {
  classes: {
    list: (params?: { day?: string; category?: string }) => {
      const q = new URLSearchParams(params as Record<string, string>).toString();
      return apiFetch<{ success: boolean; data: any[] }>(`/classes${q ? `?${q}` : ''}`);
    },
    get: (id: string) => apiFetch<{ success: boolean; data: any }>(`/classes/${id}`),
    schedule: (id: string) => apiFetch<{ success: boolean; data: any }>(`/classes/${id}/schedule`),
  },
  coaches: {
    list: () => apiFetch<{ success: boolean; data: any[] }>('/coaches'),
    get: (slug: string) => apiFetch<{ success: boolean; data: any }>(`/coaches/${slug}`),
  },
  memberships: {
    plans: () => apiFetch<{ success: boolean; data: any[] }>('/memberships/plans'),
    checkout: (tier: string, token: string) =>
      apiFetch<{ success: boolean; data: { url: string } }>('/memberships/checkout', {
        method: 'POST', token, body: JSON.stringify({ tier }),
      }),
    cancel: (token: string) =>
      apiFetch('/memberships/cancel', { method: 'POST', token }),
  },
  bookings: {
    list: (token: string, status?: string) =>
      apiFetch<{ success: boolean; data: any[] }>(`/bookings${status ? `?status=${status}` : ''}`, { token }),
    create: (token: string, body: { classSessionId: string; classDate: string }) =>
      apiFetch('/bookings', { method: 'POST', token, body: JSON.stringify(body) }),
    cancel: (token: string, id: string) =>
      apiFetch(`/bookings/${id}`, { method: 'DELETE', token }),
  },
  auth: {
    register: (body: { email: string; password: string; firstName: string; lastName: string }) =>
      apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    login: (email: string, password: string) =>
      apiFetch<{ success: boolean; data: { accessToken: string; member: any } }>('/auth/login', {
        method: 'POST', body: JSON.stringify({ email, password }), credentials: 'include',
      }),
    me: (token: string) =>
      apiFetch<{ success: boolean; data: any }>('/auth/me', { token }),
    logout: (token: string) =>
      apiFetch('/auth/logout', { method: 'POST', token, credentials: 'include' }),
  },
};
