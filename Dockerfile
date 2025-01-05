# Build Stage
FROM node:18 AS builder
WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy necessary files and build
COPY prisma ./prisma/
COPY tsconfig*.json ./
COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine AS runtime
WORKDIR /app

# Copy production dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --production

# Copy application files
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/prisma ./prisma/

# Debug: Check file structure
RUN ls -la ./dist ./prisma

EXPOSE 9308
CMD ["npm", "run", "start:prod"]
