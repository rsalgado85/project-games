import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import HomePage from '@/pages/Home'
import GamesPage from '@/pages/Games'
import GameDetailPage from '@/pages/GameDetail'
import PopularPage from '@/pages/Popular'
import TopRatedPage from '@/pages/TopRated'
import UpcomingPage from '@/pages/Upcoming'
import ComparatorPage from '@/pages/Comparator'
import FavoritesPage from '@/pages/Favorites'
import AboutPage from '@/pages/About'
import ContactPage from '@/pages/Contact'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'games',
        element: <GamesPage />,
      },
      {
        path: 'games/:id',
        element: <GameDetailPage />,
      },
      {
        path: 'popular',
        element: <PopularPage />,
      },
      {
        path: 'top-rated',
        element: <TopRatedPage />,
      },
      {
        path: 'upcoming',
        element: <UpcomingPage />,
      },
      {
        path: 'comparator',
        element: <ComparatorPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
