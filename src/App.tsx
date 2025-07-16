import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { Toaster } from 'react-hot-toast'
import { styled, ThemeProvider } from 'styled-components'

import { registerDependencies } from '@/infra/dependency-injection/register'
import { Header } from '@/presentation/components/ui/header'
import { AuthProvider } from '@/presentation/providers/auth-provider'
import { RestaurantProvider } from '@/presentation/providers/restaurant-provider'
import { SidebarProvider } from '@/presentation/providers/sidebar-provider'
import { Router } from '@/presentation/router'
import { GlobalStyle } from '@/presentation/styles/global'
import { theme } from '@/presentation/styles/theme'

const AppContainer = styled.div`
  min-height: calc(100vh - 5rem);
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
`

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
            background: theme.colors.background,
            color: theme.colors.text,
            fontSize: '0.75rem',
            padding: '1rem',
            border: '2px solid',
            textAlign: 'center',
            minWidth: '240px',
            maxWidth: '400px',
            lineHeight: '1.5',
            borderRadius: '0'
          },
          success: {
            style: {
              borderColor: theme.colors.primary
            },
            icon: <CheckCircleIcon color={theme.colors.primary} size={24} weight="duotone" />
          },
          error: {
            style: {
              borderColor: theme.colors.red
            },
            icon: <XCircleIcon color={theme.colors.red} size={24} weight="duotone" />
          }
        }}
      />
      <RestaurantProvider>
        <AuthProvider>
          <SidebarProvider>
            <Header />
            <AppContainer>
              <Router />
            </AppContainer>
          </SidebarProvider>
        </AuthProvider>
      </RestaurantProvider>
    </ThemeProvider>
  )
}

export default App
