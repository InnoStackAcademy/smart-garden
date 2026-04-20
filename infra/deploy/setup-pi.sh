#!/bin/bash
# setup-pi.sh
# Setup inicial en la Pi. Corre UNA VEZ para preparar la estructura.
# Uso desde Windows: ssh admin@ubuntu-pi 'bash -s' < deploy/setup-pi.sh

set -euo pipefail

STACK_DIR="/home/admin/stacks/smart-garden"

echo "🌿 Setup inicial de Smart Garden en ARM-dev"

# Crear estructura
mkdir -p "$STACK_DIR/config"
mkdir -p "$STACK_DIR/logs"

# Crear config de Mosquitto
cat > "$STACK_DIR/config/mosquitto.conf" << 'EOF'
listener 1883
allow_anonymous true
persistence true
persistence_location /mosquitto/data/
log_dest file /mosquitto/log/mosquitto.log
EOF

# Crear .env base
cat > "$STACK_DIR/.env" << 'EOF'
MONGO_URI=mongodb://mongo:27017/smart-garden
MQTT_BROKER_URL=mqtt://mosquitto:1883
MQTT_CLIENT_ID=smart-garden-backend
PORT=3000
NODE_ENV=production

# GHCR — Completar con tu repo
BACKEND_IMAGE=ghcr.io/innostackacademy/smart-garden/backend:latest
GHCR_TOKEN=
GHCR_USER=
EOF

echo ""
echo "✅ Estructura creada en $STACK_DIR"
echo ""
echo "Próximos pasos:"
echo "  1. Editá $STACK_DIR/.env con tu BACKEND_IMAGE y GHCR_TOKEN"
echo "  2. Copiá docker-compose.pi.yml a $STACK_DIR/"
echo "  3. Copiá deploy-pi.sh a $STACK_DIR/ y dale permisos: chmod +x deploy-pi.sh"
echo "  4. Ejecutá: ./deploy-pi.sh"
