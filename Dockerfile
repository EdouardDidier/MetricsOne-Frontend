# Stage 1: Install dependencies
FROM node:alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./

RUN npm install



# Stage 2: Build the app
FROM node:alpine AS builder
WORKDIR /app

# Set environment variables for build time 
ENV API_HOST=http://host.docker.internal
ENV API_PORT=8080
ENV IMAGE_URL=https://media.formula1.com

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build



# Stage 3: Production image with minimal footprint
FROM node:alpine AS web
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Run the Next.js app
CMD ["node", "server.js"]
