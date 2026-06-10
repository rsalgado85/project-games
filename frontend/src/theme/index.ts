import type { ThemeExperience } from '@/types'
import { xboxTheme } from './xbox'
import { playstationTheme } from './playstation'
import { steamTheme } from './steam'
import { epicTheme } from './epic'
import { nintendoTheme } from './nintendo'
import { cyberpunkTheme } from './cyberpunk'
import { esportsTheme } from './esports'
import type { ThemeTokens } from './types'

export const themePresets = [
  xboxTheme,
  playstationTheme,
  steamTheme,
  epicTheme,
  nintendoTheme,
  cyberpunkTheme,
  esportsTheme,
] as const satisfies readonly ThemeTokens[]

const themeById = Object.fromEntries(themePresets.map((theme) => [theme.id, theme])) as Record<
  ThemeExperience,
  ThemeTokens
>

export function getThemePreset(experience: ThemeExperience): ThemeTokens {
  return themeById[experience] ?? xboxTheme
}

export function getThemeOptions() {
  return themePresets.map(({ id, label, description, idealFor, transition }) => ({
    id,
    label,
    description,
    idealFor,
    transition,
  }))
}
