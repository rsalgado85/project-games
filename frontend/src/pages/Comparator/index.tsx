import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { GitCompare, ArrowRight, Trash2, X } from 'lucide-react'
import { PageTransition, FadeIn } from '@/components/ui/Animations'
import { EmptyState, ErrorState } from '@/components/ui/States'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store'
import { useCompareGames } from '@/hooks/useGames'
import { getOptimizedImageUrl, formatDate } from '@/utils/helpers'

export default function ComparatorPage() {
  const language = useAppStore((s) => s.language)
  const compareSlots = useAppStore((s) => s.compareSlots)
  const removeFromCompare = useAppStore((s) => s.removeFromCompare)
  const clearCompare = useAppStore((s) => s.clearCompare)
  const isEs = language === 'es'

  const gameA = compareSlots[0]
  const gameB = compareSlots[1]

  const compareQuery = useCompareGames(gameA?.id ?? null, gameB?.id ?? null)

  return (
    <PageTransition>
      <Helmet>
        <title>{isEs ? 'Comparar juegos' : 'Compare games'} — GameVault</title>
        <meta
          name="description"
          content={isEs ? 'Compara dos juegos lado a lado con datos de RAWG.' : 'Compare two games side by side with RAWG data.'}
        />
      </Helmet>

      <div className="mx-auto max-w-screen-xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8 rounded-3xl border border-border-subtle bg-surface-2 p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <GitCompare size={20} />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-text-primary">{isEs ? 'Comparador' : 'Comparator'}</h1>
                  <p className="text-sm text-text-muted">
                    {isEs ? 'Selecciona hasta 2 juegos para comparar' : 'Select up to 2 games to compare'}
                  </p>
                </div>
              </div>

              {(gameA || gameB) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCompare}
                  icon={<Trash2 size={14} />}
                  className="text-red-400 hover:text-red-300"
                >
                  {isEs ? 'Vaciar comparador' : 'Clear comparator'}
                </Button>
              )}
            </div>
          </div>
        </FadeIn>

        {!gameA && !gameB && (
          <EmptyState
            icon={<GitCompare size={28} />}
            title={isEs ? 'No hay juegos para comparar' : 'No games to compare'}
            description={isEs ? 'Desde cualquier tarjeta puedes usar "Comparar" para agregarlos aqui.' : 'Use "Compare" from any game card to add games here.'}
            action={
              <Link to="/games">
                <Button variant="secondary" size="sm" icon={<ArrowRight size={14} />} iconPosition="right">
                  {isEs ? 'Explorar juegos' : 'Explore games'}
                </Button>
              </Link>
            }
          />
        )}

        {(gameA || gameB) && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[gameA, gameB].map((slot, index) => (
              <div key={index} className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-2">
                {slot ? (
                  <>
                    <img
                      src={getOptimizedImageUrl(slot.background_image, 960)}
                      alt={slot.name}
                      className="aspect-[16/9] w-full object-cover"
                      loading="lazy"
                    />
                    <div className="space-y-3 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="text-lg font-bold text-text-primary">{slot.name}</h2>
                        <button
                          onClick={() => removeFromCompare(slot.id)}
                          className="rounded-lg p-1 text-text-muted hover:bg-surface-glass hover:text-text-primary"
                          aria-label={isEs ? 'Quitar del comparador' : 'Remove from comparator'}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-text-muted">
                        {isEs ? 'Rating' : 'Rating'}: {slot.rating.toFixed(1)}
                      </p>
                      <Link to={`/games/${slot.id}`}>
                        <Button variant="secondary" size="sm">{isEs ? 'Ver detalle' : 'View details'}</Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-64 items-center justify-center p-6 text-center text-sm text-text-muted">
                    {isEs ? 'Slot vacio. Agrega un juego para comparar.' : 'Empty slot. Add a game to compare.'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {gameA && gameB && compareQuery.isError && (
          <ErrorState
            title={isEs ? 'No se pudo cargar la comparacion' : 'Could not load comparison'}
            message={isEs ? 'Intenta nuevamente en unos segundos.' : 'Please try again in a few seconds.'}
            onRetry={() => compareQuery.refetch()}
          />
        )}

        {gameA && gameB && compareQuery.data && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-border-subtle bg-surface-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-surface-glass text-left text-text-muted">
                  <th className="px-4 py-3">{isEs ? 'Metrica' : 'Metric'}</th>
                  <th className="px-4 py-3">{compareQuery.data.gameA.name}</th>
                  <th className="px-4 py-3">{compareQuery.data.gameB.name}</th>
                </tr>
              </thead>
              <tbody>
                <CompareRow label={isEs ? 'Rating' : 'Rating'} a={compareQuery.data.gameA.rating.toFixed(1)} b={compareQuery.data.gameB.rating.toFixed(1)} />
                <CompareRow label="Metacritic" a={String(compareQuery.data.gameA.metacritic ?? '-')} b={String(compareQuery.data.gameB.metacritic ?? '-')} />
                <CompareRow label={isEs ? 'Lanzamiento' : 'Released'} a={compareQuery.data.gameA.released ? formatDate(compareQuery.data.gameA.released) : '-'} b={compareQuery.data.gameB.released ? formatDate(compareQuery.data.gameB.released) : '-'} />
                <CompareRow label={isEs ? 'Tiempo medio' : 'Avg. playtime'} a={`${compareQuery.data.gameA.playtime}h`} b={`${compareQuery.data.gameB.playtime}h`} />
                <CompareRow label={isEs ? 'Plataformas' : 'Platforms'} a={String(compareQuery.data.gameA.platforms?.length ?? 0)} b={String(compareQuery.data.gameB.platforms?.length ?? 0)} />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

function CompareRow({ label, a, b }: { label: string; a: string; b: string }) {
  return (
    <tr className="border-b border-border-subtle/60 last:border-b-0">
      <td className="px-4 py-3 font-medium text-text-secondary">{label}</td>
      <td className="px-4 py-3 text-text-primary">{a}</td>
      <td className="px-4 py-3 text-text-primary">{b}</td>
    </tr>
  )
}
