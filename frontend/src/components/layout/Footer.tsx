import { Link } from 'react-router-dom'
import { Gamepad2, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react'
import { useI18n } from '@/i18n'

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/rsalgado85' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/robinsonsalgado' },
  { icon: Twitter, label: 'X', href: 'https://x.com/robinsonsalgado' },
]

export function Footer() {
  const text = useI18n()
  const footerLinks = [
    {
      category: text.footer.discover,
      links: [
        { label: text.footer.trending, to: '/' },
        { label: text.footer.popular, to: '/popular' },
        { label: text.footer.topRated, to: '/top-rated' },
        { label: text.footer.upcoming, to: '/upcoming' },
      ],
    },
    {
      category: text.footer.explore,
      links: [
        { label: text.footer.allGames, to: '/games' },
        { label: text.footer.compare, to: '/comparator' },
        { label: text.footer.favorites, to: '/favorites' },
      ],
    },
    {
      category: text.footer.about,
      links: [
        { label: text.footer.aboutMe, to: '/about' },
        { label: text.footer.contact, to: '/contact' },
      ],
    },
  ]

  return (
    <footer className="mt-20 border-t border-border-subtle bg-bg-primary">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 font-bold text-text-primary">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 shadow-lg shadow-accent/30">
                <Gamepad2 size={16} className="text-text-inverse" />
              </div>
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                GameVault
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-text-muted leading-relaxed">
              {text.footer.description}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle text-text-muted hover:border-border-strong hover:text-text-primary transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map(({ category, links }) => (
            <div key={category}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-text-muted hover:text-text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} GameVault.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span>{text.footer.poweredBy}</span>
            <a
              href="https://rawg.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors"
            >
              RAWG API <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
