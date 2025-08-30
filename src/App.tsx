import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { Toaster } from 'react-hot-toast'
import { styled, ThemeProvider } from 'styled-components'

import { registerDependencies } from '@/infra/dependency-injection/register'
import { Header } from '@/presentation/components/ui/header'
import { AuthProvider } from '@/presentation/providers/auth-provider'
import { RestaurantProvider } from '@/presentation/providers/restaurant-provider'
import { SidebarProvider } from '@/presentation/providers/sidebar-provider'
import { ClientProvider } from '@/presentation/providers/client-provider'
import { Router } from '@/presentation/router'
import { GlobalStyle } from '@/presentation/styles/global'
import { theme } from '@/presentation/styles/theme'

const AppContainer = styled.div<{ $isDashboard: boolean; $shouldShowHeader: boolean }>`
  min-height: calc(100vh - ${({ $isDashboard }) => ($isDashboard ? '0' : '5rem')});
  margin-top: ${({ $isDashboard, $shouldShowHeader }) => ($isDashboard || $shouldShowHeader ? '0' : '5rem')};
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
`

const AUTH_PAGES = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email', '/pending-register']

function App() {
  registerDependencies()
  const pathname = window.location.pathname
  const isDashboard = pathname.includes('/dashboard')
  const isHome = pathname === '/'
  const isRestaurantPage = !isHome && !isDashboard
  const isAuthPages = AUTH_PAGES.includes(pathname)
  const shouldShowHeader = !isRestaurantPage && isAuthPages

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 6000,
          style: {
            background: theme.colors.mx.white,
            color: theme.colors.mx.black,
            fontSize: theme.typography.fontSizes.sm,
            padding: theme.spacing.md,
            border: `2px solid ${theme.colors.mx.black}`,
            textAlign: 'center',
            minWidth: '240px',
            maxWidth: '400px',
            lineHeight: theme.typography.lineHeights.normal,
            borderRadius: theme.borderRadius.brutalist,
            boxShadow: theme.shadows.brutalist,
            fontFamily: theme.typography.fonts.body,
            fontWeight: theme.typography.fontWeights.medium
          },
          success: {
            style: {
              borderColor: theme.colors.mx.success,
              background: theme.colors.mx.white
            },
            icon: <CheckCircleIcon color={theme.colors.mx.success} size={24} weight="duotone" />
          },
          error: {
            style: {
              borderColor: theme.colors.mx.error,
              background: theme.colors.mx.white
            },
            icon: <XCircleIcon color={theme.colors.mx.error} size={24} weight="duotone" />
          }
        }}
      />
      <AuthProvider>
        <RestaurantProvider>
          <ClientProvider>
            <SidebarProvider>
              <Header
                isDashboard={isDashboard}
                isHome={isHome}
                isRestaurantPage={isRestaurantPage}
                isAuthPages={isAuthPages}
              />
              <AppContainer $isDashboard={isDashboard} $shouldShowHeader={shouldShowHeader}>
                <Router />
              </AppContainer>
            </SidebarProvider>
          </ClientProvider>
        </RestaurantProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
