# generate-icons.sh - Script para gerar ícones
#!/bin/bash

# Instalar sharp-cli se necessário
# npm install -g sharp-cli

# Criar diretório de ícones
mkdir -p public/icons public/splash

# Gerar ícones de diferentes tamanhos a partir de um ícone base
# Substitua icon-base.png pelo seu ícone original (512x512 ou maior)

sharp -i public/icon-base.png -o public/icons/icon-72x72.png resize 72 72
sharp -i public/icon-base.png -o public/icons/icon-96x96.png resize 96 96
sharp -i public/icon-base.png -o public/icons/icon-128x128.png resize 128 128
sharp -i public/icon-base.png -o public/icons/icon-144x144.png resize 144 144
sharp -i public/icon-base.png -o public/icons/icon-152x152.png resize 152 152
sharp -i public/icon-base.png -o public/icons/icon-192x192.png resize 192 192
sharp -i public/icon-base.png -o public/icons/icon-384x384.png resize 384 384
sharp -i public/icon-base.png -o public/icons/icon-512x512.png resize 512 512

echo "✅ Ícones gerados com sucesso!"