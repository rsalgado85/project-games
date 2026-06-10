import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ArrowRight, Search, Star, TrendingUp } from 'lucide-react'
import { PageTransition } from '@/components/ui/Animations'
import { useSearchGames, useTrendingGames } from '@/hooks/useGames'
import { GameFilters } from '@/components/games/GameFilters'
import { GameCard } from '@/components/games/GameCard'
import { GameGridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState, ErrorState } from '@/components/ui/States'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store'
import type { GameFilters as GameFiltersType } from '@/types'

export default function GamesPage() {
  const language = useAppStore((s) => s.language)
  const isEs = language === 'es'
  const [searchParams, setSearchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('q') ?? ''
  const [filters, setFilters] = useState<GameFiltersType>({ page: 1, page_size: 20 })

  useEffect(() => {
    setFilters((prev) => ({ ...prev, q: queryFromUrl || undefined, page: 1 }))
  }, [queryFromUrl])

  const hasSearchFilters = useMemo(
    () =>
      Boolean(filters.q || filters.platforms || filters.genres || filters.ordering || filters.dates),
    [filters],
  )

  const trendingQuery = useTrendingGames(filters.page ?? 1, { enabled: !hasSearchFilters })
  const searchQuery = useSearchGames(filters, { enabled: hasSearchFilters })
  const activeQuery = hasSearchFilters ? searchQuery : trendingQuery
  const data = activeQuery.data

  const page = filters.page ?? 1
  const pageSize = filters.page_size ?? 20
  const totalPages = Math.max(1, Math.ceil((data?.count ?? 0) / pageSize))

  const setPage = (nextPage: number) => {
    setFilters((prev) => ({ ...prev, page: nextPage }))
  }

  const handleFilterChange = (nextFilters: GameFiltersType) => {
    setFilters((prev) => ({ ...prev, ...nextFilters }))

    const nextQ = nextFilters.q ?? ''
    if (nextQ) {
      setSearchParams({ q: nextQ })
    } else if (searchParams.has('q')) {
      setSearchParams({})
    }
  }

  const handleResetFilters = () => {
    setFilters({ page: 1, page_size: 20 })
    if (searchParams.has('q')) setSearchParams({})
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{isEs ? 'Explorar juegos' : 'Explore games'} — GameVault</title>
        <meta
          name="description"
          content={isEs
            ? 'Explora juegos reales desde RAWG con filtros avanzados, tarjetas y navegacion rapida.'
            : 'Explore real games from RAWG with advanced filters, cards and fast navigation.'}
        />
      </Helmet>

      <div className="mx-auto max-w-screen-xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl border border-border-subtle bg-gradient-to-br from-surface-2 via-bg-primary to-surface-3 p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            <TrendingUp size={14} />
            RAWG
          </div>
          <h1 className="mt-4 text-3xl font-black text-text-primary sm:text-4xl">{isEs ? 'Explorar juegos' : 'Explore games'}</h1>
          <p className="mt-3 max-w-2xl text-text-secondary leading-7">
            {isEs
              ? 'Consulta el catalogo en tiempo real desde la API. Filtra por plataforma, genero, orden y fecha de lanzamiento.'
              : 'Browse the live API catalog. Filter by platform, genre, ordering and release date.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/popular" className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-glass px-4 py-2 text-sm text-text-primary hover:border-border-strong hover:bg-surface-panel transition-all">
              {isEs ? 'Ver populares' : 'View popular'} <ArrowRight size={14} />
            </Link>
            <Link to="/top-rated" className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-glass px-4 py-2 text-sm text-text-primary hover:border-border-strong hover:bg-surface-panel transition-all">
              {isEs ? 'Mejor valorados' : 'Top rated'} <Star size={14} />
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <GameFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {hasSearchFilters && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-glass px-4 py-2 text-sm text-text-secondary">
            <Search size={14} className="text-accent" />
            {isEs ? 'Resultado actual:' : 'Current result:'} {filters.q ? `"${filters.q}"` : isEs ? 'filtros aplicados' : 'filters applied'}
          </div>
        )}

        {activeQuery.isLoading && <GameGridSkeleton count={8} />}

        {activeQuery.isError && (
          <ErrorState
            title={isEs ? 'No se pudieron cargar juegos' : 'Could not load games'}
            message={isEs ? 'La API no respondio correctamente. Intenta nuevamente.' : 'The API did not respond correctly. Please try again.'}
            onRetry={() => activeQuery.refetch()}
          />
        )}

        {!activeQuery.isLoading && !activeQuery.isError && data && data.results.length === 0 && (
          <EmptyState
            icon={<Search size={28} />}
            title={isEs ? 'Sin resultados' : 'No results'}
            description={isEs ? 'No encontramos juegos con esos filtros. Prueba con otra combinacion.' : 'No games found with these filters. Try another combination.'}
            action={
              <Button variant="secondary" size="sm" onClick={handleResetFilters}>
                {isEs ? 'Limpiar filtros' : 'Clear filters'}
              </Button>
            }
          />
        )}

        {!activeQuery.isLoading && !activeQuery.isError && data && data.results.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {data.results.map((game, index) => (
                <GameCard key={game.id} game={game} index={index} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border-subtle bg-surface-glass px-4 py-3">
              <p className="text-sm text-text-secondary">
                {isEs ? `Pagina ${page} de ${totalPages} · ${data.count} juegos` : `Page ${page} of ${totalPages} · ${data.count} games`}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  icon={<ArrowLeft size={14} />}
                >
                  {isEs ? 'Anterior' : 'Previous'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  icon={<ArrowRight size={14} />}
                  iconPosition="right"
                >
                  {isEs ? 'Siguiente' : 'Next'}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </PageTransition>
  )
}
