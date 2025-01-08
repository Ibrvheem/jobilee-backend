# Step 1: Build the Next.js app in a node container
FROM node:latest as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . . 

# Build the application
RUN npm run build

# Step 2: Serve the Next.js app using a Node.js server
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production


# Expose the port the app runs on
EXPOSE 9308

# Define the command to run the app
CMD ["npm", "start"]
