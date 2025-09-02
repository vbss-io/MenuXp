import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Error } from '@/presentation/pages/error'
import { LoadingPage } from '@/presentation/pages/loading'
import { NotFound } from '@/presentation/pages/not-found'
import { authRoutes } from '@/presentation/router/auth'
import { dashboardRoutes } from '@/presentation/router/dashboard'

const Home = lazy(() => import('@/presentation/pages/home').then((module) => ({ default: module.Home })))
const RestaurantPage = lazy(() =>
  import('@/presentation/pages/restaurant').then((module) => ({ default: module.RestaurantPage }))
)
const RestaurantCategoryPage = lazy(() =>
  import('@/presentation/pages/restaurant/category').then((module) => ({ default: module.RestaurantCategoryPage }))
)
const RestaurantProductPage = lazy(() =>
  import('@/presentation/pages/restaurant/product').then((module) => ({ default: module.RestaurantProductPage }))
)
const RestaurantProfilePage = lazy(() =>
  import('@/presentation/pages/restaurant/profile').then((module) => ({ default: module.RestaurantProfilePage }))
)
const RestaurantCartPage = lazy(() =>
  import('@/presentation/pages/restaurant/cart').then((module) => ({ default: module.RestaurantCartPage }))
)

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
    path: '/404',
    element: <NotFound />
  },
  {
    path: '/:slug',
    element: <RestaurantPage />
  },
  {
    path: '/:slug/category/:categoryId',
    element: <RestaurantCategoryPage />
  },
  {
    path: '/:slug/product/:productId',
    element: <RestaurantProductPage />
  },
  {
    path: '/:slug/profile',
    element: <RestaurantProfilePage />
  },
  {
    path: '/:slug/cart',
    element: <RestaurantCartPage />
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
