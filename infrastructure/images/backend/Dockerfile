# Build stage
FROM node:22-slim AS builder

WORKDIR /app

# Copy root package files for workspace setup
COPY package.json package-lock.json ./

# Copy backend package files
COPY backend/package.json backend/
COPY backend/tsconfig.json backend/
COPY backend/build.js backend/

# Install dependencies
RUN npm ci

# Copy source files
COPY backend/src/ backend/src/

# Build the application
RUN npm run -w backend build

# Runtime stage
FROM node:22-slim

WORKDIR /app

# Copy package files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/backend/package.json backend/

# Copy built files
COPY --from=builder /app/backend/dist/ backend/dist/

# Install production dependencies only
RUN npm ci --omit=dev --workspace backend

# Copy config file
COPY backend/config.development.development.json backend/

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "-w", "backend", "start"]
