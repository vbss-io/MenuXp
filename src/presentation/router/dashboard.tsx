import { lazy } from 'react'

const Dashboard = lazy(() => import('@/presentation/pages/dashboard').then((module) => ({ default: module.Dashboard })))
const CreateRestaurant = lazy(() =>
  import('@/presentation/pages/dashboard/create-restaurant').then((module) => ({
    default: module.CreateRestaurant
  }))
)
const Settings = lazy(() =>
  import('@/presentation/pages/dashboard/settings').then((module) => ({
    default: module.SettingsPage
  }))
)
const Orders = lazy(() =>
  import('@/presentation/pages/dashboard/orders').then((module) => ({
    default: module.OrdersPage
  }))
)
const MenuItems = lazy(() =>
  import('@/presentation/pages/dashboard/menu-items').then((module) => ({
    default: module.MenuItemsPage
  }))
)
const Reports = lazy(() =>
  import('@/presentation/pages/dashboard/reports').then((module) => ({
    default: module.ReportsPage
  }))
)
const Missions = lazy(() =>
  import('@/presentation/pages/dashboard/missions').then((module) => ({
    default: module.MissionsPage
  }))
)
const Messages = lazy(() =>
  import('@/presentation/pages/dashboard/messages').then((module) => ({
    default: module.MessagesPage
  }))
)
const Menu = lazy(() =>
  import('@/presentation/pages/dashboard/menu').then((module) => ({
    default: module.MenuPage
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
        element: <Orders />
      },
      {
        path: 'menu',
        element: <Menu />
      },
      {
        path: 'menu-items',
        element: <MenuItems />
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
        path: 'missions',
        element: <Missions />
      }
    ]
  }
]
