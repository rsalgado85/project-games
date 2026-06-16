import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Heart,
  Coffee,
  ArrowRight,
  Shield,
  Zap,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PageTransition, FadeIn } from '@/components/ui/Animations'
import { useI18n } from '@/i18n'
import { cn } from '@/utils/helpers'

const PRESET_AMOUNTS = [5, 10, 25, 50, 100]

const BENEFITS = [
  {
    icon: Shield,
    es: 'Sin anuncios ni venta de datos',
    en: 'No ads, no data selling',
  },
  {
    icon: Zap,
    es: 'Actualizaciones continuas',
    en: 'Continuous updates',
  },
  {
    icon: Globe,
    es: 'Acceso gratuito para todos',
    en: 'Free access for everyone',
  },
]

export default function DonatePage() {
  const text = useI18n()
  const [selectedAmount, setSelectedAmount] = useState<number>(10)
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [donated, setDonated] = useState(false)

  const isCustom = customAmount !== ''
  const effectiveAmount = isCustom ? Number(customAmount) : selectedAmount
  const isValid = effectiveAmount > 0 && !Number.isNaN(effectiveAmount)

  const handleDonate = () => {
    if (!isValid) return
    const amount = effectiveAmount
    const freq = frequency === 'monthly' ? 'mensual' : 'única'
    const currency = 'USD'
    const message = encodeURIComponent(
      `Hola Robinson, quiero apoyar GameVault con una donación ${freq} de $${amount} ${currency}.`,
    )
    window.open(
      `https://wa.me/18095551234?text=${message}`,
      '_blank',
      'noopener noreferrer',
    )
    setDonated(true)
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '')
    setCustomAmount(val)
    if (val) setSelectedAmount(0)
  }

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  if (donated) {
    return (
      <PageTransition>
        <Helmet>
          <title>{text.donate.thankYouTitle} — GameVault</title>
        </Helmet>
        <div className="mx-auto flex max-w-lg flex-col items-center px-4 pt-32 pb-20 text-center sm:px-6">
          <FadeIn>
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/15 shadow-lg shadow-emerald-500/20">
              <Heart size={36} className="text-emerald-400 fill-emerald-400/30" />
            </div>
            <h1 className="text-3xl font-black text-text-primary sm:text-4xl">
              {text.donate.thankYouTitle}
            </h1>
            <p className="mt-4 max-w-md text-text-muted leading-relaxed">
              {text.donate.thankYouMessage}
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="mt-8"
              onClick={() => setDonated(false)}
            >
              {text.donate.donateAgain}
            </Button>
          </FadeIn>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{text.header.donate} — GameVault</title>
        <meta name="description" content={text.donate.summary} />
      </Helmet>

      <div className="mx-auto max-w-screen-lg px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <FadeIn>
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-black text-text-primary sm:text-5xl">
              {text.donate.title}
            </h1>
            <p className="mt-3 text-lg text-accent font-semibold">
              {text.donate.subtitle}
            </p>
            <p className="mt-4 max-w-xl mx-auto text-text-muted leading-relaxed">
              {text.donate.summary}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Donation Form */}
          <FadeIn delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl border border-border-subtle bg-surface-2 p-7">
              {/* Frequency Toggle */}
              <div className="mb-7 flex rounded-xl border border-border-subtle bg-surface-3 p-1">
                <button
                  onClick={() => setFrequency('once')}
                  className={cn(
                    'flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all',
                    frequency === 'once'
                      ? 'bg-accent text-white shadow-md'
                      : 'text-text-muted hover:text-text-primary',
                  )}
                >
                  {text.donate.oneTime}
                </button>
                <button
                  onClick={() => setFrequency('monthly')}
                  className={cn(
                    'flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all',
                    frequency === 'monthly'
                      ? 'bg-accent text-white shadow-md'
                      : 'text-text-muted hover:text-text-primary',
                  )}
                >
                  {text.donate.monthly}
                </button>
              </div>

              {/* Preset Amounts */}
              <p className="mb-4 text-sm font-semibold text-text-secondary">
                {text.donate.selectAmount}
              </p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {PRESET_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handlePresetClick(amount)}
                    className={cn(
                      'rounded-xl border-2 py-3 text-center font-bold transition-all duration-200',
                      selectedAmount === amount && !isCustom
                        ? 'border-accent bg-accent/15 text-accent shadow-md shadow-accent/10 scale-105'
                        : 'border-border-subtle bg-surface-3 text-text-secondary hover:border-border-strong hover:text-text-primary',
                    )}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mt-5">
                <Input
                  label={text.donate.customAmount}
                  type="text"
                  inputMode="decimal"
                  placeholder="$0.00"
                  value={customAmount}
                  onChange={handleCustomChange}
                  icon={<span className="text-text-muted font-semibold">$</span>}
                />
              </div>

              {/* Donate Button */}
              <Button
                fullWidth
                size="lg"
                className="mt-7"
                disabled={!isValid}
                onClick={handleDonate}
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                {text.donate.donateButton} ${effectiveAmount || '—'}
                {frequency === 'monthly' ? '/mes' : ''}
              </Button>
            </div>
          </FadeIn>

          {/* Why Donate + Benefits */}
          <FadeIn delay={0.15} className="lg:col-span-2">
            <div className="space-y-5">
              {/* Why Donate */}
              <div className="rounded-2xl border border-border-subtle bg-surface-2 p-6">
                <div className="mb-3 flex items-center gap-2.5">
                  <Coffee size={18} className="text-accent" />
                  <h2 className="font-bold text-text-primary">{text.donate.whyDonate}</h2>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  {text.donate.whyDonateText}
                </p>
              </div>

              {/* Benefits */}
              <div className="rounded-2xl border border-border-subtle bg-surface-2 p-6">
                <h3 className="mb-4 text-sm font-semibold text-text-secondary">
                  Con tu apoyo
                </h3>
                <ul className="space-y-3">
                  {BENEFITS.map(({ icon: Icon, es }) => (
                    <li key={es} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/15">
                        <Icon size={13} className="text-emerald-400" />
                      </div>
                      <span className="text-sm text-text-secondary">{es}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  )
}
