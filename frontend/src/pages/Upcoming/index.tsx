import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PageTransition, FadeIn } from '@/components/ui/Animations'
import { ArrowLeft, ArrowRight, Calendar, Gamepad2 } from 'lucide-react'
import { useUpcomingGames } from '@/hooks/useGames'
import { GameCard } from '@/components/games/GameCard'
import { GameGridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState, ErrorState } from '@/components/ui/States'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store'

export default function UpcomingPage() {
  const language = useAppStore((s) => s.language)
  const isEs = language === 'es'
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, refetch } = useUpcomingGames(page)
  const totalPages = Math.max(1, Math.ceil((data?.count ?? 0) / 20))

  return (
    <PageTransition>
      <Helmet>
        <title>{isEs ? 'Proximos lanzamientos' : 'Upcoming releases'} — GameVault</title>
        <meta name="description" content={isEs ? 'Proximos lanzamientos de videojuegos consultados desde RAWG.' : 'Upcoming game releases fetched from RAWG.'} />
      </Helmet>

      <div className="mx-auto max-w-screen-xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-10 rounded-3xl border border-border-subtle bg-surface-2 p-8">
            <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
              <Calendar size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-text-primary sm:text-4xl">{isEs ? 'Proximos lanzamientos' : 'Upcoming releases'}</h1>
              <p className="text-sm text-text-muted">{isEs ? 'Lanzamientos proximos en vivo' : 'Live upcoming releases'}</p>
            </div>
          </div>
            <p className="max-w-2xl text-text-secondary leading-7">
              {isEs
                ? 'Explora juegos programados para los proximos meses con datos actualizados de la API.'
                : 'Explore games scheduled for the next months with updated API data.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/games" className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-glass px-4 py-2 text-sm text-text-primary hover:border-border-strong hover:bg-surface-panel transition-all">
                {isEs ? 'Todos los juegos' : 'All games'} <Gamepad2 size={14} />
              </Link>
              <Link to="/popular" className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-glass px-4 py-2 text-sm text-text-primary hover:border-border-strong hover:bg-surface-panel transition-all">
                {isEs ? 'Populares' : 'Popular'} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </FadeIn>

        {isLoading && <GameGridSkeleton count={8} />}

        {isError && (
          <ErrorState
            title={isEs ? 'No se pudieron cargar proximos lanzamientos' : 'Could not load upcoming releases'}
            message={isEs ? 'La API no respondio correctamente.' : 'The API did not respond correctly.'}
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && data && data.results.length === 0 && (
          <EmptyState
            title={isEs ? 'Sin proximos lanzamientos' : 'No upcoming releases'}
            description={isEs ? 'No hay resultados para esta pagina en este momento.' : 'No results for this page right now.'}
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
