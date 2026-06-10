import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PageTransition, FadeIn } from '@/components/ui/Animations'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { useTopRatedGames } from '@/hooks/useGames'
import { GameCard } from '@/components/games/GameCard'
import { GameGridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState, ErrorState } from '@/components/ui/States'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store'

export default function TopRatedPage() {
  const language = useAppStore((s) => s.language)
  const isEs = language === 'es'
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, refetch } = useTopRatedGames(page)
  const totalPages = Math.max(1, Math.ceil((data?.count ?? 0) / 20))

  return (
    <PageTransition>
      <Helmet>
        <title>{isEs ? 'Juegos mejor valorados' : 'Top rated games'} — GameVault</title>
        <meta name="description" content={isEs ? 'Ranking de juegos mejor valorados desde RAWG.' : 'Top rated games ranking from RAWG.'} />
      </Helmet>

      <div className="mx-auto max-w-screen-xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-10 rounded-3xl border border-border-subtle bg-surface-2 p-8">
            <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/20 text-yellow-400">
              <Star size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-text-primary sm:text-4xl">{isEs ? 'Mejor valorados' : 'Top rated'}</h1>
              <p className="text-sm text-text-muted">{isEs ? 'Ranking en vivo' : 'Live ranking'}</p>
            </div>
          </div>
            <p className="max-w-2xl text-text-secondary leading-7">
              {isEs
                ? 'Consulta juegos con mejor metacritic y calificacion general.'
                : 'Check games with the best Metacritic and overall rating.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/games" className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-glass px-4 py-2 text-sm text-text-primary hover:border-border-strong hover:bg-surface-panel transition-all">
                {isEs ? 'Explorar juegos' : 'Explore games'} <ArrowRight size={14} />
              </Link>
              <Link to="/upcoming" className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-glass px-4 py-2 text-sm text-text-primary hover:border-border-strong hover:bg-surface-panel transition-all">
                {isEs ? 'Proximos' : 'Upcoming'} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </FadeIn>

        {isLoading && <GameGridSkeleton count={8} />}

        {isError && (
          <ErrorState
            title={isEs ? 'No se pudieron cargar los mejor valorados' : 'Could not load top rated games'}
            message={isEs ? 'La API no devolvio datos en este momento.' : 'The API returned no data at this moment.'}
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && data && data.results.length === 0 && (
          <EmptyState
            title={isEs ? 'Sin juegos en el ranking' : 'No games in ranking'}
            description={isEs ? 'No hay resultados para esta pagina.' : 'No results for this page.'}
          />
        )}

        {!isLoading && !isError && data && data.results.length > 0 && (
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
