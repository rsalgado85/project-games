import { useState } from 'react'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/utils/helpers'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Input'
import { PLATFORMS, GENRES, ORDERING_OPTIONS } from '@/services/gamesService'
import { useAppStore } from '@/store'
import type { GameFilters } from '@/types'

interface GameFiltersProps {
  filters: GameFilters
  onChange: (filters: GameFilters) => void
  onReset: () => void
}

export function GameFilters({ filters, onChange, onReset }: GameFiltersProps) {
  const [expanded, setExpanded] = useState(false)
  const language = useAppStore((s) => s.language)
  const isEs = language === 'es'

  const hasActiveFilters = !!(
    filters.platforms ||
    filters.genres ||
    filters.ordering ||
    filters.dates
  )

  const update = (partial: Partial<GameFilters>) => {
    onChange({ ...filters, ...partial, page: 1 })
  }

  const yearOptions = (() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 10 }, (_, i) => {
      const year = currentYear - i
      return { value: `${year}-01-01,${year}-12-31`, label: String(year) }
    })
  })()

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-2">
      {/* Toggle Row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-4 text-sm font-medium text-text-primary"
        aria-expanded={expanded}
        aria-controls="filters-panel"
      >
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal size={16} className="text-accent" />
          <span>{isEs ? 'Filtros' : 'Filters'}</span>
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-text-inverse">
              !
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={cn(
            'text-text-muted transition-transform duration-200',
            expanded && 'rotate-180',
          )}
        />
      </button>

      {/* Panel */}
      {expanded && (
        <div
          id="filters-panel"
          className="grid grid-cols-1 gap-4 border-t border-border-subtle px-5 pb-5 pt-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <Select
            label={isEs ? 'Plataforma' : 'Platform'}
            options={PLATFORMS.map((p) => ({ value: String(p.id), label: p.name }))}
            value={filters.platforms ?? ''}
            onChange={(v) => update({ platforms: v || undefined })}
            placeholder={isEs ? 'Todas las plataformas' : 'All Platforms'}
          />

          <Select
            label={isEs ? 'Genero' : 'Genre'}
            options={GENRES.map((g) => ({ value: g.slug, label: g.name }))}
            value={filters.genres ?? ''}
            onChange={(v) => update({ genres: v || undefined })}
            placeholder={isEs ? 'Todos los generos' : 'All Genres'}
          />

          <Select
            label={isEs ? 'Ordenar por' : 'Sort By'}
            options={ORDERING_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            value={filters.ordering ?? ''}
            onChange={(v) => update({ ordering: (v as GameFilters['ordering']) || undefined })}
            placeholder={isEs ? 'Predeterminado' : 'Default'}
          />

          <Select
            label={isEs ? 'Ano de lanzamiento' : 'Release Year'}
            options={yearOptions}
            value={filters.dates ?? ''}
            onChange={(v) => update({ dates: v || undefined })}
            placeholder={isEs ? 'Todos los anos' : 'All Years'}
          />

          {/* Reset */}
          {hasActiveFilters && (
            <div className="flex items-end sm:col-span-2 lg:col-span-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                icon={<X size={13} />}
                className="text-text-muted hover:text-red-400"
              >
                {isEs ? 'Limpiar filtros' : 'Clear Filters'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
