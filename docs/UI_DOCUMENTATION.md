### MenuXp – Documentação da UI

Esta documentação descreve a arquitetura de UI, design tokens, estilos globais, componentes, padrões de uso, contexts/hooks, rotas e diretrizes de contribuição. Ela deve servir como base para evolução/refatoração de componentes.

---

## Stack e Arquitetura

- **Build**: Vite + React 18 + TypeScript
- **Estilização**: styled-components (tema central) + TailwindCSS (utilitários e tokens estendidos)
- **Ícones**: `@phosphor-icons/react`
- **UI Base (primitivos)**: família `@vbss-ui/*` (button, input, dialog, etc.) embrulhados por componentes locais
- **Roteamento**: `react-router-dom` com carregamento dinâmico (lazy) e fallback (`Suspense`)
- **Feedback**: `react-hot-toast` com tema unificado
- **Gestão de estado de UI**: Contexts locais (auth, restaurant, client, sidebar) + hooks customizados

Estrutura relevante:
- `src/App.tsx`: bootstrap de tema (`ThemeProvider`), estilos globais, provedores de contexto, roteador, `Header`
- `src/presentation/styles/theme.ts`: fonte única de tokens (cores, tipografia, spacing, sombras, radius, z-index, animações, breakpoints)
- `src/presentation/styles/global.ts`: CSS global gerado via styled-components + variáveis CSS espelhando o tema
- `src/index.css`: Tailwind e utilitários/estilos legados de look & feel brutalista
- `src/presentation/components/ui/*`: biblioteca de componentes de UI da aplicação (wrappers sobre `@vbss-ui` + estilos próprios)
- `src/presentation/components/entities/*`: componentes de domínio (cards, modais e seções relacionadas a categorias, combos, itens de menu, layouts, etc.)

---

## Design Tokens (Fonte de Verdade)

Os tokens ficam em `src/presentation/styles/theme.ts` e são injetados em `ThemeProvider`.

- **Cores** (`theme.colors`)
  - Paleta base `mx`: `black`, `yellow`, `red`, `blue`, `white`, `gray[50..900]`
  - Semânticas: `primary` (red), `secondary` (yellow), `accent` (blue), `text.primary/secondary/muted/inverse`, `success`, `warning`, `error`, `info`
  - Variáveis CSS espelhadas em `GlobalStyle` e `:root` para interoperar com CSS/Tailwind
- **Tipografia** (`theme.typography`)
  - Fontes: `title` (Inter), `body` (Montserrat), `mono` (Roboto Mono), `game` (Press Start 2P)
  - Tamanhos: `xxxs` a `xxxxxl` (10px a 64px)
  - Pesos e line-heights padronizados
- **Spacing** (`theme.spacing`): escala de 2px a 80px
- **Radius** (`theme.borderRadius`): `xs` a `xxl` + `brutalist`
- **Sombras** (`theme.shadows`): variações com traço preto (estética brutalista)
- **Z-Index**, **breakpoints**, **animações** padronizadas

Tailwind (`tailwind.config.js`) estende tokens para utilitários (colors, fontSize, spacing, radius, sombras, animações). Utilize classes Tailwind apenas quando não comprometer a consistência com `theme`.

---

## Estilos Globais

- `GlobalStyle` aplica reset básico, define variáveis CSS a partir de `theme`, scrollbar e tipografia padrão
- `index.css` importa fontes Google e define utilitários legados e padrão visual brutalista:
  - `.btn-brut`, `.brut-card`, `.brut-input`, `.brut-badge`, `.tabs-brut`, `.chip`, `.floating-chip`, `.focus-brut`
  - Diretriz: ao refatorar, priorizar migrar utilitários puros para componentes com tema quando forem recorrentes

---

## Padrões de Componentização

- Use wrappers locais em `presentation/components/ui/*` sobre `@vbss-ui/*` para:
  - Padronizar props, variantes, acessibilidade e integração com `theme`
  - Evitar dependência direta às libs de terceiros no restante do app
- Componentes de domínio ficam em `presentation/components/entities/*` e compõem os de UI
- Estilos por componente em `styles.ts` (styled-components), mantendo separação de responsabilidades

