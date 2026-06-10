import { Helmet } from 'react-helmet-async'
import { useAppStore } from '@/store'

const DEFAULT_IMAGE = '/favicon.svg'

export function DefaultSeo() {
  const language = useAppStore((s) => s.language)
  const isEs = language === 'es'
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
  const title = isEs ? 'GameVault | Descubre, compara y guarda videojuegos' : 'GameVault | Discover, compare and save video games'
  const description = isEs
    ? 'Explora videojuegos en tendencia, compara titulos y guarda tus favoritos con datos de RAWG.'
    : 'Explore trending games, compare titles and save your favorites with RAWG data.'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GameVault',
    url: siteUrl,
    inLanguage: isEs ? 'es' : 'en',
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/games?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Helmet>
      <html lang={isEs ? 'es' : 'en'} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <meta name="author" content="GameVault" />
      <meta name="keywords" content="videojuegos,games,rawg,game search,comparador de juegos,favoritos" />

      <link rel="canonical" href={siteUrl || '/'} />

      <meta property="og:site_name" content="GameVault" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={isEs ? 'es_ES' : 'en_US'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl || '/'} />
      <meta property="og:image" content={`${siteUrl}${DEFAULT_IMAGE}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${DEFAULT_IMAGE}`} />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
