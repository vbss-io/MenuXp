# Menu XP

Este é um monorepo utilizando Turbo com 3 aplicações principais:

- **@menu-xp/adm** - Painel Administrativo (React + Vite)
- **@menu-xp/customers** - App para Clientes (React + Vite)
- **@menu-xp/server** - Backend (Node.js + Express)

## Comandos Principais

### Desenvolvimento

```bash
# Executar todos os projetos
npm run dev

# Executar apenas um projeto específico
npm run dev --workspace=@menu-xp/adm
npm run dev --workspace=@menu-xp/customers  
npm run dev --workspace=@menu-xp/server
```

### Build

```bash
# Build de todos os projetos
npm run build

# Build de projeto específico
npm run build --workspace=@menu-xp/adm
npm run build --workspace=@menu-xp/customers
npm run build --workspace=@menu-xp/server
```

### Linting

```bash
# Lint de todos os projetos
npm run lint

# Lint de projeto específico
npm run lint --workspace=@menu-xp/adm
npm run lint --workspace=@menu-xp/customers
npm run lint --workspace=@menu-xp/server
```

### Gerenciamento de Dependências

```bash
# Instalar dependências de todos os projetos
npm install

# Instalar em projeto específico
npm install <package> --workspace=@menu-xp/adm
npm install <package> --workspace=@menu-xp/customers
npm install <package> --workspace=@menu-xp/server

# Adicionar dependência de desenvolvimento
npm install <package> --save-dev --workspace=@menu-xp/adm

# Remover dependência
npm uninstall <package> --workspace=@menu-xp/adm
```
