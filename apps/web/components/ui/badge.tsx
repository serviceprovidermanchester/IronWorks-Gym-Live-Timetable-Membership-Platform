import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'accent';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider transition-colors';

  const variants = {
    default: 'border-transparent bg-slate-800 text-slate-200',
    secondary: 'border-transparent bg-slate-700 text-slate-100',
    destructive: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
    outline: 'border-slate-700 text-slate-300',
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    warning: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    accent: 'border-accent/40 bg-accent/10 text-accent',
  };

  return <div className={cn(baseStyles, variants[variant], className)} {...props} />;
}

export { Badge };
