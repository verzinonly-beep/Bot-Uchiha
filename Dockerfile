FROM node:20-alpine

WORKDIR /app

# Copia arquivos essenciais
COPY package.json package-lock.json* tsconfig.json ./

# Instala dependências
RUN npm install --silent

# Copia o resto do projeto
COPY . .

# Compila o TypeScript
RUN npm run build

# Expõe porta
EXPOSE 3000

# Inicia diretamente o Node (mantém o processo vivo)
CMD ["node", "dist/index.js"]
