# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy the production dependencies from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy any additional files (e.g., package.json for environment variables)
COPY package.json .

# Expose the application port
EXPOSE 9308

# Start the application
CMD ["node", "dist/main"]
