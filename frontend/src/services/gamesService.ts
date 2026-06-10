import api from './api'
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

type GameDetailEnvelope = { data?: GameDetail }

function normalizeGameDetail(payload: unknown): GameDetail | null {
  if (!payload || typeof payload !== 'object') return null

  const direct = payload as Partial<GameDetail>
  if (typeof direct.id === 'number') return direct as GameDetail

  const wrapped = (payload as GameDetailEnvelope).data
  if (wrapped && typeof wrapped === 'object' && typeof wrapped.id === 'number') {
    return wrapped
  }

  return null
}

// ============================================================
// Games Service
// Handles all communication with Laravel backend.
// RAWG API key is NEVER exposed — all calls go through Laravel.
// ============================================================

export const gamesService = {
  /**
   * Get trending games (L3 cache → backend L1)
   */
  async getTrending(page = 1): Promise<GamesResponse> {
    const cacheKey = `${CACHE_KEYS.TRENDING}:${page}`
    const cached = cacheManager.get<GamesResponse>(cacheKey)
    if (cached) return cached

    const { data } = await api.get<GamesResponse>('/games/trending', { params: { page } })
    cacheManager.set(cacheKey, data, { ttl: CACHE_TTL.MEDIUM })
    return data
  },

  /**
   * Get all-time popular games
   */
  async getPopular(page = 1): Promise<GamesResponse> {
    const cacheKey = `${CACHE_KEYS.POPULAR}:${page}`
    const cached = cacheManager.get<GamesResponse>(cacheKey)
    if (cached) return cached

    const { data } = await api.get<GamesResponse>('/games/popular', { params: { page } })
    cacheManager.set(cacheKey, data, { ttl: CACHE_TTL.LONG })
    return data
  },

  /**
   * Get top-rated games by Metacritic
   */
  async getTopRated(page = 1): Promise<GamesResponse> {
    const cacheKey = `${CACHE_KEYS.TOP_RATED}:${page}`
    const cached = cacheManager.get<GamesResponse>(cacheKey)
    if (cached) return cached

    const { data } = await api.get<GamesResponse>('/games/top-rated', { params: { page } })
    cacheManager.set(cacheKey, data, { ttl: CACHE_TTL.LONG })
    return data
  },

  /**
   * Get upcoming releases
   */
  async getUpcoming(page = 1): Promise<GamesResponse> {
    const cacheKey = `${CACHE_KEYS.UPCOMING}:${page}`
    const cached = cacheManager.get<GamesResponse>(cacheKey)
    if (cached) return cached

    const { data } = await api.get<GamesResponse>('/games/upcoming', { params: { page } })
    cacheManager.set(cacheKey, data, { ttl: CACHE_TTL.MEDIUM })
    return data
  },

  /**
   * Search games with filters
   */
  async searchGames(filters: GameFilters): Promise<GamesResponse> {
    const paramsStr = new URLSearchParams(
      Object.entries(filters)
        .filter(([, v]) => v !== undefined && v !== '')
        .map(([k, v]) => [k, String(v)]),
    ).toString()

    const cacheKey = CACHE_KEYS.SEARCH(paramsStr)
    const cached = cacheManager.get<GamesResponse>(cacheKey)
    if (cached) return cached

    const { data } = await api.get<GamesResponse>('/games/search', { params: filters })
    cacheManager.set(cacheKey, data, { ttl: CACHE_TTL.SHORT })
    return data
  },

  /**
   * Get a single game's full details
   */
  async getGameDetail(id: number | string): Promise<GameDetail> {
    const cacheKey = CACHE_KEYS.GAME_DETAIL(id)
    const cached = cacheManager.get<unknown>(cacheKey)
    const normalizedCached = normalizeGameDetail(cached)
    if (normalizedCached) {
      if (cached !== normalizedCached) {
        cacheManager.set(cacheKey, normalizedCached, { ttl: CACHE_TTL.LONG })
      }
      return normalizedCached
    }
    if (cached) cacheManager.remove(cacheKey)

    const { data } = await api.get<GameDetail | GameDetailEnvelope>(`/games/${id}`)
    const normalized = normalizeGameDetail(data)

    if (!normalized) {
      throw new Error(`Invalid game detail payload for id ${id}`)
    }

    cacheManager.set(cacheKey, normalized, { ttl: CACHE_TTL.LONG })
    return normalized
  },

  /**
   * Compare two games side by side
   */
  async compareGames(gameAId: number, gameBId: number): Promise<{ gameA: GameDetail; gameB: GameDetail }> {
    const { data } = await api.get<{ gameA: GameDetail; gameB: GameDetail }>('/games/compare', {
      params: { game_a: gameAId, game_b: gameBId },
    })
    return data
  },

  /**
   * Get trailers/movies for a game.
   */
  async getGameMovies(id: number | string): Promise<GameMovie[]> {
    const cacheKey = CACHE_KEYS.GAME_MOVIES(id)
    const cached = cacheManager.get<GameMovie[]>(cacheKey)
    if (cached) return cached

    const { data } = await api.get<{ results?: GameMovie[] }>(`/games/${id}/movies`)
    const results = Array.isArray(data.results) ? data.results : []
    cacheManager.set(cacheKey, results, { ttl: CACHE_TTL.LONG })
    return results
  },
}

// ============================================================
// Contact Service
// ============================================================

export const contactService = {
  async sendMessage(formData: ContactFormData): Promise<ContactResponse> {
    const { data } = await api.post<ContactResponse>('/contact', formData)
    return data
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
