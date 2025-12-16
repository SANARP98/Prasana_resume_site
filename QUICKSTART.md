# Quick Start Guide - Production Deployment

## On Your Linux VM

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd prasana-resume-site
chmod +x setup.sh
./setup.sh
```

### 2. Gather Nginx Info (run these commands and share output)
```bash
sudo nginx -t
ls -la /etc/nginx/sites-available/
grep -r 'gritgo.in' /etc/nginx/sites-available/
```

If you find a gritgo.in config file:
```bash
cat /etc/nginx/sites-available/gritgo.in
# OR
cat /etc/nginx/sites-enabled/gritgo.in
```

### 3. Add to Nginx Config

Edit your gritgo.in nginx config:
```bash
sudo nano /etc/nginx/sites-available/gritgo.in
```

Add this inside the `server` block:
```nginx
location /portfolio/ {
    proxy_pass http://localhost:3001/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_buffering off;
    proxy_cache_bypass $http_upgrade;
}
```

### 4. Test and Reload Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Verify
```bash
curl http://localhost:3001
curl http://localhost/portfolio/
```

Visit: `https://gritgo.in/portfolio`

## Common Commands

```bash
# View logs
docker logs -f prasana-portfolio

# Restart container
docker compose restart

# Update after git pull
git pull && docker compose up -d --build

# Check service status
sudo systemctl status prasana-portfolio

# View nginx logs
sudo tail -f /var/log/nginx/error.log
```

## Troubleshooting

**502 Bad Gateway?**
```bash
docker ps | grep prasana-portfolio
docker logs prasana-portfolio
```

**Container not running?**
```bash
docker compose up -d --build
```

**Port already in use?**
```bash
sudo lsof -i :3001
# Change port in docker-compose.yml if needed
```

## Auto-Start Configured ✓

The application will automatically start on server reboot via systemd service.

---

**Full documentation**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
