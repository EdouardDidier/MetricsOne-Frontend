# Stage 1: Install dependencies and build the app
FROM node:alpine AS builder

# Set working directory
WORKDIR /app

# Set environment variables for build time 
ENV API_HOST=http://host.docker.internal
ENV API_PORT=8080
ENV IMAGE_URL=https://media.formula1.com

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the app files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production image with minimal footprint
FROM node:alpine AS web

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Run the Next.js app
CMD ["npm", "start"]
