## Guia de Arquitetura de UI e Padrões de Design — ADM

Este documento descreve em profundidade como a interface do Admin (apps/adm) é estruturada, com foco em UX/UI, padronização visual e extensibilidade. O objetivo é permitir que mudanças de aparência sejam feitas sem impacto em regras de negócio, backend ou em outros apps do monorepo.

### Sumário
- Visão geral e princípios
- Entrypoint, tema e estilos globais
- Provedores e contextos de UI
- Roteamento, wrappers e lazy loading
- Design System: tema, tokens e convenções visuais
- Componentes base e padrões reutilizáveis
- Layout, responsividade e grid mental
- Acessibilidade e feedbacks (toasts, diálogos)
- Formulários e validação
- Extensibilidade segura: como criar/alterar telas sem tocar regras
- Checklist de revisão visual

---

### Visão geral e princípios

- A UI do ADM é construída em React com Styled Components e consome o Design System compartilhado em `packages/styles` e `packages/ui`.
- Padrões visuais (cores, tipografia, espaçamento, etc.) são centralizados no tema (`admTheme`); ajustes visuais devem ser priorizados via tema/estilos globais ao invés de estilos locais.
- Regras de negócio e comunicação com backend ficam isoladas nas camadas `application`, `domain` e `infra`. A camada `presentation` orquestra UI e experiência.
- Roteamento usa React Router com composição de wrappers para cabeçalho e estados globais.

---

### Entrypoint, tema e estilos globais

- O ponto de entrada da aplicação monta o tema, estilos globais, provedores e o roteador.

Código relevante:
```1:67:apps/adm/src/App.tsx
import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'styled-components'

import { registerDependencies } from '@/infra/dependency-injection/register'
import { AuthProvider } from '@/presentation/providers/auth-provider'
import { LayoutProvider } from '@/presentation/providers/layout-provider'
import { RestaurantProvider } from '@/presentation/providers/restaurant-provider'
import { SidebarProvider } from '@/presentation/providers/sidebar-provider'
import { Router } from '@/presentation/router'
import { GlobalStyle, admTheme as theme } from '@menuxp/styles'

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
      <LayoutProvider>
        <AuthProvider>
          <RestaurantProvider>
            <SidebarProvider>
              <Router />
            </SidebarProvider>
          </RestaurantProvider>
        </AuthProvider>
      </LayoutProvider>
    </ThemeProvider>
  )
}

export default App
```

- Tema e tokens: o `admTheme` vem de `packages/styles/src/theme.ts` e agrega `tokens` (cores, tipografia, espaçamento, sombras, etc.). Utilize `theme` em Styled Components ao invés de valores hardcoded.

```1:74:packages/styles/src/theme.ts
import type { DefaultTheme } from 'styled-components'
import {
  animations,
  borderRadius,
  breakpoints,
  menuXpColors,
  shadows,
  spacing,
  typography,
  zIndex
} from './tokens'

export const createTheme = (overrides?: Partial<DefaultTheme>): DefaultTheme => {
  const baseTheme: DefaultTheme = {
    colors: {
      primary: menuXpColors.red,
      secondary: menuXpColors.yellow,
      highlight: menuXpColors.blue,
      neutral: menuXpColors.black,
      background: menuXpColors.gray[50],

      mx: menuXpColors,

      success: menuXpColors.success,
      warning: menuXpColors.warning,
      error: menuXpColors.error,
      info: menuXpColors.info,

      text: {
        primary: menuXpColors.black,
        secondary: menuXpColors.black,
        muted: menuXpColors.gray[500],
        inverse: menuXpColors.white
      },

      game: {
        gold: menuXpColors.gold,
        silver: menuXpColors.silver,
        bronze: menuXpColors.bronze,
        experience: menuXpColors.experience,
        achievement: menuXpColors.achievement
      },
    },

    typography,
    spacing,
    borderRadius,
    shadows,
    breakpoints,
    animations,
    zIndex,
  }

  return overrides ? { ...baseTheme, ...overrides } : baseTheme
}

export const admTheme = createTheme()
```

