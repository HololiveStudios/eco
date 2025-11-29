# deploy.sh - NOVO (Script de deploy completo)
#!/bin/bash

echo "🚀 Iniciando deploy do e-commerce..."

# Build do projeto
echo "📦 Building project..."
npm run build

# Deploy do banco de dados
echo "🗄️ Setting up database..."
wrangler d1 execute ecommerce_db --file=./schema.sql

# Deploy da aplicação
echo "🌐 Deploying to Cloudflare Pages..."
wrangler pages deploy dist

echo "✅ Deploy concluído com sucesso!"