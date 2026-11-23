'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { registerSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
};

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    const validation = registerSchema.safeParse(data);
    if (!validation.success) {
      setServerError(validation.error.issues[0].message);
      return;
    }

    setLoading(true);
    setServerError(null);

    try {
      await api.auth.register(data);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login?registered=true');
      }, 1500);
    } catch (err: any) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
        <h3 className="text-lg font-bold text-white">Account Created!</h3>
        <p className="text-xs text-slate-300 mt-1">
          Redirecting to sign in with your new credentials...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs uppercase font-bold text-slate-300 mb-1.5">
            First Name
          </label>
          <Input
            type="text"
            placeholder="Alex"
            {...register('firstName', { required: 'First name is required' })}
            error={errors.firstName?.message}
          />
        </div>
        <div>
          <label className="block text-xs uppercase font-bold text-slate-300 mb-1.5">
            Last Name
          </label>
          <Input
            type="text"
            placeholder="Morgan"
            {...register('lastName', { required: 'Last name is required' })}
            error={errors.lastName?.message}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase font-bold text-slate-300 mb-1.5">
          Email Address
        </label>
        <Input
          type="email"
          placeholder="you@example.com"
          {...register('email', { required: 'Email address is required' })}
          error={errors.email?.message}
        />
      </div>

      <div>
        <label className="block text-xs uppercase font-bold text-slate-300 mb-1.5">
          Password (8+ chars)
        </label>
        <Input
          type="password"
          placeholder="••••••••"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Minimum 8 characters' },
          })}
          error={errors.password?.message}
        />
      </div>

      <div>
        <label className="block text-xs uppercase font-bold text-slate-300 mb-1.5">
          Phone Number (Optional)
        </label>
        <Input
          type="tel"
          placeholder="+44 7700 900123"
          {...register('phone')}
        />
      </div>

      <Button
        type="submit"
        variant="accent"
        loading={loading}
        className="w-full mt-2"
      >
        Create Free Member Account
      </Button>
    </form>
  );
}
