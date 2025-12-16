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
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 3000;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|docx|pdf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # Handle Next.js static export routing with basePath
    location / {
        try_files \$uri \$uri.html \$uri/ /index.html;
    }
}
EOF

# Copy built static files from builder
COPY --from=builder /app/out /usr/share/nginx/html

# Optimize: Remove unnecessary files
RUN find /usr/share/nginx/html -name "*.map" -delete

EXPOSE 3000

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
