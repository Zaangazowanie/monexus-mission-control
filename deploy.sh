#!/bin/bash
# ==============================================================
# Monexus Mission Control — VPS Deployment Script
# Target: 187.77.71.153 (user2)
# ==============================================================

set -e

VPS_HOST="187.77.71.153"
VPS_USER="user2"
APP_DIR="/home/${VPS_USER}/monexus-mission-control"
PM2_NAME="monexus"

echo "🚀 Monexus Mission Control — Deploying to VPS..."

# 1. Build production bundle
echo "📦 Building production bundle..."
npm run build

# 2. Sync files to VPS (exclude node_modules, .next cache)
echo "📡 Syncing files to ${VPS_HOST}..."
rsync -avz --delete \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='data/*.json' \
    ./ ${VPS_USER}@${VPS_HOST}:${APP_DIR}/

# 3. Remote setup: install deps, build, restart PM2
echo "🔧 Setting up on VPS..."
ssh ${VPS_USER}@${VPS_HOST} << 'REMOTE_SCRIPT'
    cd ~/monexus-mission-control

    # Install production dependencies
    npm ci --production=false

    # Build on server
    npm run build

    # Create data directory
    mkdir -p data

    # Restart PM2 process
    pm2 describe monexus > /dev/null 2>&1 && pm2 restart monexus || pm2 start npm --name monexus -- start
    pm2 save

    echo "✅ Monexus Mission Control deployed successfully!"
    echo "📍 Running at http://localhost:3000"
REMOTE_SCRIPT

echo ""
echo "=============================================="
echo "🎯 Deployment Complete!"
echo "🌐 VPS: ${VPS_HOST}"
echo "📱 App: http://${VPS_HOST}:3000"
echo "=============================================="
