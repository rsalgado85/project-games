import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PageTransition, FadeIn } from '@/components/ui/Animations'
import { ArrowLeft, ArrowRight, TrendingUp } from 'lucide-react'
import { usePopularGames, useTrendingGames } from '@/hooks/useGames'
import { GameCard } from '@/components/games/GameCard'
import { GameGridSkeleton } from '@/components/ui/Skeleton'
import { ErrorState, EmptyState } from '@/components/ui/States'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store'

export default function PopularPage() {
  const language = useAppStore((s) => s.language)
  const isEs = language === 'es'
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, refetch } = usePopularGames(page)
  const fallbackNeeded = !isLoading && !isError && !!data && data.results.length === 0
  const fallbackQuery = useTrendingGames(page, { enabled: fallbackNeeded })
  const totalPages = Math.max(1, Math.ceil((data?.count ?? 0) / 20))
  const renderData = fallbackNeeded && fallbackQuery.data ? fallbackQuery.data : data

  return (
    <PageTransition>
      <Helmet>
        <title>{isEs ? 'Juegos populares' : 'Popular games'} — GameVault</title>
        <meta name="description" content={isEs ? 'Juegos populares en tiempo real desde RAWG.' : 'Popular games in real time from RAWG.'} />
      </Helmet>

      <div className="mx-auto max-w-screen-xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-10 rounded-3xl border border-border-subtle bg-surface-2 p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
                <TrendingUp size={20} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-text-primary sm:text-4xl">{isEs ? 'Juegos populares' : 'Popular games'}</h1>
                <p className="text-sm text-text-muted">{isEs ? 'Consulta en vivo desde RAWG' : 'Live data from RAWG'}</p>
              </div>
            </div>
            <p className="max-w-2xl text-text-secondary leading-7">
              {isEs
                ? 'Descubre titulos con alta traccion y valoracion. Los datos se actualizan via backend Laravel.'
                : 'Discover titles with high traction and ratings. Data is refreshed through the Laravel backend.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/games" className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-glass px-4 py-2 text-sm text-text-primary hover:border-border-strong hover:bg-surface-panel transition-all">
                {isEs ? 'Todos los juegos' : 'All games'} <ArrowRight size={14} />
              </Link>
              <Link to="/top-rated" className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-glass px-4 py-2 text-sm text-text-primary hover:border-border-strong hover:bg-surface-panel transition-all">
                {isEs ? 'Mejor valorados' : 'Top rated'} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </FadeIn>

        {isLoading && <GameGridSkeleton count={8} />}

        {isError && (
          <ErrorState
            title={isEs ? 'No se pudieron cargar los populares' : 'Could not load popular games'}
            message={isEs ? 'No fue posible consultar la API en este momento.' : 'Could not query the API right now.'}
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && data && data.results.length === 0 && !fallbackQuery.data && (
          <EmptyState
            title={isEs ? 'Sin juegos populares' : 'No popular games'}
            description={isEs ? 'No se recibieron resultados para esta pagina.' : 'No results received for this page.'}
          />
        )}

        {!isLoading && !isError && renderData && renderData.results.length > 0 && (
          <>
            {fallbackNeeded && (
              <div className="mb-4 rounded-xl border border-border-subtle bg-surface-glass px-4 py-2 text-sm text-text-secondary">
                {isEs
                  ? 'No hubo resultados en populares para este lote. Mostrando tendencias como respaldo.'
                  : 'No popular results for this batch. Showing trending as fallback.'}
              </div>
            )}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {renderData.results.map((game, index) => (
                <GameCard key={game.id} game={game} index={index} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border-subtle bg-surface-glass px-4 py-3">
              <p className="text-sm text-text-secondary">
                {isEs ? `Pagina ${page} de ${totalPages} · ${renderData.count} juegos` : `Page ${page} of ${totalPages} · ${renderData.count} games`}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page <= 1}
                  icon={<ArrowLeft size={14} />}
                >
                  {isEs ? 'Anterior' : 'Previous'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
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
