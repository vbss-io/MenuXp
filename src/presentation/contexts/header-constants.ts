export const AUTH_PAGES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/pending-register'
]
export const ERROR_PAGES = ['/error', '/404']
export const PAGES_WITH_HEADER = [...AUTH_PAGES, ...ERROR_PAGES]
export const PAGES_WITHOUT_HEADER = ['/']
