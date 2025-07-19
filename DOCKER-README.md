# PolishPad Docker Setup

This directory contains the Docker Compose configuration to run PolishPad with all its services: frontend, backend, and Ollama with Gemma2:7B model.

## Prerequisites

- Docker Engine 20.10 or later
- Docker Compose 2.0 or later
- At least 8GB of available RAM (for Ollama with Gemma2:7B)
- At least 10GB of free disk space

## Quick Start

1. **Start all services:**
   ```bash
   ./polishpad.sh start
   ```

2. **Access the applications:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Ollama API: http://localhost:11434

## Services

### Frontend (Preact + Vite)
- **Port:** 3000
- **Technology:** Preact with TailwindCSS
- **Development mode:** Hot reloading enabled

### Backend (Spring Boot)
- **Port:** 8080
- **Technology:** Java 21 with Spring Boot 3.5.3
- **Database:** H2 in-memory database
- **Profile:** `docker` profile is automatically activated

### Ollama
- **Port:** 11434
- **Model:** Gemma2:7B (automatically pulled on first start)
- **Storage:** Persistent volume for model data

## Management Commands

Use the `polishpad.sh` script for easy management:

```bash
# Start all services
./polishpad.sh start

# Stop all services
./polishpad.sh stop

# Restart all services
./polishpad.sh restart

# View logs for all services
./polishpad.sh logs

# View logs for specific service
./polishpad.sh logs frontend
./polishpad.sh logs backend
./polishpad.sh logs ollama

# Rebuild all services (after code changes)
./polishpad.sh rebuild

# Check status of all services
./polishpad.sh status

# Clean up (remove all containers and volumes)
./polishpad.sh cleanup
```

## Manual Docker Compose Commands

If you prefer using Docker Compose directly:

```bash
# Start all services in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build -d

# Remove everything including volumes
docker-compose down -v --remove-orphans
```

## Development Workflow

### Making Changes to Frontend
1. Edit files in `frontend/src/`
2. Changes will be automatically reflected due to volume mounting and hot reloading

### Making Changes to Backend
1. Edit files in `backend/polishpad/src/`
2. Restart the backend service:
   ```bash
   docker-compose restart backend
   ```
   Or rebuild if you changed dependencies:
   ```bash
   ./polishpad.sh rebuild
   ```

### Testing Ollama Integration
The backend is configured to connect to Ollama at `http://ollama:11434` with the Gemma2:7B model. The model will be automatically pulled when the service starts for the first time.

## Configuration

### Environment Variables
- `OLLAMA_BASE_URL`: URL for Ollama service (default: http://ollama:11434)
- `VITE_API_BASE_URL`: Backend API URL for frontend (default: http://localhost:8080)

### Volumes
- `ollama_data`: Persistent storage for Ollama models and data
- Source code directories are mounted for development

### Networks
All services run on the `polishpad-network` bridge network for internal communication.

## Troubleshooting

### Ollama Model Not Loading
If Gemma2:7B model fails to load:
```bash
docker-compose exec ollama ollama pull gemma2:7b
```

### Backend Connection Issues
Check if all services are running:
```bash
./polishpad.sh status
```

View backend logs:
```bash
./polishpad.sh logs backend
```

### Frontend Not Loading
Ensure the frontend service is running and check logs:
```bash
./polishpad.sh logs frontend
```

### Port Conflicts
If you have port conflicts, modify the port mappings in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change 3000 to 3001 for frontend
  - "8081:8080"  # Change 8080 to 8081 for backend
```

## Performance Notes

- First startup may take 5-10 minutes to download the Gemma2:7B model (~4.3GB)
- Ollama requires significant RAM (recommend 8GB+ total system RAM)
- Model responses may be slower on systems with limited CPU/memory

## Security Notes

- The H2 console is enabled at `/h2-console` for development
- CORS is configured to allow requests from the frontend
- In production, disable H2 console and configure proper CORS origins
