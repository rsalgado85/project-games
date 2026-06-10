import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Heart, Trash2, ArrowRight, Calendar } from 'lucide-react'
import { PageTransition, FadeIn } from '@/components/ui/Animations'
import { EmptyState } from '@/components/ui/States'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store'
import { formatDate, getOptimizedImageUrl } from '@/utils/helpers'

export default function FavoritesPage() {
  const language = useAppStore((s) => s.language)
  const favorites = useAppStore((s) => s.favorites)
  const removeFavorite = useAppStore((s) => s.removeFavorite)
  const clearFavorites = useAppStore((s) => s.clearFavorites)
  const isEs = language === 'es'

  return (
    <PageTransition>
      <Helmet>
        <title>{isEs ? 'Mis favoritos' : 'My favorites'} — GameVault</title>
        <meta
          name="description"
          content={isEs
            ? 'Tus juegos favoritos guardados en GameVault.'
            : 'Your saved favorite games in GameVault.'}
        />
      </Helmet>

      <div className="mx-auto max-w-screen-xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8 rounded-3xl border border-border-subtle bg-surface-2 p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                  <Heart size={20} />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-text-primary">{isEs ? 'Mis favoritos' : 'My favorites'}</h1>
                  <p className="text-sm text-text-muted">
                    {isEs ? `${favorites.length} juegos guardados` : `${favorites.length} games saved`}
                  </p>
                </div>
              </div>

              {favorites.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFavorites}
                  icon={<Trash2 size={14} />}
                  className="text-red-400 hover:text-red-300"
                >
                  {isEs ? 'Vaciar favoritos' : 'Clear favorites'}
                </Button>
              )}
            </div>
          </div>
        </FadeIn>

        {favorites.length === 0 ? (
          <EmptyState
            icon={<Heart size={28} />}
            title={isEs ? 'Aun no tienes favoritos' : 'No favorites yet'}
            description={isEs ? 'Agrega juegos desde tarjetas o detalle para verlos aqui.' : 'Add games from cards or detail pages to see them here.'}
            action={
              <Link to="/games">
                <Button variant="secondary" size="sm" icon={<ArrowRight size={14} />} iconPosition="right">
                  {isEs ? 'Explorar juegos' : 'Explore games'}
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((fav) => (
              <article key={fav.id} className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-2">
                <Link to={`/games/${fav.id}`} className="block">
                  <img
                    src={getOptimizedImageUrl(fav.background_image, 640)}
                    alt={fav.name}
                    className="aspect-[16/10] w-full object-cover"
                    loading="lazy"
                  />
                </Link>

                <div className="space-y-3 p-4">
                  <Link to={`/games/${fav.id}`} className="block text-lg font-bold text-text-primary hover:text-accent transition-colors">
                    {fav.name}
                  </Link>

                  <div className="flex items-center justify-between text-sm text-text-muted">
                    <span>{isEs ? 'Rating' : 'Rating'}: {fav.rating.toFixed(1)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(fav.addedAt)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(fav.genres ?? []).slice(0, 3).map((g) => (
                      <span key={g.id} className="rounded-full border border-border-subtle px-2 py-0.5 text-xs text-text-secondary">
                        {g.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Link to={`/games/${fav.id}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">
                        {isEs ? 'Ver detalle' : 'View details'}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFavorite(fav.id)}
                      icon={<Trash2 size={14} />}
                      className="text-red-400 hover:text-red-300"
                    >
                      {isEs ? 'Quitar' : 'Remove'}
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
