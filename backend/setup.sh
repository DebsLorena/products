#!/bin/bash

echo "🚀 Iniciando Products API..."

# Cria .env se não existir
[ ! -f .env ] && cp .env.example .env

# Tenta parar PostgreSQL local se estiver rodando
if sudo service postgresql status &>/dev/null; then
  echo "🛑 Parando PostgreSQL local que está usando a porta 5432..."
  sudo service postgresql stop
fi

# Para e reconstrói tudo
docker compose down
docker compose build --no-cache app
docker compose up -d

# Aguarda serviços iniciarem
echo "⏳ Aguardando serviços iniciarem..."
sleep 15

# Garante que as dependências estão instaladas (opcional)
echo "📦 Verificando dependências..."
docker compose exec app npm install

# Gera o Prisma Client
echo "🔨 Gerando Prisma Client..."
docker compose exec app npx prisma generate

# Executa migrations e seed
echo "🔄 Executando migrations..."
docker compose exec app npx prisma migrate dev --name init

echo "🌱 Executando seed..."
docker compose exec app npx prisma db seed

echo "✅ Pronto!"
echo "📚 Swagger: http://localhost:3001/api/docs"
echo "📊 Adminer: http://localhost:8080"
echo "🔍 Logs: docker compose logs -f app"

# Abre o Swagger
open http://localhost:3001/api/docs