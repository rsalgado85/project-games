import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  AnimationSpeed,
  CardSize,
  Density,
  FavoriteGame,
  HistoryEntry,
  Theme,
  ThemeExperience,
  Game,
} from '@/types'

// ============================================================
// App Store — Zustand global state
// ============================================================

interface AppState {
  // ── Theme ──────────────────────────────────────────────────
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  experience: ThemeExperience
  setExperience: (experience: ThemeExperience) => void

  cardSize: CardSize
  setCardSize: (size: CardSize) => void

  density: Density
  setDensity: (density: Density) => void

  animationSpeed: AnimationSpeed
  setAnimationSpeed: (speed: AnimationSpeed) => void

  dynamicBackground: boolean
  setDynamicBackground: (enabled: boolean) => void

  compactMode: boolean
  setCompactMode: (enabled: boolean) => void

  immersiveMode: boolean
  setImmersiveMode: (enabled: boolean) => void

  premiumEffects: boolean
  setPremiumEffects: (enabled: boolean) => void

  resetVisualPreferences: () => void

  // ── Language ───────────────────────────────────────────────
  language: 'es' | 'en'
  setLanguage: (language: 'es' | 'en') => void
  toggleLanguage: () => void

  // ── Favorites ──────────────────────────────────────────────
  favorites: FavoriteGame[]
  addFavorite: (game: Game) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  clearFavorites: () => void

  // ── Recent History ─────────────────────────────────────────
  history: HistoryEntry[]
  addToHistory: (game: Game) => void
  removeFromHistory: (id: number) => void
  clearHistory: () => void

  // ── Comparator ─────────────────────────────────────────────
  compareSlots: [Game | null, Game | null]
  addToCompare: (game: Game) => boolean // returns false if slots full
  removeFromCompare: (id: number) => void
  clearCompare: () => void
  isInCompare: (id: number) => boolean
}

const MAX_HISTORY = 30
const MAX_COMPARE_SLOTS = 2
const DEFAULT_THEME_EXPERIENCE: ThemeExperience = 'xbox'

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── Theme ──────────────────────────────────────────────
      theme:
        typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',

      setTheme: (theme) => {
        if (get().theme === theme) return
        set({ theme })
      },

      toggleTheme: () => {
        const next: Theme = get().theme === 'dark' ? 'light' : 'dark'
        get().setTheme(next)
      },

      experience: DEFAULT_THEME_EXPERIENCE,

      setExperience: (experience) => {
        if (get().experience === experience) return
        set({ experience })
      },

      cardSize: 'md',

      setCardSize: (cardSize) => {
        if (get().cardSize === cardSize) return
        set({ cardSize })
      },

      density: 'balanced',

      setDensity: (density) => {
        if (get().density === density) return
        set({ density })
      },

      animationSpeed: 'normal',

      setAnimationSpeed: (animationSpeed) => {
        if (get().animationSpeed === animationSpeed) return
        set({ animationSpeed })
      },

      dynamicBackground: true,

      setDynamicBackground: (dynamicBackground) => set({ dynamicBackground }),

      compactMode: false,

      setCompactMode: (compactMode) => set({ compactMode }),

      immersiveMode: false,

      setImmersiveMode: (immersiveMode) => set({ immersiveMode }),

      premiumEffects: true,

      setPremiumEffects: (premiumEffects) => set({ premiumEffects }),

      resetVisualPreferences: () =>
        set({
          experience: DEFAULT_THEME_EXPERIENCE,
          cardSize: 'md',
          density: 'balanced',
          animationSpeed: 'normal',
          dynamicBackground: true,
          compactMode: false,
          immersiveMode: false,
          premiumEffects: true,
        }),

      // ── Language ───────────────────────────────────────────
      language: 'es',

      setLanguage: (language) => {
        if (get().language === language) return
        set({ language })
      },

      toggleLanguage: () => {
        const next = get().language === 'es' ? 'en' : 'es'
        get().setLanguage(next)
      },

      // ── Favorites ──────────────────────────────────────────
      favorites: [],

      addFavorite: (game) => {
        const existing = get().favorites.find((f) => f.id === game.id)
        if (existing) return

        const favorite: FavoriteGame = {
          id: game.id,
          name: game.name,
          slug: game.slug,
          background_image: game.background_image,
          rating: game.rating,
          genres: game.genres,
          addedAt: new Date().toISOString(),
        }

        set((state) => ({ favorites: [favorite, ...state.favorites] }))
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        }))
      },

      isFavorite: (id) => get().favorites.some((f) => f.id === id),

      clearFavorites: () => set({ favorites: [] }),

      // ── History ────────────────────────────────────────────
      history: [],

      addToHistory: (game) => {
        const entry: HistoryEntry = {
          id: game.id,
          name: game.name,
          slug: game.slug,
          background_image: game.background_image,
          rating: game.rating,
          visitedAt: new Date().toISOString(),
        }

        set((state) => {
          // Remove existing duplicate, then prepend
          const filtered = state.history.filter((h) => h.id !== game.id)
          return {
            history: [entry, ...filtered].slice(0, MAX_HISTORY),
          }
        })
      },

      removeFromHistory: (id) => {
        set((state) => ({
          history: state.history.filter((h) => h.id !== id),
        }))
      },

      clearHistory: () => set({ history: [] }),

      // ── Comparator ─────────────────────────────────────────
      compareSlots: [null, null],

      addToCompare: (game) => {
        const slots = get().compareSlots
        const alreadyIn = slots.some((s) => s?.id === game.id)
        if (alreadyIn) return true

        if (slots[0] === null) {
          set({ compareSlots: [game, slots[1]] })
          return true
        }
        if (slots[1] === null) {
          set({ compareSlots: [slots[0], game] })
          return true
        }
        return false // Both slots full
      },

      removeFromCompare: (id) => {
        const slots = get().compareSlots
        set({
          compareSlots: [
            slots[0]?.id === id ? null : slots[0],
            slots[1]?.id === id ? null : slots[1],
          ],
        })
      },

      clearCompare: () => set({ compareSlots: [null, null] }),

      isInCompare: (id) => get().compareSlots.some((s) => s?.id === id),
    }),
    {
      name: 'gamevault-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        experience: state.experience,
        cardSize: state.cardSize,
        density: state.density,
        animationSpeed: state.animationSpeed,
        dynamicBackground: state.dynamicBackground,
        compactMode: state.compactMode,
        immersiveMode: state.immersiveMode,
        premiumEffects: state.premiumEffects,
        language: state.language,
        favorites: state.favorites,
        history: state.history,
        compareSlots: state.compareSlots,
      }),
    },
  ),
)

// ── Derived selectors ──────────────────────────────────────
export const useFavorites = () => useAppStore((s) => s.favorites)
export const useHistory = () => useAppStore((s) => s.history)
export const useTheme = () => useAppStore((s) => s.theme)
export const useLanguage = () => useAppStore((s) => s.language)
export const useCompareSlots = () => useAppStore((s) => s.compareSlots)

// Re-export MAX constant for use in UI
export { MAX_COMPARE_SLOTS }
