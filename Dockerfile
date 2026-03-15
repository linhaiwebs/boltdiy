# Multi-stage Dockerfile for BoltDIY V2.0
# Optimized for Cloudflare Pages/Workers deployment

# ================================
# Stage 1: Base Image
# ================================
FROM node:20-slim AS base

# Install pnpm
ENV PNPM_VERSION=10.18.0
RUN npm install -g pnpm@${PNPM_VERSION} \
    && pnpm config set store-dir /root/.pnpm-store

WORKDIR /app

# ================================
# Stage 2: Dependencies
# ================================
FROM base AS dependencies

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies
RUN pnpm install --frozen-lockfile

# ================================
# Stage 3: Build
# ================================
FROM base AS build

# Copy dependencies from previous stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /root/.pnpm-store /root/.pnpm-store

# Copy application source
COPY . .

# Build the application
RUN pnpm run build

# ================================
# Stage 4: Production Runtime
# ================================
FROM node:20-slim AS production

ENV PNPM_VERSION=10.18.0
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

# Install only production dependencies (includes wrangler/workerd)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy built application
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build /app/wrangler.toml ./wrangler.toml
COPY --from=build /app/bindings.sh ./bindings.sh

RUN chmod +x ./bindings.sh

# Expose default Wrangler port
EXPOSE 8788

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8788', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the production server
CMD ["sh", "-c", "bindings=$(./bindings.sh) && ./node_modules/.bin/wrangler pages dev ./build/client $bindings --port 8788 --ip 0.0.0.0"]

# ================================
# Stage 5: Development
# ================================
FROM base AS development

# Copy dependencies
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /root/.pnpm-store /root/.pnpm-store

# Copy application source
COPY . .

# Expose Vite development server port
EXPOSE 5173

# Start development server
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]
