# MenuXp – Visão Geral do Projeto

## 1. Propósito
O **MenuXp** é uma plataforma de _cardápio digital_ com funcionalidades de _delivery_ e **painel administrativo** completo. Permite que restaurantes cadastrem seus produtos, categorias e configurações de operação, além de oferecer uma experiência de compra fluida para o usuário final.

---

## 2. Principais Tecnologias & Stacks
| Camada | Tecnologias |
| ------ | ----------- |
| **Frontend** | React 18 · TypeScript 5 · Vite 6 · Styled-Components 6 · TailwindCSS 3 |
| **Gerenciamento de Estado** | Context API + Hooks personalizados |
| **Validações** | Zod 3 + React-Hook-Form 7 |
| **HTTP** | Axios (adaptado por camada _infra_) |
| **Design System** | _@vbss-ui_ (botão, inputs, chips, etc.) + Phosphor Icons + Lucide Icons |
| **Animações** | Framer-Motion |
| **Utilitários** | Crypto-JS, React-Beautiful-DnD, React-Hot-Toast |
| **Build / QA** | ESLint 9 + Prettier 3 + Vitest (⏳ a adicionar) |

> Nota: a stack segue princípios de **Clean Architecture**, separando regras de domínio, casos de uso e infraestrutura da camada de apresentação.

---

## 3. Estrutura de Diretórios (resumida)
```text
src/
  ├─ domain/          # Entidades de domínio, enums, gateways
  ├─ application/     # Casos de uso (serviços de negócio)
  ├─ infra/           # Adaptadores, decorators e injeção de dependências
  ├─ presentation/    # Componentes React, páginas, hooks & contextos
  ├─ main.tsx         # Bootstrapping da aplicação
  └─ App.tsx          # Definição das rotas principais
```

### Detalhes
- **domain/** – implementa modelos puros (`*.model.ts`), enums e contratos de acesso.
- **application/** – _use-cases_ encapsulam regras de negócio sem dependências externas diretas.
- **infra/** – adapta _drivers_ externos (HTTP, criptografia, storage) para contratos internos e faz _dependency-injection_.
- **presentation/** – divide-se em _components_, _pages_, _contexts_, _providers_ e _router_, mantendo cada responsabilidade isolada.

---

## 4. Scripts Principais (`package.json`)
```bash
# Desenvolvimento local
pnpm dev      # ou yarn dev / npm run dev

# Build de produção
pnpm build    # compila TypeScript e gera bundle Vite

# Lint & Format
pnpm lint           # analisa código com ESLint
pnpm lint:fix       # corrige problemas automáticos
pnpm format         # Prettier – formatação de todo o código

# Preview do bundle
pnpm preview        # serve artefato de produção localmente
```

> Dica: altere `vite.config.ts` para configurar proxies ou paths adicionais.

---

## 5. Convenções de Código
1. **Arquivos ≤ 300 linhas** – refatorar antes de exceder.
2. **Funções pequenas** – extraia lógica complexa para _helpers_ ou novos _use-cases_.
3. **Sem dados simulados em produção** – _mocks_ apenas em testes.
4. **Evite duplicação** – reutilize componentes e hooks.
5. **Environments** – variáveis sensíveis no `.env` (não versionado).

---

## 6. Build & Deployment
- **Vite** é responsável pelo _bundle_ e _dev-server_.
- Arquivo `vercel.json` incluso ➜ pronto para _deploy_ na Vercel.
- Ajuste variáveis de ambiente na UI da Vercel ou crie `vercel/.env.*`.

---

## 7. Próximos Passos Recomendados
1. **Testes Automatizados** – configurar **Vitest** + React-Testing-Library.
2. **CI/CD** – integrar com GitHub Actions para lint, test e deploy.
3. **Storybook** – documentar componentes isoladamente.
4. **Internacionalização (i18n)** – preparar strings para múltiplos idiomas.
5. **A11y** – auditoria de acessibilidade contínua (plugin eslint-jsx-a11y já incluso).

---

© MenuXp – _engineering handbook_  
Mantenha este documento atualizado a cada mudança de stack ou arquitetura. 