#!/bin/bash

# Check if GPU is available
if nvidia-smi &> /dev/null; then
    echo "GPU detected - using GPU acceleration"
    GPU_AVAILABLE=true
else
    echo "No GPU detected - using CPU"
    GPU_AVAILABLE=false
fi

# Apply .env here too, so an OLLAMA_MODELS override set there wins over the
# detection below (Compose would otherwise prefer the exported value).
if [ -f .env ]; then
    set -a
    . ./.env
    set +a
fi

# Share the model folder with a native Ollama install so llama3.2:1b is
# downloaded once. The Linux/WSL install script (with systemd) stores models
# under the service user's home, which only that user may enter, so the parent
# folder is probed. The macOS app and a hand-started 'ollama serve' use ~.
if [ -z "$OLLAMA_MODELS" ]; then
    if [ -d /usr/share/ollama ]; then
        OLLAMA_MODELS=/usr/share/ollama/.ollama/models
    else
        OLLAMA_MODELS="$HOME/.ollama/models"
        mkdir -p "$OLLAMA_MODELS"   # create it as this user, not as root via Docker
    fi
fi
export OLLAMA_MODELS
echo "Using model folder: $OLLAMA_MODELS"

if docker volume ls -q 2>/dev/null | grep -qx "workshop-getting-started_ollama_data"; then
    echo "Note: the model volume of an earlier version is no longer used. Free 1.3 GB with:"
    echo "  docker volume rm workshop-getting-started_ollama_data"
fi

# Detect docker compose command
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
else
    echo "Error: Neither 'docker compose' nor 'docker-compose' is available."
    exit 1
fi

# Start services in detached mode
echo "Starting services..."
$DOCKER_COMPOSE up -d --build

# Wait for Ollama to be ready
echo "Waiting for Ollama to start..."
until curl -s http://localhost:11435/api/tags > /dev/null 2>&1; do
  echo -n "."
  sleep 2
done
echo " Ready!"

# Check if llama3.2:1b model exists
if ! docker exec workshop-ollama ollama list | grep -q "llama3.2:1b"; then
    echo "Downloading llama3.2:1b model (this may take several minutes)..."
    echo "This is a one-time download - subsequent starts will be much faster"
    docker exec workshop-ollama ollama pull llama3.2:1b
    
    if [ $? -eq 0 ]; then
        echo "Model llama3.2:1b downloaded successfully!"
    else
        echo "Failed to download model llama3.2:1b"
        exit 1
    fi
else
    echo "Model llama3.2:1b already available"
fi

# Files the container wrote belong to root. Hand them to the owner of the model
# folder so the native Ollama can still pull and remove models there. On Linux
# and WSL only; Docker Desktop on macOS maps ownership by itself.
if [ "$(uname -s)" = "Linux" ]; then
    OWNER=$(stat -c %u:%g "$OLLAMA_MODELS" 2>/dev/null || stat -c %u:%g "$(dirname "$(dirname "$OLLAMA_MODELS")")")
    docker exec workshop-ollama chown -R "$OWNER" /root/.ollama/models
fi

echo "All services ready!"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8000"
echo "- Ollama API: http://localhost:11435"
echo ""
echo "Press Ctrl+C to stop all services"

# Follow logs
$DOCKER_COMPOSE logs -f
