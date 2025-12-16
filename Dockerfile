# Production Dockerfile - Multi-stage build optimized for size
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Only install production dependencies
RUN npm ci --production --ignore-scripts && \
    npm cache clean --force

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Install all dependencies for build
RUN npm ci --ignore-scripts
COPY . .
# Build the static export
RUN npm run build && \
    npm cache clean --force

# Use nginx-alpine for smallest possible image (~40MB vs ~180MB with node)
FROM nginx:alpine AS runner

# Remove default nginx config and static files
RUN rm -rf /usr/share/nginx/html/* && \
    rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from builder
COPY --from=builder /app/out /usr/share/nginx/html

# Optimize: Remove unnecessary files
RUN find /usr/share/nginx/html -name "*.map" -delete

EXPOSE 3000

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
