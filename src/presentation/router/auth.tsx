import { lazy } from 'react'

const Register = lazy(() =>
  import('@/presentation/pages/auth/register').then((module) => ({ default: module.Register }))
)
const Login = lazy(() => import('@/presentation/pages/auth/login').then((module) => ({ default: module.Login })))
const PendingRegister = lazy(() =>
  import('@/presentation/pages/auth/pending-register').then((module) => ({ default: module.PendingRegister }))
)
const ForgotPassword = lazy(() =>
  import('@/presentation/pages/auth/forgot-password').then((module) => ({ default: module.ForgotPassword }))
)
const VerifyEmail = lazy(() =>
  import('@/presentation/pages/auth/verify-email').then((module) => ({ default: module.VerifyEmail }))
)
const ResetPassword = lazy(() =>
  import('@/presentation/pages/auth/reset-password').then((module) => ({ default: module.ResetPassword }))
)

export const authRoutes = [
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/pending-register',
    element: <PendingRegister />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/login',
    element: <Login />
  }
]
