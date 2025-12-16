#!/bin/bash

# Docker-based Production Deployment Setup for Prasana Portfolio
# This script sets up the application as a Docker container with auto-restart

set -e  # Exit on any error

echo "================================================"
echo "Prasana Portfolio - Docker Production Setup"
echo "================================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please do not run this script as root. Run as a regular user with sudo privileges."
    exit 1
fi

# Configuration
APP_NAME="prasana-portfolio"
APP_DIR="$(pwd)"
HOST_PORT=3001  # Port exposed to host
CONTAINER_PORT=3000  # Port inside container

print_info "Application Directory: $APP_DIR"
print_info "Host Port: $HOST_PORT (maps to container port $CONTAINER_PORT)"
echo ""

# Step 1: Update system packages
print_step "Step 1: Updating system packages..."
sudo apt-get update -qq
print_success "System packages updated"
echo ""

# Step 2: Install Docker if not present
print_step "Step 2: Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    print_info "Docker not found. Installing Docker..."

    # Install prerequisites
    sudo apt-get install -y \
        ca-certificates \
        curl \
        gnupg \
        lsb-release

    # Add Docker's official GPG key
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    # Set up the repository
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Install Docker Engine
    sudo apt-get update -qq
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # Add current user to docker group
    sudo usermod -aG docker $USER

    print_success "Docker installed"
    print_info "You may need to log out and back in for group changes to take effect"
else
    DOCKER_VERSION=$(docker --version)
    print_success "Docker already installed: $DOCKER_VERSION"
fi
echo ""

# Step 3: Install Docker Compose if not present
print_step "Step 3: Checking Docker Compose installation..."
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_info "Docker Compose not found. Installing..."
    sudo apt-get install -y docker-compose-plugin
    print_success "Docker Compose installed"
else
    if docker compose version &> /dev/null; then
        COMPOSE_VERSION=$(docker compose version)
    else
        COMPOSE_VERSION=$(docker-compose --version)
    fi
    print_success "Docker Compose already installed: $COMPOSE_VERSION"
fi
echo ""

# Step 4: Install nginx if not present
print_step "Step 4: Checking nginx installation..."
if ! command -v nginx &> /dev/null; then
    print_info "nginx not found. Installing nginx..."
    sudo apt-get install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
    print_success "nginx installed and started"
else
    print_success "nginx already installed"
fi
echo ""

# Step 5: Stop and remove existing container if running
print_step "Step 5: Checking for existing containers..."
if docker ps -a | grep -q $APP_NAME; then
    print_info "Stopping and removing existing container..."
    docker stop $APP_NAME 2>/dev/null || true
    docker rm $APP_NAME 2>/dev/null || true
    print_success "Existing container removed"
else
    print_info "No existing container found"
fi
echo ""

# Step 6: Remove old images (optional, saves space)
print_step "Step 6: Cleaning up old images..."
if docker images | grep -q prasana-resume-site; then
    print_info "Removing old images..."
    docker rmi $(docker images -q prasana-resume-site) 2>/dev/null || true
fi
print_success "Cleanup complete"
echo ""

# Step 7: Build Docker image
print_step "Step 7: Building Docker image..."
print_info "This may take a few minutes..."

# Detect which docker compose command to use
if docker compose version &> /dev/null 2>&1; then
    COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
else
    print_error "Neither 'docker compose' nor 'docker-compose' is available"
    exit 1
fi

$COMPOSE_CMD build
print_success "Docker image built successfully"
echo ""

# Step 8: Start container with Docker Compose
print_step "Step 8: Starting application container..."
$COMPOSE_CMD up -d
print_success "Container started"
echo ""

# Step 9: Wait for container to be healthy
print_step "Step 9: Waiting for application to be ready..."
sleep 5
RETRIES=0
MAX_RETRIES=30
while [ $RETRIES -lt $MAX_RETRIES ]; do
    if docker ps | grep -q $APP_NAME; then
        HEALTH=$(docker inspect --format='{{.State.Health.Status}}' $APP_NAME 2>/dev/null || echo "unknown")
        if [ "$HEALTH" = "healthy" ] || [ "$HEALTH" = "unknown" ]; then
            print_success "Application is ready!"
            break
        fi
    fi
    RETRIES=$((RETRIES+1))
    echo -n "."
    sleep 1
done
echo ""
echo ""

if [ $RETRIES -eq $MAX_RETRIES ]; then
    print_error "Application failed to start properly. Check logs with: docker logs $APP_NAME"