- Estilos globais: aplicados via `GlobalStyle` consumindo variáveis do tema, setando também CSS variables úteis.

```1:112:packages/styles/src/global.ts
import * as uiLayouts from '@menuxp/ui/layouts'
import { createGlobalStyle, css } from 'styled-components'
import { baseLayoutStyles } from './layout'

export const stripHsl = (color: string) => color.replace(/^hsl\(|\)$/g, '')

const allComponentLayoutStyles = Object.values(uiLayouts).join('\n')

const coreGlobalStyles = css`
  * {
    --primary: ${({ theme }) => stripHsl(theme.colors.primary)};
    --secondary: ${({ theme }) => stripHsl(theme.colors.secondary)};
    --highlight: ${({ theme }) => stripHsl(theme.colors.highlight)};
    --text: ${({ theme }) => stripHsl(theme.colors.text.primary)};
    --background: ${({ theme }) => stripHsl(theme.colors.background)};
  }

  :root {
    --mx-black: ${({ theme }) => theme.colors.mx.black};
    --mx-yellow: ${({ theme }) => theme.colors.mx.yellow};
    --mx-red: ${({ theme }) => theme.colors.mx.red};
    --mx-blue: ${({ theme }) => theme.colors.mx.blue};
    --mx-white: ${({ theme }) => theme.colors.mx.white};
    --restaurant-primary-color: ${({ theme }) => theme.colors.primary};
    --restaurant-secondary-color: ${({ theme }) => theme.colors.secondary};
    --primary: ${({ theme }) => theme.colors.primary};
    --secondary: ${({ theme }) => theme.colors.secondary};
  }
`
```

Recomendações:
- Prefira tokens do tema (`theme.spacing.xl`, `theme.colors.mx.black`, etc.).
- Estilização global e variáveis devem ser ajustadas aqui, evitando overrides locais repetitivos.

---

### Provedores e contextos de UI

Provedores globais (ordem no `App`):
- `LayoutProvider`: estado/layout geral da aplicação.
- `AuthProvider`: autenticação do usuário.
- `RestaurantProvider`: contexto do restaurante selecionado.
- `SidebarProvider`: estado do menu lateral.
- `HeaderProvider`: contexto/estado do cabeçalho (envolve cada rota via wrapper).

Boas práticas:
- Evite acoplar regras de negócio em providers de UI. Consuma usecases da camada `application` a partir de hooks/páginas quando necessário.
- Para novo estado global de UI, criar provider na pasta `presentation/providers` e consumir via hooks.

---

### Roteamento, wrappers e lazy loading

As rotas são definidas em `presentation/router`, com lazy loading e wrappers de UI para consistência do layout/cabeçalho.

```1:44:apps/adm/src/presentation/router/index.tsx
import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RedirectToLandingPage } from '@/presentation/components/redirect-to-landing-page'
import { HeaderWrapper } from '@/presentation/components/ui/header-wrapper'
import { HeaderProvider } from '@/presentation/contexts/header-context'
import { Error } from '@/presentation/pages/error'
import { LoadingPage } from '@/presentation/pages/loading'
import { NotFound } from '@/presentation/pages/not-found'
import { authRoutes } from '@/presentation/router/auth'
import { dashboardRoutes } from '@/presentation/router/dashboard'

const routes = [...baseRoutes, ...authRoutes, ...dashboardRoutes].map((route) => ({
  ...route,
  element: (
    <HeaderProvider>
      <HeaderWrapper>
        <Suspense fallback={<LoadingPage />}>{route.element}</Suspense>
      </HeaderWrapper>
    </HeaderProvider>
  ),
  errorElement: <Error />
}))
```

