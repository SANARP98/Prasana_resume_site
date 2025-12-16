#!/bin/bash

# Quick redeploy script for portfolio updates
# Run this after making changes and pushing to git

set -e

echo "🔄 Redeploying Prasana Portfolio..."
echo ""

# Pull latest changes
echo "📥 Pulling latest changes from git..."
git pull
echo ""

# Stop current container
echo "🛑 Stopping current container..."
docker-compose down
echo ""

# Rebuild image
echo "🔨 Building new Docker image..."
docker-compose build
echo ""

# Start container
echo "🚀 Starting container..."
docker-compose up -d
echo ""

# Wait a moment for container to start
echo "⏳ Waiting for container to start..."
sleep 5
echo ""

# Check status
echo "✅ Container status:"
docker ps | grep prasana-portfolio || echo "❌ Container not running!"
echo ""

# Show logs
echo "📋 Recent logs:"
docker logs --tail 20 prasana-portfolio
echo ""

# Test if it's responding
echo "🧪 Testing application..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health | grep -q "200"; then
    echo "✅ Application is responding!"
else
    echo "❌ Application not responding. Check logs above."
fi
echo ""

echo "🎉 Redeploy complete!"
echo ""
echo "Test your changes at:"
echo "  Local: http://localhost:3001/"
echo "  Public: https://gritgo.in/portfolio/"
echo ""
echo "To view logs: docker logs -f prasana-portfolio"
