FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --silent

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY package.json ./
COPY --from=build /app/dist ./dist
RUN npm ci --production --silent

EXPOSE 3000
CMD ["node", "dist/index.js"]
