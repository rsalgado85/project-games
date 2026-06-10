import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GameCard } from './GameCard'
import { GameCardSkeleton } from '@/components/ui/Skeleton'
import type { Game } from '@/types'

interface GameCarouselProps {
  games: Game[]
  isLoading?: boolean
  title?: string
  subtitle?: string
}

export function GameCarousel({ games, isLoading = false, title, subtitle }: GameCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section aria-label={title ?? 'Game carousel'}>
      {(title ?? subtitle) && (
        <div className="mb-6 flex items-end justify-between">
          <div>
            {title && (
              <h2 className="text-xl font-bold text-text-primary sm:text-2xl">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle text-text-muted hover:border-border-strong hover:text-text-primary transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle text-text-muted hover:border-border-strong hover:text-text-primary transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex gap-[var(--theme-section-gap)] overflow-x-auto pb-2 scrollbar-none"
        style={{ scrollSnapType: 'x mandatory' }}
        role="list"
      >
        {isLoading
          ? Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="w-72 flex-shrink-0" role="listitem">
                <GameCardSkeleton />
              </div>
            ))
          : games.map((game, i) => (
              <div
                key={game.id}
                className="w-72 flex-shrink-0"
                style={{ scrollSnapAlign: 'start' }}
                role="listitem"
              >
                <GameCard game={game} index={i} />
              </div>
            ))}
      </div>
    </section>
  )
}
