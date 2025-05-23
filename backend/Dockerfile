# For production (default)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
RUN npm install -g prisma
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
EXPOSE 4000

# For development
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm install -g prisma
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && npx ts-node-dev --respawn --transpile-only src/index.ts"]
