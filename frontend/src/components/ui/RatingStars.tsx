import { Star } from 'lucide-react'
import { cn } from '@/utils/helpers'

interface RatingStarsProps {
  rating: number
  maxRating?: number
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 12,
  md: 16,
  lg: 20,
}

export function RatingStars({
  rating,
  maxRating = 5,
  showValue = true,
  size = 'sm',
  className,
}: RatingStarsProps) {
  const starSize = sizeMap[size]
  const filled = Math.round(rating)

  return (
    <div className={cn('flex items-center gap-1', className)} aria-label={`Rating: ${rating} out of ${maxRating}`}>
      <div className="flex gap-0.5">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            size={starSize}
            className={cn(
              i < filled
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-border-subtle text-border-subtle',
              'transition-colors',
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-text-secondary tabular-nums">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

// ── Circular Progress Rating ──────────────────────────────────
interface CircleRatingProps {
  score: number
  maxScore?: number
  size?: number
  className?: string
}

export function CircleRating({ score, maxScore = 100, size = 48, className }: CircleRatingProps) {
  const radius = (size - 6) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / maxScore) * circumference
  const offset = circumference - progress

  const color =
    score >= 75 ? '#34d399' : score >= 50 ? '#facc15' : '#f87171'

  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={maxScore}
      aria-label={`Score: ${score}`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border-subtle)"
          strokeWidth={4}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute text-[10px] font-bold tabular-nums"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  )
}
