# FROM node:18-alpine

# # Create app directory
# WORKDIR /app

# # Install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy source
# COPY . .

# # Build TypeScript
# RUN npm run build

# # Expose port
# EXPOSE 5000

# # Start server
# CMD ["node", "dist/server.js"]


# Use official Node.js image (Debian-based to avoid Alpine permission issues)
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Give execute permissions to binaries (tsc, etc.)
RUN chmod -R +x ./node_modules/.bin

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "dist/server.js"]
