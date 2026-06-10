import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Calendar,
  Globe,
  ExternalLink,
  Heart,
  GitCompare,
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  PlayCircle,
} from 'lucide-react'
import { useGameDetail, useGameMovies } from '@/hooks/useGames'
import { useAppStore } from '@/store'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { RatingStars, CircleRating } from '@/components/ui/RatingStars'
import { GameDetailSkeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/States'
import { PageTransition } from '@/components/ui/Animations'
import { getOptimizedImageUrl, formatDate, getRatingColor, stripHtml, truncate, cn } from '@/utils/helpers'
import toast from 'react-hot-toast'

export default function GameDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: game, isLoading, isError, refetch } = useGameDetail(id ?? '')
  const { data: movies } = useGameMovies(id ?? '', { enabled: !!id })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showFullDesc, setShowFullDesc] = useState(false)

  const language = useAppStore((s) => s.language)
  const isEs = language === 'es'

  const favored = useAppStore((s) => {
    const targetId = Number(id)
    return s.favorites.some((f) => f.id === targetId)
  })
  const inCompare = useAppStore((s) => {
    const targetId = Number(id)
    return s.compareSlots.some((slot) => slot?.id === targetId)
  })

  const addFavorite = useAppStore((s) => s.addFavorite)
  const removeFavorite = useAppStore((s) => s.removeFavorite)
  const addToHistory = useAppStore((s) => s.addToHistory)
  const addToCompare = useAppStore((s) => s.addToCompare)
  const removeFromCompare = useAppStore((s) => s.removeFromCompare)

  useEffect(() => {
    if (game) addToHistory(game)
  }, [game, addToHistory])

  if (isLoading) return <GameDetailSkeleton />
  if (isError || !game) return <ErrorState onRetry={() => void refetch()} />

  const description = stripHtml(game.description_raw || game.description || '')
  const shortDesc = truncate(description, 420)
  const safeRating = typeof game.rating === 'number' ? game.rating : 0
  const safeRatingsCount = typeof game.ratings_count === 'number' ? game.ratings_count : 0

  const safeName = (() => {
    if (typeof game.name === 'string' && game.name.trim().length > 0) return game.name
    if (typeof game.slug === 'string' && game.slug.trim().length > 0) {
      return game.slug
        .split('-')
        .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
        .join(' ')
    }
    return isEs ? 'Detalle del juego' : 'Game detail'
  })()

  const genres = game.genres ?? []
  const ratings = game.ratings ?? []
  const platforms = game.platforms ?? []
  const developers = game.developers ?? []
  const publishers = game.publishers ?? []
  const stores = game.stores ?? []
  const screenshots = game.screenshots ?? []

  const clipUrl = game.clip?.clip ?? null
  const clipPreview = game.clip?.preview ?? null
  const movieFallback = (movies ?? []).find((m) => Boolean(m.data?.max || m.data?.['480']))
  const trailerUrl = clipUrl ?? movieFallback?.data?.max ?? movieFallback?.data?.['480'] ?? null
  const trailerPoster = clipPreview ?? movieFallback?.preview ?? null

  const handleFavorite = () => {
    if (favored) {
      removeFavorite(game.id)
      toast.success(isEs ? 'Eliminado de favoritos' : 'Removed from favorites')
      return
    }

    addFavorite(game)
    toast.success(isEs ? 'Agregado a favoritos' : 'Added to favorites')
  }

  const handleCompare = () => {
    if (inCompare) {
      removeFromCompare(game.id)
      return
    }

    const ok = addToCompare(game)
    if (!ok) {
      toast.error(isEs ? 'El comparador esta lleno.' : 'Comparator is full.')
      return
    }

    toast.success(isEs ? 'Agregado al comparador' : 'Added to comparator')
  }

  const t = {
    back: isEs ? 'Volver a juegos' : 'Back to games',
    avgPlaytime: isEs ? 'tiempo medio' : 'avg playtime',
    removeFavorite: isEs ? 'Quitar favorito' : 'Unfavorite',
    addFavorite: isEs ? 'Agregar a favoritos' : 'Add to favorites',
    inComparator: isEs ? 'En comparador' : 'In comparator',
    compare: isEs ? 'Comparar' : 'Compare',
    officialSite: isEs ? 'Sitio oficial' : 'Official site',
    about: isEs ? 'Acerca de' : 'About',
    showLess: isEs ? 'Mostrar menos' : 'Show less',
    readMore: isEs ? 'Leer mas' : 'Read more',
    screenshots: isEs ? 'Capturas' : 'Screenshots',
    ratings: isEs ? 'Valoraciones' : 'Player ratings',
    metacritic: isEs ? 'Ver en Metacritic' : 'View on Metacritic',
    details: isEs ? 'Detalles del juego' : 'Game Details',
    rating: isEs ? 'Valoracion' : 'Rating',
    ratingsCount: isEs ? 'Cantidad de valoraciones' : 'Ratings count',
    released: isEs ? 'Lanzamiento' : 'Released',
    avgLabel: isEs ? 'Tiempo medio' : 'Avg. Playtime',
    platforms: isEs ? 'Plataformas' : 'Platforms',
    developer: isEs ? 'Desarrollador' : 'Developer',
    publisher: isEs ? 'Publicador' : 'Publisher',
    availableOn: isEs ? 'Disponible en' : 'Available on',
    trailer: isEs ? 'Trailer' : 'Trailer',
    noTrailer: isEs ? 'RAWG no incluye video para este juego.' : 'RAWG does not include a trailer for this game.',
    trailerSource: isEs ? 'Fuente: RAWG movies endpoint' : 'Source: RAWG movies endpoint',
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{`${safeName} — GameVault`}</title>
        <meta name="description" content={shortDesc} />
        <meta property="og:title" content={`${safeName} — GameVault`} />
        <meta property="og:description" content={shortDesc} />
        {game.background_image && <meta property="og:image" content={game.background_image} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={getOptimizedImageUrl(game.background_image, 1920)}
          alt={safeName}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/82 to-transparent" />

        <div className="absolute top-20 left-4 sm:left-8">
          <Link
            to="/games"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-sm text-white/85 backdrop-blur-sm hover:bg-black/55 transition-all"
          >
            <ChevronLeft size={15} />
            {t.back}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 rounded-2xl border border-white/12 bg-black/25 p-5 backdrop-blur-sm">
              <div className="mb-3 flex flex-wrap gap-2">
                {genres.map((g) => (
                  <Badge key={g.id} variant="accent">{g.name}</Badge>
                ))}
              </div>

              <h1 className="text-4xl font-black leading-tight text-text-primary drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] sm:text-5xl">
                {safeName}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <RatingStars rating={safeRating} showValue />
                {game.released && (
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Calendar size={13} />
                    <span>{formatDate(game.released)}</span>
                  </div>
                )}
                {game.playtime > 0 && (
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Clock size={13} />
                    <span>~{game.playtime}h {t.avgPlaytime}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  onClick={handleFavorite}
                  variant={favored ? 'danger' : 'secondary'}
                  icon={<Heart size={15} className={favored ? 'fill-current' : ''} />}
                >
                  {favored ? t.removeFavorite : t.addFavorite}
                </Button>
                <Button
                  onClick={handleCompare}
                  variant={inCompare ? 'outline' : 'secondary'}
                  icon={<GitCompare size={15} />}
                >
                  {inCompare ? t.inComparator : t.compare}
                </Button>
                {game.website && (
                  <Button
                    as="a"
                    href={game.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    icon={<Globe size={14} />}
                    iconPosition="right"
                  >
                    {t.officialSite}
                  </Button>
                )}
              </div>
            </div>

            {description && (
              <div className="mb-8">
                <h2 className="mb-3 text-lg font-bold text-text-primary">{t.about}</h2>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {showFullDesc ? description : shortDesc}
                </p>
                {description.length > 420 && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="mt-2 text-sm text-accent hover:underline"
                  >
                    {showFullDesc ? t.showLess : t.readMore}
                  </button>
                )}
              </div>
            )}

            <div className="mb-8">
              <h2 className="mb-4 text-lg font-bold text-text-primary">{t.trailer}</h2>
              {trailerUrl ? (
                <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-2">
                  <video
                    controls
                    poster={trailerPoster ?? undefined}
                    className="h-full w-full"
                    preload="metadata"
                  >
                    <source src={trailerUrl} />
                  </video>
                  {movieFallback && !clipUrl && (
                    <p className="border-t border-border-subtle px-3 py-2 text-xs text-text-muted">{t.trailerSource}</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-glass px-4 py-3 text-sm text-text-muted">
                  <PlayCircle size={16} className="text-accent" />
                  {t.noTrailer}
                </div>
              )}
            </div>

            {screenshots.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-lg font-bold text-text-primary">{t.screenshots}</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {screenshots.slice(0, 6).map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setLightboxIndex(i)}
                      className="aspect-video overflow-hidden rounded-xl bg-surface-3 transition-all hover:ring-2 hover:ring-accent/40"
                      aria-label={isEs ? `Ver captura ${i + 1}` : `View screenshot ${i + 1}`}
                    >
                      <img
                        src={getOptimizedImageUrl(s.image, 640)}
                        alt={`Screenshot ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {ratings.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-lg font-bold text-text-primary">{t.ratings}</h2>
                <div className="space-y-3">
                  {ratings.map((r) => (
                    <div key={r.id} className="grid grid-cols-[110px_minmax(0,1fr)_44px] items-center gap-3 sm:grid-cols-[130px_minmax(0,1fr)_52px]">
                      <span className="truncate text-sm capitalize text-text-secondary" title={translateRatingLabel(r.title, isEs)}>
                        {translateRatingLabel(r.title, isEs)}
                      </span>
                      <div className="h-2 min-w-0 overflow-hidden rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#ef4444] to-[#f59e0b]"
                          style={{ width: `${Math.max(0, Math.min(100, r.percent ?? 0))}%` }}
                        />
                      </div>
                      <span className="text-right text-xs tabular-nums text-text-muted">
                        {(typeof r.percent === 'number' ? r.percent : 0).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-5">
            {game.metacritic && (
              <div className="rounded-2xl border border-white/8 bg-surface-2 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Metacritic</p>
                    <p className="mt-1 text-3xl font-black text-text-primary">{game.metacritic}</p>
                  </div>
                  <CircleRating score={game.metacritic} size={64} />
                </div>
                {game.metacritic_url && (
                  <a
                    href={game.metacritic_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-primary"
                  >
                    {t.metacritic} <ExternalLink size={11} />
                  </a>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-white/8 bg-surface-2 p-5">
              <h3 className="mb-4 text-sm font-semibold text-text-primary">{t.details}</h3>
              <dl className="space-y-3">
                <DetailRow
                  label={t.rating}
                  value={(
                    <span className={cn('font-bold', getRatingColor(safeRating))}>
                      {safeRating.toFixed(1)} / 5
                    </span>
                  )}
                />
                <DetailRow label={t.ratingsCount} value={safeRatingsCount.toLocaleString()} />
                {game.released && <DetailRow label={t.released} value={formatDate(game.released)} />}
                {game.playtime > 0 && <DetailRow label={t.avgLabel} value={`${game.playtime}h`} />}
                {game.esrb_rating && <DetailRow label="ESRB" value={game.esrb_rating.name} />}
              </dl>
            </div>

            {platforms.length > 0 && (
              <div className="rounded-2xl border border-white/8 bg-surface-2 p-5">
                <h3 className="mb-3 text-sm font-semibold text-text-primary">{t.platforms}</h3>
                <div className="flex flex-wrap gap-2">
                  {platforms.map(({ platform }) => (
                    <Badge key={platform.id} variant="outline">{platform.name}</Badge>
                  ))}
                </div>
              </div>
            )}

            {developers.length > 0 && (
              <div className="rounded-2xl border border-white/8 bg-surface-2 p-5">
                <h3 className="mb-3 text-sm font-semibold text-text-primary">{t.developer}</h3>
                <div className="flex flex-wrap gap-2">
                  {developers.map((d) => (
                    <Badge key={d.id} variant="accent">{d.name}</Badge>
                  ))}
                </div>
              </div>
            )}

            {publishers.length > 0 && (
              <div className="rounded-2xl border border-white/8 bg-surface-2 p-5">
                <h3 className="mb-3 text-sm font-semibold text-text-primary">{t.publisher}</h3>
                <div className="flex flex-wrap gap-2">
                  {publishers.map((p) => (
                    <Badge key={p.id}>{p.name}</Badge>
                  ))}
                </div>
              </div>
            )}

            {stores.length > 0 && (
              <div className="rounded-2xl border border-white/8 bg-surface-2 p-5">
                <h3 className="mb-3 text-sm font-semibold text-text-primary">{t.availableOn}</h3>
                <div className="flex flex-wrap gap-2">
                  {stores.map(({ id: storeId, url, store }) => (
                    <a
                      key={storeId}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-text-secondary transition-all hover:border-white/20 hover:text-text-primary"
                    >
                      {store.name} <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={screenshots[lightboxIndex]?.image ?? ''}
              alt={`Screenshot ${lightboxIndex + 1}`}
              className="w-full rounded-2xl"
            />
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute -right-4 -top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-surface-2 text-text-primary"
              aria-label={isEs ? 'Cerrar' : 'Close'}
            >
              <X size={16} />
            </button>
            {lightboxIndex > 0 && (
              <button
                onClick={() => setLightboxIndex((i) => (i ?? 0) - 1)}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                aria-label={isEs ? 'Anterior' : 'Previous'}
              >
                <ChevronLeft size={18} />
              </button>
            )}
            {lightboxIndex < screenshots.length - 1 && (
              <button
                onClick={() => setLightboxIndex((i) => (i ?? 0) + 1)}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                aria-label={isEs ? 'Siguiente' : 'Next'}
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </PageTransition>
  )
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm gap-3">
      <dt className="text-text-muted">{label}</dt>
      <dd className="font-medium text-text-secondary text-right">{value}</dd>
    </div>
  )
}

function translateRatingLabel(label: string, isEs: boolean): string {
  if (!isEs) return label
  const key = label.toLowerCase().trim()
  if (key === 'exceptional') return 'Excepcional'
  if (key === 'recommended') return 'Recomendado'
  if (key === 'meh') return 'Regular'
  if (key === 'skip') return 'Omitir'
  return label
}
