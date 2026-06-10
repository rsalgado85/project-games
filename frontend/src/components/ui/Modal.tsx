import type { ReactNode } from 'react'
import { useScrollLock } from '@/hooks/useUI'
import { X } from 'lucide-react'
import { cn } from '@/utils/helpers'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
  full: 'max-w-[90vw]',
}

export function Modal({ isOpen, onClose, title, children, size = 'md', className }: ModalProps) {
  useScrollLock(isOpen)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal backdrop"
      />

      <div
        className={cn(
          'relative w-full rounded-2xl bg-surface-2 border border-border-subtle shadow-2xl shadow-black/50',
          sizeClasses[size],
          className,
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
            <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-text-muted hover:bg-surface-glass hover:text-text-primary transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-text-muted hover:bg-surface-glass hover:text-text-primary transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
