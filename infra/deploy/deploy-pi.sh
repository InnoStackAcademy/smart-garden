#!/bin/bash
# deploy-pi.sh
# Se ejecuta EN la Pi (manual o via SSH remoto)
# Uso: ./deploy-pi.sh [image_tag]
#   Ejemplo: ./deploy-pi.sh latest
#   Ejemplo: ./deploy-pi.sh a1b2c3d

set -euo pipefail

STACK_DIR="/home/admin/stacks/smart-garden"
COMPOSE_FILE="$STACK_DIR/docker-compose.pi.yml"
TAG="${1:-latest}"

# La imagen se configura en .env o se pasa como variable
export BACKEND_IMAGE="${BACKEND_IMAGE:-ghcr.io/innostackacademy/smart-garden/backend:$TAG}"

echo "🌿 Smart Garden — Deploy en ARM-dev"
echo "   Imagen: $BACKEND_IMAGE"
echo "   Stack:  $STACK_DIR"
echo ""

cd "$STACK_DIR"

# Login a GHCR (usa token de .env o variable de entorno)
if [ -n "${GHCR_TOKEN:-}" ]; then
  echo "$GHCR_TOKEN" | docker login ghcr.io -u "${GHCR_USER:-github}" --password-stdin
fi

echo "📦 Pulling imágenes..."
docker compose -f "$COMPOSE_FILE" pull

echo "🚀 Levantando servicios..."
docker compose -f "$COMPOSE_FILE" up -d

echo ""
echo "✅ Deploy completo. Estado:"
docker compose -f "$COMPOSE_FILE" ps
