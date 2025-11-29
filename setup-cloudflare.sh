# setup-cloudflare.sh - Configuração inicial completa

#!/bin/bash

echo "⚙️  Configurando Cloudflare..."

# 1. Criar banco de dados D1
echo "📊 Criando banco de dados D1..."
wrangler d1 create ecommerce_db

# Capturar o ID do banco (você precisará copiar isso para wrangler.toml)
echo "⚠️  Copie o database_id acima e cole em wrangler.toml"
read -p "Pressione Enter para continuar..."

# 2. Executar schema SQL
echo "📝 Criando tabelas..."
wrangler d1 execute ecommerce_db --file=./schema.sql --remote

# 3. Criar namespace KV
echo "🗄️  Criando KV namespace..."
wrangler kv:namespace create "ECOMMERCE_KV"
wrangler kv:namespace create "ECOMMERCE_KV" --preview

echo "⚠️  Copie os IDs do KV acima e cole em wrangler.toml"
read -p "Pressione Enter para continuar..."

# 4. Criar bucket R2
echo "📦 Criando bucket R2..."
wrangler r2 bucket create ecommerce-images

# 5. Popular dados iniciais
echo "🌱 Populando dados iniciais..."
wrangler d1 execute ecommerce_db --file=./seed.sql --remote

echo "✅ Configuração concluída!"
echo ""
echo "Próximos passos:"
echo "1. Edite wrangler.toml com os IDs gerados"
echo "2. Configure as variáveis de ambiente no Cloudflare Dashboard"
echo "3. Execute: ./deploy-cloudflare.sh"