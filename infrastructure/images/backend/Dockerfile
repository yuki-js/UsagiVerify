FROM node:22-slim AS builder

WORKDIR /app

# copy everything to the container
COPY . .

# Install dependencies
RUN npm i

# Build all the packages
RUN npm run -w common build && npm run -w manpoko build && npm run -w backend build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "-w", "backend", "start"]
