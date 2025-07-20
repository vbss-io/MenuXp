import { lazy } from 'react'
import { NotFound } from '../pages/not-found'

const Dashboard = lazy(() => import('@/presentation/pages/dashboard').then((module) => ({ default: module.Dashboard })))
const CreateRestaurant = lazy(() =>
  import('@/presentation/pages/dashboard/create-restaurant').then((module) => ({
    default: module.CreateRestaurant
  }))
)
const Settings = lazy(() =>
  import('@/presentation/pages/dashboard/settings/index.tsx').then((module) => ({
    default: module.SettingsPage
  }))
)

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'create-restaurant',
        element: <CreateRestaurant />
      },
      {
        path: 'orders',
        element: <NotFound />
      },
      {
        path: 'menu',
        element: <NotFound />
      },
      {
        path: 'reports',
        element: <NotFound />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'messages',
        element: <NotFound />
      },
      {
        path: 'reports',
        element: <NotFound />
      },
      {
        path: 'missions',
        element: <NotFound />
      }
    ]
  }
]
