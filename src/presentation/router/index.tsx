import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RedirectToLandingPage } from '@/presentation/components/redirect-to-landing-page'
import { HeaderWrapper } from '@/presentation/components/ui/header-wrapper'
import { HeaderProvider } from '@/presentation/contexts/header-context'
import { Error } from '@/presentation/pages/error'
import { LoadingPage } from '@/presentation/pages/loading'
import { NotFound } from '@/presentation/pages/not-found'
import { authRoutes } from '@/presentation/router/auth'
import { dashboardRoutes } from '@/presentation/router/dashboard'

const baseRoutes = [
  {
    path: '/',
    element: <RedirectToLandingPage />
  },
  {
    path: '/error',
    element: <Error />
  },
  {
    path: '/404',
    element: <NotFound />
  }
]

const routes = [...baseRoutes, ...authRoutes, ...dashboardRoutes].map((route) => ({
  ...route,
  element: (
    <HeaderProvider>
      <HeaderWrapper>
        <Suspense fallback={<LoadingPage />}>{route.element}</Suspense>
      </HeaderWrapper>
    </HeaderProvider>
  ),
  errorElement: <Error />
}))

const router = createBrowserRouter(routes)

export const Router = () => {
  return <RouterProvider router={router} />
}