Rotas de Dashboard (lazy):
```1:102:apps/adm/src/presentation/router/dashboard.tsx
const Dashboard = lazy(() => import('@/presentation/pages/dashboard').then((module) => ({ default: module.Dashboard })))
...
export const dashboardRoutes = [
  { path: '/dashboard', element: <Dashboard />, children: [
    { path: 'orders', element: <Orders /> },
    { path: 'menu', element: <Menu /> },
    { path: 'menu-items', element: <MenuItems /> },
    { path: 'coupons', element: <Coupons /> },
    { path: 'reports', element: <Reports /> },
    { path: 'settings', element: <Settings /> },
    { path: 'messages', element: <Messages /> },
    { path: 'missions', element: <Missions /> },
    { path: 'profile', element: <Profile /> },
  ]}
]
```

Padrões:
- Sempre envolver páginas com `HeaderWrapper` para manter experiência coerente.
- Declarar novas rotas com `lazy` para otimizar carregamento.
- Usar `Error` e `LoadingPage` como padrões de erro/fallback.

---

### Design System: tema, tokens e convenções visuais

- Tokens acessíveis via `theme`: `colors`, `typography`, `spacing`, `borderRadius`, `shadows`, `breakpoints`, `animations`, `zIndex`.
- Convenções recomendadas:
  - Cores: usar `theme.colors.mx.*` para paleta MenuXP e `theme.colors.text.*` para texto.
  - Tipografia: títulos com `theme.typography.fonts.title` e body com `theme.typography.fonts.body`.
  - Espaçamento: utilizar escala `theme.spacing` (xs, sm, md, lg, xl...).
  - Bordas: `theme.borderRadius` (xs, sm, md...).
  - Sombras/estética: preferir `box-shadow` e bordas sólidos conforme `App.tsx` (estilo “card” com borda preta e sombra offset 3px).
  - Breakpoints: usar `theme.breakpoints.*` em media queries.

Exemplo (Styled Components):
```tsx
const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: 3px 3px 0 ${({ theme }) => theme.colors.mx.black};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.mx.white};

  @media ${({ theme }) => theme.breakpoints.md} {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`
