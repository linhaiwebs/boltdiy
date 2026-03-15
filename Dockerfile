# Multi-stage Dockerfile for BoltDIY V2.0

# ================================
# Stage 1: Base Image
# ================================
FROM node:20-slim AS base

ENV PNPM_VERSION=10.18.0
RUN npm install -g pnpm@${PNPM_VERSION} \
    && pnpm config set store-dir /root/.pnpm-store

WORKDIR /app

# ================================
# Stage 2: Dependencies
# ================================
FROM base AS dependencies

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --no-frozen-lockfile

# ================================
# Stage 3: Build
# ================================
FROM base AS build

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /root/.pnpm-store /root/.pnpm-store

COPY . .

RUN pnpm run build

# ================================
# Stage 4: Production Runtime
# ================================
FROM node:20-slim AS production

ENV PNPM_VERSION=10.18.0
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile

COPY --from=build /app/build ./build
COPY --from=build /app/public ./public

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["pnpm", "run", "start"]

# ================================
# Stage 5: Development
# ================================
FROM base AS development

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /root/.pnpm-store /root/.pnpm-store

COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]
