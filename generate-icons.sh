#!/bin/bash

# Instalar sharp-cli se não estiver instalado
# npm install -g sharp-cli

INPUT_IMAGE="public/logo.png"

# Criar diretório de ícones
mkdir -p public/icons
mkdir -p public/splash

# Gerar ícones
sharp -i $INPUT_IMAGE -o public/icons/icon-72x72.png resize 72 72
sharp -i $INPUT_IMAGE -o public/icons/icon-96x96.png resize 96 96
sharp -i $INPUT_IMAGE -o public/icons/icon-128x128.png resize 128 128
sharp -i $INPUT_IMAGE -o public/icons/icon-144x144.png resize 144 144
sharp -i $INPUT_IMAGE -o public/icons/icon-152x152.png resize 152 152
sharp -i $INPUT_IMAGE -o public/icons/icon-192x192.png resize 192 192
sharp -i $INPUT_IMAGE -o public/icons/icon-384x384.png resize 384 384
sharp -i $INPUT_IMAGE -o public/icons/icon-512x512.png resize 512 512

# Gerar splash screens iOS
sharp -i $INPUT_IMAGE -o public/splash/splash-640x1136.png resize 640 1136
sharp -i $INPUT_IMAGE -o public/splash/splash-750x1334.png resize 750 1334
sharp -i $INPUT_IMAGE -o public/splash/splash-828x1792.png resize 828 1792
sharp -i $INPUT_IMAGE -o public/splash/splash-1125x2436.png resize 1125 2436
sharp -i $INPUT_IMAGE -o public/splash/splash-1242x2208.png resize 1242 2208
sharp -i $INPUT_IMAGE -o public/splash/splash-1242x2688.png resize 1242 2688
sharp -i $INPUT_IMAGE -o public/splash/splash-1536x2048.png resize 1536 2048
sharp -i $INPUT_IMAGE -o public/splash/splash-1668x2388.png resize 1668 2388
sharp -i $INPUT_IMAGE -o public/splash/splash-2048x2732.png resize 2048 2732

echo "✅ Ícones PWA gerados com sucesso!"
