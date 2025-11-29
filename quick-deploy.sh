# quick-deploy.sh - Deploy rápido para testes
#!/bin/bash

echo "⚡ Deploy Rápido"

# Build
echo "📦 Building..."
npm run build || exit 1

# Deploy
echo "🚀 Deploying..."
wrangler pages deploy dist --project-name=ecommerce-base

echo "✅ Feito!"
echo "🌐 Acesse: https://ecommerce-base.pages.dev"