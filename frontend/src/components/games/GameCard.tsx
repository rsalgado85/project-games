import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, GitCompare, Star, Calendar, ChevronRight } from 'lucide-react'
import { useAppStore } from '@/store'
import { Badge } from '@/components/ui/Badge'
import { cn, formatDate, getRatingColor, getOptimizedImageUrl, truncate, getPlatformIcon } from '@/utils/helpers'
import type { Game } from '@/types'
import toast from 'react-hot-toast'

interface GameCardProps {
  game: Game
  variant?: 'default' | 'featured' | 'horizontal'
  showCompare?: boolean
  index?: number
}

export function GameCard({ game, variant = 'default', showCompare = true, index = 0 }: GameCardProps) {
  const [imgError, setImgError] = useState(false)
  const language = useAppStore((s) => s.language)
  const isEs = language === 'es'
  const favored = useAppStore((s) => s.favorites.some((f) => f.id === game.id))
  const addFavorite = useAppStore((s) => s.addFavorite)
  const removeFavorite = useAppStore((s) => s.removeFavorite)
  const inCompare = useAppStore((s) => s.compareSlots.some((slot) => slot?.id === game.id))
  const addToCompare = useAppStore((s) => s.addToCompare)
  const removeFromCompare = useAppStore((s) => s.removeFromCompare)
  const imageUrl = getOptimizedImageUrl(imgError ? null : game.background_image, variant === 'featured' ? 1280 : 640)
  const platforms = (game.platforms ?? [])
    .filter((item): item is NonNullable<typeof item> => Boolean(item?.platform))
    .slice(0, 4)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (favored) {
      removeFavorite(game.id)
      toast.success(isEs ? 'Eliminado de favoritos' : 'Removed from favorites')
    } else {
      addFavorite(game)
      toast.success(isEs ? 'Agregado a favoritos' : 'Added to favorites')
    }
  }

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCompare) {
      removeFromCompare(game.id)
    } else {
      const success = addToCompare(game)
      if (!success) {
        toast.error(isEs ? 'El comparador esta lleno. Quita un juego primero.' : 'Comparator is full. Remove a game first.')
      } else {
        toast.success(isEs ? 'Agregado al comparador' : 'Added to comparator')
      }
    }
  }

  if (variant === 'horizontal') {
    return (
      <article>
        <Link
          to={`/games/${game.id}`}
          className="group flex gap-4 rounded-[var(--theme-card-radius)] border border-border-subtle bg-surface-2 p-[calc(var(--theme-card-padding)*0.85)] hover:border-border-strong hover:bg-surface-3 transition-all duration-200"
        >
          <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-surface-3">
            <img
              src={imageUrl}
              alt={game.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError((current) => (current ? current : true))}
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1 py-1">
            <h3 className="font-semibold text-text-primary truncate group-hover:text-accent transition-colors">
              {game.name}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-text-muted">
              <Star size={11} className="text-yellow-400 fill-yellow-400" />
              <span className={cn('font-medium', getRatingColor(game.rating))}>{game.rating.toFixed(1)}</span>
              {game.released && (
                <>
                  <span>·</span>
                  <span>{formatDate(game.released)}</span>
                </>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(game.genres ?? []).filter((g): g is NonNullable<typeof g> => Boolean(g)).slice(0, 2).map((g) => (
                <Badge key={g.id} size="sm">{g.name}</Badge>
              ))}
            </div>
          </div>
          <ChevronRight size={16} className="self-center text-text-muted shrink-0 group-hover:text-accent transition-colors" />
        </Link>
      </article>
    )
  }

  return (
    <article className="group relative">
      <Link
        to={`/games/${game.id}`}
        className={cn(
          'block overflow-hidden rounded-[var(--theme-card-radius)] border border-border-subtle bg-surface-2 transition-all duration-300',
          'hover:border-border-strong hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40',
          variant === 'featured' && 'ring-1 ring-accent/30',
        )}
      >
        {/* Image */}
        <div className={cn(
          'relative overflow-hidden bg-surface-3',
          variant === 'featured' ? 'aspect-[16/9]' : 'aspect-[16/10]',
        )}>
          <img
            src={imageUrl}
            alt={game.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleFavorite}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition-all',
                favored
                  ? 'bg-red-500/90 text-text-inverse'
                  : 'bg-black/50 text-text-inverse hover:bg-red-500/80',
              )}
              aria-label={favored ? (isEs ? 'Quitar de favoritos' : 'Remove from favorites') : (isEs ? 'Agregar a favoritos' : 'Add to favorites')}
            >
              <Heart size={14} className={favored ? 'fill-current' : ''} />
            </button>
            {showCompare && (
              <button
                onClick={handleCompare}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition-all',
                  inCompare
                    ? 'bg-accent/90 text-text-inverse'
                    : 'bg-black/50 text-text-inverse hover:bg-accent/70',
                )}
                aria-label={inCompare ? (isEs ? 'Quitar de comparar' : 'Remove from compare') : (isEs ? 'Agregar a comparar' : 'Add to compare')}
              >
                <GitCompare size={14} />
              </button>
            )}
          </div>

          {/* Metacritic Badge */}
          {game.metacritic && (
            <div className="absolute bottom-3 left-3">
              <span className={cn(
                'rounded-lg px-2 py-0.5 text-xs font-bold',
                game.metacritic >= 75
                  ? 'bg-emerald-500/90 text-text-inverse'
                  : game.metacritic >= 50
                    ? 'bg-yellow-500/90 text-black'
                    : 'bg-red-500/90 text-text-inverse',
              )}>
                {game.metacritic}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-[var(--theme-card-padding)]">
          <h3 className="font-semibold text-text-primary leading-tight group-hover:text-accent transition-colors">
            {truncate(game.name, 40)}
          </h3>

          {/* Rating Row */}
          <div className="mt-2 flex items-center gap-3 text-xs text-text-muted">
            <div className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className={cn('font-semibold tabular-nums', getRatingColor(game.rating))}>
                {game.rating.toFixed(1)}
              </span>
            </div>
            {game.released && (
              <div className="flex items-center gap-1">
                <Calendar size={11} />
                <span>{formatDate(game.released)}</span>
              </div>
            )}
          </div>

          {/* Genres */}
          {game.genres && game.genres.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {game.genres.filter((genre): genre is NonNullable<typeof genre> => Boolean(genre)).slice(0, 3).map((genre) => (
                <Badge key={genre.id} size="sm">{genre.name}</Badge>
              ))}
            </div>
          )}

          {/* Platforms */}
          {platforms.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {platforms.map(({ platform }) => (
                <Badge key={platform.id} size="sm" variant="outline" className="gap-1">
                  <span aria-hidden="true">{getPlatformEmoji(platform.slug)}</span>
                  <span>{getPlatformLabel(platform.name)}</span>
                </Badge>
              ))}
              {(game.platforms?.length ?? 0) > platforms.length && (
                <Badge size="sm" variant="outline">+{(game.platforms?.length ?? 0) - platforms.length}</Badge>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}

function getPlatformEmoji(slug: string): string {
  if (slug.includes('playstation')) return '🎮'
  if (slug.includes('xbox')) return '🎮'
  if (slug === 'pc') return '🖥️'
  if (slug.includes('nintendo')) return '🕹️'
  if (slug === 'ios' || slug === 'android') return '📱'
  if (slug === 'linux') return '🐧'
  if (slug === 'macos') return '🍎'
  return '🎮'
}

function getPlatformLabel(name: string): string {
  if (name === 'PlayStation 5') return 'PS5'
  if (name === 'PlayStation 4') return 'PS4'
  if (name === 'Xbox Series S/X') return 'Xbox'
  if (name === 'Xbox One') return 'Xbox One'
  if (name === 'Nintendo Switch') return 'Switch'
  if (name === 'PC') return 'PC'
  if (name === 'iOS') return 'iOS'
  if (name === 'Android') return 'Android'
  if (name === 'macOS') return 'Mac'
  if (name === 'Linux') return 'Linux'
  return name
}
