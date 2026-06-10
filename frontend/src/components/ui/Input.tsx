import { forwardRef } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/helpers'

// ── Input ─────────────────────────────────────────────────────
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'h-11 w-full rounded-xl border border-border-subtle bg-surface-2 px-4 text-sm text-text-primary',
              'placeholder:text-text-muted',
              'transition-all duration-200',
              'focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              icon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500/50 focus:border-red-500/80 focus:ring-red-500/20',
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-text-muted">
            {hint}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

// ── Textarea ─────────────────────────────────────────────────
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-xl border border-border-subtle bg-surface-2 px-4 py-3 text-sm text-text-primary',
            'placeholder:text-text-muted resize-none',
            'transition-all duration-200',
            'focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500/50 focus:border-red-500/80 focus:ring-red-500/20',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-text-muted">{hint}</p>
        )}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

// ── Select ───────────────────────────────────────────────────
interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  className?: string
  id?: string
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select…',
  error,
  className,
  id,
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'h-11 w-full rounded-xl border border-border-subtle bg-surface-2 px-4 text-sm text-text-primary',
          'cursor-pointer appearance-none',
          'transition-all duration-200',
          'focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20',
          error && 'border-red-500/50',
          className,
        )}
        aria-invalid={!!error}
      >
        <option value="" className="bg-surface-2">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface-2">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
