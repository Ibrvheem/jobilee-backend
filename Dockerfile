# Use the official Node.js 18 image as the base image
FROM node:18-alpine as base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application using npx to avoid the need for a global NestJS CLI installation
RUN npx nest build

# Start a new stage for running the production build
FROM node:18-alpine as production

# Set the working directory
WORKDIR /usr/src/app

# Copy only the production dependencies from the base image
COPY --from=base /usr/src/app/node_modules ./node_modules

# Copy the built application
COPY --from=base /usr/src/app/dist ./dist

# Copy any additional files your application needs (e.g., environment variables)
COPY package.json .

# Expose the port that your NestJS app listens on
EXPOSE 3000

# Specify the command to run the app
CMD ["node", "dist/main"]
