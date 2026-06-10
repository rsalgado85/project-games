import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/helpers'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glass?: boolean
  bordered?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  none: '',
  sm: 'p-[calc(var(--theme-card-padding)*0.78)]',
  md: 'p-[var(--theme-card-padding)]',
  lg: 'p-[calc(var(--theme-card-padding)*1.28)]',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, glass = false, bordered = false, padding = 'none', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl',
          glass
            ? 'bg-surface-glass backdrop-blur-xl border border-border-subtle'
            : 'bg-surface-2',
          bordered && !glass && 'border border-border-subtle',
          hover && 'transition-all duration-300 hover:border-border-strong hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30',
          paddingClasses[padding],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'

// Card sub-components
export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col space-y-1', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-lg font-semibold text-text-primary leading-tight', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('text-text-secondary', className)} {...props}>
      {children}
    </div>
  )
}
