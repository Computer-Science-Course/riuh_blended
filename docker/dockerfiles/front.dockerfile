# Stage 1: Builder with dev dependencies
FROM node:20-bullseye AS builder
WORKDIR /app

# Copy package files first for better caching
COPY front/package.json front/package-lock.json ./
COPY docker/.env .env

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy source code
COPY front .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:20-bullseye AS production
WORKDIR /app

ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.env .env

# Install production-only dependencies
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "start"]

# Stage 3: Development image
FROM node:20-bullseye AS dev
WORKDIR /app

ENV NODE_ENV development

COPY front/package.json front/package-lock.json ./
COPY docker/.env .env
RUN npm install

COPY front .

EXPOSE 3000
CMD ["npm", "run", "dev"]