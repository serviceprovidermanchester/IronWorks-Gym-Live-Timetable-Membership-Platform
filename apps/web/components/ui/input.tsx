import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
            error && 'border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-rose-400 font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
