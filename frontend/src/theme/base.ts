import type { ThemeTokens } from './types'

export const sharedThemeVariables = {
  '--color-border-subtle': 'rgba(255, 255, 255, 0.08)',
  '--color-border-strong': 'rgba(255, 255, 255, 0.14)',
  '--color-surface-glass': 'rgba(255, 255, 255, 0.05)',
  '--color-surface-panel': 'rgba(255, 255, 255, 0.08)',
  '--color-overlay': 'rgba(0, 0, 0, 0.64)',
  '--color-text-inverse': '#FFFFFF',
  '--theme-card-padding': '1rem',
  '--theme-card-radius': '1.25rem',
  '--theme-section-gap': '1.5rem',
  '--theme-transition-duration': '280ms',
  '--theme-motion-duration': '220ms',
  '--theme-ambient-strength': '0.65',
  '--theme-background-blur': '24px',
}

export function createThemeTokens(theme: ThemeTokens): ThemeTokens {
  return {
    ...theme,
    variables: {
      ...sharedThemeVariables,
      ...theme.variables,
    },
  }
}
