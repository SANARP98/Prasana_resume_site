# Production Deployment Guide

This guide explains how to deploy the Prasana Portfolio application to a Linux VM using Docker and nginx.

## Prerequisites

- Linux VM (Ubuntu/Debian recommended)
- Git installed
- User with sudo privileges

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd prasana-resume-site
   ```

2. **Make setup script executable:**
   ```bash
   chmod +x setup.sh
   ```

3. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

   The script will:
   - Install Docker and Docker Compose
   - Install nginx (if not present)
   - Build the Docker image
   - Start the container on port 3001
   - Create a systemd service for auto-start on reboot
   - Configure health checks

## What Gets Installed

- **Docker Engine**: Container runtime
- **Docker Compose**: Container orchestration
- **nginx**: Web server (for proxying)
- **Systemd Service**: Auto-starts the container on boot

## Container Details

- **Container Name**: `prasana-portfolio`
- **Host Port**: `3001` (proxies to container port 3000)
- **Restart Policy**: `unless-stopped` (auto-restarts on failure)
- **Health Check**: Every 30 seconds
- **User**: Runs as non-root user `nextjs` (UID 1001)

## Nginx Configuration

### Step 1: Check Your Current Nginx Setup

Run these commands on your server:

```bash
# Test nginx configuration
sudo nginx -t

# Find your gritgo.in configuration
grep -r 'gritgo.in' /etc/nginx/sites-available/

# If found, view the configuration file
cat /etc/nginx/sites-available/gritgo.in
# OR
cat /etc/nginx/sites-enabled/gritgo.in
```

### Step 2: Add Portfolio Location Block

Add this configuration to your nginx server block for `gritgo.in`:

```nginx
# Inside the server block for gritgo.in
server {
    listen 80;
    server_name gritgo.in www.gritgo.in;

    # ... your existing configuration ...

    # Portfolio application
    location /portfolio/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;

        # WebSocket support (if needed in future)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Disable buffering for better performance
        proxy_buffering off;
        proxy_cache_bypass $http_upgrade;
    }

    # ... rest of your configuration ...
}
```

**Important Notes:**
- The trailing slash in `/portfolio/` and `http://localhost:3001/` is crucial
- This ensures `/portfolio/about` maps to `/about` in the container
- Without it, the path would be duplicated: `/portfolio/portfolio/about`

### Step 3: Test and Reload Nginx

```bash
# Test the configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx

# Or restart if reload doesn't work
sudo systemctl restart nginx
```

### Step 4: Verify Deployment

```bash
# Check if container is running
docker ps | grep prasana-portfolio

# Check container logs
docker logs prasana-portfolio

# Test local access
curl http://localhost:3001

# Test via nginx (from server)
curl http://localhost/portfolio/

# Test from outside (if firewall allows)
curl https://gritgo.in/portfolio/
```

## Useful Commands

### Docker Commands

```bash
# View container logs
docker logs prasana-portfolio

# Follow logs in real-time
docker logs -f prasana-portfolio

# Restart container
docker compose restart

# Stop container
docker compose down

# Start container
docker compose up -d

# Rebuild and restart
docker compose up -d --build

# View container status
docker ps

# Check container health
docker inspect prasana-portfolio | grep -A 10 Health
```

### Systemd Service Commands

```bash
# Check service status
sudo systemctl status prasana-portfolio

# Start service
sudo systemctl start prasana-portfolio

# Stop service
sudo systemctl stop prasana-portfolio

# Restart service
sudo systemctl restart prasana-portfolio

# Enable auto-start on boot
sudo systemctl enable prasana-portfolio

# Disable auto-start
sudo systemctl disable prasana-portfolio

# View service logs
sudo journalctl -u prasana-portfolio
```

### Nginx Commands

```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx

# Check nginx status
sudo systemctl status nginx

# View nginx error logs
sudo tail -f /var/log/nginx/error.log

# View nginx access logs
sudo tail -f /var/log/nginx/access.log
```

## Updating the Application

When you have new changes to deploy:

```bash
# Pull latest changes
git pull

# Rebuild and restart container
docker compose down
docker compose up -d --build

# OR use the service
sudo systemctl restart prasana-portfolio
```

## Troubleshooting

### Container Won't Start

```bash
# Check Docker logs
docker logs prasana-portfolio

# Check if port 3001 is already in use
sudo lsof -i :3001
sudo netstat -tlnp | grep 3001

# Remove and rebuild
docker compose down
docker compose up -d --build
```

### Nginx 502 Bad Gateway

```bash
# Check if container is running
docker ps | grep prasana-portfolio

# Check if container is healthy
docker inspect prasana-portfolio | grep -A 5 Health

# Test direct container access
curl http://localhost:3001

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Application Not Accessible

```bash
# Check firewall rules
sudo ufw status

# If using firewalld
sudo firewall-cmd --list-all

# Ensure nginx is running
sudo systemctl status nginx

# Check nginx configuration
sudo nginx -t

# Verify DNS resolution
nslookup gritgo.in
```

### Container Health Check Failing

```bash
# Check health status
docker inspect prasana-portfolio | grep -A 10 Health

# Check if app responds
curl http://localhost:3001

# View detailed logs
docker logs --tail 100 prasana-portfolio
```

## Security Considerations

1. **Firewall**: Ensure only port 80/443 is open externally
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

2. **SSL/TLS**: Add SSL certificate to nginx (recommended)
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d gritgo.in
   ```

3. **Container Security**: The container runs as a non-root user (nextjs)

4. **Updates**: Regularly update the base image and dependencies

## Performance Optimization

The application is built as a static export with:
- Gzip compression
- Optimized images
- Minified JS/CSS
- Browser caching headers

For additional performance:
- Enable nginx caching
- Use CDN for static assets
- Enable HTTP/2 in nginx

## Monitoring

### Container Resource Usage

```bash
# View container resource usage
docker stats prasana-portfolio

# View container processes
docker top prasana-portfolio
```

### Application Logs

```bash
# Real-time logs
docker logs -f prasana-portfolio

# Last 100 lines
docker logs --tail 100 prasana-portfolio

# Logs with timestamps
docker logs -t prasana-portfolio
```

## Backup and Restore

### Backup

```bash
# Backup Docker image
docker save prasana-portfolio:latest | gzip > prasana-portfolio-backup.tar.gz

# Backup application files
tar -czf portfolio-backup.tar.gz /path/to/prasana-resume-site
```

### Restore

```bash
# Restore Docker image
docker load < prasana-portfolio-backup.tar.gz

# Restore application files
tar -xzf portfolio-backup.tar.gz -C /desired/location
```

## Support

For issues or questions:
1. Check the logs: `docker logs prasana-portfolio`
2. Verify nginx configuration: `sudo nginx -t`
3. Check container health: `docker ps`
4. Review this documentation

## Architecture Overview

```
Internet
    ↓
nginx (Port 80/443)
    ↓ [proxy_pass]
Docker Container (Port 3001)
    ↓ [serve static files]
Built Static Site (from /app/out)
```

The application is:
- Built as a static export (Next.js `output: 'export'`)
- Served using `serve` package inside Docker
- Proxied through nginx for the `/portfolio` path
- Auto-restarted on failure or reboot
