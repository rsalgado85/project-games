import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { AppRouter } from '@/routes'
import { useTheme } from '@/hooks/useTheme'
import { DefaultSeo } from '@/components/seo/DefaultSeo'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
      staleTime: 5 * 60 * 1000,
    },
  },
})

function ThemeProvider({ children }: { children: React.ReactNode }) {
  // This hook syncs theme class to <html>
  useTheme()
  return <>{children}</>
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <DefaultSeo />
          <AppRouter />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1A1A27',
                color: '#F8F8FF',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '500',
              },
              success: {
                iconTheme: { primary: '#6C63FF', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#f87171', secondary: '#fff' },
              },
            }}
          />
          {import.meta.env.DEV && (
            <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
          )}
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  )
}
