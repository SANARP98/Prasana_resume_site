# Production Dockerfile - Optimized for Azure Container Apps
# Target: AMD64 architecture, minimal size, maximum performance

# Stage 1: Build frontend static export
FROM --platform=linux/amd64 node:20-alpine AS frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for build)
RUN npm ci --ignore-scripts

# Copy source files
COPY . .

# Build the static export
RUN npm run build && \
    rm -rf .next/cache && \
    npm cache clean --force

# Stage 2: Build backend
FROM --platform=linux/amd64 node:20-alpine AS backend-builder

WORKDIR /backend

COPY backend/package*.json ./
RUN npm install

COPY backend/tsconfig.json ./
COPY backend/*.ts ./
COPY backend/routes/ ./routes/

RUN npx tsc --outDir dist && \
    rm -rf node_modules && \
    npm install --production

# Stage 3: Production runtime (Node + Nginx)
FROM --platform=linux/amd64 node:20-alpine AS runner

# Add labels for Azure Container Apps
LABEL maintainer="Prasana Resume Site"
LABEL description="Production-ready resume site with nginx and analytics"
LABEL version="2.0.0"

# Install nginx
RUN apk add --no-cache nginx && \
    rm -rf /usr/share/nginx/html/* && \
    rm -rf /etc/nginx/conf.d/* && \
    rm -rf /var/cache/apk/*

# Copy nginx configuration (replaces default Alpine nginx.conf)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy frontend static files
COPY --from=frontend-builder /app/out /usr/share/nginx/html

# Cleanup static files
RUN find /usr/share/nginx/html -type f \( \
    -name "*.map" -o \
    -name "*.md" -o \
    -name "*.txt" -o \
    -name "*.LICENSE" -o \
    -name ".gitignore" -o \
    -name ".DS_Store" \
    \) -delete && \
    find /usr/share/nginx/html -type d -empty -delete && \
    chown -R node:node /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Configure nginx to run as non-root
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/lib/nginx/logs /run/nginx && \
    touch /run/nginx/nginx.pid && \
    chown -R node:node /run/nginx && \
    chown -R node:node /var/cache/nginx && \
    chown -R node:node /var/log/nginx && \
    chown -R node:node /var/lib/nginx && \
    chown -R node:node /etc/nginx

# Copy backend
COPY --from=backend-builder /backend/dist /backend/dist
COPY --from=backend-builder /backend/node_modules /backend/node_modules
COPY --from=backend-builder /backend/package.json /backend/

# Copy start script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Run as non-root user
USER node

# Expose port (Azure Container Apps will map this)
EXPOSE 3000

# Health check for Azure Container Apps
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

# Start both nginx and backend
CMD ["/start.sh"]
