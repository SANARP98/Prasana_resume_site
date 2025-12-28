# Production Dockerfile - Optimized for Azure Container Apps
# Target: AMD64 architecture, minimal size, maximum performance

# Build stage - Use AMD64 architecture explicitly
FROM --platform=linux/amd64 node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for build)
RUN npm ci --ignore-scripts

# Copy source files
COPY . .

# Build the static export
RUN npm run build && \
    # Clean up after build
    rm -rf .next/cache && \
    npm cache clean --force

# Production stage - Ultra-minimal nginx
FROM --platform=linux/amd64 nginx:alpine AS runner

# Add labels for Azure Container Apps
LABEL maintainer="Prasana Resume Site"
LABEL description="Production-ready resume site with nginx"
LABEL version="1.0.0"

# Remove default nginx files to reduce size
RUN rm -rf /usr/share/nginx/html/* && \
    rm -rf /etc/nginx/conf.d/* && \
    # Remove unnecessary nginx modules/files
    rm -rf /usr/share/nginx/modules && \
    # Clean up package manager cache
    rm -rf /var/cache/apk/*

# Copy optimized nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from builder (all-inclusive, no volumes)
COPY --from=builder /app/out /usr/share/nginx/html

# Aggressive cleanup to minimize image size
RUN find /usr/share/nginx/html -type f \( \
    -name "*.map" -o \
    -name "*.md" -o \
    -name "*.txt" -o \
    -name "*.LICENSE" -o \
    -name ".gitignore" -o \
    -name ".DS_Store" \
    \) -delete && \
    # Remove empty directories
    find /usr/share/nginx/html -type d -empty -delete && \
    # Set proper permissions for nginx user
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    # Create and configure nginx directories for non-root
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Run as non-root user (Azure Container Apps best practice)
USER nginx

# Expose port (Azure Container Apps will map this)
EXPOSE 3000

# Health check for Azure Container Apps
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
