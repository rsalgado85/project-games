import { AlertTriangle, RefreshCw } from 'lucide-react'
import { useAppStore } from '@/store'
import { Button } from './Button'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title,
  message,
  onRetry,
}: ErrorStateProps) {
  const language = useAppStore((s) => s.language)
  const isEs = language === 'es'
  const resolvedTitle = title ?? (isEs ? 'Algo salio mal' : 'Something went wrong')
  const resolvedMessage = message ?? (isEs ? 'No se pudieron cargar los datos. Intenta nuevamente.' : 'Failed to load data. Please try again.')

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center" role="alert">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
        <AlertTriangle className="h-7 w-7 text-red-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">{resolvedTitle}</h3>
      <p className="mb-6 max-w-sm text-sm text-text-muted">{resolvedMessage}</p>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw size={14} />}
        >
          {isEs ? 'Reintentar' : 'Try Again'}
        </Button>
      )}
    </div>
  )
}

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {icon && (
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-glass border border-border-subtle text-text-muted">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm text-text-muted">{description}</p>
      )}
      {action}
    </div>
  )
}
