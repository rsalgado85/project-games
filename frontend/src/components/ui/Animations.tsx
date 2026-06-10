import type { ReactNode } from 'react'

// ── Fade In ───────────────────────────────────────────────────
interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({ children, delay = 0, duration = 0.4, className }: FadeInProps) {
  return (
    <div className={className} data-delay={delay} data-duration={duration}>
      {children}
    </div>
  )
}

// ── Stagger Container ─────────────────────────────────────────
interface StaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ children, className, staggerDelay = 0.08 }: StaggerProps) {
  return (
    <div className={className} data-stagger-delay={staggerDelay}>
      {children}
    </div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

// ── Scale In ──────────────────────────────────────────────────
export function ScaleIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <div className={className} data-delay={delay}>
      {children}
    </div>
  )
}

// ── Slide In ──────────────────────────────────────────────────
interface SlideInProps extends FadeInProps {
  direction?: 'left' | 'right' | 'up' | 'down'
}

export function SlideIn({ children, direction = 'up', delay = 0, className }: SlideInProps) {
  return (
    <div className={className} data-direction={direction} data-delay={delay}>
      {children}
    </div>
  )
}

// ── Page Transition ──────────────────────────────────────────
export function PageTransition({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
