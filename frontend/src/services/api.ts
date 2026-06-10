import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

// ── Request Interceptor ──────────────────────────────────────
api.interceptors.request.use(
  (config) => config,
  (error: unknown) => Promise.reject(error),
)

// ── Response Interceptor ─────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0
      const message = (error.response?.data as { message?: string })?.message ?? error.message

      if (status === 429) {
        toast.error('Too many requests. Please wait a moment.')
      } else if (status >= 500) {
        toast.error('Server error. Please try again later.')
      } else if (status === 404) {
        // Let callers handle 404s silently
      } else if (status > 0) {
        toast.error(message || 'An error occurred.')
      }
    }
    return Promise.reject(error)
  },
)

export default api
