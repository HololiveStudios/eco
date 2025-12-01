FROM node:20-bullseye

# Diretório da aplicação
WORKDIR /app

# Copia package.json e package-lock (se existir)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o projeto para dentro do container
COPY . .

# Porta usada pelo Astro
EXPOSE 4321

# Comando padrão para desenvolvimento
CMD ["npm", "run", "dev", "--", "--host"]
