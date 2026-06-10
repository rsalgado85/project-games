import { LayoutGrid, WandSparkles, Wind, Gauge, Image, Sofa, Sparkles, RotateCcw } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/helpers'
import { useAppStore } from '@/store'
import { getThemeOptions } from '@/theme'

interface ThemeStudioProps {
  isOpen: boolean
  onClose: () => void
}

const sizeOptions = [
  { value: 'sm', label: 'Compacto', hint: 'Más tarjetas por fila' },
  { value: 'md', label: 'Equilibrado', hint: 'Balance ideal' },
  { value: 'lg', label: 'Hero', hint: 'Tarjetas más grandes' },
] as const

const densityOptions = [
  { value: 'compact', label: 'Densa' },
  { value: 'balanced', label: 'Normal' },
  { value: 'immersive', label: 'Inmersiva' },
] as const

const speedOptions = [
  { value: 'fast', label: 'Rápida' },
  { value: 'normal', label: 'Normal' },
  { value: 'slow', label: 'Cinemática' },
] as const

export function ThemeStudio({ isOpen, onClose }: ThemeStudioProps) {
  const experience = useAppStore((state) => state.experience)
  const setExperience = useAppStore((state) => state.setExperience)
  const cardSize = useAppStore((state) => state.cardSize)
  const setCardSize = useAppStore((state) => state.setCardSize)
  const density = useAppStore((state) => state.density)
  const setDensity = useAppStore((state) => state.setDensity)
  const animationSpeed = useAppStore((state) => state.animationSpeed)
  const setAnimationSpeed = useAppStore((state) => state.setAnimationSpeed)
  const dynamicBackground = useAppStore((state) => state.dynamicBackground)
  const setDynamicBackground = useAppStore((state) => state.setDynamicBackground)
  const compactMode = useAppStore((state) => state.compactMode)
  const setCompactMode = useAppStore((state) => state.setCompactMode)
  const immersiveMode = useAppStore((state) => state.immersiveMode)
  const setImmersiveMode = useAppStore((state) => state.setImmersiveMode)
  const premiumEffects = useAppStore((state) => state.premiumEffects)
  const setPremiumEffects = useAppStore((state) => state.setPremiumEffects)
  const resetVisualPreferences = useAppStore((state) => state.resetVisualPreferences)

  const themeOptions = getThemeOptions()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gaming Experience" size="xl">
      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.95fr]">
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-text-muted">Selector premium</p>
              <h3 className="mt-2 text-2xl font-bold text-text-primary">Gaming Experience</h3>
              <p className="mt-2 max-w-2xl text-sm text-text-muted">
                Cambia la personalidad visual de la interfaz sin recargar la aplicación. Cada preset ajusta color, tipografía, brillo ambiental y profundidad.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {themeOptions.map((option) => {
                const active = option.id === experience
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setExperience(option.id)}
                    className={cn(
                      'rounded-2xl border p-4 text-left transition-all duration-200',
                      active
                        ? 'border-accent bg-accent/10 shadow-lg shadow-accent/10'
                        : 'border-border-subtle bg-surface-glass hover:border-border-strong hover:bg-surface-panel',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{option.label}</p>
                        <p className="mt-1 text-xs text-text-muted">{option.description}</p>
                      </div>
                      {active && <Badge variant="accent">Active</Badge>}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {option.idealFor.map((item) => (
                        <Badge key={item} variant="outline" size="sm">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-border-subtle bg-surface-glass p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-text-primary">
              <WandSparkles size={18} className="text-accent" />
              <h4 className="font-semibold">Ajustes visuales</h4>
            </div>

            <div className="space-y-4">
              <ControlGroup
                title="Tamaño de tarjetas"
                value={cardSize}
                onChange={setCardSize}
                options={sizeOptions}
                icon={<LayoutGrid size={16} />}
              />
              <ControlGroup
                title="Densidad de información"
                value={density}
                onChange={setDensity}
                options={densityOptions}
                icon={<Gauge size={16} />}
              />
              <ControlGroup
                title="Velocidad de animaciones"
                value={animationSpeed}
                onChange={setAnimationSpeed}
                options={speedOptions}
                icon={<Wind size={16} />}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ToggleCard
                title="Fondo dinámico"
                description="Activa halos y capas ambientales"
                icon={<Image size={16} />}
                checked={dynamicBackground}
                onChange={setDynamicBackground}
              />
              <ToggleCard
                title="Modo compacto"
                description="Reduce espacios para explorar más contenido"
                icon={<Sofa size={16} />}
                checked={compactMode}
                onChange={setCompactMode}
              />
              <ToggleCard
                title="Modo inmersivo"
                description="Eleva la presencia visual del layout"
                icon={<Sparkles size={16} />}
                checked={immersiveMode}
                onChange={setImmersiveMode}
              />
              <ToggleCard
                title="Efectos premium"
                description="Conserva microinteracciones y glow"
                icon={<Wind size={16} />}
                checked={premiumEffects}
                onChange={setPremiumEffects}
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Button variant="secondary" size="sm" onClick={resetVisualPreferences} icon={<RotateCcw size={14} />}>
                Reset
              </Button>
              <Button variant="primary" size="sm" onClick={onClose}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

function ControlGroup<T extends string>({
  title,
  value,
  onChange,
  options,
  icon,
}: {
  title: string
  value: T
  onChange: (value: T) => void
  options: readonly { value: T; label: string; hint?: string }[]
  icon: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-text-primary">
        <span className="text-accent">{icon}</span>
        {title}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const active = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                'rounded-xl border px-3 py-2 text-left transition-all',
                active
                  ? 'border-accent bg-accent/12 text-text-primary'
                  : 'border-border-subtle bg-bg-primary/60 text-text-secondary hover:border-border-strong hover:text-text-primary',
              )}
            >
              <div className="text-sm font-medium">{option.label}</div>
              {option.hint && <div className="mt-0.5 text-xs text-text-muted">{option.hint}</div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ToggleCard({
  title,
  description,
  icon,
  checked,
  onChange,
}: {
  title: string
  description: string
  icon: React.ReactNode
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        'rounded-2xl border p-4 text-left transition-all',
        checked
          ? 'border-accent bg-accent/10'
          : 'border-border-subtle bg-bg-primary/50 hover:border-border-strong',
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('mt-0.5 rounded-lg p-2', checked ? 'bg-accent/20 text-accent' : 'bg-white/5 text-text-muted')}>
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-text-primary">{title}</div>
          <div className="mt-1 text-xs text-text-muted">{description}</div>
        </div>
      </div>
    </button>
  )
}
