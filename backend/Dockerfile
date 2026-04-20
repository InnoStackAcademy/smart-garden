# Use node 22 for consistency and compatibility
FROM node:22-alpine

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
