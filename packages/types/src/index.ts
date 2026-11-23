/**
 * IronWorks Gym — Shared TypeScript Types
 * Copyright (c) 2026 SPManchester Private Limited (Sayed Mudassar Akbar)
 * https://www.spmanchester.com · info@spmanchester.com
 */

export type MembershipTier = 'STANDARD' | 'UNLIMITED' | 'FOUNDING_MEMBER';

export type MembershipStatus =
  | 'ACTIVE'
  | 'PAST_DUE'
  | 'CANCELED'
  | 'EXPIRED'
  | 'INCOMPLETE';

export type PaymentProvider = 'STRIPE' | 'GOCARDLESS';

export type ClassCategory =
  | 'HIIT'
  | 'STRENGTH'
  | 'BOXING'
  | 'YOGA'
  | 'CARDIO'
  | 'RECOVERY';

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export type BookingStatus =
  | 'CONFIRMED'
  | 'WAITLISTED'
  | 'CANCELLED'
  | 'ATTENDED'
  | 'NO_SHOW';

export type PaymentStatus =
  | 'PENDING'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'REFUNDED';

export interface Member {
  id: string;
  memberRef: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  isAdmin: boolean;
  stripeCustomerId?: string | null;
  gocardlessCustomerId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Coach {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl?: string | null;
  instagram?: string | null;
  specialties: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClassSession {
  id: string;
  name: string;
  slug: string;
  category: ClassCategory;
  dayOfWeek: DayOfWeek;
  startTime: string; // HH:mm
  durationMins: number;
  capacity: number;
  bookedCount?: number;
  coachId: string;
  coach?: Coach;
  description: string;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  bookingRef: string;
  memberId: string;
  member?: Member;
  classSessionId: string;
  classSession?: ClassSession;
  status: BookingStatus;
  waitlistPosition?: number | null;
  checkInAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  slug: string;
  tier: MembershipTier;
  priceMonthly: number;
  setupFee: number;
  description: string;
  features: string[];
  isFeatured: boolean;
  stripePriceId?: string | null;
  gocardlessPlanId?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  id: string;
  memberId: string;
  planId: string;
  plan?: MembershipPlan;
  status: MembershipStatus;
  provider: PaymentProvider;
  subscriptionId?: string | null;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH';
  publishedAt: string;
  expiresAt?: string | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface AuthResponse {
  token: string;
  member: Member;
}
