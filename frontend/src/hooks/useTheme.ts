import { useEffect } from 'react'
import { useAppStore } from '@/store'
import { getThemePreset } from '@/theme'

/**
 * useTheme — sync theme class to <html> on mount and store change
 */
export function useTheme() {
  const theme = useAppStore((s) => s.theme)
  const experience = useAppStore((s) => s.experience)
  const cardSize = useAppStore((s) => s.cardSize)
  const density = useAppStore((s) => s.density)
  const animationSpeed = useAppStore((s) => s.animationSpeed)
  const dynamicBackground = useAppStore((s) => s.dynamicBackground)
  const compactMode = useAppStore((s) => s.compactMode)
  const immersiveMode = useAppStore((s) => s.immersiveMode)
  const premiumEffects = useAppStore((s) => s.premiumEffects)
  const setTheme = useAppStore((s) => s.setTheme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)

  useEffect(() => {
    const preset = getThemePreset(experience)
    const root = document.documentElement
    const body = document.body
    const isDark = theme === 'dark'
    const preferenceDurations = {
      fast: '220ms',
      normal: '360ms',
      slow: '560ms',
    }

    root.classList.toggle('dark', isDark)
    root.classList.toggle('light', !isDark)
    root.dataset.experience = experience
    root.dataset.scheme = theme
    root.dataset.cardSize = cardSize
    root.dataset.density = density
    root.dataset.animationSpeed = animationSpeed
    root.dataset.dynamicBackground = String(dynamicBackground)
    root.dataset.compact = String(compactMode)
    root.dataset.immersive = String(immersiveMode)
    root.dataset.premiumEffects = String(premiumEffects)
    root.style.colorScheme = theme
    root.style.setProperty('--theme-transition-duration', preferenceDurations[animationSpeed])
    root.style.setProperty('--theme-motion-duration', preferenceDurations[animationSpeed])
    root.style.setProperty('--theme-card-padding', cardSize === 'sm' ? '0.875rem' : cardSize === 'lg' ? '1.25rem' : '1rem')
    root.style.setProperty('--theme-ambient-strength', dynamicBackground ? '0.82' : '0.46')
    root.style.setProperty('--theme-background-blur', premiumEffects ? '24px' : '12px')
    root.style.setProperty('--theme-section-gap', density === 'compact' ? '1rem' : density === 'immersive' ? '2rem' : '1.5rem')

    Object.entries(preset.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    if (theme === 'light') {
      root.style.setProperty('--color-bg-primary', '#F0F0F8')
      root.style.setProperty('--color-bg-secondary', '#E8E8F0')
      root.style.setProperty('--color-surface-1', '#E8E8F0')
      root.style.setProperty('--color-surface-2', '#FFFFFF')
      root.style.setProperty('--color-surface-3', '#F4F4FC')
      root.style.setProperty('--color-text-primary', '#0A0A1F')
      root.style.setProperty('--color-text-secondary', '#2A2A4F')
      root.style.setProperty('--color-text-muted', '#6B6B8F')
      root.style.setProperty('--color-border-subtle', 'rgba(10, 10, 31, 0.08)')
      root.style.setProperty('--color-border-strong', 'rgba(10, 10, 31, 0.14)')
      root.style.setProperty('--color-surface-glass', 'rgba(255, 255, 255, 0.7)')
      root.style.setProperty('--color-surface-panel', 'rgba(255, 255, 255, 0.9)')
      root.style.setProperty('--color-overlay', 'rgba(255, 255, 255, 0.6)')
    }

    body.dataset.themeExperience = experience
    body.dataset.dynamicBackground = String(dynamicBackground)
    body.dataset.compact = String(compactMode)
    body.dataset.immersive = String(immersiveMode)
    body.dataset.premiumEffects = String(premiumEffects)
  }, [animationSpeed, cardSize, compactMode, density, dynamicBackground, experience, immersiveMode, premiumEffects, theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [setTheme])

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' }
}
