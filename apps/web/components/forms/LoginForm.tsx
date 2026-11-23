'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    // Validate with Zod
    const validation = loginSchema.safeParse(data);
    if (!validation.success) {
      setServerError(validation.error.issues[0].message);
      return;
    }

    setLoading(true);
    setServerError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setServerError('Invalid email or password. Please try again.');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div>
        <label className="block text-xs uppercase font-bold text-slate-300 mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <Input
            type="email"
            placeholder="you@example.com"
            {...register('email', { required: 'Email address is required' })}
            error={errors.email?.message}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs uppercase font-bold text-slate-300">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-accent hover:underline font-semibold"
          >
            Forgot?
          </Link>
        </div>
        <Input
          type="password"
          placeholder="••••••••"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message}
        />
      </div>

      <Button
        type="submit"
        variant="accent"
        loading={loading}
        className="w-full mt-2"
      >
        Sign In to Portal
      </Button>
    </form>
  );
}
