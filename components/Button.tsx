import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {

    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-brand-red text-white hover:bg-brand-red/90 hover:scale-[1.02] shadow-lg',
      secondary: 'bg-brand-navy text-white hover:bg-brand-navy/90 hover:scale-[1.02]',
      outline: 'border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white',
      ghost: 'text-neutral-600 hover:text-brand-navy hover:bg-neutral-100',
    };

    const sizes = {
      sm: 'px-5 py-2.5 text-sm',
      md: 'px-7 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;