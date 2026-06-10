import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/helpers'

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'outline'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-glass text-text-secondary',
  accent: 'bg-accent/20 text-accent border border-accent/30',
  success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
  outline: 'border border-border-subtle text-text-secondary',
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export function Badge({ variant = 'default', size = 'sm', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
