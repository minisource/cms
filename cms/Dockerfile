# Use the official Node.js 18 Alpine image as the base
FROM node:18-alpine

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Strapi application
RUN npm run build

# Expose the port the app runs on
EXPOSE 1337

# Start the application
CMD ["npm", "start"]