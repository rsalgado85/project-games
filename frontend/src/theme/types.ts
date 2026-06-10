import type { ThemeExperience } from '@/types'

export type ThemeVariables = Record<`--${string}`, string>

export interface ThemeTokens {
  id: ThemeExperience
  label: string
  description: string
  idealFor: string[]
  transition: 'fade' | 'blur' | 'morph' | 'slide'
  variables: ThemeVariables
}