```

---

### Componentes base e padrões reutilizáveis

- A pasta `presentation/components` concentra blocos de UI reutilizáveis (ex.: `ui/dialog`, `ui/breadcrumb`, `ui/loading`, cards e modais de entidades etc.).
- Diálogo base: `Dialog` (wrappa `@vbss-ui/dialog` e aplica o tema ADM), mantendo aparência consistente.

Código relevante do `Dialog`:
```1:52:apps/adm/src/presentation/components/ui/dialog/index.tsx
const StyledDialog = styled(VbssDialog)`
  &[data-state='open'] {
    background-color: ${({ theme }) => theme.colors.mx.white};
    color: ${({ theme }) => theme.colors.mx.black};
    border: 1px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
    padding: ${({ theme }) => theme.spacing.lg};
    max-height: 80vh;
    overflow-y: auto;
  }
`
```

Padrões de componentes:
- Use componentes `ui/*` como building blocks para formulários, feedback, navegação.
- Em entidades (ex.: categories, coupons, operations), reutilize o `Dialog` e os tokens do tema para manter coesão.

---

### Layout, responsividade e grid mental

- O layout do Dashboard controla margens/padding e espaço com base no estado da Sidebar e breakpoints.

```1:29:apps/adm/src/presentation/pages/dashboard/index.tsx
const Main = styled.main<{ $isSidebarOpen: boolean; $isCreatingRestaurant: boolean }>`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
  transition: margin-left 0.3s;

  @media ${({ theme }) => theme.breakpoints.md} {
    margin-left: ${({ $isSidebarOpen, $isCreatingRestaurant }) =>
      $isSidebarOpen && !$isCreatingRestaurant ? '280px' : '80px'};
  }
`
```

Boas práticas de responsividade:
- Em mobile, reduzir margeb-top via container principal (e.g., header fixo).
- Usar breakpoints do tema; evitar valores mágicos.
- Sidebar recolhe/expande conforme estado global para preservar área de conteúdo.

---

### Acessibilidade e feedbacks

- Feedbacks de sistema por `react-hot-toast`, padronizados no `App.tsx` (ícones, bordas, cores, tipografia via tema).
- Diálogos: garantir foco inicial no conteúdo/ação primária, ESC para fechar (respeitado pelo componente base), sem scrollbars visíveis (estética e redução de ruído visual).
- Navegação: breadcrumbs e títulos devem seguir hierarquia de heading (h1/h2) consistente, usando fontes do tema.

Regras rápidas:
- Todo texto deve ter contraste suficiente (tema já privilegia preto/branco com bordas).
- Ícones devem ter `aria-label` ou texto associado quando acionáveis.
- Interações críticas exigem confirmação (`ConfirmationDialog`).

---

### Formulários e validação

- Inputs e formulários devem usar componentes base quando disponíveis (ex.: `ui/form-*`) e padrões de espaçamento e tipografia do tema.
- Validações com `zod` (em várias páginas) devem mapear mensagens legíveis e consistentes.
- Estados de carregamento/erro: usar `Loading` e `toast.error/success` conforme convenções visuais.

Diretrizes:
- Labels sempre presentes, placeholders não substituem labels.
- Espaçamento vertical consistente (`theme.spacing.md` a `xl` entre grupos).
- Ações primárias destacadas (borda/sombra padrão ADM) e secundárias com contraste menor.

---

### Extensibilidade segura

Para criar/alterar telas sem afetar regras de negócio:
1) Rotas
   - Adicione a rota com `lazy` em `presentation/router/*`.
   - Envolva a página com wrappers padrão (HeaderProvider/HeaderWrapper já aplicados globalmente).

2) Estado de UI
   - Se necessário, crie novo provider em `presentation/providers` isolando apenas estado de apresentação.
   - Consumir usecases só por hooks/páginas, nunca dentro do provider se não for UI-puro.

3) Estilização
   - Use sempre tokens do `theme`. Evite cores/tamanhos mágicos.
   - Para novos padrões globais (scrollbar, fontes, reset): edite `packages/styles/src/global.ts`.
   - Para alterar paleta tipicamente ADM, ajuste `admTheme`/`tokens` em `packages/styles`.

4) Componentes
   - Prefira compor a partir de `presentation/components/ui/*` e, se necessário, criar novos componentes base reutilizáveis.
   - Diálogos novos devem estender `Dialog` para manter aparência/coerência.

5) Regras de negócio
   - Não inserir lógica de domínio na camada de `presentation`. Use `application/*` (usecases) e `infra/*` (adapters) conforme arquitetura existente.

---

### Checklist de revisão visual

- Tipografia: titles com `theme.typography.fonts.title`; body com `fonts.body`.
- Cores: apenas via `theme.colors.*`; contraste mínimo atendido.
- Espaçamento: escala `theme.spacing` aplicada; nada "colado" visualmente.
- Bordas/Sombras: padrão ADM (borda preta + sombra offset) quando pertinente.
- Responsividade: validar md e acima; mobile sem overflow horizontal.
- Acessibilidade: foco visível, rótulos/aria, teclas de atalho padrão.
- Feedbacks: toasts e diálogos consistentes; mensagens claras.
- Navegação: breadcrumbs/títulos corretos; wrappers aplicados.

---

### Referências úteis
- Tema e tokens: `packages/styles/src/theme.ts`, `packages/styles/src/tokens.ts`.
- Estilos globais: `packages/styles/src/global.ts`.
- Entrypoint ADM: `apps/adm/src/App.tsx` e `apps/adm/src/main.tsx`.
- Roteamento: `apps/adm/src/presentation/router`.
- Provedores: `apps/adm/src/presentation/providers` e `apps/adm/src/presentation/contexts`.
- Componentes base: `apps/adm/src/presentation/components/ui`.

---

Manter este guia atualizado sempre que houver inclusão de novos padrões de UI ou alterações de tema/tokens.


