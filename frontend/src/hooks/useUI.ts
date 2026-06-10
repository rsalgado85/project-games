import { useState, useEffect, useCallback, useRef } from 'react'
import { debounce } from '@/utils/helpers'

interface UseDebounceSearchOptions {
  delay?: number
  minLength?: number
}

/**
 * Hook to manage a debounced search input
 */
export function useDebounceSearch(options: UseDebounceSearchOptions = {}) {
  const { delay = 400, minLength = 2 } = options
  const [inputValue, setInputValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetValue = useCallback(
    debounce((value: unknown) => {
      const v = value as string
      setDebouncedValue(v.length >= minLength ? v : '')
    }, delay),
    [delay, minLength],
  )

  useEffect(() => {
    debouncedSetValue(inputValue)
  }, [inputValue, debouncedSetValue])

  const clear = useCallback(() => {
    setInputValue('')
    setDebouncedValue('')
  }, [])

  return { inputValue, setInputValue, debouncedValue, clear }
}

/**
 * Hook for intersection observer (infinite scroll / lazy loading)
 */
export function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return { ref, isIntersecting }
}

/**
 * Hook to track scroll position
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}

/**
 * Hook to lock body scroll (modals, drawers)
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (locked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [locked])
}

/**
 * Hook for media queries
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [query])

  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
export const useIsTablet = () => useMediaQuery('(max-width: 1024px)')
