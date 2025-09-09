# Base
FROM node:20-slim AS base
WORKDIR /app
RUN npm install -g pnpm

# Builder
FROM base AS builder
WORKDIR /app

# Copy only lockfiles first (cache deps)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy full repo and prune
COPY . .
RUN mkdir -p /app/out
RUN pnpm turbo prune --docker --scope=api --out-dir=/app/out

# Installer
FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ ./
RUN pnpm install --frozen-lockfile --prod=false
COPY --from=builder /app/out/full/ ./
RUN pnpm --filter api run build

# Runtime
FROM node:20-slim AS runtime
WORKDIR /app
RUN npm install -g pnpm
COPY --from=installer /app/apps/api/dist ./dist
COPY --from=installer /app/apps/api/package.json ./package.json
COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --prod
EXPOSE 3000
CMD ["node", "dist/main.js"]

# # ---------- Base ----------
# FROM node:20-slim AS base
# WORKDIR /app
# RUN npm install -g pnpm

# # ---------- Builder ----------
# FROM base AS builder
# WORKDIR /app

# # Copy full repo
# COPY . .

# # Ensure out dir exists
# RUN mkdir -p /app/out

# # Generate a partial monorepo with a pruned lockfile for api
# RUN pnpm turbo prune --docker --scope=api --out-dir=/app/out

# # ---------- Installer ----------
# FROM base AS installer
# WORKDIR /app

# # Copy only pruned package.json and lockfile
# COPY --from=builder /app/out/json/ ./

# # Install all dependencies including dev for build
# RUN pnpm install --frozen-lockfile --prod=false

# # Copy full workspace source for build
# COPY --from=builder /app/out/full/ ./

# # Build only the api workspace
# RUN pnpm --filter api run build

# # ---------- Runtime ----------
# # ---------- Runtime ----------
# FROM node:20-slim AS runtime
# WORKDIR /app
# RUN npm install -g pnpm

# # Copy compiled JS
# COPY --from=installer /app/apps/api/dist ./dist

# # Copy package.json and lockfile for production install
# COPY --from=installer /app/apps/api/package.json ./package.json
# COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml

# # Install only production dependencies
# RUN pnpm install --prod

# EXPOSE 3000

# CMD ["node", "dist/main.js"]
