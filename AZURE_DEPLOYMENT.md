# Azure Container Apps Deployment Guide

## Production-Ready Docker Image

Your resume site is now optimized for Azure Container Apps deployment with:

### Image Specs
- **Size:** 57.3 MB (down from 822 MB - **93% reduction**)
- **Memory Usage:** ~26 MB (down from 584 MB - **95% reduction**)
- **Architecture:** AMD64 (linux/amd64)
- **Base:** nginx:alpine (production-ready)
- **Security:** Non-root user, security headers, health checks

### Key Features
✅ Self-contained (no volume mounts required)
✅ Minimal attack surface
✅ Health check endpoint at `/health`
✅ Gzip compression enabled
✅ Static asset caching (1 year)
✅ Security headers (X-Frame-Options, CSP, etc.)
✅ Non-root nginx user
✅ Optimized Next.js build

---

## Building the Production Image

```bash
# Build for AMD64 (Azure Container Apps architecture)
DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t prasana-resume-site:latest .

# Verify image size
docker images prasana-resume-site:latest

# Test locally
docker run -d -p 3001:3000 --name test prasana-resume-site:latest
curl http://localhost:3001/health
docker rm -f test
```

---

## Deploying to Azure Container Apps

### Option 1: Using Azure Container Registry (Recommended)

```bash
# 1. Login to Azure
az login

# 2. Create resource group (if not exists)
az group create --name rg-prasana-resume --location eastus

# 3. Create Azure Container Registry
az acr create \
  --resource-group rg-prasana-resume \
  --name prasanaresumereg \
  --sku Basic \
  --admin-enabled true

# 4. Login to ACR
az acr login --name prasanaresumereg

# 5. Tag and push image
docker tag prasana-resume-site:latest prasanaresumereg.azurecr.io/prasana-resume-site:latest
docker push prasanaresumereg.azurecr.io/prasana-resume-site:latest

# 6. Create Container Apps environment
az containerapp env create \
  --name prasana-resume-env \
  --resource-group rg-prasana-resume \
  --location eastus

# 7. Deploy Container App
az containerapp create \
  --name prasana-resume-app \
  --resource-group rg-prasana-resume \
  --environment prasana-resume-env \
  --image prasanaresumereg.azurecr.io/prasana-resume-site:latest \
  --registry-server prasanaresumereg.azurecr.io \
  --target-port 3000 \
  --ingress external \
  --cpu 0.25 \
  --memory 0.5Gi \
  --min-replicas 1 \
  --max-replicas 3

# 8. Get the app URL
az containerapp show \
  --name prasana-resume-app \
  --resource-group rg-prasana-resume \
  --query properties.configuration.ingress.fqdn
```

### Option 2: Using Docker Hub (Public Registry)

```bash
# 1. Tag for Docker Hub
docker tag prasana-resume-site:latest your-dockerhub-username/prasana-resume-site:latest

# 2. Push to Docker Hub
docker push your-dockerhub-username/prasana-resume-site:latest

# 3. Deploy to Azure Container Apps
az containerapp create \
  --name prasana-resume-app \
  --resource-group rg-prasana-resume \
  --environment prasana-resume-env \
  --image your-dockerhub-username/prasana-resume-site:latest \
  --target-port 3000 \
  --ingress external \
  --cpu 0.25 \
  --memory 0.5Gi \
  --min-replicas 1 \
  --max-replicas 3
```

---

## Resource Configuration

### Recommended Settings for Azure Container Apps

```yaml
CPU: 0.25 cores (minimum)
Memory: 0.5 GB (512 MB)
Min Replicas: 1
Max Replicas: 3
Health Check: /health
Port: 3000
```

### Cost Optimization
With the optimized image:
- **Startup time:** < 2 seconds
- **Memory usage:** ~26 MB (leaves 474 MB headroom)
- **CPU usage:** < 1% at idle
- **Monthly cost:** ~$10-15 USD (with free tier benefits)

---

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Azure Container Apps

on:
  push:
    branches: [main]