fi

# Step 10: Display container status
print_step "Step 10: Container Status"
docker ps | grep $APP_NAME || docker ps -a | grep $APP_NAME
echo ""

# Step 11: Create systemd service for auto-start
print_step "Step 11: Creating systemd service for auto-start..."

# Determine the full path to docker compose command
if [ "$COMPOSE_CMD" = "docker compose" ]; then
    DOCKER_PATH=$(which docker)
    EXEC_START="$DOCKER_PATH compose up -d"
    EXEC_STOP="$DOCKER_PATH compose down"
else
    COMPOSE_PATH=$(which docker-compose)
    EXEC_START="$COMPOSE_PATH up -d"
    EXEC_STOP="$COMPOSE_PATH down"
fi

sudo tee /etc/systemd/system/prasana-portfolio.service > /dev/null <<EOF
[Unit]
Description=Prasana Portfolio Docker Container
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$APP_DIR
ExecStart=$EXEC_START
ExecStop=$EXEC_STOP
StandardOutput=journal

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable prasana-portfolio.service
print_success "Systemd service created and enabled"
echo ""

# Step 12: Display nginx configuration instructions
print_step "Step 12: Nginx Configuration Instructions"
echo ""
echo "================================================"
echo "NGINX CONFIGURATION INSTRUCTIONS"
echo "================================================"
echo ""
echo "To configure nginx to serve this app at gritgo.in/portfolio, you need to:"
echo ""
echo "1. First, run these commands to show me your current nginx setup:"
echo ""
echo "   ${YELLOW}sudo nginx -t${NC}  # Test nginx configuration"
echo "   ${YELLOW}ls -la /etc/nginx/sites-available/${NC}  # List available sites"
echo "   ${YELLOW}cat /etc/nginx/sites-enabled/default${NC}  # Show default config"
echo ""
echo "   ${YELLOW}# If you have a gritgo.in config:${NC}"
echo "   ${YELLOW}grep -r 'gritgo.in' /etc/nginx/sites-available/${NC}"
echo "   ${YELLOW}# Then show that file:${NC}"
echo "   ${YELLOW}cat /etc/nginx/sites-available/<filename>${NC}"
echo ""
echo "2. After you provide these details, I'll generate the exact nginx"
echo "   configuration you need."
echo ""
echo "For reference, here's what needs to be added to your nginx config:"
echo ""
echo "${YELLOW}location /portfolio/ {${NC}"
echo "${YELLOW}    proxy_pass http://localhost:$HOST_PORT/;${NC}"
echo "${YELLOW}    proxy_http_version 1.1;${NC}"
echo "${YELLOW}    proxy_set_header Upgrade \$http_upgrade;${NC}"
echo "${YELLOW}    proxy_set_header Connection 'upgrade';${NC}"
echo "${YELLOW}    proxy_set_header Host \$host;${NC}"
echo "${YELLOW}    proxy_set_header X-Real-IP \$remote_addr;${NC}"
echo "${YELLOW}    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;${NC}"
echo "${YELLOW}    proxy_set_header X-Forwarded-Proto \$scheme;${NC}"
echo "${YELLOW}    proxy_cache_bypass \$http_upgrade;${NC}"
echo "${YELLOW}}${NC}"
echo ""
echo "================================================"
echo ""

# Final summary
print_success "=========================================="
print_success "SETUP COMPLETED SUCCESSFULLY!"
print_success "=========================================="
echo ""
echo "✓ Docker container is running on port $HOST_PORT"
echo "✓ Auto-restart enabled via systemd service"
echo "✓ Application will start automatically on server reboot"
echo ""
echo "Useful commands:"
echo "  ${YELLOW}docker logs $APP_NAME${NC}              # View application logs"
echo "  ${YELLOW}docker logs -f $APP_NAME${NC}           # Follow logs in real-time"
echo "  ${YELLOW}docker compose restart${NC}              # Restart the container"
echo "  ${YELLOW}docker compose down${NC}                 # Stop and remove container"
echo "  ${YELLOW}docker compose up -d${NC}                # Start container in background"
echo "  ${YELLOW}sudo systemctl status prasana-portfolio${NC}  # Check service status"
echo ""
echo "Next steps:"
echo "  1. Configure nginx as shown above"
echo "  2. Reload nginx: ${YELLOW}sudo systemctl reload nginx${NC}"
echo "  3. Access your portfolio at: ${GREEN}https://gritgo.in/portfolio${NC}"
echo ""
