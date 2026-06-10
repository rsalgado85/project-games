import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, MessageSquare, Send, MapPin, Github, Linkedin } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { contactService } from '@/services/gamesService'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { PageTransition, FadeIn } from '@/components/ui/Animations'
import toast from 'react-hot-toast'
import type { ContactFormData } from '@/types'
import { useI18n } from '@/i18n'

const INITIAL_FORM: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

type FormErrors = Partial<Record<keyof ContactFormData, string>>

function validateForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required'
  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email address'
  if (!data.subject.trim()) errors.subject = 'Subject is required'
  if (!data.message.trim()) errors.message = 'Message is required'
  else if (data.message.trim().length < 20) errors.message = 'Message must be at least 20 characters'
  return errors
}

export default function ContactPage() {
  const text = useI18n()
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [sent, setSent] = useState(false)

  const mutation = useMutation({
    mutationFn: contactService.sendMessage,
    onSuccess: () => {
      setSent(true)
      setForm(INITIAL_FORM)
      toast.success("Message sent! I'll get back to you soon.")
    },
    onError: () => {
      toast.error('Failed to send message. Please try again.')
    },
  })

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    mutation.mutate(form)
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{text.header.contact} — GameVault</title>
        <meta name="description" content={text.contact.summary} />
      </Helmet>

      <div className="mx-auto max-w-screen-lg px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-black text-text-primary sm:text-5xl">{text.contact.title}</h1>
            <p className="mt-4 text-text-muted max-w-lg mx-auto">
              {text.contact.summary}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Info */}
          <FadeIn delay={0.1} className="lg:col-span-2">
            <div className="space-y-5">
              <ContactInfo
                icon={<Mail size={18} />}
                label={text.contact.email}
                value="rsalgado85@gmail.com"
                href="mailto:rsalgado85@gmail.com"
              />
              <ContactInfo
                icon={<MapPin size={18} />}
                label={text.contact.location}
                value="Santo Domingo, Dominican Republic"
              />
              <ContactInfo
                icon={<Github size={18} />}
                label={text.contact.github}
                value="github.com/rsalgado85"
                href="https://github.com/rsalgado85"
              />
              <ContactInfo
                icon={<Linkedin size={18} />}
                label={text.contact.linkedin}
                value="linkedin.com/in/robinsonsalgado"
                href="https://www.linkedin.com/in/robinsonsalgado/"
              />
            </div>

            {/* Availability */}
            <div className="mt-8 rounded-2xl border border-emerald-500/25 bg-emerald-500/8 p-5">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-400">{text.contact.availability}</span>
              </div>
              <p className="mt-2 text-xs text-text-muted">
                {text.contact.availabilityNote}
              </p>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.15} className="lg:col-span-3">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-emerald-500/25 bg-surface-2 p-10 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
                  <MessageSquare size={28} />
                </div>
                <h2 className="text-xl font-bold text-text-primary">Mensaje enviado</h2>
                <p className="mt-2 text-sm text-text-muted">
                  Gracias por escribir. Te responderé dentro de 24 horas.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-6"
                  onClick={() => setSent(false)}
                >
                  Enviar otro
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-white/8 bg-surface-2 p-7"
                aria-label="Contact form"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    label="Nombre"
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={handleChange('name')}
                    error={errors.name}
                    required
                    autoComplete="name"
                  />
                  <Input
                    label="Correo"
                    type="email"
                    placeholder="tu@correo.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    error={errors.email}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="mt-5">
                  <Input
                    label="Asunto"
                    placeholder="¿De qué se trata?"
                    value={form.subject}
                    onChange={handleChange('subject')}
                    error={errors.subject}
                    required
                  />
                </div>
                <div className="mt-5">
                  <Textarea
                    label="Mensaje"
                    placeholder="Cuéntame sobre tu proyecto, idea o simplemente saluda…"
                    value={form.message}
                    onChange={handleChange('message')}
                    error={errors.message}
                    rows={6}
                    required
                  />
                </div>
                <div className="mt-6">
                  <Button
                    type="submit"
                    fullWidth
                    loading={mutation.isPending}
                    icon={<Send size={15} />}
                    iconPosition="right"
                    size="lg"
                  >
                    {mutation.isPending ? 'Enviando…' : 'Enviar mensaje'}
                  </Button>
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  )
}

function ContactInfo({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-surface-2 p-4 hover:border-white/20 transition-all">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-sm font-medium text-text-primary truncate">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }

  return content
}
