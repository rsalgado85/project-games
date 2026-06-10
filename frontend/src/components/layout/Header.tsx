import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Gamepad2,
  Search,
  Moon,
  Sun,
  Heart,
  GitCompare,
  Menu,
  X,
  TrendingUp,
  Star,
  Calendar,
  Zap,
  Sparkles,
} from 'lucide-react'
import { useAppStore } from '@/store'
import { useScrollPosition } from '@/hooks/useUI'
import { cn } from '@/utils/helpers'
import { Input } from '@/components/ui/Input'
import { useI18n } from '@/i18n'
import { ThemeStudio } from '@/components/theme'

export function Header() {
  const theme = useAppStore((s) => s.theme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)
  const language = useAppStore((s) => s.language)
  const setLanguage = useAppStore((s) => s.setLanguage)
  const favorites = useAppStore((s) => s.favorites)
  const compareSlots = useAppStore((s) => s.compareSlots)
  const scrollY = useScrollPosition()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [themeStudioOpen, setThemeStudioOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const text = useI18n()
  const isEs = language === 'es'

  const navLinks = [
    { to: '/', label: text.header.home, icon: Zap },
    { to: '/games', label: text.header.explore, icon: Search },
    { to: '/popular', label: text.header.popular, icon: TrendingUp },
    { to: '/top-rated', label: text.header.topRated, icon: Star },
    { to: '/upcoming', label: text.header.upcoming, icon: Calendar },
    { to: '/comparator', label: text.header.compare, icon: GitCompare },
  ]

  const isScrolled = scrollY > 20
  const compareCount = compareSlots.filter(Boolean).length

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/games?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border-subtle shadow-lg shadow-black/20'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold text-text-primary"
            aria-label="GameVault"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 shadow-lg shadow-accent/30">
              <Gamepad2 size={16} className="text-text-inverse" />
            </div>
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent font-bold tracking-tight">
              GameVault
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-text-primary bg-surface-glass'
                      : 'text-text-muted hover:text-text-primary hover:bg-surface-glass',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-glass transition-all"
              aria-label={text.header.search}
            >
              <Search size={17} />
            </button>

            {/* Favorites */}
            <Link
              to="/favorites"
              className="relative hidden sm:flex h-9 w-9 items-center justify-center rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-glass transition-all"
              aria-label={isEs ? `Favoritos (${favorites.length})` : `Favorites (${favorites.length})`}
            >
              <Heart size={17} />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </Link>

            {/* Compare Indicator */}
            {compareCount > 0 && (
              <Link
                to="/comparator"
                className="hidden sm:flex h-9 items-center gap-1.5 rounded-xl border border-accent/30 bg-accent/10 px-3 text-xs font-medium text-accent transition-all hover:bg-accent/20"
                aria-label={isEs ? `Comparar (${compareCount} juegos seleccionados)` : `Compare (${compareCount} games selected)`}
              >
                <GitCompare size={13} />
                {compareCount}/2
              </Link>
            )}

            <button
              onClick={() => setThemeStudioOpen(true)}
              className="hidden md:flex h-9 items-center gap-2 rounded-xl border border-border-subtle bg-surface-glass px-3 text-xs font-semibold tracking-wide text-text-primary transition-all hover:border-border-strong hover:bg-surface-panel"
              aria-label={isEs ? 'Experiencia de juego' : 'Gaming Experience'}
            >
              <Sparkles size={14} className="text-accent" />
              <span className="hidden xl:inline">{isEs ? 'Experiencia de juego' : 'Gaming Experience'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-glass transition-all"
              aria-label={theme === 'dark' ? text.header.themeLight : text.header.themeDark}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <div
              className="hidden sm:flex h-9 items-center rounded-xl border border-border-subtle bg-surface-glass p-0.5"
              role="group"
              aria-label={isEs ? 'Selector de idioma' : 'Language switch'}
            >
              <button
                onClick={() => setLanguage('es')}
                className={cn(
                  'h-7 rounded-lg px-2.5 text-[11px] font-bold transition-all',
                  language === 'es'
                    ? 'bg-accent text-text-inverse shadow-sm'
                    : 'text-text-muted hover:text-text-primary',
                )}
                aria-label="Cambiar a espanol"
                aria-pressed={language === 'es'}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  'h-7 rounded-lg px-2.5 text-[11px] font-bold transition-all',
                  language === 'en'
                    ? 'bg-accent text-text-inverse shadow-sm'
                    : 'text-text-muted hover:text-text-primary',
                )}
                aria-label="Switch to English"
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-glass transition-all lg:hidden"
              aria-label={text.header.menu}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Search Bar (expandable) */}
        {searchOpen && (
          <div className="overflow-hidden border-t border-border-subtle bg-bg-primary/95 backdrop-blur-xl">
            <form
              onSubmit={handleSearch}
              className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8"
            >
              <Input
                type="search"
                placeholder={text.header.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={15} />}
                className="max-w-lg"
                autoFocus
                aria-label={text.header.search}
              />
            </form>
          </div>
        )}
      </header>

      <ThemeStudio isOpen={themeStudioOpen} onClose={() => setThemeStudioOpen(false)} />

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            className="fixed right-0 top-0 bottom-0 z-40 w-72 overflow-y-auto bg-surface-2 border-l border-border-subtle p-6 pt-20 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="space-y-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                      isActive
                        ? 'bg-accent/15 text-accent'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-glass',
                    )
                  }
                >
                  <Icon size={17} />
                  {label}
                </NavLink>
              ))}
              <div className="my-3 border-t border-border-subtle" />
              <NavLink
                to="/favorites"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    isActive ? 'bg-accent/15 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-surface-glass',
                  )
                }
              >
                <Heart size={17} />
                {text.header.favorites}
                {favorites.length > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                    {favorites.length}
                  </span>
                )}
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    isActive ? 'bg-accent/15 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-surface-glass',
                  )
                }
              >
                {text.header.about}
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    isActive ? 'bg-accent/15 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-surface-glass',
                  )
                }
              >
                {text.header.contact}
              </NavLink>

              <div className="mt-4 flex rounded-xl border border-border-subtle bg-surface-glass p-1" role="group" aria-label={isEs ? 'Selector de idioma' : 'Language switch'}>
                <button
                  onClick={() => setLanguage('es')}
                  className={cn(
                    'h-8 w-1/2 rounded-lg text-xs font-bold transition-all',
                    language === 'es' ? 'bg-accent text-text-inverse' : 'text-text-muted hover:text-text-primary',
                  )}
                  aria-pressed={language === 'es'}
                  aria-label="Cambiar a espanol"
                >
                  ES
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    'h-8 w-1/2 rounded-lg text-xs font-bold transition-all',
                    language === 'en' ? 'bg-accent text-text-inverse' : 'text-text-muted hover:text-text-primary',
                  )}
                  aria-pressed={language === 'en'}
                  aria-label="Switch to English"
                >
                  EN
                </button>
              </div>
            </div>
          </nav>
        </>
      )}

    </>
  )
}
