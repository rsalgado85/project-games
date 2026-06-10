import { cn } from '@/utils/helpers'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-surface-glass',
        className,
      )}
      aria-hidden="true"
    />
  )
}

export function GameCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-surface-2 border border-border-subtle">
      <Skeleton className="aspect-[16/9] rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function GameGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function GameDetailSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-[50vh] w-full rounded-3xl" />
      <div className="max-w-4xl mx-auto space-y-6 px-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <div className="flex gap-3">
          {Array.from({ length: 3 }, (_, i) => <Skeleton key={i} className="h-8 w-24 rounded-full" />)}
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="absolute bottom-16 left-16 space-y-4 w-1/2">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-12 w-36 rounded-xl" />
          <Skeleton className="h-12 w-36 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
