import { lazy } from 'react'
import { NotFound } from '../pages/not-found'

const Dashboard = lazy(() => import('@/presentation/pages/dashboard').then((module) => ({ default: module.Dashboard })))

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
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
        element: <NotFound />
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
