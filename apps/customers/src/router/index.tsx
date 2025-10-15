import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Error } from '@/pages/error'
import { LoadingPage } from '@/pages/loading'
import { NotFound } from '@/pages/not-found'

const Home = lazy(() => import('@/pages/home').then((module) => ({ default: module.Home })))
const MenuPage = lazy(() => import('@/pages/menu').then((module) => ({ default: module.MenuPage })))
const RestaurantCategoryPage = lazy(() =>
  import('@/pages/menu/category').then((module) => ({ default: module.RestaurantCategoryPage }))
)
const RestaurantProductPage = lazy(() =>
  import('@/pages/menu/product').then((module) => ({ default: module.RestaurantProductPage }))
)
const RestaurantComboPage = lazy(() =>
  import('@/pages/menu/combo').then((module) => ({ default: module.RestaurantComboPage }))
)
const RestaurantProfilePage = lazy(() =>
  import('@/pages/menu/profile').then((module) => ({ default: module.RestaurantProfilePage }))
)
const RestaurantCartPage = lazy(() =>
  import('@/pages/menu/cart').then((module) => ({ default: module.RestaurantCartPage }))
)
const RestaurantGamesPage = lazy(() =>
  import('@/pages/menu/games').then((module) => ({ default: module.RestaurantGamesPage }))
)
const RestaurantCouponsPage = lazy(() =>
  import('@/pages/menu/coupons').then((module) => ({ default: module.RestaurantCouponsPage }))
)
const UIComponentsDebugPage = lazy(() =>
  import('@/pages/menu/ui/components').then((module) => ({ default: module.default }))
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
    element: <MenuPage />,
    children: [
      {
        path: 'category/:categoryId',
        element: <RestaurantCategoryPage />
      },
      {
        path: 'product/:productId',
        element: <RestaurantProductPage />
      },
      {
        path: 'combo/:comboId',
        element: <RestaurantComboPage />
      },
      {
        path: 'profile',
        element: <RestaurantProfilePage />
      },
      {
        path: 'cart',
        element: <RestaurantCartPage />
      },
      {
        path: 'games',
        element: <RestaurantGamesPage />
      },
      {
        path: 'coupons',
        element: <RestaurantCouponsPage />
      },
      {
        path: 'ui',
        element: <UIComponentsDebugPage />
      }
    ]
  }
]

const routes = [...baseRoutes].map((route) => ({
  ...route,
  element: <Suspense fallback={<LoadingPage />}>{route.element}</Suspense>,
  errorElement: <Error />
}))

const router = createBrowserRouter(routes)

export const Router = () => {
  return <RouterProvider router={router} />
}