Diretrizes:
- Preferir props semânticas (`variant`, `state`, `size`) a classes utilitárias ad hoc
- Evitar estilos inline, exceto para casos pontuais e controlados
- Tipar explicitamente props públicas; evitar `any` (quando possível)
- Garantir acessibilidade básica: labels, roles, aria-* e foco visível

---

## Catálogo de Componentes de UI (principais)

A seguir, a visão de API/uso dos principais wrappers. Consulte o código fonte para detalhes finais.

### Button (`presentation/components/ui/button`)
- Base: `@vbss-ui/button`
- Props principais:
  - `variant`: `primary | secondary | white | game | outline | ghost | danger`
  - `state`: `default | loading | success | error`
  - `size`: herda de `@vbss-ui` (padrão `md`), `rounded`, `leftIcon`, `rightIcon`, `loading`, `loadingText`
- Notas: estado `loading` desativa o botão e exibe spinner; estilos consolidados em `styles.ts`

### Dialog (`presentation/components/ui/dialog`)
- Base: `@vbss-ui/dialog`, estilizado com `styled-components`
- Comportamento: aplica moldura brutalista, radius e tipografia; oculta scrollbar interno
- Props: herda as do `VbssDialog`; default `rounded='none'`, `fontSize='sm'`, `style.maxWidth/Height` definidos

### FormInput (`presentation/components/ui/form-input`)
- Base: `@vbss-ui/input`
- Props: `id`, `label`, `type`, `placeholder`, `error`, `required`, `register` (react-hook-form) OU `value/onChange`
- Diretriz: preferir integração via `register` quando usar RHF para consistência

### Header (`presentation/components/ui/header`)
- Props: `isDashboard`, `isHome`, `isRestaurantPage`, `isAuthPages`
- Esconde automaticamente em páginas de restaurante e dashboard desktop; usa `UserMenu` quando autenticado
- Integra `MobileHeader` e `home-navbar`

Outros componentes de UI disponíveis:
- `avatar`, `breadcrumb`, `chip`, `color-input`, `combobox`, `dialog`, `form-checkbox`, `form-textarea`, `form-time-input`, `home-navbar`, `icon-selector`, `image-carousel`, `loading`, `multiple-image-uploader`, `optionals`, `pagination`, `phone-mockup`, `popover`, `section`, `sidebar`, `user-menu`

Para cada um, a regra é: manter os contratos de props simples, variantes limitadas e estilo consistente com `theme`.

---

## Componentes de Domínio (`presentation/components/entities`)

- Agrupados por contexto: `categories`, `combos`, `menu-items`, `menu-layouts`, `operations`, `orders`, `restaurants`, `settings`
- Padrão: cada conjunto traz `card`, `filters`, `modal` e `styles.ts` correspondentes
- Para `menu-layouts/sections/*`: seções editoras e de visualização com subcomponentes (`edit`, `preview-edit`, `view`) e tipagens dedicadas

Diretriz: qualquer lógica de negócio ou layout complexo deve viver aqui, compondo os componentes de UI base.

---

## Contexts e Hooks

Contexts (`presentation/contexts`): `auth-context`, `client-context`, `restaurant-context`, `sidebar-context`
- Provedores aplicados em `App.tsx` na ordem: `AuthProvider` → `RestaurantProvider` → `ClientProvider` → `SidebarProvider`
- Diretriz: contexts de UI/estado global, com APIs mínimas e previsíveis

Hooks (`presentation/hooks`): `use-auth`, `use-cart`, `use-client`, `use-debounce`, `use-menu-layouts`, `use-operation`, `use-restaurant-*`, `use-sidebar`
- Diretriz: hooks devem ser puros, coesos e documentar retorno/efeitos esperados; isolar chamadas a casos de uso da camada `application`

---

## Rotas e Páginas

