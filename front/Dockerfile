# --- STAGE 1: Build ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copy shared logic (required for types/constants)
COPY shared /shared

# Copy frontend files
COPY front/package*.json ./
RUN npm install

COPY front/ .
RUN npm run build

# --- STAGE 2: Serve ---
FROM nginx:alpine

# Copy built files from Astro
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx config (optional, for SPA routing)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
