import { Outlet } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useLocation } from 'react-router-dom'

export function MainLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary antialiased">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet key={location.pathname} />
      </main>
      <Footer />
    </div>
  )
}
