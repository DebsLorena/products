# 🛍️ Products API

Uma API RESTful robusta para gerenciar produtos e pedidos com arquitetura limpa e boas práticas.

## 📋 Sumário

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Testes](#-testes)
- [Documentação da API](#-documentação-da-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuindo](#-contribuindo)

## 🎯 Sobre

Este projeto foi desenvolvido como parte de um desafio técnico, demonstrando proficiência em:

- ✅ Arquitetura limpa com separação de responsabilidades
- ✅ Princípios SOLID aplicados em todo o código
- ✅ Design patterns modernos
- ✅ Testes unitários com alta cobertura
- ✅ Documentação completa da API
- ✅ Containerização com Docker

## 🚀 Funcionalidades

### Produtos

| Funcionalidade    | Método | Endpoint          | Status |
|-------------------|--------|-------------------|---------|
| Criar produto     | POST   | `/products`       | ✅      |
| Listar produtos   | GET    | `/products`       | ✅      |
| Buscar produto    | GET    | `/products/:id`   | ✅      |
| Atualizar produto | PUT    | `/products/:id`   | ✅      |
| Deletar produto   | DELETE | `/products/:id`   | ✅      |

### Pedidos

| Funcionalidade    | Método | Endpoint                 | Status |
|-------------------|--------|--------------------------|---------|
| Criar pedido      | POST   | `/orders`                | ✅      |
| Listar pedidos    | GET    | `/orders`                | ✅      |
| Buscar pedido     | GET    | `/orders/:id`            | ✅      |
| Atualizar status  | PATCH  | `/orders/:id/status`     | ✅      |

### Segurança

- 🔑 Autenticação JWT
- 🛡️ Rotas protegidas
- 📝 Middleware de logging

## 🛠️ Tecnologias

| Backend       | Banco de Dados | DevOps         | Testes     |
|---------------|----------------|----------------|------------|
| NestJS        | PostgreSQL     | Docker         | Jest       |
| TypeScript    | Prisma ORM     | Docker Compose | Supertest  |
| Class Validator| -             | GitHub Actions | -          |
| Swagger       | -              | -              | -          |

## 📦 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/DebsLorena/products.git
cd products
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

## ⚙️ Configuração

### 1. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto copiando o exemplo:

```bash
cp .env.example .env
```

### 2. Edite o arquivo `.env` com suas configurações:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/produtos_db"

# JWT
JWT_SECRET="your-super-secret-key"
JWT_EXPIRATION="7d"

# API
PORT=3001
NODE_ENV=development
```

## 🚀 Executando o Projeto

### 🎯 Opção 1: Script Automatizado (RECOMENDADO)

O projeto inclui um script que automatiza todo o processo de setup e inicialização:

```bash
# Torne o script executável (apenas na primeira vez)
chmod +x start.sh

# Execute o script
./start.sh
```

O script irá automaticamente:
- ✅ Criar o arquivo `.env` se não existir
- ✅ Parar o PostgreSQL local se estiver usando a porta 5432
- ✅ Construir e iniciar todos os containers Docker
- ✅ Instalar as dependências
- ✅ Gerar o Prisma Client
- ✅ Executar as migrations
- ✅ Popular o banco com dados iniciais (seed)
- ✅ Abrir o Swagger no navegador

### Opção 2: Com Docker (Manual)

```bash
# Suba todos os serviços
docker compose up -d

# Verifique se os containers estão rodando
docker compose ps

# Execute as migrations
docker compose exec app npx prisma migrate dev

# Execute o seed (dados iniciais)
docker compose exec app npx prisma db seed
```

### Opção 3: Localmente

```bash
# 1. Suba apenas o banco de dados
docker-compose up -d postgres

# 2. Aguarde o banco estar pronto (cerca de 10 segundos)

# 3. Execute as migrations
npx prisma migrate dev

# 4. Execute o seed (opcional)
npx prisma db seed

# 5. Inicie o servidor em modo desenvolvimento
npm run start:dev
```

🎉 **Pronto!** A API está rodando em [http://localhost:3001](http://localhost:3001)

## 📊 Acessando os Serviços

| Serviço | URL | Descrição |
|---------|-----|-----------|
| API | http://localhost:3001 | Servidor principal |
| Swagger | http://localhost:3001/api/docs | Documentação interativa |
| Adminer | http://localhost:8080 | Interface para o banco de dados |

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Executar testes com cobertura
npm run test:cov

# Executar testes em modo watch
npm run test:watch

# Executar testes e2e
npm run test:e2e
```

## 📚 Documentação da API

A documentação interativa da API está disponível via Swagger:

[http://localhost:3001/api/docs](http://localhost:3001/api/docs)

## 📁 Estrutura do Projeto

```
📦 products/
├── 📂 src/
│   ├── 📂 products/
│   │   ├── 📂 dto/
│   │   │   ├── 📄 create-product.dto.ts
│   │   │   └── 📄 update-product.dto.ts
│   │   ├── 📂 entities/
│   │   │   └── 📄 product.entity.ts
│   │   ├── 📄 products.controller.ts
│   │   ├── 📄 products.service.ts
│   │   ├── 📄 products.repository.ts
│   │   └── 📄 products.module.ts
│   │
│   ├── 📂 orders/
│   │   ├── 📂 dto/
│   │   ├── 📂 entities/
│   │   ├── 📄 orders.controller.ts
│   │   ├── 📄 orders.service.ts
│   │   └── 📄 orders.module.ts
│   │
│   ├── 📂 common/
│   │   ├── 📂 middlewares/
│   │   ├── 📂 filters/
│   │   └── 📂 pipes/
│   │
│   ├── 📂 auth/
│   │   ├── 📂 guards/
│   │   ├── 📄 jwt.strategy.ts
│   │   └── 📄 auth.module.ts
│   │
│   ├── 📄 app.module.ts
│   └── 📄 main.ts
│
├── 📂 prisma/
│   ├── 📄 schema.prisma
│   └── 📄 seed.ts
│
├── 📂 test/
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 docker-compose.yml
├── 📄 Dockerfile
├── 📄 start.sh          # Script de inicialização automatizada
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 README.md
```

## 🐛 Solução de Problemas

### Erro de conexão com o banco de dados

```bash
# Verifique se o container do PostgreSQL está rodando
docker-compose ps

# Verifique os logs do PostgreSQL
docker-compose logs postgres

# Reinicie os containers
docker-compose down
docker-compose up -d
```

### Erro ao executar migrations

```bash
# Limpe o banco e execute novamente
npx prisma migrate reset

# Ou force a criação das tabelas
npx prisma db push
```

### Porta 3001 já está em uso

```bash
# Altere a porta no arquivo .env
PORT=3002

# Ou encerre o processo que está usando a porta
lsof -ti:3001 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3001    # Windows
```

### Script não executa no Windows

Se você estiver usando Windows, execute o script através do Git Bash ou WSL:

```bash
# No Git Bash ou WSL
bash start.sh
```

## 📝 Comandos Úteis

```bash
# Ver logs da aplicação
docker compose logs -f app

# Acessar o container da aplicação
docker compose exec app sh

# Resetar o banco de dados
docker compose exec app npx prisma migrate reset

# Gerar novo migration
docker compose exec app npx prisma migrate dev --name nome_da_migration

# Ver status dos containers
docker compose ps
```

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ por [Lorena Debs](https://github.com/DebsLorena)