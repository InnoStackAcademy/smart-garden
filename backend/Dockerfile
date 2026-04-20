# Use root context for build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy shared logic
COPY shared /shared

# Copy backend files
COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/src ./src
COPY backend/simulator ./simulator

EXPOSE 3000

CMD ["node", "src/index.js"]
