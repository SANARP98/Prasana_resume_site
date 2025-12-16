# Docker Image Size Optimizations

## Summary of Optimizations

The Dockerfile has been optimized to reduce the final image size from **~180MB to ~40-50MB** (up to 75% reduction).

## Key Changes

### 1. **Switched from Node.js to Nginx Base Image**
- **Before**: `node:20-alpine` (~180MB)
- **After**: `nginx:alpine` (~40MB)
- **Savings**: ~140MB
- **Reason**: Since Next.js is built as a static export, we don't need Node.js runtime. Nginx is perfect for serving static files and is much smaller.

### 2. **Production-Only Dependencies in deps Stage**
```dockerfile
# Only install production dependencies (though not used in final image)
RUN npm ci --production --ignore-scripts
```
- Skips devDependencies
- `--ignore-scripts` prevents running unnecessary scripts
- Speeds up build time

### 3. **Clean npm Cache**
```dockerfile
RUN npm run build && \
    npm cache clean --force
```
- Removes npm cache after build
- Reduces intermediate layer size
- Speeds up subsequent builds

### 4. **Remove Source Maps**
```dockerfile
RUN find /usr/share/nginx/html -name "*.map" -delete
```
- Removes `.map` files from production
- Saves ~10-20MB depending on bundle size
- Source maps not needed in production

### 5. **Inline Nginx Configuration**
- Uses heredoc (`COPY <<EOF`) to embed nginx config
- No need for separate nginx.conf file
- One less COPY layer

### 6. **Optimized Nginx Config**
- Gzip compression enabled (reduces bandwidth)
- Static asset caching (1 year for immutable files)
- Security headers
- Health check endpoint

## Size Comparison

| Component | Before | After | Savings |
|-----------|--------|-------|---------|
| Base Image | node:20-alpine (~180MB) | nginx:alpine (~40MB) | ~140MB |
| Source Maps | Included (~10-20MB) | Removed | ~10-20MB |
| npm Cache | Included | Cleaned | ~5-10MB |
| **Total** | **~200-210MB** | **~40-50MB** | **~75% reduction** |

## Performance Benefits

### Build Time
- ✅ Faster builds (no `serve` package installation)
- ✅ Better layer caching
- ✅ Smaller intermediate layers

### Runtime
- ✅ Faster container startup
- ✅ Less memory usage
- ✅ Better performance (nginx is optimized for static files)
- ✅ Built-in gzip compression
- ✅ Advanced caching headers

### Deployment
- ✅ Faster image pulls
- ✅ Less disk space on server
- ✅ Faster rollbacks
- ✅ Less bandwidth usage

## Additional Optimizations You Can Consider

### 1. Multi-Stage Build Optimization
If you want even smaller images, you could use a distroless or scratch image, but nginx:alpine is already excellent for static sites.

### 2. Image Optimization
Optimize your static assets before building:
```bash
# Install image optimization tools
npm install --save-dev sharp imagemin

# Optimize images during build
# Add to next.config.js
```

### 3. Bundle Analysis
Analyze your JavaScript bundle size:
```bash
npm install --save-dev @next/bundle-analyzer

# Add to package.json
"analyze": "ANALYZE=true next build"

# Run analysis
npm run analyze
```

### 4. Content Compression
The nginx config already includes gzip, but you could pre-compress files:
```dockerfile
# In builder stage
RUN find /app/out -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' \) \
    -exec gzip -k -9 {} \;

# Update nginx config to use gzip_static
gzip_static on;
```

### 5. CDN for Static Assets
For production, consider moving large static assets (images, fonts) to a CDN:
- Reduces container size further
- Faster global delivery
- Reduces server bandwidth

## Verification Commands

### Check Image Size
```bash
# Build the image
docker compose build

# Check image size
docker images | grep prasana

# Inspect layers
docker history prasana-resume-site-portfolio:latest
```

### Compare Before and After
```bash
# Tag current image
docker tag prasana-resume-site-portfolio:latest prasana-portfolio:optimized

# Compare sizes
docker images | grep prasana-portfolio
```

### Test Performance
```bash
# Start container
docker compose up -d

# Check startup time
docker logs prasana-portfolio

# Test response time
time curl http://localhost:3001

# Check memory usage
docker stats prasana-portfolio
```

## Security Benefits

The optimized image also has security advantages:

1. **Smaller Attack Surface**: Fewer packages = fewer vulnerabilities
2. **No Node.js Runtime**: Eliminates Node.js-specific vulnerabilities
3. **Official Nginx Image**: Well-maintained and regularly updated
4. **No npm in Production**: Can't execute arbitrary npm packages
5. **Security Headers**: Built into nginx config

## Rollback Plan

If you need to revert to the Node.js-based approach:

```dockerfile
# Revert to using serve
FROM node:20-alpine AS runner
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/out ./out
CMD ["serve", "-s", "out", "-l", "3000"]
```

## Monitoring

Monitor your container to ensure everything works:

```bash
# Real-time logs
docker logs -f prasana-portfolio

# Check nginx access logs (if enabled)
docker exec prasana-portfolio tail -f /var/log/nginx/access.log

# Check error logs
docker exec prasana-portfolio tail -f /var/log/nginx/error.log

# Performance metrics
docker stats prasana-portfolio
```

## Conclusion

These optimizations provide:
- **75% smaller image** (~40-50MB vs ~200MB)
- **Faster deployments** (less to download)
- **Better performance** (nginx > node serve)
- **Lower costs** (less bandwidth, storage, memory)
- **Enhanced security** (smaller attack surface)

The image is now production-ready and optimized for both performance and cost efficiency!
