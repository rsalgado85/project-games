import { Helmet } from 'react-helmet-async'
import {
  Github, Linkedin, Mail, Download, ExternalLink, Code2, Server, Database,
  Terminal, Globe, Zap, Award, Briefcase, GraduationCap, Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PageTransition, FadeIn } from '@/components/ui/Animations'
import { useI18n } from '@/i18n'

const SKILLS = {
  Leadership: ['Engineering Leadership', 'Technology Management', 'Agile Delivery', 'Mentoring'],
  Architecture: ['Software Architecture', 'Microservices', 'API Design', 'Enterprise Integration'],
  Cloud: ['Azure', 'AWS', 'Cloud Architecture', 'Cost Optimization', 'Security'],
  Stack: ['React', 'Angular', 'PHP', 'Laravel', 'Python', '.NET', 'SQL Server', 'Docker'],
}

const EXPERIENCE = [
  {
    role: 'Technology Development Manager',
    company: 'VOPM',
    period: '2025 — 2026',
    description:
      'Led technology strategy, software engineering, and cloud architecture programs focused on measurable business outcomes.',
    tags: ['Leadership', 'Architecture', 'Azure', 'AI'],
  },
  {
    role: 'Application Manager',
    company: 'MIO',
    period: '2024 — 2025',
    description:
      'Owned application portfolio modernization and operational excellence initiatives across critical business systems.',
    tags: ['Modernization', 'Operations', 'Architecture'],
  },
  {
    role: 'Software Development & Programming Manager',
    company: 'Banco Ademi',
    period: '2022 — 2024',
    description:
      'Directed software engineering, digital channels, and core integrations in banking environments with high compliance standards.',
    tags: ['Fintech', 'Banking', 'Integrations'],
  },
]

const STATS = [
  { label: 'Years Experience', value: '18+', icon: Briefcase },
  { label: 'Engineering Teams Led', value: '10+', icon: Code2 },
  { label: 'Enterprise Projects', value: '50+', icon: Zap },
  { label: 'Solutions Delivered', value: '100+', icon: Github },
]

export default function AboutPage() {
  const text = useI18n()

  return (
    <PageTransition>
      <Helmet>
        <title>{text.about.title} — GameVault</title>
        <meta name="description" content={text.about.summary} />
      </Helmet>

      <div className="mx-auto max-w-screen-lg px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <FadeIn>
          <div className="mb-16 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-6">
              <div className="h-28 w-28 overflow-hidden rounded-3xl border-2 border-white/15 bg-gradient-to-br from-accent/40 to-accent-2/40 shadow-2xl shadow-accent/20">
                <div className="flex h-full w-full items-center justify-center text-5xl">👨‍💻</div>
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 shadow-lg">
                <span className="text-xs font-bold text-white">✓</span>
              </div>
            </div>

            <h1 className="text-4xl font-black text-text-primary sm:text-5xl">Robinson Salgado</h1>
            <p className="mt-3 text-lg text-accent font-semibold">
              {text.about.subtitle}
            </p>
            <p className="mt-4 max-w-xl text-text-muted leading-relaxed">
              {text.about.summary}
            </p>

            {/* Social Links */}
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                as="a"
                href="https://github.com/rsalgado85"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                icon={<Github size={15} />}
              >
                GitHub
              </Button>
              <Button
                as="a"
                href="https://www.linkedin.com/in/robinsonsalgado/"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                icon={<Linkedin size={15} />}
              >
                LinkedIn
              </Button>
              <Button
                as="a"
                href="mailto:rsalgado85@gmail.com"
                variant="secondary"
                size="sm"
                icon={<Mail size={15} />}
              >
                Email
              </Button>
              <Button
                as="a"
                href="https://robinson-salgado.vercel.app/"
                target="_blank"
                size="sm"
                icon={<Download size={15} />}
                className="shadow-lg shadow-accent/20"
              >
                {text.about.viewResume}
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/8 bg-surface-2 p-5 text-center hover:border-white/20 transition-all"
              >
                <Icon size={20} className="mx-auto mb-3 text-accent" />
                <p className="text-2xl font-black text-text-primary">{value}</p>
                <p className="mt-1 text-xs text-text-muted">{label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Skills */}
        <FadeIn delay={0.15}>
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-text-primary">{text.about.skillsTitle}</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {Object.entries(SKILLS).map(([category, skills]) => {
                const icons: Record<string, typeof Code2> = {
                  Leadership: Briefcase,
                  Architecture: Server,
                  Cloud: Database,
                  Stack: Terminal,
                }
                const Icon = icons[category] ?? Code2
                return (
                  <div
                    key={category}
                    className="rounded-2xl border border-white/8 bg-surface-2 p-5 hover:border-white/20 transition-all"
                  >
                    <div className="mb-4 flex items-center gap-2.5">
                      <Icon size={16} className="text-accent" />
                      <h3 className="font-semibold text-text-primary">{category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="accent" size="sm">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </FadeIn>

        {/* Experience */}
        <FadeIn delay={0.2}>
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-text-primary">{text.about.experienceTitle}</h2>
            <div className="space-y-4">
              {EXPERIENCE.map((exp) => (
                <div key={exp.role} className="rounded-2xl border border-white/8 bg-surface-2 p-6 hover:border-white/20 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-text-primary">{exp.role}</h3>
                      <p className="text-sm text-accent font-medium">{exp.company}</p>
                    </div>
                    <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-text-muted">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <Badge key={tag} size="sm">{tag}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* This Project */}
        <FadeIn delay={0.25}>
          <section className="rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/10 to-accent-2/5 p-8 text-center">
            <div className="mb-4 flex justify-center">
              <Heart size={32} className="text-accent fill-accent/30" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary">{text.about.projectTitle}</h2>
            <p className="mt-3 text-text-secondary leading-relaxed max-w-lg mx-auto">
              {text.about.projectSummary}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {['React 19', 'TypeScript', 'TanStack Query', 'Zustand', 'RAWG API', 'Vercel'].map((t) => (
                <Badge key={t} variant="accent" size="sm">{t}</Badge>
              ))}
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              View Source Code <ExternalLink size={13} />
            </a>
          </section>
        </FadeIn>
      </div>
    </PageTransition>
  )
}
