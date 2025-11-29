# README.md - ATUALIZADO COM DOCUMENTAÇÃO COMPLETA

# E-commerce Base - Astro + SolidJS + Cloudflare

E-commerce completo e escalável construído com as melhores tecnologias do mercado.

## 🚀 Tecnologias

- **Astro** - Framework web ultrarrápido
- **SolidJS** - UI reativa e performática
- **Cloudflare Pages** - Hospedagem edge
- **Cloudflare D1** - Banco de dados SQL serverless
- **Cloudflare KV** - Cache distribuído
- **Cloudflare R2** - Armazenamento de objetos
- **Cloudflare Images** - Otimização de imagens
- **TailwindCSS** - Estilização

## 📦 Funcionalidades

### Front-end
- ✅ Catálogo de produtos com filtros
- ✅ Carrinho de compras persistente
- ✅ Sistema de favoritos (wishlist)
- ✅ Checkout completo
- ✅ Cálculo de frete
- ✅ Aplicação de cupons de desconto
- ✅ Sistema de avaliações
- ✅ Busca de produtos
- ✅ Categorias
- ✅ Página de produto com detalhes
- ✅ Integração WhatsApp
- ✅ Responsivo mobile-first

### Admin
- ✅ Dashboard com estatísticas
- ✅ Gestão de produtos (CRUD)
- ✅ Gestão de pedidos
- ✅ Gestão de categorias
- ✅ Gestão de cupons
- ✅ Upload de imagens
- ✅ Relatórios
- ✅ Configurações da loja

### Backend
- ✅ API REST completa
- ✅ Banco de dados SQL (D1)
- ✅ Cache distribuído (KV)
- ✅ Armazenamento de imagens (R2)
- ✅ Processamento de pagamentos
- ✅ Envio de emails
- ✅ Analytics

## 🛠️ Instalação
```bash
# Clone o repositório
git clone <repo-url>

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicialize o banco de dados
npm run db:init

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🔧 Configuração Cloudflare
```bash
# Login no Cloudflare
wrangler login

# Criar banco D1
wrangler d1 create ecommerce_db

# Criar KV namespace
wrangler kv:namespace create "ECOMMERCE_KV"

# Criar bucket R2
wrangler r2 bucket create ecommerce-images

# Executar migrations
npm run db:migrations
```

## 📝 Variáveis de Ambiente
```env
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_IMAGES_TOKEN=
CLOUDFLARE_D1_DATABASE_ID=
CLOUDFLARE_KV_NAMESPACE_ID=
CLOUDFLARE_R2_BUCKET=
DATABASE_URL=
WHATSAPP_PHONE=
```

## 🚀 Deploy
```bash
# Build e deploy
npm run build
npm run deploy

# Ou use o script automatizado
./deploy.sh
```

## 📊 Estrutura do Banco

- **products** - Produtos da loja
- **categories** - Categorias
- **orders** - Pedidos
- **reviews** - Avaliações
- **coupons** - Cupons de desconto
- **customers** - Clientes cadastrados

## 🔐 Segurança

- Autenticação admin
- Validação de dados
- Sanitização de inputs
- Rate limiting
- HTTPS obrigatório

## 📈 Performance

- SSR com Astro
- Cache em múltiplas camadas
- Imagens otimizadas
- Edge computing
- Bundle size mínimo

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou PR.

## 📄 Licença

MIT