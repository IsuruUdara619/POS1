# Stage 1: Build the application
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

# Install all dependencies (including devDependencies for building)
RUN npm ci

COPY . .

# Build the TypeScript application
# We need to ensure the build script copies .sql files or we do it manually here
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine

# Install runtime dependencies (Canvas/Alpine)
RUN apk add --no-cache \
    cairo \
    pango \
    jpeg \
    giflib \
    librsvg \
    pixman \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set working directory
WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy any necessary static assets that weren't copied by the build script
# (The build script command "cp src/*.sql dist/src/" handles this, but good to be safe or explicit)

ENV NODE_ENV=production
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

EXPOSE 5000

CMD ["npm", "start"]
