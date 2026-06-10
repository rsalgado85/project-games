// ============================================================
// Core Domain Types
// ============================================================

export interface Platform {
  id: number
  name: string
  slug: string
}

export interface Genre {
  id: number
  name: string
  slug: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface Developer {
  id: number
  name: string
  slug: string
}

export interface Publisher {
  id: number
  name: string
  slug: string
}

export interface Screenshot {
  id: number
  image: string
  width: number
  height: number
}

export interface StoreLink {
  id: number
  url: string
  store: {
    id: number
    name: string
    slug: string
  }
}

export interface MetacriticPlatform {
  metascore: number
  url: string
  platform: {
    id: number
    name: string
    slug: string
  }
}

export interface Rating {
  id: number
  title: string
  count: number
  percent: number
}

export interface GameMovie {
  id: number
  name: string
  preview: string
  data: {
    '480'?: string
    max?: string
  }
}

// ============================================================
// Game Types
// ============================================================

export interface Game {
  id: number
  name: string
  slug: string
  background_image: string | null
  released: string | null
  rating: number
  rating_top: number
  ratings_count: number
  metacritic: number | null
  playtime: number
  genres: Genre[]
  platforms: Array<{ platform: Platform }>
  tags: Tag[]
  short_screenshots?: Screenshot[]
  esrb_rating?: {
    id: number
    name: string
    slug: string
  } | null
  added?: number
  suggestions_count?: number
}

export interface GameDetail extends Game {
  description_raw: string
  description: string
  website: string | null
  reddit_url: string | null
  reddit_name: string | null
  metacritic_url: string | null
  metacritic_platforms: MetacriticPlatform[]
  ratings: Rating[]
  screenshots: Screenshot[]
  stores: StoreLink[]
  developers: Developer[]
  publishers: Publisher[]
  clip?: {
    clip: string
    preview: string
  } | null
  achievements_count: number
  game_series_count: number
  movies_count: number
  creators_count: number
  additions_count: number
  parents_count: number
  updated: string
}

// ============================================================
// API Response Types
// ============================================================

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface GamesResponse extends PaginatedResponse<Game> {}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

// ============================================================
// Filter & Search Types
// ============================================================

export interface GameFilters {
  q?: string
  page?: number
  page_size?: number
  platforms?: string
  genres?: string
  ordering?: GameOrdering
  dates?: string
  tags?: string
  metacritic?: string
}

export type GameOrdering =
  | '-added'
  | '-rating'
  | '-metacritic'
  | '-released'
  | 'released'
  | '-updated'
  | 'name'
  | '-name'
  | 'rating'
  | 'metacritic'

// ============================================================
// UI & App State Types
// ============================================================

export type Theme = 'dark' | 'light'
export type ThemeExperience =
  | 'xbox'
  | 'playstation'
  | 'steam'
  | 'epic'
  | 'nintendo'
  | 'cyberpunk'
  | 'esports'

export type CardSize = 'sm' | 'md' | 'lg'
export type Density = 'compact' | 'balanced' | 'immersive'
export type AnimationSpeed = 'fast' | 'normal' | 'slow'

export interface FavoriteGame {
  id: number
  name: string
  slug: string
  background_image: string | null
  rating: number
  genres: Genre[]
  addedAt: string
}

export interface HistoryEntry {
  id: number
  name: string
  slug: string
  background_image: string | null
  rating: number
  visitedAt: string
}

export interface CompareState {
  gameA: Game | null
  gameB: Game | null
}

// ============================================================
// Contact Form Types
// ============================================================

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

// ============================================================
// Cache Types
// ============================================================

export interface CacheEntry<T> {
  data: T
  expiresAt: number
  createdAt: number
}

export interface CacheConfig {
  ttl: number // milliseconds
  prefix?: string
}

// ============================================================
// Navigation Types
// ============================================================

export interface NavItem {
  label: string
  href: string
  icon?: string
  badge?: string
}
