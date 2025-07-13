# Sistema de Gerenciamento de Produtos

## 📋 Visão Geral

Aplicação web moderna desenvolvida em Next.js 15 para gerenciamento de produtos, com funcionalidades completas de CRUD, filtros avançados, ordenação e interface responsiva utilizando Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **Next.js 15.3.5** - Framework React com App Router
- **React 19.1.0** - Biblioteca UI
- **TypeScript 5.8.3** - Type safety e melhor DX
- **Tailwind CSS 3.4.17** - Estilização utility-first
- **Zustand 5.0.6** - Gerenciamento de estado global
- **React Hook Form 7.60.0** - Gerenciamento de formulários
- **Zod 4.0.5** - Validação de schemas
- **SWR 2.3.4** - Data fetching com cache e revalidação
- **NextAuth.js 4.24.11** - Autenticação segura
- **React Hot Toast** - Notificações elegantes

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas

```
frontend/
├── src/
│   ├── app/                      # App Router do Next.js
│   │   ├── (pages)/             # Grupo de rotas
│   │   │   ├── login/           # Página de login
│   │   │   │   └── page.tsx
│   │   │   └── products/        # Módulo de produtos
│   │   │       ├── edit/
│   │   │       │   └── [productSlug]/
│   │   │       │       └── page.tsx
│   │   │       ├── list/
│   │   │       │   └── page.tsx
│   │   │       └── new/
│   │   │           └── page.tsx
│   │   ├── api/                 # API Routes
│   │   ├── globals.css          # Estilos globais + Tailwind
│   │   ├── layout.tsx           # Layout principal
│   │   └── page.tsx             # Página inicial
│   │
│   ├── components/              # Componentes reutilizáveis
│   │   ├── features/            # Componentes de domínio
│   │   │   ├── FilterForm/
│   │   │   ├── OrderModal/
│   │   │   ├── ProductForm/
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductRow/
│   │   │   └── ProductTable/
│   │   ├── layout/              # Componentes de layout
│   │   │   ├── MenuNavigation/
│   │   │   └── PaginationButton/
│   │   └── ui/                  # Componentes base
│   │       ├── ConfirmDeleteModal.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorMessage.tsx
│   │       ├── Input.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── NavButton.tsx
│   │       └── ProductCard.tsx
│   │
│   ├── hooks/                   # Custom hooks
│   │   ├── useDebounce.ts
│   │   └── useProductForm.ts
│   │
│   ├── store/                   # Estado global (Zustand)
│   │
│   ├── types/                   # TypeScript types
│   │
│   └── utils/                   # Utilitários
│       ├── constants.ts
│       └── formatters.ts
│
├── public/                      # Assets estáticos
├── .env.local                   # Variáveis de ambiente
├── next.config.ts              # Configuração do Next.js
├── tailwind.config.js          # Configuração do Tailwind
├── postcss.config.js           # Configuração do PostCSS
├── tsconfig.json               # Configuração do TypeScript
└── package.json                # Dependências do projeto
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm
- Backend API rodando na porta 3001

### Passo a passo

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd frontend
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Outras configurações
NEXT_PUBLIC_ITEMS_PER_PAGE=10
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:3000`

## ✨ Funcionalidades

### 🔑 Autenticação
- [x] Login seguro com NextAuth.js
- [x] Proteção de rotas privadas
- [x] Gerenciamento de sessão

### 📦 Gerenciamento de Produtos
- [x] **Listagem**: Visualização em tabela e cards
- [x] **Cadastro**: Formulário com validação
- [x] **Edição**: Atualização de produtos existentes
- [x] **Exclusão**: Com modal de confirmação
- [x] **Busca**: Filtro por nome com debounce
- [x] **Filtros**: Por faixa de preço, categorias, nome
- [x] **Ordenação**: Por nome, preço, data, entre outras
- [x] **Paginação**: Navegação entre páginas
- [x] **Adição**: Adicionar produtos
- [x] **Listagem**: Listagem de produtos adicionados

### 🎨 Interface
- [x] Design responsivo (mobile-first)
- [x] Loading states
- [x] Tratamento de erros
- [x] Notificações toast
- [x] Estados vazios ilustrados

## 🔧 Scripts Disponíveis

```json
{
  "dev": "Inicia o servidor de desenvolvimento",
  "build": "Cria build de produção",
  "start": "Inicia o servidor de produção",
  "lint": "Executa o linter"
}
```

## 🎯 Decisões Técnicas

### Por que estas tecnologias?

- **Next.js 15 com App Router**: Melhor performance com React Server Components
- **Zustand**: Estado global simples e performático, sem boilerplate
- **SWR**: Cache inteligente e revalidação automática de dados
- **React Hook Form + Zod**: Validação robusta com type safety
- **Tailwind CSS**: Desenvolvimento rápido com classes utilitárias

### Padrões de Código

- **Componentes**: Organizados por tipo (ui, features, layout)
- **Hooks Customizados**: Lógica reutilizável extraída
- **Type Safety**: TypeScript em todo o projeto
- **Validação**: Schemas Zod compartilhados entre cliente e servidor

## 🚧 Implementações Futuras

### Testes
- [ ] Testes unitários com Jest
- [ ] Testes de integração
- [ ] Testes E2E com Cypress
- [ ] Coverage mínimo de 80%


## 📝 Convenções

### Commits
```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração sem mudança de funcionalidade
test: adiciona ou corrige testes
chore: tarefas de manutenção
```

### Nomenclatura
- Componentes: `PascalCase`
- Funções/variáveis: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`
- Arquivos de componentes: `PascalCase.tsx`
- Outros arquivos: `kebab-case.ts`


## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ por [Lorena Debs](https://github.com/DebsLorena)