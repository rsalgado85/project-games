import axios from 'axios'
import { RAWG_BASE, RAWG_KEY } from './api'
import { cacheManager, CACHE_KEYS, CACHE_TTL } from '@/cache/cacheManager'
import type {
  Game,
  GameDetail,
  GameMovie,
  GamesResponse,
  GameFilters,
  ContactFormData,
  ContactResponse,
} from '@/types'

// ============================================================
// Raw RAWG fetcher — bypasses backend entirely
// RAWG has CORS enabled for browser requests by design.
// ============================================================
async function rawg<T>(path: string, params: Record<string, string | number | undefined> = {}): Promise<T> {
  const url = new URL(`${RAWG_BASE}${path}`)
  url.searchParams.set('key', RAWG_KEY)
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '' && v !== null) url.searchParams.set(k, String(v))
  }
  const res = await axios.get<T>(url.toString())
  return res.data
}

function normalizeGameDetail(payload: unknown): GameDetail | null {
  if (!payload || typeof payload !== 'object') return null
  const g = payload as Partial<GameDetail>
  if (typeof g.id === 'number') return g as GameDetail
  return null
}

// ============================================================
// Games Service — RAWG Direct (no backend required)
// All user state lives in localStorage/Zustand.
// Browser cacheManager (localStorage TTL) replaces server cache.
// ============================================================

export const gamesService = {
  async getTrending(page = 1): Promise<GamesResponse> {
    const cacheKey = `${CACHE_KEYS.TRENDING}:${page}`
    const cached = cacheManager.get<GamesResponse>(cacheKey)
    if (cached) return cached
    const data = await rawg<GamesResponse>('/games', { ordering: '-added', page, page_size: 20 })
    cacheManager.set(cacheKey, data, { ttl: CACHE_TTL.MEDIUM })
    return data
  },

  async getPopular(page = 1): Promise<GamesResponse> {
    const cacheKey = `${CACHE_KEYS.POPULAR}:${page}`
    const cached = cacheManager.get<GamesResponse>(cacheKey)
    if (cached) return cached
    const data = await rawg<GamesResponse>('/games', { ordering: '-rating', metacritic: '60,100', page, page_size: 20 })
    cacheManager.set(cacheKey, data, { ttl: CACHE_TTL.LONG })
    return data
  },

  async getTopRated(page = 1): Promise<GamesResponse> {
    const cacheKey = `${CACHE_KEYS.TOP_RATED}:${page}`
    const cached = cacheManager.get<GamesResponse>(cacheKey)
    if (cached) return cached
    const data = await rawg<GamesResponse>('/games', { ordering: '-metacritic', metacritic: '80,100', page, page_size: 20 })
    cacheManager.set(cacheKey, data, { ttl: CACHE_TTL.LONG })
    return data
  },

  async getUpcoming(page = 1): Promise<GamesResponse> {
    const cacheKey = `${CACHE_KEYS.UPCOMING}:${page}`
    const cached = cacheManager.get<GamesResponse>(cacheKey)
    if (cached) return cached
    const today = new Date().toISOString().split('T')[0]
    const nextYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const data = await rawg<GamesResponse>('/games', { dates: `${today},${nextYear}`, ordering: 'released', page, page_size: 20 })
    cacheManager.set(cacheKey, data, { ttl: CACHE_TTL.MEDIUM })
    return data
  },

  async searchGames(filters: GameFilters): Promise<GamesResponse> {
    const paramsStr = new URLSearchParams(
      Object.entries(filters)
        .filter(([, v]) => v !== undefined && v !== '')
        .map(([k, v]) => [k, String(v)]),
    ).toString()
    const cacheKey = CACHE_KEYS.SEARCH(paramsStr)
    const cached = cacheManager.get<GamesResponse>(cacheKey)
    if (cached) return cached
    const { q, page, page_size, platforms, genres, ordering, dates, tags, metacritic } = filters
    const data = await rawg<GamesResponse>('/games', {
      search: q, page, page_size, platforms, genres, ordering, dates, tags, metacritic,
    })
    cacheManager.set(cacheKey, data, { ttl: CACHE_TTL.SHORT })
    return data
  },

  async getGameDetail(id: number | string): Promise<GameDetail> {
    const cacheKey = CACHE_KEYS.GAME_DETAIL(id)
    const cached = cacheManager.get<GameDetail>(cacheKey)
    const normalizedCached = normalizeGameDetail(cached)
    if (normalizedCached) return normalizedCached
    if (cached) cacheManager.remove(cacheKey)

    // Fetch detail + screenshots in parallel — RAWG detail doesn't embed screenshots
    const [detail, screenshotsRes] = await Promise.all([
      rawg<GameDetail>(`/games/${id}`),
      rawg<{ results: GameDetail['screenshots'] }>(`/games/${id}/screenshots`),
    ])

    const normalized = normalizeGameDetail(detail)
    if (!normalized) throw new Error(`Invalid RAWG payload for id ${id}`)

    normalized.screenshots = screenshotsRes?.results ?? []
    cacheManager.set(cacheKey, normalized, { ttl: CACHE_TTL.LONG })
    return normalized
  },

  async compareGames(gameAId: number, gameBId: number): Promise<{ gameA: GameDetail; gameB: GameDetail }> {
    const [gameA, gameB] = await Promise.all([
      gamesService.getGameDetail(gameAId),
      gamesService.getGameDetail(gameBId),
    ])
    return { gameA, gameB }
  },

  async getGameMovies(id: number | string): Promise<GameMovie[]> {
    const cacheKey = CACHE_KEYS.GAME_MOVIES(id)
    const cached = cacheManager.get<GameMovie[]>(cacheKey)
    if (cached) return cached
    const data = await rawg<{ results?: GameMovie[] }>(`/games/${id}/movies`)
    const results = Array.isArray(data.results) ? data.results : []
    cacheManager.set(cacheKey, results, { ttl: CACHE_TTL.LONG })
    return results
  },
}

