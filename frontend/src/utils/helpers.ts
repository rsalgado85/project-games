import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes safely
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format a game rating to a fixed decimal
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

/**
 * Format a release date from ISO string
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return 'TBA'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format a number with K/M abbreviation
 */
export function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toString()
}

/**
 * Get a rating color class based on score
 */
export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return 'text-emerald-400'
  if (rating >= 4.0) return 'text-green-400'
  if (rating >= 3.0) return 'text-yellow-400'
  if (rating >= 2.0) return 'text-orange-400'
  return 'text-red-400'
}

/**
 * Get Metacritic score color
 */
export function getMetacriticColor(score: number | null): string {
  if (!score) return 'bg-surface text-muted'
  if (score >= 75) return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
  if (score >= 50) return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
  return 'bg-red-500/20 text-red-400 border border-red-500/30'
}

/**
 * Truncate a string to a max length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength).trimEnd()}…`
}

/**
 * Strip HTML tags from a string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

/**
 * Build an optimized image URL (add resizing params for RAWG images)
 */
export function getOptimizedImageUrl(
  url: string | null,
  width = 640,
): string {
  if (!url) return '/placeholder-game.svg'
  // Snap to nearest RAWG CDN-supported resize width: 200, 420, 640
  const safeWidth = width <= 200 ? 200 : width <= 420 ? 420 : 640
  // RAWG supports media.rawg.io/media/resize/{w}/-/{path}
  if (url.includes('media.rawg.io')) {
    return url.replace('/media/', `/media/resize/${safeWidth}/-/`)
  }
  return url
}

/**
 * Debounce utility
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Get platform icon slug for display
 */
export function getPlatformIcon(slug: string): string {
  const map: Record<string, string> = {
    pc: '🖥️',
    playstation5: '🎮',
    playstation4: '🎮',
    'xbox-series-x': '🎮',
    'xbox-one': '🎮',
    nintendo: '🕹️',
    ios: '📱',
    android: '📱',
    linux: '🐧',
    macos: '🍎',
  }
  return map[slug] ?? '🎮'
}

/**
 * Generate a URL-safe slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Check if a URL is an external link
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}
