import { ClientProvider } from '@/hooks/providers/client-provider'
import { LayoutProvider } from '@/hooks/providers/layout-provider'
import { NotificationProvider } from '@/hooks/providers/notification-provider'
import { RestaurantProvider } from '@/hooks/providers/restaurant-provider'
import { queryClient } from '@/lib/query-client'
import { Router } from '@/router'
import translations from '@/translations/index'
import { CustomersGlobalStyle, customersTheme as theme } from '@menuxp/styles'
import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { styled, ThemeProvider } from 'styled-components'
import { TranslatorProvider } from 'vbss-translator'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
`

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <TranslatorProvider translations={translations} defaultLanguage="pt">
          <CustomersGlobalStyle />
          <Toaster
            position="top-center"
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
          <RestaurantProvider>
            <LayoutProvider>
              <ClientProvider>
                <NotificationProvider>
                  <AppContainer>
                    <Router />
                  </AppContainer>
                </NotificationProvider>
              </ClientProvider>
            </LayoutProvider>
          </RestaurantProvider>
        </TranslatorProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
