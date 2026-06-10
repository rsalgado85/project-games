import axios from 'axios'
import toast from 'react-hot-toast'

// ── RAWG API Client ──────────────────────────────────────────
// RAWG is a public read-only API: keys are visible in network traffic by design
// (same model as Google Maps public keys). Rate limit: 20k req/month free.
// All state (favorites, history, compare) lives in localStorage via Zustand.
export const RAWG_BASE = 'https://api.rawg.io/api'
export const RAWG_KEY = (import.meta.env.VITE_RAWG_API_KEY as string) ?? ''

export function rawgUrl(path: string, params: Record<string, string | number | undefined> = {}): string {
  const url = new URL(`${RAWG_BASE}${path}`)
  url.searchParams.set('key', RAWG_KEY)
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '' && v !== null) url.searchParams.set(k, String(v))
  }
  return url.toString()
}

const api = axios.create({
  baseURL: RAWG_BASE,
  timeout: 15_000,
  headers: { Accept: 'application/json' },
})

api.interceptors.request.use(
  (config) => {
    const url = new URL(config.url ?? '', RAWG_BASE)
    url.searchParams.set('key', RAWG_KEY)
    config.url = url.toString().replace(RAWG_BASE, '')
    return config
  },
  (error: unknown) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0
      if (status === 429) toast.error('Demasiadas solicitudes. Espera un momento.')
      else if (status >= 500) toast.error('Error del servidor RAWG. Intenta más tarde.')
    }
    return Promise.reject(error)
  },
)

export default api
