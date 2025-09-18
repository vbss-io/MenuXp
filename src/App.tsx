import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'styled-components'

import { registerDependencies } from '@/infra/dependency-injection/register'
import { AuthProvider } from '@/presentation/providers/auth-provider'
import { RestaurantProvider } from '@/presentation/providers/restaurant-provider'
import { SidebarProvider } from '@/presentation/providers/sidebar-provider'
import { Router } from '@/presentation/router'
import { GlobalStyle } from '@/presentation/styles/global'
import { theme } from '@/presentation/styles/theme'

function App() {
  registerDependencies()

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
            border: `1px solid ${theme.colors.mx.black}`,
            textAlign: 'center',
            minWidth: '240px',
            maxWidth: '400px',
            lineHeight: theme.typography.lineHeights.normal,
            borderRadius: theme.borderRadius.sm,
            boxShadow: '3px 3px 0px #000000',
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
          <SidebarProvider>
            <Router />
          </SidebarProvider>
        </RestaurantProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
