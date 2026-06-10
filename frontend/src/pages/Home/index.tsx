import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight, Gamepad2, Search, Star, TrendingUp, Calendar, Zap, ShieldCheck, Globe2, Layers3 } from 'lucide-react'
import { PageTransition } from '@/components/ui/Animations'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/i18n'
import { useAppStore } from '@/store'

export default function HomePage() {
  const text = useI18n()
  const language = useAppStore((s) => s.language)
  const isEs = language === 'es'

  const highlights = [
    { icon: TrendingUp, title: text.home.trendingNow, description: text.home.hottest, to: '/games' },
    { icon: Star, title: text.home.topRated, description: text.home.highest, to: '/top-rated' },
    { icon: Calendar, title: text.home.upcoming, description: text.home.anticipated, to: '/upcoming' },
  ]

  const stats = [
    {
      icon: ShieldCheck,
      label: isEs ? 'Sin errores' : 'Stable',
      value: isEs ? 'Router, API y UI estabilizados' : 'Router, API and UI stabilized',
    },
    {
      icon: Globe2,
      label: isEs ? 'Bilingue' : 'Bilingual',
      value: isEs ? 'Espanol por defecto · Ingles opcional' : 'Spanish default · Optional English',
    },
    {
      icon: Layers3,
      label: isEs ? 'Arquitectura' : 'Architecture',
      value: 'React + Laravel + Docker',
    },
  ]

  return (
    <PageTransition>
      <Helmet>
        <title>GameVault — {text.home.trendingNow}</title>
        <meta
          name="description"
          content={isEs
            ? 'Explora videojuegos, compara titulos y navega la plataforma en espanol o ingles.'
            : 'Explore games, compare titles and navigate the platform in Spanish or English.'}
        />
        <meta property="og:title" content="GameVault" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="mx-auto max-w-screen-xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-surface-2 via-bg-primary to-surface-3 p-8 shadow-2xl shadow-black/20 sm:p-10 lg:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(108,99,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(80,200,120,0.14),transparent_25%)]" />
          <div className="relative z-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              <Zap size={14} />
              GameVault
            </div>
            <h1 className="max-w-2xl text-4xl font-black tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              {isEs
                ? 'La mejor forma de descubrir videojuegos con una interfaz clara, rapida y bilingue.'
                : 'The best way to discover games with a clear, fast and bilingual interface.'}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
              {isEs
                ? 'Explora catalogos de juegos, revisa favoritos, compara titulos y consulta datos de RAWG sin friccion. La aplicacion arranca en espanol y puedes cambiar a ingles con un clic.'
                : 'Explore game catalogs, review favorites, compare titles and check RAWG data without friction. The app starts in Spanish and you can switch to English with one click.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button as={Link} to="/games" size="lg" icon={<Search size={16} className="fill-current" />}>
                {isEs ? 'Explorar juegos' : 'Explore games'}
              </Button>
              <Button as={Link} to="/about" variant="secondary" size="lg" icon={<Gamepad2 size={16} />}>
                {isEs ? 'Sobre mi' : 'About me'}
              </Button>
              <Button as={Link} to="/contact" variant="outline" size="lg" icon={<ArrowRight size={16} />} iconPosition="right">
                {isEs ? 'Contacto' : 'Contact'}
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-black/20 p-4 backdrop-blur-sm">
                  <Icon size={18} className="text-accent" />
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-text-muted">{label}</p>
                  <p className="mt-1 text-sm font-medium text-text-primary">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description, to }) => (
            <Link
              key={title}
              to={to}
              className="group rounded-3xl border border-white/8 bg-surface-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-white/16 hover:bg-surface-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <Icon size={20} />
              </div>
              <h2 className="mt-5 text-xl font-bold text-text-primary">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-text-muted">{description}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                {isEs ? 'Ver seccion' : 'View section'} <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-white/8 bg-surface-2 p-8 lg:p-10">
          <h2 className="text-2xl font-bold text-text-primary">{text.home.aboutThisProject}</h2>
          <p className="mt-3 max-w-3xl text-text-secondary leading-7">{text.home.projectSummary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['React', 'Laravel', 'RAWG API', 'Docker', 'ES/EN'].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-text-muted">
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
