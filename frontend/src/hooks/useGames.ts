import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import { gamesService } from '@/services/gamesService'
import type { Game, GameDetail, GameMovie, GamesResponse, GameFilters } from '@/types'

const STALE_TIME = 5 * 60 * 1000   // 5 minutes
const GC_TIME = 10 * 60 * 1000     // 10 minutes

// ── Query Keys ───────────────────────────────────────────────
export const gameKeys = {
  all: ['games'] as const,
  trending: (page: number) => ['games', 'trending', page] as const,
  popular: (page: number) => ['games', 'popular', page] as const,
  topRated: (page: number) => ['games', 'top-rated', page] as const,
  upcoming: (page: number) => ['games', 'upcoming', page] as const,
  search: (filters: GameFilters) => ['games', 'search', filters] as const,
  detail: (id: number | string) => ['games', 'detail', id] as const,
  movies: (id: number | string) => ['games', 'movies', id] as const,
  compare: (aId: number, bId: number) => ['games', 'compare', aId, bId] as const,
}

// ── Trending ─────────────────────────────────────────────────
export function useTrendingGames(page = 1, options?: Partial<UseQueryOptions<GamesResponse>>) {
  return useQuery({
    queryKey: gameKeys.trending(page),
    queryFn: () => gamesService.getTrending(page),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    ...options,
  })
}

// ── Popular ──────────────────────────────────────────────────
export function usePopularGames(page = 1, options?: Partial<UseQueryOptions<GamesResponse>>) {
  return useQuery({
    queryKey: gameKeys.popular(page),
    queryFn: () => gamesService.getPopular(page),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    ...options,
  })
}

// ── Top Rated ─────────────────────────────────────────────────
export function useTopRatedGames(page = 1, options?: Partial<UseQueryOptions<GamesResponse>>) {
  return useQuery({
    queryKey: gameKeys.topRated(page),
    queryFn: () => gamesService.getTopRated(page),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    ...options,
  })
}

// ── Upcoming ─────────────────────────────────────────────────
export function useUpcomingGames(page = 1, options?: Partial<UseQueryOptions<GamesResponse>>) {
  return useQuery({
    queryKey: gameKeys.upcoming(page),
    queryFn: () => gamesService.getUpcoming(page),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    ...options,
  })
}

// ── Game Detail ──────────────────────────────────────────────
export function useGameDetail(
  id: number | string,
  options?: Partial<UseQueryOptions<GameDetail>>,
) {
  return useQuery({
    queryKey: gameKeys.detail(id),
    queryFn: () => gamesService.getGameDetail(id),
    staleTime: STALE_TIME * 6,
    gcTime: GC_TIME * 6,
    enabled: !!id,
    ...options,
  })
}

// ── Game Movies ──────────────────────────────────────────────
export function useGameMovies(
  id: number | string,
  options?: Partial<UseQueryOptions<GameMovie[]>>,
) {
  return useQuery({
    queryKey: gameKeys.movies(id),
    queryFn: () => gamesService.getGameMovies(id),
    staleTime: STALE_TIME * 6,
    gcTime: GC_TIME * 6,
    enabled: !!id,
    ...options,
  })
}

// ── Search (infinite) ─────────────────────────────────────────
export function useInfiniteGames(filters: GameFilters) {
  return useInfiniteQuery<GamesResponse, Error, { pages: GamesResponse[] }, ReturnType<typeof gameKeys.search>, number>({
    queryKey: gameKeys.search(filters),
    queryFn: ({ pageParam }) =>
      gamesService.searchGames({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined
      return allPages.length + 1
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })
}

// ── Paginated Search ─────────────────────────────────────────
export function useSearchGames(filters: GameFilters, options?: Partial<UseQueryOptions<GamesResponse>>) {
  return useQuery({
    queryKey: gameKeys.search(filters),
    queryFn: () => gamesService.searchGames(filters),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    enabled: Object.values(filters).some(Boolean),
    ...options,
  })
}

// ── Compare ──────────────────────────────────────────────────
export function useCompareGames(
  gameAId: number | null,
  gameBId: number | null,
  options?: Partial<UseQueryOptions<{ gameA: GameDetail; gameB: GameDetail }>>,
) {
  return useQuery({
    queryKey: gameKeys.compare(gameAId ?? 0, gameBId ?? 0),
    queryFn: () => gamesService.compareGames(gameAId!, gameBId!),
    enabled: !!gameAId && !!gameBId,
    staleTime: STALE_TIME * 2,
    gcTime: GC_TIME,
    ...options,
  })
}

// ── Quick multi-game fetch (for favorites display) ────────────
export function useMultipleGames(ids: number[]) {
  return useQuery({
    queryKey: ['games', 'multiple', ids],
    queryFn: async (): Promise<Game[]> => {
      const results = await Promise.allSettled(
        ids.map((id) => gamesService.getGameDetail(id)),
      )
      return results
        .filter((r): r is PromiseFulfilledResult<GameDetail> => r.status === 'fulfilled')
        .map((r) => r.value as Game)
    },
    enabled: ids.length > 0,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })
}