// ============================================================
// Contact Service — mailto fallback (no backend required)
// For a real form, integrate EmailJS or Formspree in Contact page.
// ============================================================

export const contactService = {
  async sendMessage(formData: ContactFormData): Promise<ContactResponse> {
    // Open native email client — zero backend dependency
    const subject = encodeURIComponent(formData.subject)
    const body = encodeURIComponent(`De: ${formData.name} <${formData.email}>\n\n${formData.message}`)
    window.location.href = `mailto:robinsonsalgado85@gmail.com?subject=${subject}&body=${body}`
    return { success: true, message: 'Opening email client…' }
  },
}

// ============================================================
// Platform / Genre helpers (static data for filters)
// ============================================================

export const PLATFORMS = [
  { id: 4, name: 'PC', slug: 'pc' },
  { id: 187, name: 'PlayStation 5', slug: 'playstation5' },
  { id: 18, name: 'PlayStation 4', slug: 'playstation4' },
  { id: 1, name: 'Xbox One', slug: 'xbox-one' },
  { id: 186, name: 'Xbox Series X', slug: 'xbox-series-x' },
  { id: 7, name: 'Nintendo Switch', slug: 'nintendo-switch' },
  { id: 3, name: 'iOS', slug: 'ios' },
  { id: 21, name: 'Android', slug: 'android' },
] as const

export const GENRES = [
  { id: 4, name: 'Action', slug: 'action' },
  { id: 3, name: 'Adventure', slug: 'adventure' },
  { id: 5, name: 'RPG', slug: 'role-playing-games-rpg' },
  { id: 2, name: 'Shooter', slug: 'shooter' },
  { id: 7, name: 'Puzzle', slug: 'puzzle' },
  { id: 11, name: 'Arcade', slug: 'arcade' },
  { id: 83, name: 'Platformer', slug: 'platformer' },
  { id: 1, name: 'Racing', slug: 'racing' },
  { id: 15, name: 'Sports', slug: 'sports' },
  { id: 6, name: 'Fighting', slug: 'fighting' },
  { id: 14, name: 'Simulation', slug: 'simulation' },
  { id: 10, name: 'Strategy', slug: 'strategy' },
] as const

export const ORDERING_OPTIONS = [
  { value: '-added', label: 'Most Added' },
  { value: '-rating', label: 'Highest Rated' },
  { value: '-metacritic', label: 'Best Metacritic' },
  { value: '-released', label: 'Newest' },
  { value: 'released', label: 'Oldest' },
  { value: 'name', label: 'Name A-Z' },
  { value: '-name', label: 'Name Z-A' },
] as const

// For use in filter components with proper typing
export type PlatformOption = (typeof PLATFORMS)[number]
export type GenreOption = (typeof GENRES)[number]
export type OrderingOption = (typeof ORDERING_OPTIONS)[number]

// Helper to get all games (favorites/history aware)
export async function fetchGamesById(ids: number[]): Promise<Game[]> {
  const results = await Promise.allSettled(
    ids.map((id) => gamesService.getGameDetail(id)),
  )
  return results
    .filter((r): r is PromiseFulfilledResult<GameDetail> => r.status === 'fulfilled')
    .map((r) => r.value)
}
