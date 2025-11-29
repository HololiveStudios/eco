# DEPLOY.md - Guia completo de deploy

# 🚀 Guia de Deploy - Cloudflare Pages

## Pré-requisitos

- Node.js 18+ instalado
- Conta no Cloudflare (gratuita)
- Git instalado

## Passo 1: Configurar Cloudflare

### 1.1 Login no Cloudflare
```bash
npm install -g wrangler
wrangler login
```

### 1.2 Executar Setup
```bash
chmod +x setup-cloudflare.sh
./setup-cloudflare.sh
```

Isso irá criar:
- ✅ Banco de dados D1
- ✅ KV Namespace
- ✅ Bucket R2
- ✅ Tabelas e dados iniciais

### 1.3 Copiar IDs Gerados

Após executar o setup, você receberá IDs. Cole-os em `wrangler.toml`:
```toml
[[env.production.d1_databases]]
database_id = "seu-database-id-aqui"

[[env.production.kv_namespaces]]
id = "seu-kv-id-aqui"
```

## Passo 2: Configurar Variáveis de Ambiente

No Cloudflare Dashboard:

1. Acesse **Pages** > Seu projeto > **Settings** > **Environment variables**
2. Adicione:
   - `WHATSAPP_PHONE`: Seu número com DDI (ex: 5511999999999)
   - `CLOUDFLARE_ACCOUNT_ID`: ID da sua conta
   - `CLOUDFLARE_API_TOKEN`: Token da API

## Passo 3: Deploy Manual
```bash
# Build do projeto
npm run build

# Deploy
wrangler pages deploy dist --project-name=ecommerce-base
```

Ou use o script automatizado:
```bash
chmod +x deploy-cloudflare.sh
./deploy-cloudflare.sh
```

## Passo 4: Deploy Automático (GitHub Actions)

### 4.1 Adicionar Secrets no GitHub

No seu repositório GitHub:
1. Vá em **Settings** > **Secrets and variables** > **Actions**
2. Adicione:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

### 4.2 Push para Main
```bash
git add .
git commit -m "Initial deploy"
git push origin main
```

O deploy será automático a cada push!

## Passo 5: Configurar Domínio Personalizado

1. No Cloudflare Dashboard, vá para **Pages**
2. Selecione seu projeto
3. Vá em **Custom domains**
4. Clique em **Set up a custom domain**
5. Digite seu domínio (ex: `loja.com`)
6. Siga as instruções para configurar DNS

## Comandos Úteis
```bash
# Ver logs em tempo real
wrangler pages deployment tail

# Listar deploys
wrangler pages deployment list

# Rollback para versão anterior
wrangler pages deployment list
wrangler pages deployment rollback [deployment-id]

# Ver banco de dados
wrangler d1 execute ecommerce_db --command="SELECT * FROM products" --remote

# Adicionar dados ao banco
wrangler d1 execute ecommerce_db --file=./custom-data.sql --remote

# Limpar cache KV
wrangler kv:key delete --binding=KV "key-name"

# Upload de imagem para R2
wrangler r2 object put ecommerce-images/test.jpg --file=./test.jpg
```

## Estrutura de URLs

Após o deploy:
- **Produção**: `https://ecommerce-base.pages.dev`
- **Preview**: `https://[commit-hash].ecommerce-base.pages.dev`

## Troubleshooting

### Erro: "Module not found"
```bash
npm install
npm run build
```

### Erro: "Database not found"
```bash
npm run db:init
```

### Erro: "Unauthorized"
```bash
wrangler logout
wrangler login
```

### Build falha no Alpine
Use Docker ou deploy direto do GitHub Actions (recomendado)

## Monitoramento

Acesse o Cloudflare Dashboard para:
- 📊 Analytics de tráfego
- 🐛 Logs de erros
- ⚡ Performance metrics
- 💾 Uso de banco de dados

## Custos

Plano gratuito inclui:
- ✅ 100.000 requests/dia
- ✅ 500MB de storage
- ✅ Unlimited static requests
- ✅ SSL gratuito

## Próximos Passos

1. Configure domínio personalizado
2. Ative Cloudflare Analytics
3. Configure backup automático
4. Adicione monitoramento de uptime
5. Configure CDN para assets

## Suporte

- [Documentação Cloudflare Pages](https://developers.cloudflare.com/pages)
- [Documentação D1](https://developers.cloudflare.com/d1)
- [Comunidade Discord](https://discord.gg/cloudflaredev)