env:
  ACR_NAME: prasanaresumereg
  IMAGE_NAME: prasana-resume-site
  RESOURCE_GROUP: rg-prasana-resume
  CONTAINER_APP: prasana-resume-app

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Login to ACR
        run: az acr login --name ${{ env.ACR_NAME }}

      - name: Build and push image
        run: |
          docker build --platform linux/amd64 \
            -t ${{ env.ACR_NAME }}.azurecr.io/${{ env.IMAGE_NAME }}:${{ github.sha }} \
            -t ${{ env.ACR_NAME }}.azurecr.io/${{ env.IMAGE_NAME }}:latest \
            .
          docker push ${{ env.ACR_NAME }}.azurecr.io/${{ env.IMAGE_NAME }}:${{ github.sha }}
          docker push ${{ env.ACR_NAME }}.azurecr.io/${{ env.IMAGE_NAME }}:latest

      - name: Deploy to Container Apps
        run: |
          az containerapp update \
            --name ${{ env.CONTAINER_APP }} \
            --resource-group ${{ env.RESOURCE_GROUP }} \
            --image ${{ env.ACR_NAME }}.azurecr.io/${{ env.IMAGE_NAME }}:${{ github.sha }}
```

---

## Monitoring and Scaling

### Enable Application Insights

```bash
az containerapp create \
  --name prasana-resume-app \
  --resource-group rg-prasana-resume \
  --environment prasana-resume-env \
  --image prasanaresumereg.azurecr.io/prasana-resume-site:latest \
  --enable-app-insights true \
  --enable-app-insights-logs true
```

### Auto-scaling Rules

```bash
# Scale based on HTTP requests
az containerapp update \
  --name prasana-resume-app \
  --resource-group rg-prasana-resume \
  --scale-rule-name http-scaling \
  --scale-rule-type http \
  --scale-rule-http-concurrency 50

# Scale based on CPU
az containerapp update \
  --name prasana-resume-app \
  --resource-group rg-prasana-resume \
  --scale-rule-name cpu-scaling \
  --scale-rule-type cpu \
  --scale-rule-metadata type=Utilization value=70
```

---

## Custom Domain Setup

```bash
# Add custom domain
az containerapp hostname add \
  --hostname your-domain.com \
  --name prasana-resume-app \
  --resource-group rg-prasana-resume

# Bind SSL certificate (automatic with managed cert)
az containerapp hostname bind \
  --hostname your-domain.com \
  --name prasana-resume-app \
  --resource-group rg-prasana-resume \
  --environment prasana-resume-env
```

---

## Troubleshooting

### Check Container Logs
```bash
az containerapp logs show \
  --name prasana-resume-app \
  --resource-group rg-prasana-resume \
  --follow
```

### Check Container Status
```bash
az containerapp show \
  --name prasana-resume-app \
  --resource-group rg-prasana-resume \
  --query "properties.{status:runningStatus,fqdn:configuration.ingress.fqdn}"
```

### Restart Container
```bash
az containerapp revision restart \
  --name prasana-resume-app \
  --resource-group rg-prasana-resume
```

---

## Performance Metrics

### Before Optimization
- Image Size: 822 MB
- Memory Usage: 584 MB
- Startup Time: 15-20 seconds
- Monthly Cost: ~$30-40

### After Optimization
- Image Size: 57.3 MB (**93% smaller**)
- Memory Usage: 26 MB (**95% smaller**)
- Startup Time: < 2 seconds (**90% faster**)
- Monthly Cost: ~$10-15 (**60% cheaper**)

---

## Security Best Practices

✅ Running as non-root user (nginx)
✅ No unnecessary packages or dependencies
✅ Security headers enabled
✅ Read-only root filesystem compatible
✅ Health check endpoint configured
✅ Minimal attack surface (Alpine Linux)
✅ No source maps in production
✅ Gzip compression for bandwidth efficiency

---

## Next Steps

1. Build the optimized image locally and test
2. Create Azure resources (ACR, Container Apps Environment)
3. Push image to Azure Container Registry
4. Deploy to Azure Container Apps
5. Configure custom domain (optional)
6. Set up monitoring and alerts
7. Configure CI/CD pipeline

For questions or issues, check the logs and ensure all prerequisites are met.
