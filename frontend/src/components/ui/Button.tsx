import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ElementType } from 'react'
import { cn } from '@/utils/helpers'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType
  href?: string
  to?: string
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent-hover hover:shadow-accent/40 active:scale-[0.98]',
  secondary:
    'bg-surface-2 text-text-primary border border-border-subtle hover:bg-surface-3 hover:border-border-strong active:scale-[0.98]',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-surface-glass active:scale-[0.98]',
  danger:
    'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50 active:scale-[0.98]',
  outline:
    'border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent active:scale-[0.98]',
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'h-7 px-3 text-xs gap-1.5',
  sm: 'h-8 px-4 text-sm gap-2',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-base gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading
    const Component = (as ?? 'button') as ElementType
    const isButtonElement = Component === 'button'

    return (
      <Component
        ref={ref}
        disabled={isButtonElement ? isDisabled : undefined}
        aria-disabled={!isButtonElement ? isDisabled : undefined}
        tabIndex={!isButtonElement && isDisabled ? -1 : undefined}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
          isButtonElement && 'disabled:pointer-events-none disabled:opacity-50',
          !isButtonElement && isDisabled && 'pointer-events-none opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
            {children && <span>{children}</span>}
            {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
          </>
        )}
      </Component>
    )
  },
)

Button.displayName = 'Button'
