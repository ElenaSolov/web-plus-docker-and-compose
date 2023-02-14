FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build

FROM nginx:1.23.1-alpine AS production
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=builder /app/build ./
COPY ./nginx/conf.d/defauld.conf /etc/nginx/conf.d
EXPOSE 8081
ENTRYPOINT ["nginx", "-g", "daemon off;"]
