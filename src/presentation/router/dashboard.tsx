import { lazy } from 'react'

const Dashboard = lazy(() => import('@/presentation/pages/dashboard').then((module) => ({ default: module.Dashboard })))
const Orders = lazy(() =>
  import('@/presentation/pages/dashboard/orders').then((module) => ({ default: module.Orders }))
)
const Menu = lazy(() => import('@/presentation/pages/dashboard/menu').then((module) => ({ default: module.Menu })))
const Reports = lazy(() =>
  import('@/presentation/pages/dashboard/reports').then((module) => ({ default: module.Reports }))
)
const Settings = lazy(() =>
  import('@/presentation/pages/dashboard/settings').then((module) => ({ default: module.Settings }))
)
const Messages = lazy(() =>
  import('@/presentation/pages/dashboard/messages').then((module) => ({ default: module.Messages }))
)
const Missions = lazy(() =>
  import('@/presentation/pages/dashboard/missions').then((module) => ({ default: module.Missions }))
)

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'menu',
        element: <Menu />
      },
      {
        path: 'reports',
        element: <Reports />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'messages',
        element: <Messages />
      },
      {
        path: 'reports',
        element: <Reports />
      },
      {
        path: 'missions',
        element: <Missions />
      }
    ]
  }
]
