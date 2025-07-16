import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Error } from '@/presentation/pages/error'
import { LoadingPage } from '@/presentation/pages/loading'
import { NotFound } from '@/presentation/pages/not-found'
import { authRoutes } from '@/presentation/router/auth'
import { dashboardRoutes } from '@/presentation/router/dashboard'

const Home = lazy(() => import('@/presentation/pages/home').then((module) => ({ default: module.Home })))

const baseRoutes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/error',
    element: <Error />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

const routes = [...baseRoutes, ...authRoutes, ...dashboardRoutes].map((route) => ({
  ...route,
  element: <Suspense fallback={<LoadingPage />}>{route.element}</Suspense>,
  errorElement: <Error />
}))

const router = createBrowserRouter(routes)

export const Router = () => {
  return <RouterProvider router={router} />
}
