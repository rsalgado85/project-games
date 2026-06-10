import type { CacheEntry, CacheConfig } from '@/types'

// ============================================================
// CacheManager — 3-Level Browser Cache Utility
//
// Level 3: localStorage (persistent, configurable TTL)
//
// Usage:
//   cacheManager.set('games:trending', data, { ttl: 30 * 60 * 1000 })
//   const cached = cacheManager.get<Game[]>('games:trending')
// ============================================================

const DEFAULT_TTL = 30 * 60 * 1000 // 30 minutes
// v2: bumped when cache shape changed (removed Laravel backend envelope)
// Old gv: entries in localStorage are silently ignored — no migration needed.
const DEFAULT_PREFIX = 'gv2:'

class CacheManager {
  private prefix: string

  constructor(prefix = DEFAULT_PREFIX) {
    this.prefix = prefix
  }

  private buildKey(key: string): string {
    return `${this.prefix}${key}`
  }

  /**
   * Store a value in localStorage with expiry
   */
  set<T>(key: string, data: T, config: Partial<CacheConfig> = {}): void {
    const ttl = config.ttl ?? DEFAULT_TTL
    const now = Date.now()

    const entry: CacheEntry<T> = {
      data,
      expiresAt: now + ttl,
      createdAt: now,
    }

    try {
      localStorage.setItem(this.buildKey(key), JSON.stringify(entry))
    } catch (_error) {
      // Storage quota exceeded — silently fail (cache is optional)
      console.warn('[CacheManager] localStorage write failed:', key)
    }
  }

  /**
   * Retrieve a value from localStorage if not expired
   * Returns null if missing or expired
   */
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(this.buildKey(key))
      if (!raw) return null

      const entry = JSON.parse(raw) as CacheEntry<T>

      if (this.isExpired(entry)) {
        this.remove(key)
        return null
      }

      return entry.data
    } catch (_error) {
      return null
    }
  }

  /**
   * Check if a cache entry has expired
   */
  isExpired<T>(entry: CacheEntry<T>): boolean {
    return Date.now() > entry.expiresAt
  }

  /**
   * Check if a key exists and is still valid
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * Get the remaining TTL in milliseconds for a cached key
   */
  getRemainingTtl(key: string): number {
    try {
      const raw = localStorage.getItem(this.buildKey(key))
      if (!raw) return 0

      const entry = JSON.parse(raw) as CacheEntry<unknown>
      const remaining = entry.expiresAt - Date.now()
      return Math.max(0, remaining)
    } catch (_error) {
      return 0
    }
  }

  /**
   * Remove a specific key from cache
   */
  remove(key: string): void {
    localStorage.removeItem(this.buildKey(key))
  }

  /**
   * Clear all GameVault cache entries (preserves other localStorage data)
   */
  clear(): void {
    const keysToRemove: string[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k?.startsWith(this.prefix)) {
        keysToRemove.push(k)
      }
    }

    keysToRemove.forEach((k) => localStorage.removeItem(k))
  }

  /**
   * Clear all expired entries (garbage collection)
   */
  clearExpired(): void {
    const keysToRemove: string[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (!k?.startsWith(this.prefix)) continue

      try {
        const raw = localStorage.getItem(k)
        if (!raw) continue

        const entry = JSON.parse(raw) as CacheEntry<unknown>
        if (this.isExpired(entry)) {
          keysToRemove.push(k)
        }
      } catch (_error) {
        keysToRemove.push(k ?? '')
      }
    }

    keysToRemove.forEach((k) => localStorage.removeItem(k))
  }

  /**
   * Get cache stats (useful for debugging)
   */
  getStats(): { total: number; expired: number; valid: number; sizeKb: number } {
    let total = 0
    let expired = 0
    let sizeBytes = 0

    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (!k?.startsWith(this.prefix)) continue

      total++
      const raw = localStorage.getItem(k) ?? ''
      sizeBytes += raw.length

      try {
        const entry = JSON.parse(raw) as CacheEntry<unknown>
        if (this.isExpired(entry)) expired++
      } catch (_e) {
        expired++
      }
    }

    return {
      total,
      expired,
      valid: total - expired,
      sizeKb: Math.round(sizeBytes / 1024),
    }
  }
}

// ============================================================
// Singleton instance — use this throughout the app
// ============================================================
export const cacheManager = new CacheManager()

// ============================================================
// Cache key constants (avoid magic strings)
// ============================================================
export const CACHE_KEYS = {
  TRENDING: 'games:trending',
  POPULAR: 'games:popular',
  TOP_RATED: 'games:top-rated',
  UPCOMING: 'games:upcoming',
  GAME_DETAIL: (id: number | string) => `game:${id}`,
  GAME_MOVIES: (id: number | string) => `game:${id}:movies`,
  SEARCH: (params: string) => `search:${params}`,
  FAVORITES: 'user:favorites',
  HISTORY: 'user:history',
  THEME: 'ui:theme',
} as const

// ============================================================
// TTL presets (milliseconds)
// ============================================================
export const CACHE_TTL = {
  SHORT: 5 * 60 * 1000,     // 5 minutes
  MEDIUM: 30 * 60 * 1000,   // 30 minutes
  LONG: 6 * 60 * 60 * 1000, // 6 hours
  DAY: 24 * 60 * 60 * 1000, // 24 hours
  PERMANENT: Infinity,
} as const
