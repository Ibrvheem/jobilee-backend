# Use the official Node.js 16 image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 9308

# Start the application
CMD ["node", "dist/src/main.js"]