- Definições em `presentation/router/*` com lazy imports e `Suspense`:
  - Base: `/`, `/error`, `/404`, `/:slug`, `/:slug/category/:categoryId`, `/:slug/product/:productId`, `/:slug/profile`, `/:slug/cart`
  - Auth: `/register`, `/pending-register`, `/verify-email`, `/forgot-password`, `/reset-password`, `/login`
  - Dashboard (aninhadas em `/dashboard`): `create-restaurant`, `orders`, `menu`, `menu-items`, `reports`, `settings`, `messages`, `missions`
- `Header` é renderizado condicionalmente conforme página atual

---

## Padrões de UI e Acessibilidade

- **Formulários**: rótulos obrigatórios (`label` e `htmlFor`), feedback de erro próximo ao campo, `aria-invalid`/`aria-describedby` quando aplicável
- **Diálogos/Modais**: foco inicial, trap de foco, `aria-modal`, fechar com ESC, dimensão máxima já configurada no wrapper
- **Feedback**: toasts com ícones semânticos; mensagens curtas e acionáveis
- **Navegação**: responsiva, touch-friendly; `UserMenu` para usuário autenticado
- **Responsividade**: usar breakpoints do `theme` e utilitários Tailwind quando for simples; alinhar spacing e tipografia ao tema

Checklist de A11y (mínimo): foco visível, contraste suficiente, tamanho de alvo adequado, sem conteúdo dependente apenas de cor, rotulagem adequada.

---

## Convenções e Boas Práticas

- Preferir `styled-components` com tokens do `theme`; Tailwind para layout/utilitário rápido sem duplicar tokens
- Centralizar variantes/estados nos wrappers de UI; não propagar props da lib de terceiros diretamente para telas
- Separar `index.tsx` (lógica/render) de `styles.ts` (estilos) em componentes não triviais
- Evitar duplicação de componentes similares; antes de criar um novo, avaliar wrappers existentes
- Manter arquivos < 200-300 linhas; quando exceder, dividir por responsabilidade
- Considerar ambientes: estilização e assets não devem depender de variáveis ausentes em `prod`

---

## Como Criar/Atualizar um Componente de UI

1) Verificar se já existe wrapper similar em `components/ui/*`
2) Se não existir, criar pasta com `index.tsx` e `styles.ts`
3) Basear-se em um primitivo `@vbss-ui/*` quando aplicável
4) Integrar `theme` para cores, tipografia, radius, sombras e spacing
5) Adicionar variantes e estados necessários, com nomes curtos e semânticos
6) Garantir A11y: labels/aria, foco, teclados
7) Escrever exemplos de uso no Story/Doc (quando aplicável) e referenciar na página que consome

---

## Guia de Migração/Refatoração

- Substituir gradualmente classes legadas (`.btn-brut`, etc.) por wrappers de UI
- Consolidar tokens duplicados entre Tailwind e `theme` (ex.: manter `theme` como fonte de verdade e ajustar Tailwind apenas como espelho)
- Revisar `FormInput` para remover `any` com tipagens de `react-hook-form` quando adotado
- Padronizar variantes e tamanhos entre `Button`, `Input`, `Dialog`, etc.

---

## Exemplos Rápidos

Uso de botão com loading:
```tsx
import { Button } from '@/presentation/components/ui/button'

<Button variant="primary" loading loadingText="Salvando...">
  Salvar
</Button>
```

Diálogo simples:
```tsx
import { Dialog } from '@/presentation/components/ui/dialog'

<Dialog open={isOpen} onOpenChange={setOpen} title="Editar Categoria">
  <form onSubmit={onSubmit}>...</form>
</Dialog>
```

Campo controlado com RHF:
```tsx
<FormInput id="name" label="Nome" required register={register('name')} />
```

---

## Roadmap de UI (sugestões)

- Unificar contratos de `size`/`variant` entre wrappers
- Criar documentação de catálogo (Storybook/DocsPage) para os componentes de UI
- Cobrir hooks/contexts com exemplos e contratos no README da pasta
- Adicionar testes visuais e de acessibilidade (axe) para componentes críticos

---

## Contatos e Manutenção

- Qualquer alteração estrutural na UI deve atualizar este documento
- Ao introduzir um novo padrão, registrar a motivação, trade-offs e exemplos
