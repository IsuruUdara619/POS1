# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with Node.js
FROM node:20-alpine

WORKDIR /app

# Copy package.json to install production dependencies
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev

# Copy built assets from builder stage
COPY --from=builder /app/dist /app/dist

# Copy server script
COPY server.js .

# Expose port 80
EXPOSE 80

# Start server
CMD ["node", "server.js"]
