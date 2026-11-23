import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'accent';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer';

    const variants = {
      default: 'bg-accent text-slate-950 hover:bg-accent-light shadow-md shadow-accent/10 active:scale-[0.98]',
      accent: 'bg-accent text-slate-950 hover:bg-accent-light shadow-lg shadow-accent/20 active:scale-[0.98]',
      destructive: 'bg-rose-500 text-white hover:bg-rose-600 active:scale-[0.98]',
      outline: 'border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800 hover:text-white',
      secondary: 'bg-slate-800 text-slate-200 hover:bg-slate-700 active:scale-[0.98]',
      ghost: 'hover:bg-slate-800 hover:text-white text-slate-300',
    };

    const sizes = {
      default: 'h-11 px-5 py-2.5',
      sm: 'h-9 rounded-lg px-3.5 text-xs',
      lg: 'h-12 rounded-2xl px-8 text-base',
      icon: 'h-10 w-10 p-0',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
