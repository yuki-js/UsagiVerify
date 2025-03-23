# Build stage
FROM node:22-slim AS builder

WORKDIR /app

# Copy root package files for workspace setup
COPY package.json package-lock.json ./

# Copy manpoko package files
COPY manpoko/package.json manpoko/
COPY manpoko/tsconfig.json manpoko/
COPY manpoko/build.js manpoko/

# Install dependencies
RUN npm ci

# Copy source files
COPY manpoko/src/ manpoko/src/

# Build the application
RUN npm run -w manpoko build

# Runtime stage
FROM node:22-slim

WORKDIR /app

# Copy package files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/manpoko/package.json manpoko/

# Copy built files
COPY --from=builder /app/manpoko/dist/ manpoko/dist/

# Install production dependencies only
RUN npm ci --omit=dev --workspace manpoko

# Copy config file
COPY manpoko/config.development.development.json manpoko/

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "-w", "manpoko", "start"]
