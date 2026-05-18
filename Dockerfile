FROM node:24-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev

FROM node:24-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:24-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates libsqlite3-0 && \
    rm -rf /var/lib/apt/lists/*

# Standalone output bundles only the bits we need.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/payload.config.ts ./payload.config.ts
COPY --from=builder /app/src ./src

VOLUME ["/app/data", "/app/media"]
EXPOSE 3000
CMD ["node", "server.js"]
