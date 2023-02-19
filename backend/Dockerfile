FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:16-alpine AS production
RUN npm install pm2 -g
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm i --omit=dev
COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js
COPY --from=builder /app/dist ./dist/
EXPOSE 3001
# Указываем команду для запуска приложения
CMD ["pm2-runtime", "start", "ecosystem.config.js"]