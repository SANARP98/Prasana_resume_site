# Base Path Configuration for /portfolio

## Changes Made

Your Next.js application has been configured to work under the `/portfolio` path on `gritgo.in`.

### 1. Next.js Configuration

Updated [next.config.js](next.config.js:4-5):
```javascript
basePath: '/portfolio',
assetPrefix: '/portfolio',
```

This tells Next.js:
- All routes are prefixed with `/portfolio`
- All assets (JS, CSS, images) are loaded from `/portfolio/_next/...`
- Links automatically get the `/portfolio` prefix

### 2. How It Works

**Before (without basePath):**
- Route: `/` → Goes to root
- Link: `/skills` → Goes to `/skills`
- Assets: `/_next/static/...`

**After (with basePath):**
- Route: `/portfolio/` → Home page
- Link: `/skills` → Automatically becomes `/portfolio/skills`
- Assets: `/portfolio/_next/static/...`

### 3. Nginx Configuration

Your nginx proxy should look like this:

```nginx
location /portfolio/ {
    proxy_pass http://127.0.0.1:3001/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_buffering off;
    proxy_cache_bypass $http_upgrade;
}
```

**Important:** The trailing slashes in both `location /portfolio/` and `proxy_pass http://127.0.0.1:3001/;` are required.

### 4. URL Structure

All your URLs will now work correctly:

| URL | What It Shows |
|-----|---------------|
| `https://gritgo.in/portfolio/` | Home page |
| `https://gritgo.in/portfolio/skills/` | Skills page |
| `https://gritgo.in/portfolio/cases/` | Cases archive |
| `https://gritgo.in/portfolio/cases/project-name/` | Individual case study |

### 5. Testing After Deployment

After you rebuild and deploy, test these URLs:

```bash
# Should show the home page
curl -I https://gritgo.in/portfolio/

# Should load correctly (check for 200 status)
curl -I https://gritgo.in/portfolio/skills/

# Check if assets load correctly
curl -I https://gritgo.in/portfolio/_next/static/chunks/...
```

### 6. Deployment Steps

```bash
# On your server
cd ~/portfolio/Prasana_resume_site

# Pull latest changes
git pull

# Rebuild the Docker image (this will rebuild with basePath)
docker compose down
docker compose build
docker compose up -d

# Check logs
docker logs -f prasana-portfolio

# Test locally first
curl http://localhost:3001/

# Then test via nginx
curl https://gritgo.in/portfolio/
```

### 7. Link Behavior

Next.js `<Link>` components automatically handle the basePath:

```tsx
// In your code
<Link href="/skills">Skills</Link>

// Renders as
<a href="/portfolio/skills">Skills</a>

// And works correctly!
```

### 8. Common Issues and Fixes

#### Issue: 404 on navigation
**Cause:** basePath not configured
**Fix:** ✅ Already fixed in next.config.js

#### Issue: Assets not loading (CSS/JS missing)
**Cause:** assetPrefix not set
**Fix:** ✅ Already fixed in next.config.js

#### Issue: Links go to wrong path
**Cause:** Using `<a>` instead of `<Link>`
**Fix:** Always use Next.js `<Link>` for internal navigation

#### Issue: External links broken
**Cause:** basePath applied to external links
**Fix:** External links in `<a>` tags (not `<Link>`) work fine

### 9. Verifying It Works

After deployment, open these in browser:
1. `https://gritgo.in/portfolio/` - Should show home page
2. Click "All Skills" - Should navigate to `https://gritgo.in/portfolio/skills/`
3. Click on a case study - Should navigate to `https://gritgo.in/portfolio/cases/[slug]/`
4. Check browser console - No 404 errors for assets

### 10. Development vs Production

**Development (local):**
```bash
npm run dev
# Access at: http://localhost:3000/portfolio/
```

**Production:**
```bash
npm run build
# Creates static export in /out with /portfolio prefix
# Docker serves it, nginx proxies to it
# Access at: https://gritgo.in/portfolio/
```

## Summary

✅ Next.js configured with `basePath: '/portfolio'`
✅ Assets prefixed with `assetPrefix: '/portfolio'`
✅ Docker nginx configuration updated
✅ All routes automatically prefixed
✅ Links work correctly
✅ Assets load from correct path

After rebuilding and deploying, your portfolio will work perfectly at `https://gritgo.in/portfolio/`!
