# deploy-cloudflare.sh - Script completo de deploy

#!/bin/bash

echo "🚀 Iniciando deploy para Cloudflare Pages..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se wrangler está instalado
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ Wrangler não está instalado${NC}"
    echo "Instalando wrangler..."
    npm install -g wrangler
fi

# Login no Cloudflare (se necessário)
echo -e "${YELLOW}🔐 Verificando autenticação...${NC}"
wrangler whoami || wrangler login

# Limpar builds anteriores
echo -e "${YELLOW}🧹 Limpando builds anteriores...${NC}"
rm -rf dist/ .astro/

# Build do projeto
echo -e "${YELLOW}📦 Construindo projeto...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro no build${NC}"
    exit 1
fi

# Criar projeto no Cloudflare Pages (primeira vez)
echo -e "${YELLOW}🌐 Criando projeto no Cloudflare Pages...${NC}"
wrangler pages project create ecommerce-base --production-branch=main

# Deploy
echo -e "${YELLOW}🚀 Fazendo deploy...${NC}"
wrangler pages deploy dist --project-name=ecommerce-base

echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"