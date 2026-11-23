/**
 * Shared Zod Validation Schemas
 * IronWorks Gym · SPManchester Private Limited
 */
import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const bookClassSchema = z.object({
  classSessionId: z.string().min(1, 'Class session ID is required'),
  classDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Class date must be YYYY-MM-DD'),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().optional(),
  emergencyContact: z.string().optional(),
});

export const checkoutSchema = z.object({
  tier: z.enum(['STANDARD', 'UNLIMITED', 'FOUNDING_MEMBER']),
});
